import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SelectLoc from '../../components/SelectLoc';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import axios from 'axios';

const Container = styled.div`
    width: 100%;
`;

const Back = styled.button`
    background-color: white;
    border: none;
`;
const P1 = styled.div``;
const P2 = styled.div``;

const CreateShop = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [stage, setStage] = useState(1);
    const [newShop, setNewShop] = useState({
        name: '',
        accountNum: '',
        largeLoc: '',
        fineLoc: '',
        marketLoc: '',
        category: '',
    });

    const handleButton = () => {
        if (stage === 5) {
            //axios로 가게 post
            //성공하면 가게id 리턴받고 account의 myShop에 저장
            //계좌번호 account에 저장
            axios
                .post('', newShop)
                .then((response) => {
                    setAccount({
                        ...account,
                        myShop: response.data,
                        accountNum: newShop.accountNum,
                    });

                    const value = 1; //임시 test결과 잘됨
                    //리턴받은 가게id를 aftercreat에 파라미터로 넘김
                    navigate('/afterCreateShop', {
                        state: {
                            shopId: value,
                        },
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else setStage(stage + 1);
    };

    const handleBack = () => {
        console.log({ stage });
        if (stage === 1) navigate('/mainHome');
        else setStage(stage - 1);
    };

    return (
        <Container>
            <Back onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Back>
            {stage === 1 && (
                <div>
                    <P1>내 가게의 이름을 입력해주세요</P1> <P2>고객에게 보여지는 이름이예요. 신중히 입력해주세요.</P2>
                    <input></input>
                </div>
            )}

            {stage === 2 && (
                <div>
                    <SelectLoc></SelectLoc>
                </div>
            )}

            {stage === 3 && (
                <div>
                    <P1>내 가게의 카테고리를 지정해주세요</P1> <P2>지정하신 카테고리를 기반으로 가게가 분류돼요.</P2>
                    <div>업종</div>
                    <div>{newShop.category}</div>
                </div>
            )}

            {stage === 4 && (
                <div>
                    <P1>판매자 본인의 계좌번호를 입력해주세요</P1>{' '}
                    <P2>상품을 주문하면, 고객에게 해당 계좌번호가 안내돼요.</P2>
                    <button>은행을 선택해주세요.</button>
                    <input></input>
                </div>
            )}

            {stage === 5 && (
                <div>
                    <P1>프로필 사진을 등록해주세요</P1>
                    <P2>가게명과 함께 고객에게 보여져요. 등록한 사진은 나중에 변경 가능해요.</P2>
                    <img src="" alt="" />
                    <button>사진 등록</button>
                </div>
            )}

            <button onClick={handleButton}>입력완료</button>
        </Container>
    );
};

export default CreateShop;
