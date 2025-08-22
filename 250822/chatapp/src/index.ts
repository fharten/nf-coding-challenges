import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const PORT = 3002;
const app = express();
const server = http.createServer(app);

interface WSClient extends WebSocket {
  room?: string;
  username?: string;
}

// Attach WebSocket server on custom path
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws: WSClient) => {
  console.log('Client connected');

  // Send welcome message
  ws.send(
    JSON.stringify({
      system: true,
      message: 'Connected!',
    }),
  );

  // Listen for client messages
  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg.toString());

      if (data.type === 'join') {
        ws.room = data.room || 'awd';
        ws.username = data.username || 'anon';
        ws.send(
          JSON.stringify({
            system: true,
            message: `Joined ${ws.room} as ${ws.username}`,
          }),
        );
        console.log(`${ws.username} joined ${ws.room}`);

        wss.clients.forEach((client: WSClient) => {
          if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
            client.send(
              JSON.stringify({
                username: 'system',
                message: `${ws.username} joined. Say hi.`,
              }),
            );
          }
        });
        return;
      }

      if (data.type === 'message') {
        if (!ws.room || !ws.username) {
          ws.send(
            JSON.stringify({
              system: true,
              message: 'You must join a room with a username first!',
            }),
          );
          return;
        }

        // Broadcast to all clients in the same room
        wss.clients.forEach((client: WSClient) => {
          if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
            client.send(
              JSON.stringify({
                username: ws.username,
                room: ws.room,
                message: data.message,
              }),
            );
          }
        });
      }
    } catch (error) {
      ws.send(
        JSON.stringify({
          system: true,
          message: 'Invalid message format',
        }),
      );
    }
  });

  // Handle disconnect
  ws.on('close', () => {
    console.log(`${ws.username || 'A client'} disconnected`),
      wss.clients.forEach((client: WSClient) => {
        if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
          client.send(
            JSON.stringify({
              username: 'system',
              message: `${ws.username} left. Finally.`,
            }),
          );
        }
      });
  });
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
