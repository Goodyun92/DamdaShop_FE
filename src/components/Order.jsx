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
    margin-left: 10px;
    width: 100%;
`;
const Nav = styled.div`
    display: flex;
    justify-content: end;
    margin-right: 10px;
`;
const Wrap = styled.div`
    border: 1px solid;
    padding: 10px;
    border-radius: 3px;
    margin-right: 14px;
    margin-top: 10px;
`;
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
`;
const BackButton = styled.button`
    background-color: white;
    border: none;
`;
const ProBox = styled.div`
    margin-left: 10px;
    display: flex;
`;
const ShopImg = styled.img``;
const ProTab = styled.div`
    display: flex;
    flex-direction: column;
`;
const ProName = styled.div`
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const ProStr = styled.div`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: #909090;
`;
const ProPrice = styled.div`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const Mid = styled.div`
    margin-top: 10px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    width: 347px;
    height: 68.01px;

    gap: 20px;
`;
const Mid1 = styled.div`
    display: flex;
    flex-direction: column;
`;
const QunBox = styled.div`
    width: 100%;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    width: 98px;
    height: 31px;
`;
const MButton = styled.div`
    width: 100%;
`;
const PButton = styled.div`
    width: 100%;
`;
const OrderButton = styled.button`
    width: 95%;
    border: none;
    height: 30px;
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    background-color: #60996633;
    color: #416444;
`;

const T1 = styled.div`
    font-family: 'pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: 0em;
    margin-bottom: 10px;
`;
const K1 = styled.div`
    margin-top: 15px;
    margin-bottom: 35px;
`;
const K2 = styled.div`
    margin-bottom: 35px;
`;
const P1 = styled.div`
    color: #707070;
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
`;
const P2 = styled.div`
    margin-top: 10px;
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: -0.30000001192092896px;
`;
const Line = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-left: 3px;
    margin-right: 3px;
`;
const Left = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: #707070;
`;
const Right = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const TLine = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-left: 5px;
    margin-right: 5px;
`;
const TLeft = styled.div`
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: #707070;
`;
const TRight = styled.div`
    font-family: 'pretendard';
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: #609966;
`;

const Button1 = styled.button`
    width: Fixed (353px);
    height: 50px;
    top: 705px;
    left: 21px;
    padding: 14px 40px 14px 40px;
    border-radius: 5px;
    gap: 10px;
    background-color: #609966;
    color: white;
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    border: none;
    margin-top: 300px;
    margin-right: 14px;
`;
const Button2 = styled.button`
    margin-right: 14px;
    margin-top: 10px;
    background-color: #6099661a;
    color: #609966;
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    width: Fixed (353px);
    height: 50px;
    border: none;
`;

const Order = (props) => {
    //파라미터product 객체 받기 props.product
    //product객체에 계좌도 있음

    // console.log(props.product);

    const [account, setAccount] = useRecoilState(accountState);

    //상품 객체
    const [productInfo, setProductInfo] = useState({ ...props.product });

    console.log(productInfo);

    //보낼 주문 객체
    const [order, setOrder] = useState(1);

    const navigate = useNavigate();
    const isButtonSwiped = useRecoilValue(buttonSwipedState);
    const [success, setSuccess] = useState(false);

    const handleIncrement = () => {
        setOrder(order + 1);
    };

    const handleDecrement = () => {
        if (order.quantity > 1) {
            setOrder(order - 1);
        }
    };

    const handleOrder = () => {
        console.log(props.product);
        console.log(productInfo);
        console.log(order);
        const tmp = {
            orderAmount: order,
            productId: productInfo.productId,
            userId: account.userId,
        };
        console.log(tmp);
        axios
            .post('https://ssudamda.shop/orders/register', {
                orderAmount: order,
                productId: productInfo.productId,
                userId: account.userId,
            })
            .then((response) => {
                console.log(response);
                setSuccess(true);
            })
            .catch((error) => {
                console.error(error);
            });
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
                    <K1>
                        <T1>주문이 완료되었어요!</T1>
                        <T1>입급 계좌를 확인해주세요</T1>
                    </K1>
                    <K2>
                        <P1>24시간 내에 입금하지 않으면 주문이 자동 취소됩니다.</P1>
                        <P1>입금을 완료하면 등록된 전화번호로 상품 수령 방법,</P1>
                        <P1>배송 등에 관해 판매자에게 연락을 받게 됩니다.</P1>
                    </K2>
                    <P2>입금계좌정보</P2>
                    <Wrap>
                        <Line>
                            <Left>은행명</Left>
                            <Right>{productInfo.store.user.accountBank}</Right>
                        </Line>
                        <Line>
                            <Left>계좌번호</Left>
                            <Right>{productInfo.store.user.accountDigit}</Right>
                        </Line>
                        <Line>
                            <Left>예금주</Left>
                            <Right>{productInfo.store.user.userNickName}</Right>
                        </Line>
                        <TLine>
                            <TLeft>입금액</TLeft>
                            <TRight>{productInfo.price}</TRight>
                        </TLine>
                    </Wrap>
                    <Buttons>
                        <Button1 onClick={() => navigate('/orderHistory')}>주문 상세 내역 보기</Button1>
                        <Button2 onClick={() => navigate('/myStamp')}>스탬프 보러가기</Button2>
                    </Buttons>
                </div>
            ) : (
                <div>
                    <ProBox>
                        <ShopImg
                            src=""
                            // alt="상품 이미지`category${product.category.catgoryId}`"
                        />
                        <ProTab>
                            <ProName>{productInfo.productName}</ProName>

                            <ProStr>{productInfo.store.storeName}</ProStr>
                        </ProTab>
                    </ProBox>
                    <Mid>
                        <Mid1>
                            <ProName>{productInfo.productName}</ProName>
                            <ProPrice>{productInfo.price}원</ProPrice>
                        </Mid1>

                        <QunBox>
                            <MButton onClick={handleDecrement}>-</MButton>
                            <span>{order}</span>
                            <PButton onClick={handleIncrement}>+</PButton>
                        </QunBox>
                    </Mid>
                    <OrderButton onClick={handleOrder}>주문하기</OrderButton>
                </div>
            )}
        </Container>
    );
};

export default Order;
