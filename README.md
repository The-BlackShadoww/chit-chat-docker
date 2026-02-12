# Real-time Chat Application (Dockerized)

A full-stack real-time chat application built with **React**, **Node.js**, **Socket.IO**, and **SQLite**. The entire stack is containerized using **Docker** for easy deployment and consistency.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO.
- **Persistent Chat History**: Messages are stored in a lightweight SQLite database (`chat.db`).
- **Room Support**: Join specific chat rooms.
- **Typing Indicators**: See when other users are typing.
- **Modern UI**: built with React 19 and TailwindCSS v4.
- **Dockerized**: Easy setup with Docker Compose.

## 🛠️ Tech Stack

### Frontend (`/ui`)
- **React 19**
- **Vite** (Build tool)
- **TailwindCSS v4** (Styling)
- **Socket.IO Client**
- **Nginx** (Serving production build)

### Backend (`/server`)
- **Node.js**
- **Express**
- **Socket.IO**
- **SQLite** (Database)

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose installed on your machine.
- [Node.js](https://nodejs.org/) (Optional, only for local non-Docker development).

## 🐳 Running with Docker (Recommended)

1.  Make sure Docker Desktop is running.
2.  Open a terminal in the project root.
3.  Run the following command:

    ```bash
    docker-compose up --build
    ```

4.  Wait for the build to complete and the services to start.
5.  Access the application in your browser at:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:3001](http://localhost:3001)

To stop the containers, press `Ctrl+C` or run:
```bash
docker-compose down
```

## 💻 Local Development

If you prefer to run the services locally without Docker:

### Backend

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node index.js
    ```
    The server will run on port `3001`.

### Frontend

1.  Open a new terminal and navigate to the UI directory:
    ```bash
    cd ui
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Access the UI at the URL provided in the terminal (usually `http://localhost:5173`).

## 📂 Project Structure

- `server/`: Contains the backend code, database setup, and Socket.IO logic.
- `ui/`: Contains the frontend React application.
- `docker-compose.yml`: Orchestrates the specialized `client` and `server` containers.
- `NOTES.md`: Contains learning notes and architectural concepts related to this project.

## 📝 Notes

- The SQLite database file `chat.db` is created in the `server` directory. In Docker, this is persisted using a volume.
- See `NOTES.md` for more details on the concepts learned during this project.
