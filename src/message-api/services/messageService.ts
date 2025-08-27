import { createClient, RedisClientType } from 'redis';
import { Message } from '../models/messageModel.js';

export class MessageService {
    private redisClient: RedisClientType;

    constructor(redisClient: RedisClientType) {
        this.redisClient = redisClient;
    }

    async sendMessaage(userId: string, message: string) {
        try {
            const newMessage = await Message.create({ userId, message });
            await this.redisClient.set(`message:${newMessage.id}`, JSON.stringify(newMessage));
        } catch (error) {
            throw new Error('Could not send message');
        }
    }
    async getMessages(userId: string) {
        try {
            const messages = await Message.find({ userId });
            return messages;
        } catch (error) {
            throw new Error('Could not retrieve messages');
        }
    }
}