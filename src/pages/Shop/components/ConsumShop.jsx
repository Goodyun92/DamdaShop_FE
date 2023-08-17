import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Order from '../../../components/Order';
import axios from 'axios';

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
    //선택된 상품
    const [selected, setSelected] = useState({});

    //받아온 shop정보들. 이거 활용해서 아래 정보보여줌
    const [shopInfo, setShopInfo] = useState({});

    //받아온 판매 목록객체들 저장 배열
    const [shopProducts, setShopProducts] = useState([]);

    useEffect(() => {
        //shopid로 store 정보 받아오기
        axios
            .get(`https://ssudamda.shop/stores/${shopId}`)
            .then((res) => {
                setShopInfo({ ...res.data });
                getProducts();
                console.log(shopInfo);
            })
            .catch();
    }, []);

    //가게의 상품들 받아오기
    const getProducts = () => {
        axios
            .get(`https://ssudamda.shop/products/by-store`, {
                params: {
                    storeId: shopId,
                },
            })
            .then((res) => {
                setShopProducts(...res.data);
                console.log(shopProducts);
            })
            .catch();
    };

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

    console.log(shopId);
    console.log(shopInfo);
    console.log(shopProducts);

    return (
        <Container>
            {stage === 1 && (
                <div>
                    <Nav>
                        <BackButton onClick={() => navigate('/mainHome')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                        <div>{shopInfo.storeName}</div>
                        <div></div>
                    </Nav>
                    <Profile>
                        <img></img>
                        <div>
                            <div>{shopInfo.storeName}</div>
                            <div>{shopInfo.user.market.marketName}</div>
                            <div>{shopInfo.category.categoryName}</div>
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
                                <div>{shopInfo.storeDescription}</div>
                                <div>{shopInfo.user.market.marketName}</div>
                                <div>{shopInfo.user.accountBank}</div>
                                <div>{shopInfo.user.accountDigit}</div>
                                <div>{shopInfo.user.accountName}</div>
                            </Info>
                            <Products>
                                {shopProducts.map((product, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelected({ ...product });
                                            setStage(2);
                                        }}
                                    >
                                        <h2>{product.productName}</h2>
                                        <p>{product.price}</p>
                                        <p>{product.store.user.market.marketName}</p>
                                        <hr />
                                    </button>
                                ))}
                                <button onClick={() => setTab(false)}>상품 더보기</button>
                            </Products>
                        </div>
                    ) : (
                        <div>
                            <div>판매 상품</div>
                            {shopProducts.map((product, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelected({ ...product });
                                        setStage(2);
                                    }}
                                >
                                    <h2>{product.productName}</h2>
                                    <p>{product.price}</p>
                                    <p>{product.store.user.market.marketName}</p>
                                    <hr />
                                </button>
                            ))}
                            <div>
                                예시상품
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
                            <div>{shopInfo.storeName}</div>
                            <div>{selected.productName}</div>
                            <div>{selected.price}</div>
                            <div>로그인 후 주문하면 토큰드림</div>
                        </div>
                        <button onClick={orderOpen}>주문하기</button>
                    </div>
                </div>
            )}

            {order && (
                <ModalOverlay onClick={orderClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <Order product={selected} /*파라미터로 상품 객체전달*/ />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default ConsumShop;
