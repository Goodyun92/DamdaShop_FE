import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div`
    width: 100%;
`;

const BackButton = styled.button`
    background: white;
    border: none;
`;

const Nav = styled.div`
    margin: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
`;

const SpButton = styled.button`
    margin: 0px 21px 16px 21px;
    /* padding: 5px 9px 0px 9px; */
    /* border-radius: 20px; */
    white-space: nowrap;
    background-color: white;
    color: ${(props) => (props.isSelected ? '#609966' : '#909090')};
    cursor: pointer;
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    text-align: center;
    border: none;
    border-bottom: #609966 solid ${(props) => (props.isSelected ? '2.5px' : '0px')};
`;

const OrderHistory = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [tradeType, setTradeType] = useState(true);
    //true:구매내역  false:판매내역

    const [account, setAccount] = useRecoilState(accountState);

    //axios
    useEffect(() => {
        //구매내역,판매내역 각 api
        const apiUrl = tradeType
            ? `https://ssudamda.shop/orders/${account.userId}/purchase-history`
            : `https://ssudamda.shop/orders/${account.userId}/sale-history`;

        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                console.log(data);
            })
            .catch((error) => {
                setData([]);
            });
    }, [tradeType]); // state 값이 변경될 때마다 이 effect가 다시 실행됩니다.

    return (
        <Container>
            <div>
                <Nav>
                    <BackButton onClick={() => navigate('/myPage')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </BackButton>
                    <div>거래내역</div>
                    <div></div>
                </Nav>
                <SpButton isSelected={tradeType} onClick={() => setTradeType(true)}>
                    구매내역
                </SpButton>
                <SpButton isSelected={!tradeType} onClick={() => setTradeType(false)}>
                    판매내역
                </SpButton>

                {data.length > 0 && (
                    <div>
                        {data.map((pro, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    console.log(pro);
                                }}
                            >
                                <h2>{pro.productName}</h2>
                                <p>{pro.orderPrice}</p>
                                <p>{pro.orderDate}</p>
                                <hr />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default OrderHistory;
