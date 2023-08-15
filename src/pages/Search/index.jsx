import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ScrollHorizontal from 'react-scroll-horizontal';

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

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    const search = async () => {
        try {
            // 백엔드 API
            const response = await axios.get('https://your-api-endpoint/search', {
                params: {
                    query: searchTerm,
                },
            });

            // 결과를 상태에 저장합니다.
            setSearchResults(response.data.products);
        } catch (error) {
            console.error('Search error:', error);
            alert('An error occurred during search');
        }
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
                <ScrollHorizontal>
                    {buttons.map((btn, idx) => (
                        <RecBut
                            key={idx}
                            onClick={() => {
                                setSearchTerm({ btn });
                                search();
                            }}
                        >
                            {btn}
                        </RecBut>
                    ))}
                </ScrollHorizontal>
            </Recommend>
            <div>
                <h2>Search Results:</h2>
                <ul>
                    {searchResults.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default Search;
