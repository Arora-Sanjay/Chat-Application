import React, { useState } from "react";
import axios from 'axios';
import './loginPage.css';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try{
            const response = await axios.post('http://localhost:3001/api/auth/login', {username, password});
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setLoading(false);
            onLoginSuccess();
        } catch(err) {
            setLoading(false);
            setError('Invalid Username or Password');
        }
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        disabled={loading}
                    />
                </div>
                {error && <p style={{color:'red'}}>{error}</p>}
                <button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;