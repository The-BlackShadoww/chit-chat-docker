import { useState } from 'react';
import ChatRoom from './components/ChatRoom';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      setJoined(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {
        !joined ? (
          <div className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Join Chat Room</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
               <input
              type="text"
              placeholder="Room ID"
              className="w-full mb-3 p-2 border rounded"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              />
              <button onClick={joinRoom} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Join Room</button>
          </div>
        ) : ( <ChatRoom username={username} room={room} />)
      }
    </div>
  );
}

export default App;
