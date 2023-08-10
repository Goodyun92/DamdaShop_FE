import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async () => {
        try {
            // 백엔드 API
            const response = await axios.get('https://your-api-endpoint/search', {
                params: {
                    query: searchTerm,
                },
            });

            // 결과를 상태에 저장합니다.
            setSearchResults(response.data.products);
        } catch (error) {
            console.error('Search error:', error);
            alert('An error occurred during search');
        }
    };

    return (
        <div>
            <input type="text" placeholder="Search for a product..." value={searchTerm} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
            <div>
                <h2>Search Results:</h2>
                <ul>
                    {searchResults.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchPage;
