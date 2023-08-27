import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ScrollHorizontal from 'react-scroll-horizontal';
import none from '../../imgs/none.png';
import SelectLocComp from '../../components/SelectLoc';
import noneuser from '../../imgs/noneuser.png';
import hana from '../../imgs/hana.png';
import ibk from '../../imgs/ibk.png';
import k from '../../imgs/k.png';
import kakao from '../../imgs/kakao.png';
import kb from '../../imgs/kb.png';
import nh from '../../imgs/nh.png';
import pst from '../../imgs/pst.png';
import sae from '../../imgs/sae.png';
import sh from '../../imgs/sh.png';
import sin from '../../imgs/sin.png';
import toss from '../../imgs/toss.png';
import woori from '../../imgs/woori.png';
import stamp1 from '../../imgs/stamp1.png';
import stamp2 from '../../imgs/stamp2.png';
import stamp3 from '../../imgs/stamp3.png';
import stamp4 from '../../imgs/stamp4.png';
import stamp5 from '../../imgs/stamp5.png';
import stamp6 from '../../imgs/stamp6.png';
import stamp7 from '../../imgs/stamp7.png';
import stamp8 from '../../imgs/stamp8.png';
import stamp9 from '../../imgs/stamp9.png';
import stamp10 from '../../imgs/stamp10.png';
import stamp11 from '../../imgs/stamp11.png';
import stamp12 from '../../imgs/stamp12.png';
import stamp13 from '../../imgs/stamp13.png';
import stamp14 from '../../imgs/stamp14.png';
import stamp15 from '../../imgs/stamp15.png';
import stamp16 from '../../imgs/stamp16.png';
import stamp17 from '../../imgs/stamp17.png';
import stamp18 from '../../imgs/stamp18.png';
import stamp19 from '../../imgs/stamp19.png';
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
    font-family: 'pretendard';
    margin-top: 10px;
    /* background-color: beige; */
`;
const Nav = styled.div`
    margin-left: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const BackButton = styled.button`
    background-color: white;
    border: none;
    font-size: 24px;
`;
const MyName = styled.div`
    font-family: 'pretendard';
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const Nav2 = styled.div`
    margin: 0px 19px 33px 21px;
    display: flex;
    justify-content: space-between;
`;
const StampContents = styled.div`
    margin: 0px 21px;
`;
const Nav3 = styled.div`
    display: flex;
    flex-direction: column;
`;
const StampNav = styled.div`
    display: flex;
    justify-content: space-between;
`;
const MyStamp = styled.div`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const StampButton = styled.button`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: #707070;
    border: none;
    background-color: white;
`;
const GoMyShop = styled.div`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: 0em;
    margin: 40px 0px 11px 21px;
`;

const MyShopBox = styled.div`
    margin: 0px 19px;
    display: flex;
    flex-direction: column;
    border: 0.5px;
    border-style: groove;
    padding: 18px;
`;
const MyShopTop = styled.div`
    margin: 18px 20px 14px 20px;
    display: flex;
    justify-content: space-between;
`;
const ShopImg = styled.div`
    border-radius: 50%;
    border: none;
    background-color: #d0d0d0;
`;
const ShopDetail = styled.div`
    display: flex;
    flex-direction: column;
`;
const ShopName = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
`;
const MarketName = styled.div`
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
    color: #909090;
`;
const GoMyShopButton = styled.div`
    background-color: white;
`;

const ShopButton1 = styled.button`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    background-color: rgba(96, 153, 102, 0.1);
    color: #609966;
    border-radius: 3px;
    border: none;
    padding: 8px;
`;
const ShopButton2 = styled.button`
    background-color: #efefef;
    color: black;
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    border-radius: 3px;
    border: none;
    padding: 8px;
`;

const NoShopContent = styled.div`
    display: flex;
    align-items: center;
`;

const NoShopImg = styled.div`
    border-radius: 50%;
    border: none;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin-right: 9px;
`;

const Nsi = styled.img`
    width: 50%;
    height: 50%;
`;
const NoShopTitle = styled.div`
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
`;
const NoShopButton = styled.button`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
    background-color: rgba(96, 153, 102, 0.1);
    color: #609966;
    border-radius: 3px;
    border: none;
    padding: 8px;
    margin-top: 11px;
`;

const HistoryTitle = styled.div`
    margin: 40px 16px 21px 16px;
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
const MoreHistoryButton = styled.button`
    width: 90%;
    margin: 18px 20px;
    border: none;
    background-color: #efefef;
    border-radius: 3px;
    padding: 11px;
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: black;
`;

const ProfileContainer = styled.div`
    padding: 15px;
`;

const ProfileEditbutton = styled.button`
    border-radius: 3px;
    gap: 10px;

    background-color: #efefef;
    border: none;
    padding: 9px 10px;
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;
const Need = styled.div`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    width: Fixed (334px);
    height: Fixed (44px);
    top: 205px;
    left: 21px;
    padding: 8px 16px 8px 16px;
    border-radius: 5px;
    border: 0.5px;
    gap: 10px;
    color: #e0e0e0;
    border: 0.5px solid #e0e0e0;
    margin-bottom: 10px;
`;

const Input = styled.input`
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    outline: none;
    border: none;
`;

const ButtonChange = styled.button`
    margin-top: 5px;
    width: Fixed (333px);
    height: Fixed (41px);
    top: 322px;
    left: 21px;
    padding: 14px 40px 14px 40px;
    border-radius: 5px;
    border: none;
    gap: 10px;

    background: #609966;
    color: white;
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 550;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
`;

const Back = styled.button`
    background-color: white;
    border: none;
`;
const P1 = styled.div``;
const P2 = styled.div``;
const AccountBox = styled.div``;

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

const Wrap5 = styled.div`
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

const Wrap4 = styled.div`
    /* margin-left: 15px;
    margin-right: 15px; */
    margin-top: 30px;
    width: 100%;
    height: 130px;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Stamp = styled.button`
    height: 100%;
    width: auto;
    margin: 0px 20px 0px 20px;
    border: none;
    background-color: white;
`;

const StampImg = styled.img`
    height: 120px;
    width: auto;
`;

const BButtons = styled.div`
    margin-left: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;
const BankButton = styled.button`
    width: 105px;
    height: 72px;
    border-radius: 12px;
    background-color: #f8f8f8;
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
`;
const BankImg = styled.img`
    margin-bottom: 5px;
    background-color: #f8f8f8;
`;

const Mypage = () => {
    const navigate = useNavigate();

    //내 가게 객체
    const [myShop, setMyShop] = useState({});

    //내 가게 있냐?
    const [haveMyShop, setHaveMyShop] = useState(false);

    //구매내역,판매내역 각각 받아올 api

    const [stage, setStage] = useState(1);
    //1:홈화면 2:프로필수정 3:가게수정

    //구매내역 받아올
    const [data, setData] = useState([]);

    //스탬프 받아올 배열
    const [stamps, setStamps] = useState([]);

    const [tradeType, setTradeType] = useState(true);
    //true: 구매내역 false:판매내역

    const [account, setAccount] = useRecoilState(accountState);

    const [selectedCt, setSelectedCt] = useState('');
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
    const [level, setLevel] = useState(1);
    const [mrkSelect, setMrkSelect] = useState(false);
    const [bankSelect, setBankSelect] = useState(false);

    //가게 정보수정할때 쓸거
    const [newShop, setNewShop] = useState({});
    useEffect(() => {
        setNewShop({ ...myShop });
    }, [myShop]);

    //프로필 수정 입력받을때 쓸거
    const [profileData, setProfileData] = useState({ ...account });
    useEffect(() => {
        setProfileData({ ...account });
    }, [account]);

    const profileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    //프로필 수정
    const profileSubmit = () => {
        console.log(profileData);
        const tmp = {
            marketId: profileData.marketId,
            password: profileData.marketId,
            phoneNumber: profileData.phoneNumber,
            userName: profileData.id,
            userNickName: profileData.name,
        };
        console.log(tmp);
        axios
            .patch(`https://ssudamda.shop/users/update/${profileData.userId}`, tmp)
            .then(() => {
                // Recoil 상태 업데이트
                console.log('성공');
                setAccount({
                    ...account,
                    marketId: profileData.marketId,
                    password: profileData.password,
                    phoneNumber: profileData.phoneNumber,
                    id: profileData.id,
                    name: profileData.name,
                });
                console.log(account);
                setStage(1);
            })
            .catch();
    };

    const shopChange = (event) => {
        setNewShop({ ...newShop, [event.target.name]: event.target.value });
    };

    //가게 수정

    const shopSubmit = () => {
        axios
            .patch(`https://ssudamda.shop/stores/update/${newShop.storeId}`, {
                accountBank: newShop.accountBank,
                accountDigit: newShop.accountDigit,
                accountName: account.name,
                categoryId: newShop.categoryId + 1,
                marketId: account.marketId,
                storeDescription: newShop.storeDescription,
                storeName: newShop.storeName,
                userId: account.userId,
            })
            .then((response) => {
                setAccount({ ...account, accountNum: newShop.accountDigit });
                setStage(1);
                setLevel(1);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const completeBank = (event) => {
        setNewShop({ ...newShop, accountBank: event.target.value });
        setBankSelect(false);
    };

    const goBack = () => {
        stage === 1 ? navigate('/mainHome') : setStage(stage - 1);
    };

    //내 가게 정보받아오기
    useEffect(() => {
        axios
            .get(`https://ssudamda.shop/users/users/${account.userId}/store`)
            .then((response) => {
                setMyShop({ ...response.data });
                setHaveMyShop(true);
            })
            .catch((err) => {
                console.error(err);
                setHaveMyShop(false);
            });
    }, []);

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

    //스탬프 가져오기
    useEffect(() => {
        axios
            .get(`https://ssudamda.shop/users/${account.userId}/stamps`)
            .then((response) => {
                setStamps(...response.data);
            })
            .catch((error) => {});
    }, []);

    return (
        <Container>
            {mrkSelect && (
                <ModalOverlay onClick={() => setMrkSelect(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <SelectLocComp
                            func={() => {
                                setMrkSelect(false);
                                setNewShop({
                                    marketId: account.marketId,
                                });
                            }}
                        />
                    </ModalContent>
                </ModalOverlay>
            )}
            {bankSelect && (
                <ModalOverlay onClick={() => setBankSelect(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <BButtons>
                            <BankButton onClick={completeBank} value="NH농협">
                                <BankImg src={nh} />
                                NH농협
                            </BankButton>
                            <BankButton onClick={completeBank} value="카카오뱅크">
                                <BankImg src={kakao} />
                                카카오뱅크
                            </BankButton>
                            <BankButton onClick={completeBank} value="KB국민">
                                <BankImg src={kb} />
                                KB국민
                            </BankButton>
                            <BankButton onClick={completeBank} value="신한">
                                <BankImg src={sin} />
                                신한
                            </BankButton>
                            <BankButton onClick={completeBank} value="우리">
                                <BankImg src={woori} />
                                우리
                            </BankButton>
                            <BankButton onClick={completeBank} value="토스뱅크">
                                <BankImg src={toss} />
                                토스뱅크
                            </BankButton>
                            <BankButton onClick={completeBank} value="IBK기업">
                                <BankImg src={ibk} />
                                IBK기업
                            </BankButton>
                            <BankButton onClick={completeBank} value="하나">
                                <BankImg src={hana} />
                                하나
                            </BankButton>
                            <BankButton onClick={completeBank} value="새마을">
                                <BankImg src={sae} />
                                새마을
                            </BankButton>
                            <BankButton onClick={completeBank} value="케이뱅크">
                                <BankImg src={k} />
                                케이뱅크
                            </BankButton>
                            <BankButton onClick={completeBank} value="우체국">
                                <BankImg src={pst} />
                                우체국
                            </BankButton>
                            <BankButton onClick={completeBank} value="수협">
                                <BankImg src={sh} />
                                수협
                            </BankButton>
                        </BButtons>
                    </ModalContent>
                </ModalOverlay>
            )}
            {stage === 1 && (
                <div>
                    <Nav>
                        <BackButton onClick={goBack}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                    </Nav>
                    <Nav2>
                        <MyName>사용자{account.name} 님</MyName>
                        <ProfileEditbutton onClick={() => setStage(2)}>프로필 수정하기</ProfileEditbutton>
                    </Nav2>
                    <StampContents>
                        <Nav3>
                            <StampNav>
                                <MyStamp>내 토큰 스탬프</MyStamp>
                                <StampButton onClick={() => navigate('/myStamp')}>더보기&gt;</StampButton>
                            </StampNav>
                        </Nav3>
                        <Wrap4 id="scroll-horizontal">
                            {/* <ScrollHorizontal> */}
                            {stamps.map((item) => (
                                <Stamp key={item}>
                                    {/* Render your data here */}
                                    {/* <p>{item}</p> */}
                                    {/* <StampImg src={stamp1} /> */}
                                    {item === 1 && <StampImg src={stamp1} />}
                                    {item === 2 && <StampImg src={stamp2} />}
                                    {item === 3 && <StampImg src={stamp3} />}
                                    {item === 4 && <StampImg src={stamp4} />}
                                    {item === 5 && <StampImg src={stamp5} />}
                                    {item === 6 && <StampImg src={stamp6} />}
                                    {item === 7 && <StampImg src={stamp7} />}
                                    {item === 8 && <StampImg src={stamp8} />}
                                    {item === 9 && <StampImg src={stamp9} />}
                                    {item === 10 && <StampImg src={stamp10} />}
                                    {item === 11 && <StampImg src={stamp11} />}
                                    {item === 12 && <StampImg src={stamp12} />}
                                    {item === 13 && <StampImg src={stamp13} />}
                                    {item === 14 && <StampImg src={stamp14} />}
                                    {item === 15 && <StampImg src={stamp15} />}
                                    {item === 16 && <StampImg src={stamp16} />}
                                    {item === 17 && <StampImg src={stamp17} />}
                                    {item === 18 && <StampImg src={stamp18} />}
                                    {item === 19 && <StampImg src={stamp19} />}
                                </Stamp>
                            ))}
                            {/* </ScrollHorizontal> */}
                        </Wrap4>
                    </StampContents>
                    <GoMyShop>내 가게 바로가기</GoMyShop>
                    {haveMyShop ? (
                        <MyShopBox>
                            <MyShopTop>
                                <div>
                                    <ShopImg src="" alt="" />
                                    <ShopDetail>
                                        <ShopName>{myShop.storeName}</ShopName>
                                        <MarketName>{myShop.market.marketName}</MarketName>
                                    </ShopDetail>
                                </div>
                                <GoMyShopButton
                                    onClick={() => {
                                        console.log(myShop.storeId);
                                        navigate('/shop', {
                                            state: {
                                                storeId: myShop.storeId,
                                            },
                                        });
                                    }}
                                >
                                    &gt;
                                </GoMyShopButton>
                            </MyShopTop>
                            <div>
                                <ShopButton1 onClick={() => setStage(3)}>가게 정보 수정하기</ShopButton1>
                                <ShopButton2 onClick={() => navigate(`/shop?shopId=${myShop.storeId}`)}>
                                    판매 상품 보기
                                </ShopButton2>
                            </div>
                        </MyShopBox>
                    ) : (
                        <MyShopBox>
                            <NoShopContent>
                                <NoShopImg>
                                    <Nsi src={noneuser} />
                                </NoShopImg>
                                <NoShopTitle>아직 가게가 존재하지 않아요</NoShopTitle>
                                <div />
                            </NoShopContent>
                            <NoShopButton onClick={() => navigate(`/createShop`)}>내 가게 만들기</NoShopButton>
                        </MyShopBox>
                    )}

                    <HistoryTitle>거래 내역</HistoryTitle>
                    <SpButton isSelected={tradeType} onClick={() => setTradeType(true)}>
                        구매내역
                    </SpButton>
                    <SpButton isSelected={!tradeType} onClick={() => setTradeType(false)}>
                        판매내역
                    </SpButton>
                    <Wrap5>
                        {data.map((pro, index) => (
                            <ProButton
                                key={index}
                                onClick={() => {
                                    console.log(pro);
                                }}
                            >
                                {/* <ProImg
                                // src={}
                                ></ProImg> */}

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
                    </Wrap5>
                    <MoreHistoryButton onClick={() => navigate('/orderHistory')}>거래 내역 더보기</MoreHistoryButton>
                </div>
            )}
            {stage === 2 && (
                <ProfileContainer>
                    <Nav>
                        <FontAwesomeIcon onClick={goBack} icon={faChevronLeft} />

                        <MyName>프로필 수정</MyName>
                        <div></div>
                    </Nav>
                    <Wrap>
                        <Need>이름</Need>
                        <Label>
                            <Input type="text" name="name" onChange={profileChange} value={profileData.name} required />
                        </Label>
                        <Need>전화번호</Need>
                        <Label>
                            <Input
                                type="text"
                                name="phoneNumber"
                                onChange={profileChange}
                                value={profileData.phoneNumber}
                                required
                            />
                        </Label>
                        <Need>아이디</Need>
                        <Label>
                            <Input type="text" name="id" onChange={profileChange} value={profileData.id} required />
                        </Label>
                        <Need>비밀번호</Need>
                        <Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={profileChange}
                                value={profileData.password}
                                required
                            />
                        </Label>
                        <ButtonChange type="button" onClick={profileSubmit}>
                            수정 완료
                        </ButtonChange>
                    </Wrap>
                </ProfileContainer>
            )}

            {stage === 3 && (
                <div>
                    <Nav>
                        <FontAwesomeIcon onClick={goBack} icon={faChevronLeft} />

                        <MyName>가게 정보 수정</MyName>
                        <div></div>
                    </Nav>
                    <Form onSubmit={shopSubmit}>
                        <Need>가게 이름</Need>
                        <Label>
                            <Input
                                type="text"
                                value={newShop.storeName}
                                name="storeName"
                                onChange={shopChange}
                                required
                            />
                        </Label>
                        <Need>시장명</Need>
                        <Label>
                            <Input type="text" value={newShop.market.marketName} readOnly />
                        </Label>
                        <Need>업종</Need>
                        <Label>
                            <Input type="text" name="categoryName" value={newShop.categoryName} required readOnly />
                            <div>{newShop.categoryName}</div>
                            {buttons.map((btn, idx) => (
                                <MrkCtBut
                                    key={btn}
                                    isSelected={selectedCt === btn}
                                    onClick={() => {
                                        setSelectedCt(btn);
                                        setNewShop({
                                            categoryName: btn,
                                            categoryId: idx,
                                        });
                                    }}
                                >
                                    {btn}
                                </MrkCtBut>
                            ))}
                        </Label>
                        <Need>내 계좌</Need>
                        <AccountBox>
                            <button onClick={() => setBankSelect(true)}>{myShop.accountBank}</button>
                            <Input type="text" value={newShop.accountDigit} name="accountDigit" onChange={shopChange} />
                        </AccountBox>
                        <Need>가게 소개</Need>
                        <Label>
                            <Input
                                type="text"
                                value={newShop.storeDescription}
                                name="storeDescription"
                                onChange={shopChange}
                            />
                        </Label>
                        <ButtonChange type="submit">수정 완료</ButtonChange>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default Mypage;
