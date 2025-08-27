import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './views/loginPage';
import ChatPage from './views/chatPage';
const root = ReactDOM.createRoot(document.getElementById('app'));
const AppLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    return (_jsx("div", Object.assign({ className: "app-layout" }, { children: _jsx("main", { children: isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ style: { textAlign: 'right', marginBottom: 16 } }, { children: _jsx("button", Object.assign({ onClick: handleLogout, style: { padding: '6px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' } }, { children: "Logout" })) })), _jsx(ChatPage, {})] })) : (_jsx(LoginPage, { onLoginSuccess: () => setIsLoggedIn(true) })) }) })));
};
root.render(_jsx(React.StrictMode, { children: _jsx(AppLayout, {}) }));
reportWebVitals();
