const express = require('express');
const http = require('http');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const { Server } = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let db;

(async () => {
    db = await open({
        filename: 'chat.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_offset TEXT UNIQUE,
            content TEXT,
            author TEXT,
            room TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
})();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', async (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined the room ${room}`)
        
        // Load previous messages
        try {
            const messages = await db.all('SELECT * FROM messages WHERE room = ? ORDER BY id ASC', room);
            // Transform to match UI expectation if needed, or update UI to match DB schema.
            // UI expects: { room, author, message, id, time }
            // DB has: content, author, room, createdAt.
            const formattedMessages = messages.map(msg => ({
                room: msg.room,
                author: msg.author,
                message: msg.content,
                id: msg.id, // Using DB id for keys
                time: new Date(msg.createdAt).toLocaleTimeString()
            }));
            socket.emit('load_messages', formattedMessages); 

        } catch (e) {
            console.error("Error loading messages:", e);
        }
    });

    socket.on('send_message' , async (data) => {
        // data = { room, author, message, id, time }
        try {
            const result = await db.run('INSERT INTO messages (content, author, room, client_offset) VALUES (?, ?, ?, ?)', data.message, data.author, data.room, data.id);
            // We can emit back the message with the DB id if we want strict consistency,
            // but for now let's just broadcast what we got (or what is successful).
             socket.to(data.room).emit('receive_message', data)
        } catch (e) {
            console.error("Error saving message:", e);
        }
       
    });

    socket.on('typing', ({username, room}) => {
        socket.to(room).emit('user_typing', username)
    });

    socket.on('disconnect', () => {
         console.log('User disconnected:', socket.id);
    })
})


server.listen(3001, () => {
    console.log('Server listening on port 3001');
})