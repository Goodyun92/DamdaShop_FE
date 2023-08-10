import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';

const LocName = styled.div`
    font-family: 'pretendard';
    font-size: 16px;
`;

const GetMyLocation = () => {
    // recoil에서 현재 내 계정 정보를 가져와서 참조
    // axios get으로 현재 내 계정의 시장 정보를 가져온다
    // 이 컴포넌트 없애고 index.jsx에서 해도될듯

    return <LocName>상도 시장</LocName>;
};

export default GetMyLocation;
