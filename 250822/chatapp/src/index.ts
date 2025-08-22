import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);

// Serve static frontend
app.use(express.static('public'));

// Attach WebSocket server on custom path
const wss = new WebSocketServer({ server, path: '/ws' });

// Handle connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send welcome message
  ws.send('Hello from server');

  // Listen for client messages
  ws.on('message', (msg) => {
    console.log('Received:', msg.toString());

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${msg}`);
      }
    });
  });

  // Handle disconnect
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
