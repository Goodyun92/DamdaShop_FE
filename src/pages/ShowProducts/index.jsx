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

const Container = styled.div`
    width: 95%;
    margin-top: 10px;
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
    height: 2.5em;
    border-bottom: 0.5px solid #d0d0d0;
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

function ShowProducts() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //파라미터로 전달해준 값 취득
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    //쿼리 취득
    const btnValue = params.get('productCategory');
    const [selectedCt, setSelectedCt] = useState(btnValue);

    // useEffect(() => {
    //     const apiUrl = `https://your-api-endpoint.com/data?button=${btnValue}`;

    //     axios
    //         .get(apiUrl)
    //         .then((response) => {
    //             setData(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, [btnValue]);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error occurred: {error.message}</div>;

    const buttons = [
        '전체',
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
            {isOrder ? (
                <div>
                    <Nav>
                        <BackButton onClick={() => setIsOrder(false)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                    </Nav>
                    <div>상품정보 출력</div>
                    <button
                        onClick={() => {
                            setIsOrder(false);
                            handleOpenModal();
                        }}
                    >
                        주문하기
                    </button>
                </div>
            ) : (
                <div>
                    <Nav>
                        <BackButton onClick={() => navigate('/mainHome')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </BackButton>
                        <div>{selectedCt}</div>
                        <div></div>
                    </Nav>
                    <MrkCt id="scroll-horizontal">
                        <ScrollHorizontal>
                            {buttons.map((btn, idx) => (
                                <MrkCtBut key={idx} isSelected={selectedCt === btn} onClick={() => setSelectedCt(btn)}>
                                    {btn}
                                </MrkCtBut>
                            ))}
                        </ScrollHorizontal>
                    </MrkCt>
                    {/* 데이터 구조에 따라 렌더링 방법을 조정하세요. 
                상품랜더링하기 map하면서 각 상품을 버튼으로 생성 onclick시 state에 상품 객체 전체 저장
                */}
                    {/* <p>{data.content}</p> */}
                    <Purchase onClick={() => setIsOrder(true)}>
                        <img src={vector} />
                    </Purchase>
                    {showModal && (
                        <ModalOverlay onClick={handleCloseModal}>
                            <ModalContent onClick={(e) => e.stopPropagation()}>
                                <Order /*product 객체 전달*/ />
                            </ModalContent>
                        </ModalOverlay>
                    )}
                </div>
            )}
        </Container>
    );
}

export default ShowProducts;
