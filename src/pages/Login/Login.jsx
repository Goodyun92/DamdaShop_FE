import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const C = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: -0.30000001192092896px;
    padding: 10px 20px 0px 20px;
    background-color: white;
`;

const T1 = styled.div`
    margin-top: 30px;
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
    margin-bottom: 10px;
`;

const Input = styled.input`
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    outline: none;
    border: none;
`;

const LoginFail = styled.div`
    color: red;
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 400;
    text-align: center;
`;

const ButtonLogin = styled.button`
    margin-top: 5px;
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
    font-family: 'pretendard';
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
    width: 100%;
    height: 59px;
    margin-top: 380px;
    padding: 20px 0px 20px 0px;
    background: #60996633;
    border: none;
    font-family: 'pretendard';
    border-radius: 5px;
`;

const Box = styled.div`
    background: #60996633;
    width: 100%;
    height: 100px;
`;

const Login = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [credentials, setCredentials] = useState({
        id: '',
        password: '',
    });
    const [loginResult, setLoginResult] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        console.log(credentials);

        event.preventDefault();

        axios
            .post('https://ssudamda.shop/users/login', {
                password: credentials.password,
                userName: credentials.id,
            })
            .then((Response) => {
                console.log(Response.status);
                console.log(Response.data);
                setAccount({
                    ...account,
                    userId: Response.data.userId,
                    id: Response.data.userName,
                    password: Response.data.password,
                    name: Response.data.userNickName,
                    phoneNumber: Response.data.phoneNumber,
                    marketId: Response.data.market.marketId,
                    accountBank: Response.data.accountBank,
                    accountNum: Response.data.accountDigit,
                });
                console.log(account);
                navigate('/mainHome');
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoginResult(true);
            });
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <C>
            <Container>
                <T1>안녕하세요!</T1>
                <T2>아래 정보를 입력하여 로그인해주세요</T2>
                <Form onSubmit={handleSubmit}>
                    <Label>
                        <Input
                            placeholder="아이디"
                            type="text"
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
                    <div>
                        {loginResult ? <LoginFail>비밀번호가 틀렸습니다.다시 입력해 주실래요?</LoginFail> : <div />}
                    </div>
                    <ButtonLogin type="submit">로그인</ButtonLogin>
                </Form>
            </Container>
            <ButtonSignup type="button" onClick={handleSignup}>
                <SignupL>계정이 없나요?</SignupL>
                <SignupR>회원가입</SignupR>
            </ButtonSignup>
            <Box />
        </C>
    );
};

export default Login;
