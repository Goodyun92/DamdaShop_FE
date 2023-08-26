import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import category1 from '../../imgs/category1.png';
import category2 from '../../imgs/category2.png';
import category3 from '../../imgs/category3.png';
import category4 from '../../imgs/category4.png';
import category5 from '../../imgs/category5.png';
import category6 from '../../imgs/category6.png';
import category7 from '../../imgs/category7.png';
import category8 from '../../imgs/category8.png';

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

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`;
const ProImg = styled.div`
    width: 77px;
    height: 77px;
    border-radius: 5px;
    margin-right: 16px;
`;
const ProName = styled.div`
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0em;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
`;
const ProButton = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 25px;
`;
const ProPrice = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
`;
const ProDate = styled.div`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    color: #909090;
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
                    <Wrap>
                        {data.map((pro, index) => (
                            <ProButton
                                key={index}
                                onClick={() => {
                                    console.log(pro);
                                }}
                            >
                                {/* <ProImg src={category1}></ProImg> */}
                                {pro.category.catgoryId === 1 && <ProImg src={category1} />}
                                {pro.category.catgoryId === 2 && <ProImg src={category2} />}
                                {pro.category.catgoryId === 3 && <ProImg src={category3} />}
                                {pro.category.catgoryId === 4 && <ProImg src={category4} />}
                                {pro.category.catgoryId === 5 && <ProImg src={category5} />}
                                {pro.category.catgoryId === 6 && <ProImg src={category6} />}
                                {pro.category.catgoryId === 7 && <ProImg src={category7} />}
                                {pro.category.catgoryId === 8 && <ProImg src={category8} />}

                                <Content>
                                    <ProName>{pro.productName}</ProName>
                                    <ProPrice>{pro.orderPrice}</ProPrice>
                                    <ProDate>{pro.orderDate}</ProDate>
                                </Content>
                            </ProButton>
                        ))}
                    </Wrap>
                )}
            </div>
        </Container>
    );
};

export default OrderHistory;
