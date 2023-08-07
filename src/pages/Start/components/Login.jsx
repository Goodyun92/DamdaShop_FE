import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 375px;
    height: 812px;
    display: flex;
    flex-direction: column;
    font-family: 'pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: -0.30000001192092896px;
    padding: 10px 10px 0px 10px;
`;

const T1 = styled.div`
    margin-top: 118px;
`;

const T2 = styled.div`
    margin-top: 10px;
    margin-bottom: 25px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    width: Fixed (334px);
    height: Fixed (44px);
    top: 205px;
    left: 21px;
    padding: 8px 16px 8px 16px;
    border-radius: 5px;
    border: 0.5px;
    gap: 10px;
    color: #e0e0e0;
    border: 0.5px solid #e0e0e0;
`;

const Input = styled.input`
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    outline: none;
    border: none;
`;

const ButtonLogin = styled.button`
    margin-top: 15px;
    width: Fixed (333px);
    height: Fixed (41px);
    top: 322px;
    left: 21px;
    padding: 14px 40px 14px 40px;
    border-radius: 5px;
    border: none;
    gap: 10px;

    background: #609966;
    color: white;
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 550;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
`;

const SignupL = styled.span`
    color: #000000;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
`;

const SignupR = styled.span`
    color: #416444;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
`;

const ButtonSignup = styled.button`
    width: 375px;
    height: 59px;
    margin-top: 400px;
    padding: 20px 0px 20px 0px;
    background: #60996633;
    border: none;
    font-family: 'pretendard';
`;

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ id: '', password: '' });

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
        <Container>
            <T1>안녕하세요!</T1>
            <T2>아래 정보를 입력하여 로그인해주세요</T2>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <Input
                        placeholder="아이디"
                        type="id"
                        name="id"
                        onChange={handleChange}
                        value={credentials.id}
                        required
                    />
                </Label>
                <Label>
                    <Input
                        placeholder="비밀번호"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={credentials.password}
                        required
                    />
                </Label>
                <ButtonLogin type="submit">로그인</ButtonLogin>
                <ButtonSignup type="button" onClick={handleSignup}>
                    <SignupL>계정이 없나요?</SignupL>
                    <SignupR>회원가입</SignupR>
                </ButtonSignup>
            </Form>
        </Container>
    );
};

export default Login;
