import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './views/loginPage';
import ChatPage from './views/chatPage';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
const AppLayout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-layout">
      <main>
        {isLoggedIn ? (
          <>
            <div style={{textAlign: 'right', marginBottom: 16}}>
              <button onClick={handleLogout} style={{padding: '6px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer'}}>Logout</button>
            </div>
            <ChatPage />
          </>
        ) : (
          <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </main>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>
);

reportWebVitals();
