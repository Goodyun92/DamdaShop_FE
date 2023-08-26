import React, { useState } from 'react';
import styled from 'styled-components';
import back from '../imgs/Vector2.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import locationState from '../store/Locations';
import accountState from '../store/atoms';
import axios from 'axios';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'pretendard';
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
`;

const NavTop = styled.div`
    margin-top: 5px;
    margin-left: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const BackButton = styled.button`
    background-color: white;
    border: none;
`;
const NowBox = styled.div`
    background-color: #f8f8f8;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    margin-top: 15px;
    margin-right: 15px;
`;
const NowDetail = styled.div`
    color: ${(props) => (props.isSelected ? '##333333' : '#909090')};
    font-family: 'pretendard';
    font-size: ${(props) => (props.isSelected ? '14px' : '12px')};
    font-weight: ${(props) => (props.isSelected ? 700 : 600)};
    letter-spacing: 0em;
    text-align: center;
    margin: 15px 20px;
`;

const Contents = styled.div`
    width: 100%;
`;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const SelButton = styled.button`
    flex: 1 1 calc(33.3333% - 19px); /* 3개씩 한 줄에 표시하려면 33.3333%를 사용. 10px은 간격 조정을 위해 추가한 값이므로 원하는대로 조절하면 됩니다. */
    height: 41px;
    margin: 5px;
    flex-grow: 0;
    background-color: ${(props) => (props.isSelected ? 'rgba(96, 153, 102, 0.2)' : '#FFFFFF')};
    border: 0.5px solid;
    border-radius: 2px;
    border-color: ${(props) => (props.isSelected ? '#609966' : '#B0B0B0')};
`;

const FooterButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 106px 20px 23px 20px;
    width: 100%;
    background-color: #609966;
    color: #ffffff;
    border-radius: 5px;
    border: none;
    text-align: center;
    width: 353px;
    height: 47px;
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: 0em;
`;

const SelectLoc = ({ func }) => {
    const locations = useRecoilValue(locationState);
    const [account, setAccount] = useRecoilState(accountState);
    const [newMarketId, setNewMarketId] = useState(1);
    const [stage, setStage] = useState(1); // 1: large, 2: fine, 3: market
    const [isChosen, setIsChosen] = useState(false);

    const proceedToNextStage = () => {
        if (stage < 3) {
            setStage(stage + 1);
            setIsChosen(false);
        }
    };

    const complete = () => {
        //axios로 내 시장변경put account를 보냄
        //내 정보 수정api로

        axios
            .patch(`https://ssudamda.shop/users/update/${account.userId}`, {
                marketId: account.marketId,
                password: account.password,
                phoneNumber: account.phoneNumber,
                userName: account.id,
                userNickName: account.name,
            })
            .then((response) => {
                func();
                console.log(account);
            })
            .catch((error) => {});

        // func(); //임시
    };

    return (
        <Container>
            <Nav>
                <NavTop>
                    <div></div>
                    <div>시장 선택</div>
                    <BackButton onClick={func}>
                        <img src={back} />
                    </BackButton>
                </NavTop>
                <NowBox>
                    <NowDetail isSelected={stage === 1}>시/도 선택</NowDetail>
                    <div>&gt;</div>
                    <NowDetail isSelected={stage === 2}>구/군 선택</NowDetail>
                    <div>&gt;</div>
                    <NowDetail isSelected={stage === 3}>시장 선택</NowDetail>
                </NowBox>
            </Nav>
            <Contents>
                <ButtonWrap>
                    {stage === 1 &&
                        locations.map((location) => (
                            <SelButton
                                key={location.name}
                                onClick={() => {
                                    setAccount({ ...account, largeLoc: location.name });
                                    setIsChosen(true);
                                }}
                                isSelected={account.largeLoc === location.name}
                            >
                                {location.name}
                            </SelButton>
                        ))}
                </ButtonWrap>

                <ButtonWrap>
                    {stage === 2 &&
                        locations
                            .find((loc) => loc.name === account.largeLoc)
                            .fine.map((fine) => (
                                <SelButton
                                    key={fine.name}
                                    onClick={() => {
                                        setAccount({ ...account, fineLoc: fine.name });
                                        setIsChosen(true);
                                    }}
                                    isSelected={account.fineLoc === fine.name}
                                >
                                    {fine.name}
                                </SelButton>
                            ))}
                </ButtonWrap>

                <ButtonWrap>
                    {stage === 3 &&
                        locations
                            .find((loc) => loc.name === account.largeLoc)
                            .fine.find((dist) => dist.name === account.fineLoc)
                            .market.map((market) => (
                                <SelButton
                                    key={market.name}
                                    onClick={() => {
                                        console.log(market);
                                        setAccount({ ...account, marketId: market.Id, marketLoc: market.name });
                                        console.log(account);
                                        setIsChosen(true);
                                    }}
                                    isSelected={account.marketLoc === market.name}
                                >
                                    {market.name}
                                </SelButton>
                            ))}
                </ButtonWrap>
            </Contents>
            {stage < 3 ? (
                <FooterButton onClick={proceedToNextStage} disabled={!isChosen}>
                    다음
                </FooterButton>
            ) : (
                <FooterButton onClick={complete} disabled={!isChosen}>
                    시장 선택하기
                </FooterButton>
            )}
        </Container>
    );
};

export default SelectLoc;
