import {SocketService} from "../services/socketService.js";

export class ChatController {
    private socketService: SocketService;
    constructor(server:any) {
        this.socketService = new SocketService(server);
    }

    public sendMessage(req: import('express').Request, res: import('express').Response): void {
        const {message} = req.body;

        this.socketService.getIo().emit("chat message", message);
        res.status(200).json({success: true, message: "Sent"});

    }
}