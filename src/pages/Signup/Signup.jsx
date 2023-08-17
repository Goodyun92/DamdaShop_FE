import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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

const T = styled.div`
    margin-top: 25px;
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
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    outline: none;
    border: none;
`;

const ButtonSignup = styled.button`
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
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 550;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
`;

const LoginL = styled.span`
    color: #000000;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
`;

const LoginR = styled.span`
    color: #416444;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
    font-family: Pretendard;
`;

const ButtonLogin = styled.button`
    width: auto;
    height: 59px;
    margin-top: 290px;
    padding: 20px 0px 20px 0px;
    background: white;
    border: none;
    font-family: 'pretendard';
    border-radius: 5px;
`;

const BackButton = styled.button`
    margin-top: 15px;
    border: none;
    background-color: white;
    font-size: 16px;
`;
const Agr = styled.div`
    height: 30px;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
`;
const AgrL = styled.span`
    color: #609966;
`;
const AgrR = styled.span`
    color: black;
`;

const Signup = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', id: '', password: '' });
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log('submit signup..');
        console.log(credentials);

        axios
            .post('https://ssudamda.shop/users/signup', {
                marketId: 1,
                password: credentials.password,
                phoneNumber: '01012345678',
                userName: credentials.id,
                userNickName: credentials.name,
            })
            .then((Response) => {
                console.log(Response.status);
                console.log(Response.data);
                navigate('/afterSignup');
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                alert('회원가입 실패!');
            });
    };

    return (
        <C>
            <Container>
                {showConfirm ? (
                    <div>
                        <BackButton onClick={() => setShowConfirm(false)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                        <T>아래 정보가 확실한가요?</T>
                        <Form onSubmit={handleConfirm}>
                            <Label>
                                <Input readOnly value={credentials.name} />
                            </Label>
                            <Label>
                                <Input readOnly value={credentials.id} />
                            </Label>
                            <Label>
                                <Input readOnly value={credentials.password} />
                            </Label>
                            <Agr>
                                <AgrL>서비스 이용약관,개인정보 취급 방침</AgrL>
                                <AgrR>에 모두 동의하시나요?</AgrR>
                            </Agr>
                            <ButtonSignup type="submit">필수 약관 동의 & 회원 가입 완료</ButtonSignup>
                        </Form>
                    </div>
                ) : (
                    <div>
                        <T1>반가워요!</T1>
                        <T2>회원정보를 입력해주세요</T2>
                        <Form onSubmit={handleSubmit}>
                            <Label>
                                <Input
                                    placeholder="이름"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={credentials.name}
                                    required
                                />
                            </Label>
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
                            <ButtonSignup type="submit">입력완료</ButtonSignup>
                        </Form>
                    </div>
                )}
            </Container>

            <ButtonLogin type="button" onClick={handleLogin}>
                <LoginL>계정이 이미 있으신가요?</LoginL>
                <LoginR>로그인</LoginR>
            </ButtonLogin>
        </C>
    );
};

export default Signup;
