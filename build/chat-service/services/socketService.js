import { Server } from 'socket.io';
export class SocketService {
    constructor(server) {
        this.io = new Server(server);
        this.initialize();
    }
    initialize() {
        this.io.on("connection", (socket) => {
            console.log("New connection");
            socket.on("disconnect", () => {
                console.log('Connection Disconencted');
            });
            socket.on("chat message", (msg) => {
                this.io.emit("chat message", msg);
            });
        });
    }
    sendMessage(userId, message) {
        this.io.emit("chat message", { userId, message });
        console.log(`Message sent from User ${userId}: ${message}`);
    }
    getIo() {
        return this.io;
    }
}
