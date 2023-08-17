import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import ScrollHorizontal from 'react-scroll-horizontal';

const Container = styled.div`
    width: 100%;
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
const MyStamp = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [data, setData] = useState([1]);

    useEffect(() => {
        getStamp();
    }, []);

    async function getStamp() {
        // stamp get api
        console.log(account.userId);
        axios
            .get(`https://ssudamda.shop/users/${account.userId}/stamps`)
            .then((response) => {
                setData([...response.data]);
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
                <div>{data}</div>
            </Nav>
            <div id="scroll-horizontal">
                <ScrollHorizontal>
                    {data.map((item) => (
                        <div key={item}>
                            {/* Render your data here */}
                            <p>{item}</p>
                        </div>
                    ))}
                </ScrollHorizontal>
            </div>
        </Container>
    );
};

export default MyStamp;
