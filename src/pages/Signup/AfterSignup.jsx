import check from '../../imgs/afterSignup.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Icon = styled.img`
    margin-top: 250px;
`;
const Content = styled.div`
    margin-top: 15px;
    font-family: 'pretendard';
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
`;

const Line = styled.span`
    margin-top: 251px;
    color: #707070;
    font-family: 'pretendard';
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;

    position: relative;
    display: inline-block;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 45%; // 선의 길이
        height: 0.5px; // 선의 두께
        background-color: #707070; // 선의 색상
    }

    &::before {
        left: -80px; // 텍스트 앞의 선의 위치 조절
    }

    &::after {
        right: -80px; // 텍스트 뒤의 선의 위치 조절
    }
`;

const ButtonLogin = styled.button`
    margin-top: 12px;
    width: 333px;
    height: Fixed (41px);
    padding: 14px 40px 14px 40px;
    border-radius: 5px;
    border: none;
    gap: 10px;

    background: #609966;
    color: white;
    font-family: 'Pretendard';
    font-size: 14px;
    font-weight: 550;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
`;

const ButtonGoMain = styled.button`
    margin-top: 15px;
    width: 333px;
    height: Fixed (41px);
    padding: 14px 40px 14px 40px;
    border-radius: 5px;
    border: none;
    gap: 10px;

    background: #6099661a;
    color: #609966;
    font-family: 'pretendard';
    font-size: 14px;
    font-weight: 550;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
`;

const AfterSignup = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Icon src={check} />
            <Content>
                <div>회원가입이</div>
                <div>완료되었어요</div>
            </Content>
            <Line>내 가게를 등록해 운영하고 싶다면?</Line>
            <ButtonLogin onClick={() => navigate('/createShop')}>내 가게 만들기</ButtonLogin>
            <ButtonGoMain onClick={() => navigate('/mainHome')}>닫기</ButtonGoMain>
        </Container>
    );
};

export default AfterSignup;
