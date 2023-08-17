import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ScrollHorizontal from 'react-scroll-horizontal';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div`
    width: 95%;
    margin-top: 10px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    margin-left: 10px;
    margin-bottom: 10px;
    text-align: center;
`;

const BackButton = styled.button`
    background-color: white;
    border: none;
`;
const MrkCt = styled.div`
    height: 2.5em;
    border-bottom: 0.5px solid #d0d0d0;
`;

const MrkCtBut = styled.button`
    margin: 0px 7px 0px 7px;
    /* padding: 5px 9px 0px 9px; */
    /* border-radius: 20px; */
    white-space: nowrap;
    /* background-color: ${(props) => (props.isSelected ? '#416444' : '#FFFFFF')}; */
    background-color: white;
    color: ${(props) => (props.isSelected ? '#609966' : '#909090')};
    cursor: pointer;
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: center;
    border: none;
    border-bottom: #609966 solid ${(props) => (props.isSelected ? '2.5px' : '0px')};
`;

function ShowMarkets() {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const buttons = [
        '과일',
        '채소',
        '쌀·잡곡·견과',
        '수산물·건해산',
        '정육·계란',
        '요리·간편식',
        '음료',
        '친환경·유기농',
    ];

    //api로 받아올 해당되는 가게 목록
    const [data, setData] = useState(null);

    //파라미터로 전달해준 값 취득
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    //쿼리 취득
    const btnValue = params.get('marketCategory');
    const [selectedCt, setSelectedCt] = useState({
        name: buttons[btnValue],
        id: btnValue,
    });

    //카테고리로 가게 보여주기
    useEffect(() => {
        axios
            .get('https://ssudamda.shop/stores/by-category', {
                params: {
                    categoryId: selectedCt.id,
                    marketId: account.marketId,
                },
            })
            .then((response) => {
                setData([...response.data]);
            })
            .catch((error) => {});
    }, [selectedCt.id]);

    const goShop = (value) => {
        navigate(`/shop?shopId=${value}`);
    };

    return (
        <Container>
            <Nav>
                <BackButton onClick={() => navigate('/mainHome')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </BackButton>
                <div>가게</div>
                <div></div>
            </Nav>
            <MrkCt id="scroll-horizontal">
                <ScrollHorizontal>
                    {buttons.map((btn, idx) => (
                        <MrkCtBut
                            key={idx}
                            isSelected={selectedCt.name === btn}
                            onClick={() =>
                                setSelectedCt({
                                    name: btn,
                                    id: idx,
                                })
                            }
                        >
                            {btn}
                        </MrkCtBut>
                    ))}
                </ScrollHorizontal>
            </MrkCt>
            <div>Content for {selectedCt.name}</div>

            <div>
                {data.map((shops, index) => (
                    <button key={index} onClick={() => goShop(shops.storeId)}>
                        <h2>{shops.storeName}</h2>
                        <p>{shops.storeDescription}</p>
                        <p>{selectedCt.name}</p>
                        <hr />
                    </button>
                ))}
            </div>
        </Container>
    );
}

export default ShowMarkets;
