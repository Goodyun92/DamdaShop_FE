import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import GoSearch from './components/GoSearch';
import GoMypage from './components/GoMyPage';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import apple from '../../imgs/apple.png';
import carrot from '../../imgs/carrot.png';
import drink from '../../imgs/cold-drink.png';
import dish from '../../imgs/dish.png';
import fish from '../../imgs/fish.png';
import leaf from '../../imgs/leaf.png';
import pork from '../../imgs/pork.png';
import wheat from '../../imgs/wheat.png';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import ScrollHorizontal from 'react-scroll-horizontal';
import SelectLocComp from '../../components/SelectLoc';
import VoiceModule from './components/VoiceModule';

const Container = styled.div`
    margin-top: 10px;
    width: 95%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-family: 'pretendard';
`;

const TopNav = styled.nav`
    display: flex;
    justify-content: end;
    margin: 10px;
`;

const MyLocation = styled.div`
    background-color: #e8e8e8;
    padding: 5px 12px 5px 12px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    height: 30px;
    border-radius: 5px;
    border: 0.699999988079071px;
`;

const Loc = styled.div`
    display: flex;
`;

const LocIcon = styled.div`
    color: #609966;
`;

const LocName = styled.div`
    padding-left: 25px;
`;

const SelectLoc = styled.button`
    border: none;
    background-color: #e8e8e8;
    font-family: 'pretendard';
`;

const CategoryProducts = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 3px 10px 3px;
`;

const Categorys = styled.div`
    display: flex;
    justify-content: center;
`;

const Cbutton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px;
    width: 75px;
    height: 30px;
    font-family: 'pretendard';
    font-size: 11px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
`;

const Icon = styled.img`
    width: 20px;
    margin-bottom: 7px;
`;

const Mrk1 = styled.div`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    margin: 35px 0px 10px 10px;
`;
const Mrk1L = styled.span`
    color: #609966;
`;
const Mrk2 = styled.div`
    font-family: 'pretendard';
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.30000001192092896px;
    color: #909090;
    margin-left: 10px;
`;

const MrkCt = styled.div`
    height: 5em;
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

const MrkList = styled.div``;

const MoreMrkButton = styled.button`
    width: 100%;
    height: 40px;
    background-color: #efefef;
    font-family: 'pretendard';
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    border: none;
    border-radius: 5px;
`;

const Popu1 = styled.div`
    margin: 50px 0px 10px 10px;
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
`;

const Popu2 = styled.span`
    font-family: 'pretendard';
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    margin: 0px 0px 20px 10px;
`;

const PopuG = styled.span`
    color: #609966;
`;

const PopProd = styled.div`
    height: 5em;
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

const VoiceButton = styled.button`
    position: fixed;
    top: 80%;
    left: 46%;
`;

const MainHome = () => {
    const [account, setAccount] = useRecoilState(accountState);
    const [selectedCt, setSelectedCt] = useState(0);
    const navigate = useNavigate();

    const goProductCategory = (value) => {
        navigate(`/showproducts?productCategory=${value}`);
    };

    const goMarketCategory = (value) => {
        navigate(`/showMarkets?marketCategory=${value}`);
    };

    const goShop = (value) => {
        navigate(`/shop?shopId=${value}`);
    };

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

    const [selectMarket, setSelectMarket] = useState(false);

    const selectMarketOpen = () => {
        setSelectMarket(true);
    };

    const selectMarketClose = () => {
        setSelectMarket(false);
    };

    const [voiceMod, setVoiceMod] = useState(false);

    const voiceModOpen = () => {
        setVoiceMod(true);
    };

    const voiceModClose = () => {
        setVoiceMod(false);
    };

    return (
        <Container>
            <TopNav>
                <GoSearch />
                <GoMypage />
            </TopNav>
            <MyLocation>
                <Loc>
                    <LocIcon>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </LocIcon>
                    <LocName>{account.marketLoc}</LocName>
                </Loc>
                <SelectLoc onClick={selectMarketOpen}>변경&gt;</SelectLoc>
            </MyLocation>
            <CategoryProducts>
                <Categorys>
                    <Cbutton onClick={() => goProductCategory('과일')}>
                        <Icon src={apple} />
                        과일
                    </Cbutton>
                    <Cbutton onClick={() => goProductCategory('채소')}>
                        <Icon src={carrot} />
                        채소
                    </Cbutton>
                    <Cbutton onClick={() => goProductCategory('쌀·잡곡·견과')}>
                        <Icon src={wheat} />
                        쌀·잡곡·견과
                    </Cbutton>
                    <Cbutton onClick={() => goProductCategory('수산물·건해산')}>
                        <Icon src={fish} />
                        수산물·건해산
                    </Cbutton>
                </Categorys>
                <Categorys>
                    <Cbutton onClick={() => goProductCategory('정육·계란')}>
                        <Icon src={pork} />
                        정육·계란
                    </Cbutton>
                    <Cbutton onClick={() => goProductCategory('요리·간편식')}>
                        <Icon src={dish} />
                        요리·간편식
                    </Cbutton>
                    <Cbutton onClick={() => goProductCategory('음료')}>
                        <Icon src={drink} />
                        음료
                    </Cbutton>
                    <Cbutton onClick={() => goProductCategory('친환경·유기농')}>
                        <Icon src={leaf} />
                        친환경·유기농
                    </Cbutton>
                </Categorys>
            </CategoryProducts>
            <Mrk1>
                <Mrk1L>{account.marketLoc}</Mrk1L>
                <span>의 다양한 가게를 볼 수 있어요</span>
            </Mrk1>
            <Mrk2>카테고리별로 나눠 보여드릴게요</Mrk2>
            <MrkCt id="scroll-horizontal">
                <ScrollHorizontal>
                    {buttons.map((btn, idx) => (
                        <MrkCtBut key={idx} isSelected={selectedCt === idx} onClick={() => setSelectedCt(idx)}>
                            {btn}
                        </MrkCtBut>
                    ))}
                </ScrollHorizontal>
            </MrkCt>

            <MrkList>api호출 후 리스트 map</MrkList>
            <button onClick={() => goShop('1')}>가게1mine</button>
            <button onClick={() => goShop('2')}>가게2</button>

            <MoreMrkButton onClick={() => goMarketCategory(buttons[selectedCt])}>상품 더보기</MoreMrkButton>

            <Popu1>사람들이 많이 찾는</Popu1>
            <Popu2>
                <PopuG>{account.marketId}의 인기상품</PopuG>
                <span>이에요</span>
            </Popu2>
            <PopProd id="scroll-horizontal">
                <ScrollHorizontal>
                    {/* get으로 가져온후 map */}

                    {/* {buttons.map((btn, idx) => (
                        <MrkCtBut key={idx} isSelected={selectedCt === idx} onClick={() => setSelectedCt(idx)}>
                            {btn}
                        </MrkCtBut>
                    ))} */}
                </ScrollHorizontal>
            </PopProd>

            <VoiceButton onClick={voiceModOpen}>
                음성인식
                {/* <img src={}/> */}
            </VoiceButton>

            {selectMarket && (
                <ModalOverlay onClick={selectMarketClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <SelectLocComp func={selectMarketClose} />
                    </ModalContent>
                </ModalOverlay>
            )}
            {voiceMod && (
                <ModalOverlay onClick={voiceModClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <VoiceModule func={voiceModClose} />
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default MainHome;