# Chit-chat

A small real-time chat I built to learn WebSockets and Docker. Pick a name and a room, see the room's earlier messages, get "is typing…" hints, and run the whole stack with one command.

## What's inside

| Folder | What it is |
| --- | --- |
| `server/` | Express + Socket.IO. Messages are saved per room in SQLite, each with a unique client-generated id. |
| `ui/` | React 19 + Vite + Tailwind client, built in a multi-stage Dockerfile and served by nginx. |
| `docker-compose.yml` | Runs both. The SQLite file is mounted as a volume so messages survive restarts. |
| `ui_next_js/` | A Next.js version of the client, not started yet (still the starter page). |

## Run it

```bash
docker compose up --build
```

- Chat UI: http://localhost:3000
- Socket.IO server: http://localhost:3001

## What I'd change before production

- Allow only the UI's origin in CORS (it's `*` for local use).
- Read the server URL from config instead of hard-coding `localhost:3001`.
- Move from SQLite to Postgres and add the Socket.IO Redis adapter, so more than one server can run.
- Validate message length and room names on the server.
