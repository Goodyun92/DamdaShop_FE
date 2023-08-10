import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchButton = styled.button`
    border: none;
    background-color: white;
`;
const SearchIcon = styled.span`
    font-size: 15px;
    margin-right: 10px;
`;

function GoSearch() {
    const navigate = useNavigate();

    return (
        <SearchButton onClick={() => navigate('/search')}>
            <SearchIcon>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchIcon>
        </SearchButton>
    );
}

export default GoSearch;
