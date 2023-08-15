import React from 'react';
import styled from 'styled-components';
import back from '../../../imgs/Vector2.png';

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
    return (
        <Container>
            <Nav>
                <div></div>
                <div></div>
                <BackButton onClick={func}>
                    <img src={back} />
                </BackButton>
            </Nav>
        </Container>
    );
};

export default VoiceModule;
