import { useEffect, useState } from "react";
import axios from 'axios';
import io from 'socket.io-client';
import './chatPage.css';

const socket = io('http://localhost:4000');

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(()=> {
        socket.on('chat message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessageSocket = () => {
        if(input) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <h3> Chat Room</h3>
            <div className="chat-messages">
                {messages?.length === 0 ? (
                    <p> No messages Yet</p>
                ) : (
                    <div>
                        {messages?.map((msg: string, index: number) => (
                            <div className="chat-message" key={index}>{msg}</div>
                        ))}
                    </div>
                )}
            </div>
            <form onSubmit={e => { e.preventDefault(); sendMessageSocket(); }} style={{width: '100%'}}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatPage;
