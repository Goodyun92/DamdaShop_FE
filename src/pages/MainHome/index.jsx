import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import GoSearch from './components/GoSearch';
import GoMypage from './components/GoMyPage';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import apple from '../../imgs/apple.png';
import carrot from '../../imgs/carrot.png';
import drink from '../../imgs/cold-drink.png';
import dish from '../../imgs/dish.png';
import fish from '../../imgs/fish.png';
import leaf from '../../imgs/leaf.png';
import pork from '../../imgs/pork.png';
import wheat from '../../imgs/wheat.png';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import ScrollHorizontal from 'react-scroll-horizontal';
import SelectLocComp from '../../components/SelectLoc';
import VoiceModule from './components/VoiceModule';
import axios from 'axios';
import Order from '../../components/Order';
import govoice from '../../imgs/govoice.png';
import category1 from '../../imgs/category1.png';
import category2 from '../../imgs/category2.png';
import category3 from '../../imgs/category3.png';
import category4 from '../../imgs/category4.png';
import category5 from '../../imgs/category5.png';
import category6 from '../../imgs/category6.png';
import category7 from '../../imgs/category7.png';
import category8 from '../../imgs/category8.png';
import shop1 from '../../imgs/shop1.png';
import shop2 from '../../imgs/shop2.png';
import shop3 from '../../imgs/shop3.png';
import shop4 from '../../imgs/shop4.png';
import shop5 from '../../imgs/shop5.png';
import shop6 from '../../imgs/shop6.png';
import shop7 from '../../imgs/shop7.png';
import shop8 from '../../imgs/shop8.png';
import logo from '../../imgs/logo.png';

const Container = styled.div`
    margin-top: 10px;
    width: 95%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-family: 'pretendard';
`;

const TopNav = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 15px 10px;
`;

const NavRight = styled.div`
    display: flex;
    justify-content: end;
`;

const Logo = styled.img`
    margin-left: 6px;
    width: 30px;
    height: 30px;
`;

const MyLocation = styled.div`
    background-color: #e8e8e8;
    padding: 5px 12px 5px 12px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    height: 30px;
    border-radius: 5px;
    border: 0.699999988079071px;
`;

const Loc = styled.div`
    display: flex;
`;

const LocIcon = styled.div`
    color: #609966;
`;

const LocName = styled.div`
    padding-left: 25px;
`;

const SelectLoc = styled.button`
    border: none;
    background-color: #e8e8e8;
    font-family: 'pretendard';
`;

const CategoryProducts = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 3px 10px 3px;
`;

const Categorys = styled.div`
    display: flex;
    justify-content: center;
`;

const Cbutton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px;
    width: 75px;
    height: 30px;
    font-family: 'pretendard';
    font-size: 11px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
`;

const Icon = styled.img`
    width: 20px;
    margin-bottom: 7px;
`;

const Mrk1 = styled.div`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    margin: 35px 0px 10px 10px;
`;
const Mrk1L = styled.span`
    color: #609966;
`;
const Mrk2 = styled.div`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    color: #909090;
    margin-left: 10px;
`;

const MrkCt = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const MrkCtBut = styled.button`
    height: 26px;
    margin: 10px;
    padding: 5px 9px;
    border-radius: 20px;
    white-space: nowrap;
    background-color: ${(props) => (props.isSelected ? '#416444' : '#FFFFFF')};
    color: ${(props) => (props.isSelected ? '#FFFFFF' : '#333333')};
    cursor: pointer;
    font-family: 'pretendard';
    font-size: 13px;
    /* font-weight: 600; */
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    border: 0.5px solid #e0e0e0;
`;

const MrkList = styled.div``;

const MoreMrkButton = styled.button`
    width: 100%;
    height: 40px;
    background-color: #efefef;
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    border: none;
    border-radius: 5px;
`;

const Popu1 = styled.div`
    margin: 50px 0px 10px 10px;
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
`;

const Popu2 = styled.span`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    margin: 0px 0px 20px 10px;
`;

const PopuG = styled.span`
    color: #609966;
`;

const PopProd = styled.div`
    display: flex;
    gap: 10px;
`;

const ProButton = styled.div`
    display: flex;
    flex-direction: column;
    width: 116px;
    height: 199px;
    align-items: center;
`;
const ProImg = styled.img`
    width: 116px;
    height: 142px;
    border-radius: 5px;
`;
const ProName = styled.div`
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: -0.30000001192092896px;
`;
const ProPrice = styled.div`
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: -0.30000001192092896px;
`;
const ProStr = styled.div`
    font-family: 'pretendard';
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: -0.30000001192092896px;
    color: #909090;
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
    width: 335px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
`;

const ShopButton = styled.button`
    width: 95%;
    display: flex;
    background-color: white;
    border: none;
    margin: 19px 17px;
`;
const ShopContents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Sc1 = styled.div`
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
`;
const Sc2 = styled.div`
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    color: #909090;
`;
const Sc3 = styled.div`
    width: 68px;
    height: 15px;
    padding: 3px 4px 3px 4px;
    border-radius: 3px;
    gap: 10px;
    font-family: 'pretendard';
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: center;
    background-color: #60996633;
`;
const ShopImg = styled.img`
    width: 77px;
    height: 77px;
    border-radius: 5px;
    margin-right: 16px;
`;
const VoiceImg = styled.img`
    border: none;
    outline: none;
    position: fixed;
    top: 80%;
    align-self: center;
`;

const MainHome = () => {
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedCt, setSelectedCt] = useState({
        name: '과일',
        id: 1,
    });
    const navigate = useNavigate();

    //받아올 카테고리별 가게들
    const [ctShops, setCtShops] = useState([]);

    //받아올 마감임박 상품들
    const [oldProduct, setOldProduct] = useState([]);

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

    const [selectMarket, setSelectMarket] = useState(false);

    //선택한 상품
    const [selected, setSelected] = useState({});
    //주문 모달
    const [showModal, setShowModal] = useState(false);

    //해당 카테고리 가게 목록 받아오기
    useEffect(() => {
        axios
            .get('https://ssudamda.shop/stores/by-category', {
                params: {
                    categoryId: selectedCt.id + 1,
                    marketId: account.marketId,
                },
            })
            .then((response) => {
                setCtShops([...response.data]);
            })
            .catch((error) => {});
    }, [selectedCt.id]);

    //마감 임박상품 받아오기
    useEffect(() => {
        console.log(typeof account.marketId);
        axios
            .get('https://ssudamda.shop/products/lowest-stock', {
                marketId: account.marketId,
            })
            .then((response) => {
                setOldProduct([...response.data]);
                console.log(oldProduct);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // const goProductCategory = (value) => {
    //     navigate(`/showproducts?productCategory=${value}`);
    // };

    const goMarketCategory = (value) => {
        navigate(`/showMarkets?marketCategory=${value}`);
    };

    const goShop = (value) => {
        console.log(value);
        navigate(`/shop`, {
            state: {
                storeId: value,
            },
        });
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const selectMarketOpen = () => {
        setSelectMarket(true);
    };

    const selectMarketClose = () => {
        setSelectMarket(false);
    };

    const [voiceMod, setVoiceMod] = useState(false);

    const voiceModOpen = () => {
        setVoiceMod(true);
    };

    const voiceModClose = () => {
        setVoiceMod(false);
    };

    console.log(account);

    return (
        <Container>
            <TopNav>
                <Logo src={logo} onClick={() => navigate('/mainHome')} />
                <NavRight>
                    <GoSearch />
                    <GoMypage />
                </NavRight>
            </TopNav>
            <MyLocation>
                <Loc>
                    <LocIcon>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </LocIcon>
                    <LocName>{account.marketLoc}</LocName>
                </Loc>
                <SelectLoc onClick={selectMarketOpen}>변경&gt;</SelectLoc>
            </MyLocation>
            <CategoryProducts>
                <Categorys>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 0,
                                    name: '과일',
                                },
                            })
                        }
                    >
                        <Icon src={apple} />
                        과일
                    </Cbutton>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 1,
                                    name: '채소',
                                },
                            })
                        }
                    >
                        <Icon src={carrot} />
                        채소
                    </Cbutton>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 2,
                                    name: '쌀·잡곡·견과',
                                },
                            })
                        }
                    >
                        <Icon src={wheat} />
                        쌀·잡곡·견과
                    </Cbutton>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 3,
                                    name: '수산물·건해산',
                                },
                            })
                        }
                    >
                        <Icon src={fish} />
                        수산물·건해산
                    </Cbutton>
                </Categorys>
                <Categorys>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 4,
                                    name: '정육·계란',
                                },
                            })
                        }
                    >
                        <Icon src={pork} />
                        정육·계란
                    </Cbutton>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 5,
                                    name: '요리·간편식',
                                },
                            })
                        }
                    >
                        <Icon src={dish} />
                        요리·간편식
                    </Cbutton>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 6,
                                    name: '음료',
                                },
                            })
                        }
                    >
                        <Icon src={drink} />
                        음료
                    </Cbutton>
                    <Cbutton
                        onClick={() =>
                            navigate('/showProducts', {
                                state: {
                                    id: 7,
                                    name: '친환경·유기농',
                                },
                            })
                        }
                    >
                        <Icon src={leaf} />
                        친환경·유기농
                    </Cbutton>
                </Categorys>
            </CategoryProducts>
            <Mrk1>
                <Mrk1L>{account.marketLoc}</Mrk1L>
                <span>의 다양한 가게를 볼 수 있어요</span>
            </Mrk1>
            <Mrk2>카테고리별로 나눠 보여드릴게요</Mrk2>
            <MrkCt>
                {/* <ScrollHorizontal> */}
                {buttons.map((btn, idx) => (
                    <MrkCtBut
                        key={idx}
                        isSelected={selectedCt.id === idx}
                        onClick={() =>
                            setSelectedCt({
                                id: idx,
                                name: btn,
                            })
                        }
                    >
                        {btn}
                    </MrkCtBut>
                ))}
                {/* </ScrollHorizontal> */}
            </MrkCt>

            <MrkList>
                {ctShops.map((shops, index) => (
                    <ShopButton key={index} onClick={() => goShop(shops.storeId)}>
                        {shops.category.catgoryId === 1 && <ShopImg src={shop1} />}
                        {shops.category.catgoryId === 2 && <ShopImg src={shop2} />}
                        {shops.category.catgoryId === 3 && <ShopImg src={shop3} />}
                        {shops.category.catgoryId === 4 && <ShopImg src={shop4} />}
                        {shops.category.catgoryId === 5 && <ShopImg src={shop5} />}
                        {shops.category.catgoryId === 6 && <ShopImg src={shop6} />}
                        {shops.category.catgoryId === 7 && <ShopImg src={shop7} />}
                        {shops.category.catgoryId === 8 && <ShopImg src={shop8} />}

                        <ShopContents>
                            <Sc1>{shops.storeName}</Sc1>
                            <Sc2>{shops.storeDescription}</Sc2>
                            <Sc3>{selectedCt.name}</Sc3>
                        </ShopContents>
                        <hr />
                    </ShopButton>
                ))}
            </MrkList>

            <MoreMrkButton
            // onClick={() =>
            //     navigate('/showMarkets', {
            //         state: {
            //             name: selectedCt.name,
            //             id: selectedCt.id,
            //         },
            //     })
            // }
            >
                가게 더보기
            </MoreMrkButton>

            <Popu1>사람들이 많이 찾는</Popu1>
            <Popu2>
                <PopuG>{account.marketLoc}의 인기상품</PopuG>
                <span>이에요</span>
            </Popu2>
            <PopProd id="scroll-horizontal">
                {/* <ScrollHorizontal> */}
                {oldProduct.map((product, index) => (
                    <ProButton
                        key={index}
                        onClick={() => {
                            setSelected({ ...product });
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

                        <ProName>{product.productName}</ProName>
                        <ProPrice>{product.price}원</ProPrice>

                        <ProStr>{product.store.storeName}</ProStr>
                    </ProButton>
                ))}
                {/* </ScrollHorizontal> */}
            </PopProd>

            <VoiceImg onClick={voiceModOpen} src={govoice} />

            {selectMarket && (
                <ModalOverlay onClick={selectMarketClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <SelectLocComp func={selectMarketClose} />
                    </ModalContent>
                </ModalOverlay>
            )}
            {voiceMod && (
                <ModalOverlay onClick={voiceModClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <VoiceModule func={voiceModClose} />
                    </ModalContent>
                </ModalOverlay>
            )}
            {showModal && (
                <ModalOverlay onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <Order product={selected} /*product 객체 전달*/ />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default MainHome;
