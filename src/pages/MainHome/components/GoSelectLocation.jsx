import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MarketButton = styled.button`
    /* 디자인은 원하시는 대로 수정해주세요 */
    border: none;
    background-color: #e8e8e8;
    font-family: 'pretendard';
`;

const GoSelectLocation = () => {
    const navigate = useNavigate();

    return <MarketButton onClick={() => navigate('/selectLocation')}>변경&gt;</MarketButton>;
};

export default GoSelectLocation;
