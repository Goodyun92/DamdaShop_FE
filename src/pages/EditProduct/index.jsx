import { useLocation } from 'react-router-dom';
import back from '../../imgs/Vector2.png';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;
const Nav = styled.div``;
const BackButton = styled.button``;

const EditProduct = () => {
    const location = useLocation();
    const shopId = location.state.shopId;
    const productId = location.state.productId;

    //productId를 통해 product 정보 띄워줘야됨
    //파라미터들을 객체로 넘기기?모든 정보 있게

    return (
        <Container>
            <Nav>
                {/* 현재 상점 홈으로 이동 shopId 써야함 */}
                <BackButton /*onClick={() => navigate(`/shop?shopId=${ }`)}*/>
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
            <div>상품명</div>
            <input type="text" />
            <div>가격</div>
            <input type="text" />
            <div>상품 설명</div>
            <input type="text" />

            <button>수정하기</button>
        </Container>
    );
};

export default EditProduct;
