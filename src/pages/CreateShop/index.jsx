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

const Container = styled.div`
    width: 100%;
`;

const Back = styled.button`
    background-color: white;
    border: none;
`;
const P1 = styled.div`
    font-family: 'pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: -0.30000001192092896px;
`;
const P2 = styled.div`
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
`;
const Input = styled.input`
    color: #b0b0b0;
    background-color: #ffffff;

    width: 100%;
    border-radius: 5px;
    border: 0.8px solid #505050;
    gap: 10px;
`;
const Form = styled.form``;
const OkButton = styled.button`
    color: #ffffff;
    background-color: #609966;
    width: 100%;
    border-radius: 5px;
    border: none;
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
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
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

const CreateShop = () => {
    const navigate = useNavigate();
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
    const [stage, setStage] = useState(1);
    const [mrkSelect, setMrkSelect] = useState(false);
    const [bankSelect, setBankSelect] = useState(false);
    const [newShop, setNewShop] = useState({
        accountBank: null, //입력받기
        accountDigit: 0, //입력받기
        categoryId: 0, //입력받기
        storeDescription: '',
        storeName: '', //입력받기
    });

    const handleChange = (event) => {
        setNewShop({ ...newShop, [event.target.name]: event.target.value });
    };

    const handleButton = () => {
        if (stage === 5) {
            //axios로 가게 post
            //계좌번호 account에 저장
            axios
                .post('https://ssudamda.shop/stores/register', {
                    accountBank: newShop.accountBank,
                    accountDigit: newShop.accountDigit,
                    accountName: account.name,
                    categoryId: newShop.categoryId,
                    marketId: account.marketId,
                    storeDescription: newShop.storeDescription,
                    storeName: newShop.storeName,
                    userId: account.userId,
                })
                .then((response) => {
                    navigate('/afterCreateShop');
                    setAccount({
                        ...account,
                        accountBank: newShop.accountBank,
                        accountNum: newShop.accountDigit,
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
                        <div>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                            <button onClick={completeBank} value="농협">
                                농협
                            </button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
            <Back onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Back>
            {stage === 1 && (
                <Form>
                    <div>
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
                    </div>
                    <OkButton type="submit" onClick={handleButton}>
                        입력완료
                    </OkButton>
                </Form>
            )}

            {stage === 2 && (
                <div>
                    <P1>내 가게가 속한 시장을 지정해주세요.</P1> <P2>고객이 지정한 시장명에 맞춰 가게가 표시돼요. </P2>
                    <div>시장</div>
                    <button onClick={() => setMrkSelect(true)}>시장을 지정해주세요.</button>
                    <button onClick={handleButton}>입력완료</button>
                </div>
            )}

            {stage === 3 && (
                <div>
                    <P1>내 가게의 카테고리를 지정해주세요</P1> <P2>지정하신 카테고리를 기반으로 가게가 분류돼요.</P2>
                    <div>업종</div>
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
                    <button onClick={handleButton}>입력완료</button>
                </div>
            )}

            {stage === 4 && (
                <div>
                    <P1>판매자 본인의 계좌번호를 입력해주세요</P1>{' '}
                    <P2>상품을 주문하면, 고객에게 해당 계좌번호가 안내돼요.</P2>
                    <button onClick={() => setBankSelect(true)}>
                        {newShop.accountBank ? <div>{newShop.accountBank}</div> : <div>은행을 선택해주세요.</div>}
                    </button>
                    <input
                        type="text"
                        name="accountDigit"
                        value={newShop.accountDigit}
                        placeholder="계좌번호를 입력해주세요."
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" onClick={handleButton}>
                        입력완료
                    </button>
                </div>
            )}

            {stage === 5 && (
                <div>
                    <P1>프로필 사진을 등록해주세요</P1>
                    <P2>가게명과 함께 고객에게 보여져요. 등록한 사진은 나중에 변경 가능해요.</P2>
                    <img src={none} />
                    <button>사진 등록</button>
                    <button onClick={handleButton}>입력완료</button>
                </div>
            )}
        </Container>
    );
};

export default CreateShop;
