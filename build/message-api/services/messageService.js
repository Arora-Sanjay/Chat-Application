var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Message } from '../models/messageModel.js';
export class MessageService {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    sendMessaage(userId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = yield Message.create({ userId, message });
                yield this.redisClient.set(`message:${newMessage.id}`, JSON.stringify(newMessage));
                console.log(`Message sent: ${newMessage.id}`);
            }
            catch (error) {
                throw new Error('Could not send message');
            }
        });
    }
    getMessages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield Message.find({ userId });
                return messages;
            }
            catch (error) {
                throw new Error('Could not retrieve messages');
            }
        });
    }
}
