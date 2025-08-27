var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { MessageController } from './controllers/messageController.js';
import { MessageService } from './services/messageService.js';
import { createClient } from 'redis';
const router = express.Router();
// Create and connect the Redis client ONCE, then pass to MessageService
const redisClient = createClient();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
    const messageService = new MessageService(redisClient);
    const messageController = new MessageController(messageService);
    router.post('/messages', (req, res) => messageController.sendmessage(req, res));
    router.get('/messages', (req, res) => messageController.getMessages(req, res));
}))();
export default router;
