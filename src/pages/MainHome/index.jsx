import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import GoSearch from './components/GoSearch';
import GoLogin from './components/GoLogin';
import styled from 'styled-components';
import GoSelectLocation from './components/GoSelectLocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import GetMyLocation from './components/GetMyLocation';
import apple from '../../imgs/apple.png';
import carrot from '../../imgs/carrot.png';
import drink from '../../imgs/cold-drink.png';
import dish from '../../imgs/dish.png';
import fish from '../../imgs/fish.png';
import leaf from '../../imgs/leaf.png';
import pork from '../../imgs/pork.png';
import wheat from '../../imgs/wheat.png';

const Container = styled.div`
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

const MainHome = () => {
    const navigate = useNavigate();

    const handleClick = (value) => {
        navigate(`/showproducts?productCategory=${value}`);
    };

    return (
        <Container>
            <TopNav>
                <GoSearch />
                <GoLogin />
            </TopNav>
            <MyLocation>
                <Loc>
                    <LocIcon>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </LocIcon>
                    <LocName>
                        <GetMyLocation />
                    </LocName>
                </Loc>
                <GoSelectLocation />
            </MyLocation>
            <CategoryProducts>
                <Categorys>
                    <Cbutton onClick={() => handleClick('과일')}>
                        <Icon src={apple} />
                        과일
                    </Cbutton>
                    <Cbutton onClick={() => handleClick('채소')}>
                        <Icon src={carrot} />
                        채소
                    </Cbutton>
                    <Cbutton onClick={() => handleClick('쌀·잡곡·견과')}>
                        <Icon src={wheat} />
                        쌀·잡곡·견과
                    </Cbutton>
                    <Cbutton onClick={() => handleClick('수산물·건해산')}>
                        <Icon src={fish} />
                        수산물·건해산
                    </Cbutton>
                </Categorys>
                <Categorys>
                    <Cbutton onClick={() => handleClick('정육·계란')}>
                        <Icon src={pork} />
                        정육·계란
                    </Cbutton>
                    <Cbutton onClick={() => handleClick('요리·간편식')}>
                        <Icon src={dish} />
                        요리·간편식
                    </Cbutton>
                    <Cbutton onClick={() => handleClick('음료')}>
                        <Icon src={drink} />
                        음료
                    </Cbutton>
                    <Cbutton onClick={() => handleClick('친환경·유기농')}>
                        <Icon src={leaf} />
                        친환경·유기농
                    </Cbutton>
                </Categorys>
            </CategoryProducts>
        </Container>
    );
};

export default MainHome;
