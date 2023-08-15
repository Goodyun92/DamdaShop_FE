import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Order from '../../../components/Order';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
const Profile = styled.div``;
const ButtonNav = styled.div``;
const Info = styled.div``;
const Products = styled.div``;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: #00000080;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
`;

const ConsumShop = (shopId) => {
    //axios,,, shop 정보 받아오기
    //가게 소개 erd에 있나?

    const navigate = useNavigate();
    const [stage, setStage] = useState(1);
    //1:메인(홈,전체상품) 2:주문하기
    const [tab, setTab] = useState(true);
    //true:홈  false:전체상품

    const [order, setOrder] = useState(false);
    //true면 밀어서 주문 화면띄움

    const orderOpen = () => {
        setOrder(true);
    };

    const orderClose = () => {
        setOrder(false);
    };

    return (
        <Container>
            {stage === 1 && (
                <div>
                    <Nav>
                        <BackButton onClick={() => navigate('/mainHome')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                        <div>{/*shopName*/}</div>
                        <div></div>
                    </Nav>
                    <Profile>
                        <img></img>
                        <div>
                            <div>가게이름</div>
                            <div>시장</div>
                            <div>카테고리</div>
                        </div>
                    </Profile>
                    <ButtonNav>
                        <button onClick={() => setTab(true)}>홈</button>
                        <button onClick={() => setTab(false)}>전체 상품</button>
                    </ButtonNav>

                    {tab ? (
                        <div>
                            <Info>
                                <div>가게정보</div>
                                <div>가게소개api</div>
                                <div>시장</div>
                                <div>계좌번호</div>
                            </Info>
                            <Products>
                                <div>상품 가로 정렬</div>
                                <button>상품 더보기</button>
                            </Products>
                        </div>
                    ) : (
                        <div>
                            <div>판매 상품</div>
                            <div>
                                상품
                                <button onClick={() => setStage(stage + 1)}>주문, stage+1</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {stage === 2 && (
                <div>
                    <Nav>
                        <BackButton onClick={() => setStage(1)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                        <div></div>
                        <div></div>
                    </Nav>
                    <div>
                        <img />
                        <div>
                            <div>가게이름</div>
                            <div>상품이름</div>
                            <div>가격</div>
                            <div>로그인 후 주문하면</div>
                        </div>
                        <button onClick={orderOpen}>주문하기</button>
                    </div>
                </div>
            )}

            {order && (
                <ModalOverlay onClick={orderClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <Order /*파라미터로 상품*/ />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default ConsumShop;
