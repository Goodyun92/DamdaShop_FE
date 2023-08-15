import React, { useState } from 'react';
import styled from 'styled-components';
import back from '../imgs/Vector2.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import locationState from '../store/Locations';
import accountState from '../store/atoms';
import axios from 'axios';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
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
const BackButton = styled.button`
    background-color: white;
    border: none;
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

        //3변수 지역변수로 저장
        //로직으로 marketid return
        //setAccount로

        axios
            .put('', account)
            .then((response) => {
                func();
            })
            .catch((error) => {});
    };

    return (
        <Container>
            <Nav>
                <div></div>
                <div>시장 선택</div>
                <BackButton onClick={func}>
                    <img src={back} />
                </BackButton>
            </Nav>
            <div>
                {stage === 1 &&
                    locations.map((location) => (
                        <button
                            key={location.name}
                            onClick={() => {
                                setAccount({ ...account, largeLoc: location.name });
                                setIsChosen(true);
                            }}
                        >
                            {location.name}
                        </button>
                    ))}

                {stage === 2 &&
                    locations
                        .find((loc) => loc.name === account.largeLoc)
                        .fine.map((fine) => (
                            <button
                                key={fine.name}
                                onClick={() => {
                                    setAccount({ ...account, fineLoc: fine.name });
                                    setIsChosen(true);
                                }}
                            >
                                {fine.name}
                            </button>
                        ))}

                {stage === 3 &&
                    locations
                        .find((loc) => loc.name === account.largeLoc)
                        .fine.find((dist) => dist.name === account.fineLoc)
                        .market.map((market) => (
                            <button
                                key={market.name}
                                onClick={() => {
                                    setAccount({ ...account, marketLoc: market.name, marketId: market.id });
                                    setIsChosen(true);
                                }}
                            >
                                {market.name}
                            </button>
                        ))}

                {stage < 3 ? (
                    <button onClick={proceedToNextStage} disabled={!isChosen}>
                        다음
                    </button>
                ) : (
                    <button onClick={complete} disabled={!isChosen}>
                        완료
                    </button>
                )}
            </div>
        </Container>
    );
};

export default SelectLoc;
