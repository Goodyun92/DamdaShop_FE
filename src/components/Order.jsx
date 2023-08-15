import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swipe from './Swipe';
import { useRecoilValue } from 'recoil';
import { buttonSwipedState } from '../store/swipeState';
import back from '../imgs/Vector2.png';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
const Order = () => {
    //파라미터product 객체 받기
    //product객체의 가게id로 계좌 get

    const navigate = useNavigate();
    const isButtonSwiped = useRecoilValue(buttonSwipedState);
    const [quantity, setQuantity] = useState(1);
    const [success, setSuccess] = useState(false);
    const [orderRes, setOrderRes] = useState([]);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleOrder = async () => {
        try {
            const response = await axios.post('https://your-api-endpoint.com/order', { quantity });
            console.log('주문 성공:', response.data);
            alert('주문성공');
            setSuccess(true);
            //order 결과 테이블 받기
            setOrderRes(response.data);
        } catch (error) {
            console.error('주문 에러:', error);
        }
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
                    <div>24시간내에</div>
                    <div>입금계좌정보</div>
                    <div>
                        <div>
                            <span>은행명</span>
                            <span>은행</span>
                        </div>
                        <div>
                            <span>계좌번호</span>
                            <span>1234</span>
                        </div>
                        <div>
                            <span>예금주</span>
                            <span>김숭실</span>
                        </div>
                        <div>
                            <span>입금액</span>
                            <span>10000원</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('/orderHistory')}>주문 상세 내역 보기</button>
                    <button onClick={() => navigate('/myStamp')}>go stamp page</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleDecrement}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                    <Swipe></Swipe>
                </div>
            )}
        </Container>
    );
};

export default Order;
