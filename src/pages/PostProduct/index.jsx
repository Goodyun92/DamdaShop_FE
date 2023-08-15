import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import back from '../../imgs/Vector2.png';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
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
const PostProduct = () => {
    const [productData, setProductData] = useState({
        categoryId: '',
    });
    const location = useLocation();
    const shopId = location.state.shopId;
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
    return (
        <Container>
            <Nav>
                {/* 현재 상점 홈으로 이동 shopId 써야함 */}
                <BackButton /*onClick={() => navigate(`/shop?shopId=${ }`)}*/>
                    <img src={back} />
                </BackButton>
                <div>판매 상품 등록하기</div>
                <div />
            </Nav>
            <div>
                <span>2개</span>
                <span>이상의 상품 사진이 등록될 시, 첫 번째 사진이</span>
                <span>대표 사진</span>
                <span>이 돼요!</span>
            </div>
            <div>
                <button>이미지 등록</button>
                <div img src="">
                    <button>삭제</button>
                    <div>대표 사진</div>
                </div>
                <div img src="">
                    <button>삭제</button>
                </div>
            </div>
            <div>상품명</div>
            <input type="text" />
            <div>최종가격</div>
            <input type="text" />
            <div>상품 카테고리</div>
            <input type="text" placeholder="등록하시는 상품의 카테고리를 지정해주세요." value={selectedCt} />

            {buttons.map((btn, idx) => (
                <MrkCtBut
                    key={btn}
                    isSelected={selectedCt === btn}
                    onClick={() => {
                        setSelectedCt(btn);
                        setProductData({ categoryId: idx });
                    }}
                >
                    {btn}
                </MrkCtBut>
            ))}

            <button>등록하기</button>
        </Container>
    );
};

export default PostProduct;
