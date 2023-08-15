import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div``;
const Nav = styled.div``;
const ButtonNav = styled.div``;

const OrderHistory = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [stage, setStage] = useState(true);

    const [tradeType, setTradeType] = useState(true);
    //true:구매내역  false:판매내역

    const [account, setAccount] = useRecoilState(accountState);

    //axios
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
            {stage ? (
                <div>
                    <Nav>
                        <button onClick={() => navigate('/myPage')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <div>거래내역</div>
                        <div></div>
                    </Nav>
                    <ButtonNav>
                        <button onClick={() => setTradeType(true)}>구매내역</button>
                        <button onClick={() => setTradeType(false)}>판매내역</button>
                    </ButtonNav>
                    <button onClick={() => setStage(false)}>상품1</button>
                    <div>
                        {data.map((item) => (
                            <div key={item.id}>
                                {/* Render your data here 
                                    맵돌면서 각 상품마다 버튼 생성
                                    onclick하면
                                    setStage(false)
                                    state에 상품 객체 저장
                                    stagefalse로 가서 저장된 상품 객체의 정보로 렌더링
                                */}
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <Nav>
                        <button onClick={() => setStage(true)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        {tradeType ? <div>구매 내역 상세보기</div> : <div>판매 내역 상세보기</div>}
                        <div></div>
                    </Nav>
                    <div>
                        {tradeType ? (
                            <div>아래 계좌로 입금해주세요.</div>
                        ) : (
                            <div>주문자가 입금을 완료했을 경우,상품 수령에 관한 연락을 주세요.</div>
                        )}
                    </div>
                    <div>입금 계좌 정보</div>
                    <div>주문자 정보</div>
                </div>
            )}
        </Container>
    );
};

export default OrderHistory;
