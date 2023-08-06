import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // API endpoint에 따라 변경해주세요.
            const res = await axios.post('http://localhost:5000/signup', credentials);

            if (res.data.success) {
                // 회원가입 성공 후 redirect 경로를 변경해주세요.
                navigate('/login');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
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
            <button type="submit">회원가입</button>
        </form>
    );
}

export default Signup;
