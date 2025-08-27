import {Server} from 'socket.io';

export class SocketService {
    private io: Server;

    constructor(server: any) {
        this.io = new Server(server);
        this.initialize();
    }

    private initialize() {
        this.io.on("connection", (socket) => {
            console.log("New connection");
            socket.on("disconnect", () => {
                console.log('Connection Disconencted');
            });

            socket.on("chat message", (msg)=> {
                this.io.emit("chat message", msg);
            });
        });
    }

    public sendMessage(userId: string, message: string){
        this.io.emit("chat message", {userId, message});
        console.log(`Message sent from User ${userId}: ${message}`)
    }

    public getIo() {
        return this.io;
    }
}