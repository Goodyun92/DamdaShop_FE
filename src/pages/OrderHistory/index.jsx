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
    // const [selected, setSelected] = useState({});
    // const [stage, setStage] = useState(true);

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
                setData([...response.data]);
            })
            .catch((error) => {});
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

                <div>
                    {data.map((order, index) => (
                        <button
                            key={index}
                            // onClick={() => {
                            //     setSelected({ ...order });
                            //     setStage(false);
                            // }}
                        >
                            <h2>{order.productName}</h2>
                            <p>{order.orderPrice}</p>
                            <p>{order.orderDate}</p>
                            <hr />
                        </button>
                    ))}
                </div>
            </div>

            {/* {stage ? (
                <div>
                    <Nav>
                        <button onClick={() => navigate('/myPage')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <div>거래내역</div>
                        <div></div>
                    </Nav>
                    <ButtonNav>
                        <button onClick={() => setTradeType(true)}>구매내역</button>
                        <button onClick={() => setTradeType(false)}>판매내역</button>
                    </ButtonNav>

                    <div>
                        <button onClick={() => setStage(false)}>예시상품1</button>
                        {data.map((item) => (
                            <div key={item.id}>
                                {data.map((order, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelected({ ...order });
                                            setStage(false);
                                        }}
                                    >
                                        <h2>{order.productName}</h2>
                                        <p>{order.orderPrice}</p>
                                        <p>{order.orderDate}</p>
                                        <hr />
                                    </button>
                                ))}
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <Nav>
                        <button onClick={() => setStage(true)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        {tradeType ? <div>구매 내역 상세보기</div> : <div>판매 내역 상세보기</div>}
                        <div></div>
                    </Nav>
                    <div>
                        {tradeType ? (
                            <div>아래 계좌로 입금해주세요.</div>
                        ) : (
                            <div>주문자가 입금을 완료했을 경우,상품 수령에 관한 연락을 주세요.</div>
                        )}
                    </div>
                    <div>입금 계좌 정보</div>
                    <div>
                            <div>은행명</div>
                            <div>은행명</div>
                    </div>
                    <div>
                            <div>계좌번호</div>
                            <div>은행명</div>
                    </div>
                    <div>
                            <div>예금주</div>
                            <div>은행명</div>
                    </div>
                    <div>
                            <div>입금액</div>
                            <div>은행명</div>
                    </div>
                    <div>주문자 정보</div>
                </div>
            )} */}
        </Container>
    );
};

export default OrderHistory;
