import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div``;
const Nav = styled.div``;
const BackButton = styled.button``;
const Nav2 = styled.div``;
const ProfileNav = styled.div``;
const Form = styled.form``;
const Label = styled.label``;
const Input = styled.input``;
const ButtonChange = styled.button``;
const ButtonNav = styled.div``;

const Mypage = () => {
    const navigate = useNavigate();

    //내 가게 정보있다면 account.myShop &&, 가게 정보 객체 받아오기 api호출 후 저장해놓기
    //shopInfo에 api리턴 받았다 가정
    const [myShop, setMyShop] = useState({
        shopId: '',
        shopName: '',
        marketId: '',
        category: '',
        shopInfo: '', //가게소개
    });

    //구매내역,판매내역 각각 받아올 api

    const [stage, setStage] = useState(1);
    //1:홈화면 2:프로필수정 3:가게수정
    //4:거래내역 5:거래내역상세 6:내 토큰

    //구매내역 받아올
    const [data, setData] = useState([]);
    const [tradeType, setTradeType] = useState(true);
    //true: 구매내역 false:판매내역

    const [account, setAccount] = useRecoilState(accountState);

    //프로필 수정 입력받을때 쓸거
    const [profileData, setProfileData] = useState({ ...account });
    useEffect(() => {
        setProfileData(account);
    }, [account]);

    const profileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const profileSubmit = async () => {
        try {
            // 내 정보 수정 api
            await axios.put('/user/update', profileData);

            // Recoil 상태 업데이트
            setAccount(profileData);
            setStage(1);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    //가게 정보수정할때 쓸거 api로 받은걸로 채움
    const [shopData, setShopData] = useState({ ...myShop, accountNum: account.accountNum });
    useEffect(() => {
        setShopData(myShop);
    }, [myShop]);

    const shopChange = (e) => {
        const { name, value } = e.target;
        setShopData((prev) => ({ ...prev, [name]: value }));
    };

    const shopSubmit = async () => {
        try {
            // 가게정보 수정 api
            await axios.put('/user/update', shopData);

            // Recoil 상태 업데이트 계좌번호
            setAccount({ accountNum: shopData.accountNum });
            setStage(1);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    //구매내역,판매내역 가져오기 api
    useEffect(() => {
        //구매내역,판매내역 각 api
        const apiUrl = tradeType ? 'https://api.example.com/dataTrue' : 'https://api.example.com/dataFalse';

        axios
            .get(apiUrl, account)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }, [tradeType]); // state 값이 변경될 때마다 이 effect가 다시 실행됩니다.

    return (
        <Container>
            {stage === 1 && (
                <div>
                    <Nav>
                        <BackButton onClick={() => setStage(1)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                    </Nav>
                    <Nav2>
                        <div>{account.name}</div>
                        <button onClick={() => setStage(2)}>프로필 수정하기</button>
                    </Nav2>
                    <div>
                        <div>
                            <div>내 토큰 스탬프</div>
                            <button onClick={() => navigate('/myStamp')}>더보기&gt;</button>
                        </div>
                        {/* 가로스크롤 컴포넌트안에 토큰들 이미지 map*/}
                    </div>
                    <div>내 가게 바로가기</div>
                    {account.myShop ? (
                        <div>
                            <div>
                                <div>
                                    <img src="" alt="" />
                                    <div>
                                        <div>가게이름</div>
                                        <div>시장이름</div>
                                    </div>
                                </div>
                                <button onClick={() => navigate(`/shop?shopId=${myShop.shopId}`)}>&gt;</button>
                            </div>
                            <div>
                                <button onClick={() => setStage(3)}>가게 정보 수정하기</button>
                                <button onClick={() => navigate(`/shop?shopId=${myShop.shopId}`)}>
                                    판매 상품 보기
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <img src="" alt="" />
                                <div>아직 가게가 존재하지 않아요</div>
                            </div>
                            <button onClick={() => navigate(`/createShop`)}>내 가게 만들기</button>
                        </div>
                    )}

                    <div>거래 내역</div>
                    <ButtonNav>
                        <button onClick={() => setTradeType(true)}>구매내역</button>
                        <button onClick={() => setTradeType(false)}>판매내역</button>
                    </ButtonNav>
                    <div>
                        {data.map((item) => (
                            <div key={item.id}>
                                {/* Render your data here 
                                클릭하면 그냥 거래내역더보기 페이지로 이동
                                */}
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => navigate('/orderHistory')}>거래 내역 더보기</button>
                </div>
            )}
            {stage === 2 && (
                <div>
                    <ProfileNav>
                        <button img="" onClick={() => setStage(1)}></button>
                        <div>프로필 수정</div>
                        <div></div>
                    </ProfileNav>
                    <Form onSubmit={profileSubmit}>
                        <div>이름</div>
                        <Label>
                            <Input type="text" name="name" onChange={profileChange} value={profileData.name} />
                        </Label>
                        <div>전화번호</div>
                        <Label>
                            <Input
                                type="text"
                                name="phoneNumber"
                                onChange={profileChange}
                                value={profileData.phoneNumber}
                            />
                        </Label>
                        <div>아이디</div>
                        <Label>
                            <Input type="text" name="id" onChange={profileChange} value={profileData.id} />
                        </Label>
                        <div>비밀번호</div>
                        <Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={profileChange}
                                value={profileData.password}
                            />
                        </Label>
                        <ButtonChange type="submit">수정 완료</ButtonChange>
                    </Form>
                </div>
            )}

            {stage === 3 && (
                <div>
                    <ProfileNav>
                        <button img="" onClick={() => setStage(1)}></button>
                        <div>가게 정보 수정</div>
                        <div></div>
                    </ProfileNav>
                    <div>프로필 사진</div>
                    <img src="" alt="" />
                    <Form onSubmit={shopSubmit}>
                        <div>가게 이름</div>
                        <Label>
                            <Input type="text" name="shopName" onChange={shopChange} value={shopData.shopName} />
                        </Label>

                        <div>시장</div>
                        <Label>
                            <Input type="text" name="marketId" onChange={shopChange} value={shopData.marketId} />
                        </Label>

                        <div>업종</div>
                        <Label>
                            <Input type="text" name="category" onChange={shopChange} value={shopData.category} />
                        </Label>

                        <div>내 계좌</div>
                        <Label>
                            <Input type="text" name="accountNum" onChange={shopChange} value={shopData.accountNum} />
                        </Label>

                        <div>가게 소개</div>
                        <Label>
                            <Input type="text" name="shopInfo" onChange={shopChange} value={shopData.shopInfo} />
                        </Label>
                        <ButtonChange type="submit">수정 완료</ButtonChange>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default Mypage;
