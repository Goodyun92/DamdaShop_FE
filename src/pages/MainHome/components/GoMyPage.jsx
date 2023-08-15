import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginButton = styled.button`
    border: none;
    background-color: white;
    font-size: 15px;
`;

function GoMyPage() {
    const navigate = useNavigate();

    return (
        <LoginButton onClick={() => navigate('/myPage')}>
            <FontAwesomeIcon icon={faUser} />
        </LoginButton>
    );
}

export default GoMyPage;
