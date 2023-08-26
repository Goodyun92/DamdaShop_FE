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
import stamp2 from '../../imgs/stamp2.png';
import stamp3 from '../../imgs/stamp3.png';
import stamp4 from '../../imgs/stamp4.png';
import stamp5 from '../../imgs/stamp5.png';
import stamp6 from '../../imgs/stamp6.png';
import stamp7 from '../../imgs/stamp7.png';
import stamp8 from '../../imgs/stamp8.png';
import stamp9 from '../../imgs/stamp9.png';
import stamp10 from '../../imgs/stamp10.png';
import stamp11 from '../../imgs/stamp11.png';
import stamp12 from '../../imgs/stamp12.png';
import stamp13 from '../../imgs/stamp13.png';
import stamp14 from '../../imgs/stamp14.png';
import stamp15 from '../../imgs/stamp15.png';
import stamp16 from '../../imgs/stamp16.png';
import stamp17 from '../../imgs/stamp17.png';
import stamp18 from '../../imgs/stamp18.png';
import stamp19 from '../../imgs/stamp19.png';

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
const StampImg = styled.img`
    height: 80%;
    width: auto;
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
                        {/* <img src={stamp1} /> */}
                        {item === 1 && <StampImg src={stamp1} />}
                        {item === 2 && <StampImg src={stamp2} />}
                        {item === 3 && <StampImg src={stamp3} />}
                        {item === 4 && <StampImg src={stamp4} />}
                        {item === 5 && <StampImg src={stamp5} />}
                        {item === 6 && <StampImg src={stamp6} />}
                        {item === 7 && <StampImg src={stamp7} />}
                        {item === 8 && <StampImg src={stamp8} />}
                        {item === 9 && <StampImg src={stamp9} />}
                        {item === 10 && <StampImg src={stamp10} />}
                        {item === 11 && <StampImg src={stamp11} />}
                        {item === 12 && <StampImg src={stamp12} />}
                        {item === 13 && <StampImg src={stamp13} />}
                        {item === 14 && <StampImg src={stamp14} />}
                        {item === 15 && <StampImg src={stamp15} />}
                        {item === 16 && <StampImg src={stamp16} />}
                        {item === 17 && <StampImg src={stamp17} />}
                        {item === 18 && <StampImg src={stamp18} />}
                        {item === 19 && <StampImg src={stamp19} />}
                    </Stamp>
                ))}
                {/* </ScrollHorizontal> */}
            </Wrap>
        </Container>
    );
};

export default MyStamp;
