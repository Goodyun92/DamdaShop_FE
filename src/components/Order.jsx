import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swipe from './Swipe';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import accountState from '../store/atoms';
import { buttonSwipedState } from '../store/swipeState';
import back from '../imgs/Vector2.png';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
const Order = (product) => {
    //파라미터product 객체 받기
    //product객체에 계좌도 있음

    const [account, setAccount] = useRecoilState(accountState);

    //상품 객체
    const [productInfo, setProductInfo] = useState({ ...product });

    //보낼 주문 객체
    const [order, setOrder] = useState({
        quantity: 1,
    });

    const navigate = useNavigate();
    const isButtonSwiped = useRecoilValue(buttonSwipedState);
    const [success, setSuccess] = useState(false);

    const handleIncrement = () => {
        setOrder({
            quantity: (prevQuantity) => prevQuantity + 1,
        });
    };

    const handleDecrement = () => {
        if (order.quantity > 1) {
            setOrder({
                quantity: (prevQuantity) => prevQuantity + 1,
            });
        }
    };

    const handleOrder = () => {
        console.log(order.quantity);
        const tmp = {
            orderAmount: order.quantity,
            prouductId: productInfo.prouductId,
            userId: account.userId,
        };
        console.log(tmp);
        axios
            .post('https://ssudamda.shop/orders/register', tmp)
            .then((response) => {
                setSuccess(true);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        if (isButtonSwiped) {
            console.log('Button in SwipeComponent was swiped to the end!');
            // 여기에서 원하는 다른 동작들을 수행할 수 있습니다.
            handleOrder();
        }
    }, [isButtonSwiped]);

    return (
        <Container>
            {success ? (
                <div>
                    <Nav>
                        <BackButton onClick={() => navigate('/mainHome')}>
                            <img src={back} />
                        </BackButton>
                    </Nav>
                    <div>주문이 완료되었어요!</div>
                    <div>입급 계좌를 확인해주세요</div>
                    <div>
                        <div>24시간 내에 입금하지 않으면 주문이 자동 취소됩니다.</div>
                        <div>입금을 완료하면 등록된 전화번호로 상품 수령 방법,</div>
                        <div>배송 등에 관해 판매자에게 연락을 받게 됩니다.</div>
                    </div>
                    <div>입금계좌정보</div>
                    <div>
                        <div>
                            <span>은행명</span>
                            <span>{productInfo.user.accountBank}</span>
                        </div>
                        <div>
                            <span>계좌번호</span>
                            <span>{productInfo.user.accountDigit}</span>
                        </div>
                        <div>
                            <span>예금주</span>
                            <span>{productInfo.user.userNickName}</span>
                        </div>
                        <div>
                            <span>입금액</span>
                            <span>{productInfo.price}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('/orderHistory')}>주문 상세 내역 보기</button>
                    <button onClick={() => navigate('/myStamp')}>go stamp page</button>
                </div>
            ) : (
                <div>
                    <div>{productInfo.productName}</div>
                    <div>{productInfo.price}</div>
                    <button onClick={handleDecrement}>-</button>
                    <span>{order.quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                    {/* <Swipe></Swipe> */}
                    <button onClick={handleOrder}></button>
                </div>
            )}
        </Container>
    );
};

export default Order;
