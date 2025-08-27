import { SocketService } from "../services/socketService.js";
export class ChatController {
    constructor(server) {
        this.socketService = new SocketService(server);
    }
    sendMessage(req, res) {
        const { message } = req.body;
        this.socketService.getIo().emit("chat message", message);
        res.status(200).json({ success: true, message: "Sent" });
    }
}
