import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';
import SellerShop from './components/SellerShop';
import ConsumShop from './components/ConsumShop';

const Container = styled.div`
    width: 100%;
`;

const Shop = () => {
    const [account, setAccount] = useRecoilState(accountState);
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    //파라미터로 전달해준 값 취득
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    //쿼리 취득
    const shopValue = params.get('shopId');
    const shopType = shopValue === account.myShop; //true: 판매자화면 false: 구매자 화면
    console.log(shopType);
    // 구매자거 먼저 만들고 판매자 덧씌

    return (
        <Container>
            {shopType ? <SellerShop shopId={shopValue}></SellerShop> : <ConsumShop shopId={shopValue}></ConsumShop>}
        </Container>
    );
};

export default Shop;
