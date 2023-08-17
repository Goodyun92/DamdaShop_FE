import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div`
    width: 100%;
`;
const AfterCreateShop = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const [myShop, setMyShop] = useState({});

    console.log(account);
    console.log(myShop);

    //axios로 userid로 내 shop받아옴
    axios
        .get(
            `https://ssudamda.shop
        ​/users​/users​/${account.userId}​/store`
        )
        .then((Response) => {
            setMyShop(...Response.data);
            console.log(myShop);
        })
        .catch((err) => {
            console.error(err);
        });

    // const shopId = 1; //임시

    return (
        <Container>
            <div>
                <img src="" alt="" />
                <div>가게 등록이</div>
                <div>완료되었어요</div>
            </div>
            <button onClick={() => navigate(`/shop?shopId=${myShop.storeId}`)}>내 가게 보러가기</button>
            <button onClick={() => navigate('/mainHome')}>닫기</button>
        </Container>
    );
};

export default AfterCreateShop;
