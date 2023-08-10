import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ShowProducts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //파라미터로 전달해준 값 취득
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    //쿼리 취득
    const btnValue = params.get('productCategory');

    // useEffect(() => {
    //     const apiUrl = `https://your-api-endpoint.com/data?button=${btnValue}`;

    //     axios
    //         .get(apiUrl)
    //         .then((response) => {
    //             setData(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, [btnValue]);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error occurred: {error.message}</div>;

    return (
        <div>
            <h1>{btnValue}</h1>
            <h2>Content for Button {btnValue.toUpperCase()}</h2>
            {/* 데이터 구조에 따라 렌더링 방법을 조정하세요. */}
            {/* <p>{data.content}</p> */}
        </div>
    );
}

export default ShowProducts;
