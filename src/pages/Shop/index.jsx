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
    const shopValue = location.state.storeId;
    console.log(shopValue);

    const [myShop, setMyShop] = useState({});
    const [switched, setSwitched] = useState(false);

    useEffect(() => {
        //axios로 userid로 내 shop받아옴
        const fetchData = async () => {
            console.log('start');
            console.log(account.userId);
            try {
                const response = await axios.get(`https://ssudamda.shop/users/users/${account.userId}/store`);
                setMyShop({ ...response.data });
                console.log('성공');
                console.log(myShop);
                setSwitched(true);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [shopValue]);

    console.log(myShop);

    //const myShop = 1; //임시
    const shopType = shopValue === myShop?.storeId; //true: 판매자화면 false: 구매자 화면
    console.log(shopType);

    //파라미터로 shopId넘겨줌
    return (
        <Container>
            {switched && (
                <div>
                    {shopType ? (
                        <SellerShop shopId={shopValue}></SellerShop>
                    ) : (
                        <ConsumShop shopId={shopValue}></ConsumShop>
                    )}
                </div>
            )}
            <div>{myShop.storeName}</div>
        </Container>
    );
};

export default Shop;
