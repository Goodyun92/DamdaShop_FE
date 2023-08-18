import { useLocation, useNavigate } from 'react-router-dom';
import back from '../../imgs/Vector2.png';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import accountState from '../../store/atoms';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;
const Form = styled.form``;

const EditProduct = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useRecoilState(accountState);
    const location = useLocation();
    const shopId = location.state.shopId;
    const [productData, setProductData] = useState({
        ...location.state.product,
    });

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value });
    };

    const complete = () => {
        axios
            .patch(`https://ssudamda.shop/products/update/${productData.productId}`, {
                categoryId: productData.category.categoryId,
                price: productData.price,
                productDescription: productData.productDescription,
                productName: productData.productName,
                stockQuantity: productData.stockQuantity,
            })
            .then(() => {
                navigate('shop', {
                    state: {
                        shopId: shopId,
                    },
                });
                //성공시 해당 가게 페이지로 이동
            })
            .catch();
    };

    return (
        <Container>
            {shopId && (
                <div>
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
                        <button type="submit" onClick={complete}>
                            수정하기
                        </button>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default EditProduct;
