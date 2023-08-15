import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;
const AfterCreateShop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const shopId = location.state.shopId;

    return (
        <Container>
            <div>
                <img src="" alt="" />
                <div>가게 등록이</div>
                <div>완료되었어요</div>
            </div>
            <button onClick={() => navigate(`/shop?shopId=${shopId}`)}>내 가게 보러가기</button>
            <button onClick={() => navigate('/mainHome')}>닫기</button>
        </Container>
    );
};

export default AfterCreateShop;
