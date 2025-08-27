import express from 'express';
import { MessageController } from './controllers/messageController.js';
import { MessageService } from './services/messageService.js';
import { RedisClientType, createClient } from 'redis';

const router = express.Router();

const redisClient: RedisClientType = createClient();

(async () => {
    await redisClient.connect();
    const messageService = new MessageService(redisClient);
    const messageController = new MessageController(messageService);

    router.post('/messages', (req, res) => messageController.sendmessage(req, res));
    router.get('/messages', (req, res) => messageController.getMessages(req, res));
})();

export default router;