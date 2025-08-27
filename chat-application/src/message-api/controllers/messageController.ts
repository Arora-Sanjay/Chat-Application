import { Request, Response } from 'express';

export class MessageController {
    constructor(private messageService: any) {}

    async sendmessage(req: Request, res: Response) {
        try {
            const { userId, content } = req.body;
            const message = await this.messageService.createMessage(userId, content);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: 'Failed to send message' });
        }
    }

    async getMessages(req: Request, res: Response) {
        try {
            const messages = await this.messageService.getAllMessages();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve message' });
        }
    }
}
