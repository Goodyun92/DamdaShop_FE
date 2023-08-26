import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import ScrollHorizontal from 'react-scroll-horizontal';
import stamp1 from '../../imgs/stamp1.png';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const Nav = styled.div`
    margin: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const BackButton = styled.button`
    border: none;
    background-color: white;
    width: 8px;
    height: 16px;
`;
const Title = styled.div`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
`;

const Wrap = styled.div`
    /* margin-left: 15px;
    margin-right: 15px; */
    margin-top: 50px;
    width: 100%;
    height: 460px;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Stamp = styled.button`
    height: 100%;
    width: auto;
    margin: 0px 20px 0px 20px;
    border: none;
    background-color: white;
`;

const MyStamp = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [data, setData] = useState([]);

    useEffect(() => {
        getStamp();
    }, []);

    async function getStamp() {
        // stamp get api
        console.log(account.userId);
        axios
            .get(`https://ssudamda.shop/users/${account.userId}/stamps`)
            .then((response) => {
                setData(...response.data);
            })
            .catch((error) => {});
    }

    return (
        <Container>
            <Nav>
                <BackButton onClick={() => navigate('/myPage')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </BackButton>
                <Title>내 토큰 스탬프</Title>
                <div></div>
            </Nav>
            <Wrap id="scroll-horizontal">
                {/* <ScrollHorizontal> */}
                {data.map((item) => (
                    <Stamp key={item}>
                        {/* Render your data here */}
                        {/* <p>{item}</p> */}
                        <img src={stamp1} />
                    </Stamp>
                ))}
                {/* </ScrollHorizontal> */}
            </Wrap>
        </Container>
    );
};

export default MyStamp;
