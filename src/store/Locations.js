import { atom } from 'recoil';

const locationState = atom({
    key: 'locationState',
    default: [
        {
            name: '서울',
            fine: [
                {
                    name: '관악구',
                    market: [
                        {
                            name: '관악중부시장',
                            Id: 1,
                        },
                    ],
                },
                {
                    name: '동작구',
                    market: [
                        {
                            name: '상도전통시장',
                            Id: 2,
                        },
                    ],
                },
                {
                    name: '마포구',
                    market: [
                        {
                            name: '망원시장',
                            Id: 3,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '인천',
            fine: [
                {
                    name: '부평구',
                    market: [
                        {
                            name: '부평시장',
                            Id: 4,
                        },
                    ],
                },
                {
                    name: '계양구',
                    market: [
                        {
                            name: '작전시장',
                            Id: 5,
                        },
                    ],
                },
                {
                    name: '미추홀구',
                    market: [
                        {
                            name: '신기시장',
                            Id: 6,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '경기',
            fine: [
                {
                    name: '분당구',
                    market: [
                        {
                            name: '돌마시장',
                            Id: 7,
                        },
                    ],
                },
                {
                    name: '중원구',
                    market: [
                        {
                            name: '성호시장',
                            Id: 8,
                        },
                    ],
                },
                {
                    name: '수정구',
                    market: [
                        {
                            name: '중앙시장',
                            Id: 9,
                        },
                    ],
                },
                {
                    name: '장안구',
                    market: [
                        {
                            name: '정자시장',
                            Id: 10,
                        },
                    ],
                },
                {
                    name: '영통구',
                    market: [
                        {
                            name: '국제시장',
                            Id: 11,
                        },
                    ],
                },
                {
                    name: '권선구',
                    market: [
                        {
                            name: '권선종합시장',
                            Id: 12,
                        },
                    ],
                },
                {
                    name: '만안구',
                    market: [
                        {
                            name: '박달시장',
                            Id: 13,
                        },
                    ],
                },
                {
                    name: '동안구',
                    market: [
                        {
                            name: '관양시장',
                            Id: 14,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '강원',
            fine: [
                {
                    name: '횡성군',
                    market: [
                        {
                            name: '횡성전통시장',
                            Id: 15,
                        },
                    ],
                },
                {
                    name: '화천군',
                    market: [
                        {
                            name: '화천시장',
                            Id: 16,
                        },
                    ],
                },
                {
                    name: '정선군',
                    market: [
                        {
                            name: '정선아리랑시장',
                            Id: 17,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '대전/충남',
            fine: [
                {
                    name: '예산군',
                    market: [
                        {
                            name: '예산시장',
                            Id: 18,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '부산',
            fine: [
                {
                    name: '해운대구',
                    market: [
                        {
                            name: '해운대시장',
                            Id: 19,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
    ],
});

export default locationState;
