var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from 'axios';
import './loginPage.css';
const LoginPage = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = yield axios.post('http://localhost:3001/api/auth/login', { username, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setLoading(false);
            onLoginSuccess();
        }
        catch (err) {
            setLoading(false);
            setError('Invalid Username or Password');
        }
    });
    return (_jsxs("div", Object.assign({ className: "login-container" }, { children: [_jsx("h2", { children: "Login" }), _jsxs("form", Object.assign({ onSubmit: handleLogin }, { children: [_jsxs("div", { children: [_jsx("label", { children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true, autoComplete: "username", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "current-password", disabled: loading })] }), error && _jsx("p", Object.assign({ style: { color: 'red' } }, { children: error })), _jsx("button", Object.assign({ type: "submit", disabled: loading }, { children: loading ? 'Logging in...' : 'Login' }))] }))] })));
};
export default LoginPage;
