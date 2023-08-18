import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ScrollHorizontal from 'react-scroll-horizontal';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import img1 from '../../imgs/category2.png';

const Container = styled.div`
    width: 100%;
    margin-top: 30px;
`;

const Nav = styled.div`
    display: flex;
    margin-bottom: 25px;
    width: 100%;
    height: 34px;
    color: #909090;
`;
const NavBox = styled.div`
    display: flex;
    margin-left: 10px;
    width: 90%;
    background-color: #efefef;
    border-radius: 5px;
    align-items: center;
`;
const SIcon = styled.div`
    margin: 0px 10px 0px 10px;
    background-color: #efefef;
`;

const Input = styled.input`
    width: 80%;
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 400;
    color: #909090;
    background-color: #efefef;
    outline: none;
    border: none;
`;

const BackButton = styled.button`
    background-color: white;
    border: none;
`;
const Pa = styled.span`
    margin: 20px 0px 10px 10px;
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
`;
const PaG = styled.span`
    margin-left: 3px;
    color: #609966;
`;

const Recommend = styled.div`
    margin-top: 10px;
    height: 5em;
`;

const RecBut = styled.button`
    height: 26px;
    margin: 10px;
    padding: 5px 9px;
    border-radius: 20px;
    white-space: nowrap;
    background-color: #ffffff;
    color: black;
    cursor: pointer;
    font-family: 'pretendard';
    font-size: 13px;
    /* font-weight: 600; */
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    border: 0.5px solid #e0e0e0;
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
const PList = styled.div``;
const Search = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [searchTerm, setSearchTerm] = useState();
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    const search = () => {
        axios
            .get(`https://ssudamda.shop/products/search`, {
                params: {
                    keyword: searchTerm,
                    marketId: account?.marketId,
                },
            })
            .then((Response) => {
                console.log(Response.status);
                console.log(Response.data);
                // 결과를 상태에 저장합니다.
                setSearchResults(Response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const buttons = ['수박', '복숭아', '청상추', '식혜', '동치미', '무말랭이'];

    return (
        <Container>
            <Nav>
                <BackButton onClick={() => navigate('/mainHome')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </BackButton>
                <NavBox>
                    <SIcon>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </SIcon>
                    <Input
                        type="text"
                        placeholder="검색어를 입력해 주세요"
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </NavBox>
            </Nav>
            <Pa>
                <span>사람들이 많이 찾고있는</span>
                <PaG>추천키워드</PaG>
                <span>에요</span>
            </Pa>
            <Recommend id="scroll-horizontal">
                {/* <ScrollHorizontal> */}
                {buttons.map((btn, idx) => (
                    <RecBut
                        key={idx}
                        onClick={() => {
                            setSearchTerm(btn);
                            search();
                        }}
                    >
                        {btn}
                    </RecBut>
                ))}
                {/* </ScrollHorizontal> */}
            </Recommend>
            {searchResults.length > 0 && (
                <PList>
                    {searchResults.map((product, index) => (
                        <ShopButton key={index}>
                            <ShopImg src={img1} alt="가게 이미지`category${shops.category.catgoryId}`" />
                            <ShopContents>
                                <Sc1>{product.id}</Sc1>
                                <Sc2>{product.name}</Sc2>
                            </ShopContents>
                            <hr />
                        </ShopButton>
                    ))}
                </PList>
            )}
        </Container>
    );
};

export default Search;
