import express from 'express';
import http from 'http';
import { ChatController } from './controllers/chatController.js';
import { SocketService } from './services/socketService.js';
const app = express();
app.use(express.json());
const server = http.createServer(app);
const socketService = new SocketService(server);
const chatController = new ChatController(server);
app.post('/chat/send', (req, res) => chatController.sendMessage(req, res));
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Chat service running on http://localhost:${PORT}`);
});
