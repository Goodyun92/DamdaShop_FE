import styled from 'styled-components';
import back from '../../../imgs/Vector2.png';
import React, { useEffect, useState, useRef } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import getvoice from '../../../imgs/getvoice.png';
import { useRecoilState } from 'recoil';
import accountState from '../../../store/atoms';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'pretendard';
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
`;
const BackButton = styled.button`
    background-color: white;
    border: none;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;
const P1 = styled.div`
    font-family: 'pretendard';
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const V = styled.div`
    margin-bottom: 13px;
    font-family: 'pretendard';
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const P2 = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const Box = styled.div`
    background-color: #efefef;
    width: 179px;
    height: 40px;
    border-radius: 20px;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MicButton = styled.button`
    background-color: white;
    border: none;
`;

const VoiceModule = ({ func }) => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [newStatus, setNewStatus] = useState(10);

    const isFirstRender = useRef(true);

    const [start, setStart] = useState(0);
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },
    });

    console.log(value);
    console.log(listening);

    useEffect(() => {
        // 첫 렌더링 시 isFirstRender.current는 true이므로 API 호출을 방지한다.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // 상태값이 false로 변경될 때만 API를 호출한다.
        if (!listening) {
            const tmp = {
                searchString: value,
                userId: account.userId,
            };
            console.log(tmp);
            axios
                .post('https://ssudamda.shop/voice-recognition/recognizing', tmp)
                .then((res) => {
                    console.log(res.data);
                    setNewStatus(res.data.statusCode);
                    // if (res.data.statusCode === -1) {
                    //     alert('내 가게가 없습니다!');
                    // } else if (res.data.StatusCode === 0 || res.data.StatusCode === 1) {
                    //     navigate('/myPage');
                    // } else if (res.data.StatusCode === 2) {
                    //     navigate('/myPage');
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [listening]);

    useEffect(() => {
        console.log(newStatus);
        if (newStatus === -1) {
            alert('내 가게가 없습니다!');
        } else if (newStatus === 0 || newStatus === 1) {
            navigate('/myPage');
        } else if (newStatus === 2) {
            navigate('/myPage');
        }
    }, [newStatus]);

    return (
        <Container>
            {value?.length > 0 ? (
                <div>
                    <Nav>
                        <div></div>
                        <div></div>
                        <BackButton onClick={func}>
                            <img src={back} />
                        </BackButton>
                    </Nav>
                    <Content>
                        <V>{value}</V>
                        <MicButton onMouseDown={listen} onMouseUp={stop}>
                            <img src={getvoice} />
                        </MicButton>
                        {listening && <P2>음성인식 중</P2>}
                    </Content>
                </div>
            ) : (
                <div>
                    <Nav>
                        <div></div>
                        <div></div>
                        <BackButton onClick={func}>
                            <img src={back} />
                        </BackButton>
                    </Nav>
                    <Content>
                        <P1>이렇게 말해보세요</P1>
                        <Box>
                            <P2>마이페이지</P2>
                        </Box>
                        <MicButton onMouseDown={listen} onMouseUp={stop}>
                            <img src={getvoice} />
                        </MicButton>
                        {listening && <P2>음성인식 중</P2>}
                    </Content>
                </div>
            )}
        </Container>
    );
};

export default VoiceModule;
