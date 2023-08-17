import styled from 'styled-components';
import back from '../../../imgs/Vector2.png';
import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

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

const VoiceModule = ({ func }) => {
    const [value, setValue] = useState('결과');

    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },
    });

    return (
        <Container>
            <Nav>
                <div></div>
                <div></div>
                <BackButton onClick={func}>
                    <img src={back} />
                </BackButton>
            </Nav>
            <div>
                <h2>음성인식</h2>

                <div>{value}</div>

                <button onMouseDown={listen} onMouseUp={stop}>
                    🎤speech
                </button>

                {listening && <div>음성인식 중</div>}
            </div>
        </Container>
    );
};

export default VoiceModule;
