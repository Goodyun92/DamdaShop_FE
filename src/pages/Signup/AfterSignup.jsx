import check from '../../imgs/afterSignup.png';
import styled from 'styled-components';

const Container = styled.div`
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

const Line = styled.div`
    margin-top: 210px;
    width: 315px;
    border-bottom: 2px solid #e8e8e8;
`;

const ButtonLogin = styled.button`
    margin-top: 20px;
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

const AfterSignup = () => {
    return (
        <Container>
            <Icon src={check} />
            <Content>
                <div>회원가입이</div>
                <div>완료되었어요</div>
            </Content>
            <Line />
            <ButtonLogin>로그인하러 가기</ButtonLogin>
        </Container>
    );
};

export default AfterSignup;
