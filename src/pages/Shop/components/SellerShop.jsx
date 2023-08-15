import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import dots from '../../../imgs/dots.png';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
const Profile = styled.div``;
const ButtonNav = styled.div``;
const Info = styled.div``;
const Products = styled.div``;
const ModifyButton = styled.button``;

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

const SellerShop = (shopId) => {
    //axios,,, shop 정보 받아오기

    const navigate = useNavigate();
    const [stage, setStage] = useState(1);
    //1:메인(홈,전체상품) 2:주문하기
    const [tab, setTab] = useState(true);
    //true:홈  false:전체상품

    const [modify, setModify] = useState(false);
    //true면 수정화면 띄움

    //상품 수정할때 상품 id넘겨야됨 state2갈때 선택된 상품 넘겨

    const modifyOpen = () => {
        setModify(true);
    };

    const modifyClose = () => {
        setModify(false);
    };

    const postProduct = () => {
        navigate('/postProduct', {
            state: {
                shopId: '',
            },
        });
    };

    const editProduct = () => {
        navigate('/editProduct', {
            state: {
                shopId: '',
                productId: '',
            },
        });
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
                                <button>가게 정보 수정하기</button>
                            </Info>
                            <Products>
                                <div>판매 상품</div>
                                <div>상품 ... </div>
                                <button onClick={postProduct}>판매 상품 등록하기</button>
                            </Products>
                        </div>
                    ) : (
                        <div>
                            <div>판매 상품</div>
                            <div>
                                상품
                                <button onClick={() => setStage(stage + 1)}>주문, stage+1</button>
                            </div>
                            <button onClick={postProduct}>판매 상품 등록하기</button>
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
                        <ModifyButton onClick={modifyOpen}>
                            <img src={dots} />
                        </ModifyButton>
                    </Nav>
                    <div>
                        <img />
                        <div>
                            <div>가게이름</div>
                            <div>상품이름</div>
                            <div>가격</div>
                            <div>로그인 후 주문하면</div>
                        </div>
                        <button>주문하기</button>
                    </div>
                </div>
            )}

            {modify && (
                <ModalOverlay onClick={modifyClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <div>
                            <button onClick={editProduct}>수정</button>
                            <button>삭제</button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default SellerShop;
