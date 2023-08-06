import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // API endpoint
            const res = await axios.post('http://localhost:5000/login', credentials);

            if (res.data.success) {
                // 로그인 성공 후 redirect 경로
                navigate('/');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" name="email" onChange={handleChange} value={credentials.email} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={handleChange} value={credentials.password} required />
            </label>
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignup}>
                회원가입
            </button>
        </form>
    );
}

export default Login;
