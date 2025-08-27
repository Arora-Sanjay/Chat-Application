import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import './chatPage.css';
const socket = io('http://localhost:4000');
const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.off('chat message');
        };
    }, []);
    const sendMessageSocket = () => {
        if (input) {
            socket.emit('chat message', input);
            setInput('');
        }
    };
    return (_jsxs("div", Object.assign({ className: "chat-container" }, { children: [_jsx("h3", { children: " Chat Room" }), _jsx("div", Object.assign({ className: "chat-messages" }, { children: (messages === null || messages === void 0 ? void 0 : messages.length) === 0 ? (_jsx("p", { children: " No messages Yet" })) : (_jsx("div", { children: messages === null || messages === void 0 ? void 0 : messages.map((msg, index) => (_jsx("div", Object.assign({ className: "chat-message" }, { children: msg }), index))) })) })), _jsxs("form", Object.assign({ onSubmit: e => { e.preventDefault(); sendMessageSocket(); }, style: { width: '100%' } }, { children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), placeholder: "Type your message" }), _jsx("button", Object.assign({ type: "submit" }, { children: "Send" }))] }))] })));
};
export default ChatPage;
