import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import SelectLoc from '../../components/SelectLoc';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import axios from 'axios';
import SelectLocComp from '../../components/SelectLoc';
import none from '../../imgs/none.png';
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

const Container = styled.div`
    width: 100%;
`;

const Back = styled.button`
    background-color: white;
    border: none;
    margin-top: 15px;
    font-size: 16px;
`;
const P1 = styled.div`
    font-family: 'pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: -0.30000001192092896px;
    margin: 26px 0px 9px 0px;
`;
const P2 = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    color: #707070;
    margin-bottom: 25px;
`;
const Input = styled.input`
    margin-top: 10px;
    color: black;
    background-color: #ffffff;

    /* width: 100%; */
    border-radius: 5px;
    border: 0.8px solid #505050;
    gap: 10px;
    width: 334px;
    height: 24px;

    padding: 8px 16px 8px 16px;
    border-radius: 5px;
    border: solid 1px;
    gap: 10px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const OkButton = styled.button`
    margin-top: 480px;
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

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
`;

const Wrap2 = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const SetMarketButton = styled.button`
    margin-top: 9px;
    margin-bottom: 10px;
    width: 100%;
    height: 35px;
    top: 236px;
    left: 20px;
    padding: 8px 16px 8px 16px;
    border-radius: 5px;
    border: solid 1px;
    gap: 177px;
    background-color: white;
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: black;
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
    display: flex;
    align-items: center;
    justify-content: center;
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
const AccBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const BButtons = styled.div`
    margin-left: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
`;
const BankButton = styled.button`
    flex: 1 1 calc(33.3333% - 10px);
    flex-grow: 0;
    width: 105px;
    height: 72px;
    border-radius: 12px;
    border: 0.5px solid lightgray;
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

const PhotoImg = styled.img`
    width: 100px;
    height: 100px;
`;
const PhotoButton = styled.button`
    width: 82px;
    height: 30px;
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    background-color: #efefef;
    border: none;
`;

const PhotoWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
`;

const CreateShop = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedCt, setSelectedCt] = useState({
        name: '과일',
        id: 1,
    });
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
    const [stage, setStage] = useState(1);
    const [mrkSelect, setMrkSelect] = useState(false);
    const [bankSelect, setBankSelect] = useState(false);
    const [newShop, setNewShop] = useState({
        accountBank: '', //입력받기
        // accountDigit: , //입력받기
        categoryId: 1, //입력받기
        storeDescription: '',
        storeName: '', //입력받기
    });

    const handleChange = (event) => {
        // setNewShop({ ...newShop, [event.target.name]: event.target.value });
        setNewShop((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleButton = () => {
        console.log(account);
        if (stage === 5) {
            //axios로 가게 post
            //계좌번호 account에 저장

            const tmp = {
                accountBank: newShop.accountBank,
                accountDigit: newShop.accountDigit,
                accountName: account.name,
                categoryId: newShop.categoryId + 1,
                // marketId: account.marketId,
                marketId: 1,
                storeDescription: '',
                storeName: newShop.storeName,
                userId: account.userId,
            };

            console.log(tmp);
            axios
                .post('https://ssudamda.shop/stores/register', tmp)
                .then((response) => {
                    setAccount({
                        ...account,
                        accountBank: newShop.accountBank,
                        accountNum: newShop.accountDigit,
                    });
                    navigate('/afterCreateShop');
                })
                .catch((error) => {
                    console.log(error.response);
                });
        } else setStage(stage + 1);
    };

    const handleBack = () => {
        console.log({ stage });
        if (stage === 1) navigate('/myPage');
        else setStage(stage - 1);
    };

    const completeBank = (event) => {
        setNewShop({ ...newShop, accountBank: event.target.value });
        setBankSelect(false);
    };

    return (
        <Container>
            {mrkSelect && (
                <ModalOverlay onClick={() => setMrkSelect(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <SelectLocComp
                            func={() => {
                                setMrkSelect(false);
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
            <Back onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Back>
            {stage === 1 && (
                <Wrap>
                    <Form onSubmit={handleButton}>
                        <P1>내 가게의 이름을 입력해주세요</P1>{' '}
                        <P2>고객에게 보여지는 이름이예요. 신중히 입력해주세요.</P2>
                        <Input
                            type="text"
                            value={newShop.storeName}
                            placeholder="예) 멋사빵집, 멋사수산"
                            name="storeName"
                            onChange={handleChange}
                            required
                        />
                        <OkButton type="submit">입력완료</OkButton>
                    </Form>
                </Wrap>
            )}

            {stage === 2 && (
                <Wrap>
                    <P1>내 가게가 속한 시장을 지정해주세요.</P1> <P2>고객이 지정한 시장명에 맞춰 가게가 표시돼요. </P2>
                    <div>시장</div>
                    <SetMarketButton onClick={() => setMrkSelect(true)}>{account.marketLoc}</SetMarketButton>
                    <OkButton onClick={handleButton}>입력완료</OkButton>
                </Wrap>
            )}

            {stage === 3 && (
                <Wrap>
                    <P1>내 가게의 카테고리를 지정해주세요</P1> <P2>지정하신 카테고리를 기반으로 가게가 분류돼요.</P2>
                    <div>업종</div>
                    <SetMarketButton>{newShop.categoryName}</SetMarketButton>
                    <Wrap2>
                        {buttons.map((btn, idx) => (
                            <MrkCtBut
                                key={idx}
                                isSelected={selectedCt.id === idx}
                                onClick={() => {
                                    setSelectedCt({
                                        id: idx,
                                        name: btn,
                                    });
                                    setNewShop((prev) => {
                                        return {
                                            ...prev,
                                            categoryName: btn,
                                            categoryId: idx,
                                        };
                                    });
                                }}
                            >
                                {btn}
                            </MrkCtBut>
                        ))}
                    </Wrap2>
                    <OkButton onClick={handleButton}>입력완료</OkButton>
                </Wrap>
            )}

            {stage === 4 && (
                <Wrap>
                    <AccBox>
                        <P1>판매자 본인의 계좌번호를 입력해주세요</P1>
                        <P2>상품을 주문하면, 고객에게 해당 계좌번호가 안내돼요.</P2>
                        <SetMarketButton onClick={() => setBankSelect(true)}>
                            {newShop.accountBank ? <div>{newShop.accountBank}</div> : <div>은행을 선택해주세요.</div>}
                        </SetMarketButton>
                        <Input
                            type="text"
                            name="accountDigit"
                            value={newShop.accountDigit}
                            placeholder="계좌번호를 입력해주세요."
                            onChange={handleChange}
                            required
                        />
                        <OkButton onClick={handleButton}>입력완료</OkButton>
                    </AccBox>
                </Wrap>
            )}

            {stage === 5 && (
                <Wrap>
                    <P1>프로필 사진을 등록해주세요</P1>
                    <P2>가게명과 함께 고객에게 보여져요. 등록한 사진은 나중에 변경 가능해요.</P2>
                    <PhotoWrap>
                        <PhotoImg src={none} />
                        <PhotoButton>사진 등록</PhotoButton>
                    </PhotoWrap>
                    <OkButton onClick={handleButton}>입력완료</OkButton>
                </Wrap>
            )}
        </Container>
    );
};

export default CreateShop;
