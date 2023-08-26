import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ScrollHorizontal from 'react-scroll-horizontal';
import vector from '../../imgs/Vector.png';
import Order from '../../components/Order';
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
    width: 95%;
    margin-top: 18px;
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
    margin-top: 15px;
    height: 2.5em;
    border-bottom: 0.5px solid #d0d0d0;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
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

const Purchase = styled.button`
    background-color: #609966cc;
    border-radius: 20px;
    width: 39px;
    height: 39px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    margin-left: 20px;
`;
const ProButton = styled.button`
    flex: 1 1 calc(50% - 10px);
    flex-grow: 0;
    border: none;
    margin-bottom: 20px;
    background-color: white;
`;
const ProName = styled.div`
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: -0.30000001192092896px;
    text-align: left;
    margin-top: 2px;
    margin-left: 2px;
`;
const ProPrice = styled.div`
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: -0.30000001192092896px;
    text-align: left;
    margin-top: 2px;
    margin-left: 2px;
`;
const ProStr = styled.div`
    font-family: 'pretendard';
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: -0.30000001192092896px;
    color: #909090;
    text-align: left;
    margin-left: 2px;
    margin-top: 2px;
`;
const ShopImg = styled.img`
    width: 150px;
    height: 198px;
    border-radius: 5px;
`;

function ShowProducts() {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);

    //상품 받아옴
    const [data, setData] = useState([]);

    //선택한 상품
    const [selected, setSelected] = useState();

    //파라미터로 전달해준 값 취득
    const location = useLocation();

    const [selectedCt, setSelectedCt] = useState({
        id: location.state.id,
        name: location.state.name,
    });

    console.log(selectedCt);

    useEffect(() => {
        axios
            .get('https://ssudamda.shop/products/by-category', {
                params: {
                    categoryId: selectedCt.id + 1,
                    marketId: account.marketId,
                },
            })
            .then((response) => {
                setData(...response.data);
            })
            .catch((error) => {});
    }, [selectedCt.id]);

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
    const [isOrder, setIsOrder] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            {/* {isOrder ? (
                <div>
                    <Nav>
                        <BackButton onClick={() => setIsOrder(false)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                    </Nav>
                    <div>
                        상품정보 출력
                        <div>{selected.storeName}</div>
                        <div>{selected.productName}</div>
                        <div>{selected.price}</div>
                    </div>
                    <button
                        onClick={() => {
                            setIsOrder(false);
                            handleOpenModal();
                        }}
                    >
                        주문하기
                    </button>
                </div>
            ) : ( */}
            <div>
                <Nav>
                    <BackButton onClick={() => navigate('/mainHome')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </BackButton>
                    <div>{selectedCt.name}</div>
                    <div></div>
                </Nav>
                <MrkCt id="scroll-horizontal">
                    {/* <ScrollHorizontal> */}
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
                    {/* </ScrollHorizontal> */}
                </MrkCt>

                <Products>
                    {data.map((product, index) => (
                        <ProButton
                            key={index}
                            onClick={() => {
                                setSelected({ ...product });
                                // setIsOrder(true);
                                handleOpenModal();
                            }}
                        >
                            {product.category.catgoryId === 1 && <ShopImg src={category1} />}
                            {product.category.catgoryId === 2 && <ShopImg src={category2} />}
                            {product.category.catgoryId === 3 && <ShopImg src={category3} />}
                            {product.category.catgoryId === 4 && <ShopImg src={category4} />}
                            {product.category.catgoryId === 5 && <ShopImg src={category5} />}
                            {product.category.catgoryId === 6 && <ShopImg src={category6} />}
                            {product.category.catgoryId === 7 && <ShopImg src={category7} />}
                            {product.category.catgoryId === 8 && <ShopImg src={category8} />}

                            <ProStr>{product.store.storeName}</ProStr>
                            <ProName>{product.productName}</ProName>
                            <ProPrice>{product.price}원</ProPrice>
                        </ProButton>
                    ))}
                </Products>

                {/* <Purchase onClick={() => setIsOrder(true)}>
                        <img src={vector} />
                    </Purchase> */}
                {showModal && (
                    <ModalOverlay onClick={handleCloseModal}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <Order product={selected} /*product 객체 전달*/ />
                        </ModalContent>
                    </ModalOverlay>
                )}
            </div>
            {/* )} */}
        </Container>
    );
}

export default ShowProducts;
