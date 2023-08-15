import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div``;
const Nav = styled.div``;

const MyStamp = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [data, setData] = useState([]);

    useEffect(() => {
        getStamp();
    }, []);

    async function getStamp() {
        // stamp get api
        axios
            .get('', account)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {});
    }

    return (
        <Container>
            <Nav>
                <button onClick={() => navigate('/myPage')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div>내 토큰 스탬프</div>
                <div>
                    {/* 가로스크롤 컴포넌트안에 토큰들 이미지 map*/}

                    {data.map((item) => (
                        <div key={item.id}>
                            {/* Render your data here */}
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </Nav>
        </Container>
    );
};

export default MyStamp;
