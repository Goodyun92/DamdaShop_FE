import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import back from '../../imgs/Vector2.png';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
const Form = styled.form``;
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
    const navigate = useNavigate();

    const [account, setAccount] = useRecoilState(accountState);
    const location = useLocation();
    const shopId = location.state.shopId;
    const [productData, setProductData] = useState({
        price: 0,
        productDescription: '',
        productName: '',
        stockQuantity: 10,
    });
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

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value });
    };

    //post할때 shop정보도 같이 줘야하나?
    const complete = () => {
        axios
            .post('https://ssudamda.shop/products/register', {
                categoryId: productData.categoryId + 1,
                marketId: account.marketId,
                price: productData.price,
                productDescription: productData.productDescription,
                productName: productData.productName,
                stockQuantity: productData.stockQuantity,
                storeId: shopId,
            })
            .then(() => {
                navigate('shop', {
                    state: {
                        shopId: shopId,
                    },
                });
            })
            .catch();
    };

    return (
        <Container>
            <Nav>
                {/* 현재 상점 홈으로 이동 shopId 써야함 */}
                <BackButton
                    onClick={() =>
                        navigate('shop', {
                            state: {
                                shopId: shopId,
                            },
                        })
                    }
                >
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

            <Form>
                <div>상품명</div>
                <input
                    type="text"
                    name="productName"
                    onChange={handleChange}
                    value={productData.productName}
                    required
                />
                <div>최종가격</div>
                <input type="text" name="price" onChange={handleChange} value={productData.price} required />
                <div>상품 카테고리</div>
                <input
                    type="text"
                    placeholder="등록하시는 상품의 카테고리를 지정해주세요."
                    name="categoryId"
                    onChange={handleChange}
                    value={selectedCt}
                    required
                />
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
                <button type="submit" onClick={complete}>
                    등록하기
                </button>
            </Form>
        </Container>
    );
};

export default PostProduct;
