import { atom } from 'recoil';

const locationState = atom({
    key: 'locationState',
    default: [
        {
            name: '서울',
            fine: [
                {
                    name: '강동구',
                    market: [
                        {
                            name: '강동시장1',
                            Id: 1,
                        },
                        {
                            name: '강동시장2',
                            Id: 2,
                        },
                        {
                            name: '강동시장3',
                            Id: 3,
                        },
                    ],
                },
                {
                    name: '강남구',
                    market: [
                        {
                            name: '강남시장1',
                            Id: 4,
                        },
                        {
                            name: '강남시장2',
                            Id: 5,
                        },
                        {
                            name: '강남시장3',
                            Id: 6,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '인천/경기',
            fine: [
                {
                    name: '인천구',
                    market: [
                        {
                            name: '인천시장1',
                            Id: 7,
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
                    name: '강원구',
                    market: [
                        {
                            name: '강원시장1',
                            Id: 8,
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
                    name: '대전구',
                    market: [
                        {
                            name: '대전시장1',
                            Id: 9,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '충북',
            fine: [
                {
                    name: '충북구',
                    market: [
                        {
                            name: '충북시장1',
                            Id: 10,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '광주/전남',
            fine: [
                {
                    name: '광주구',
                    market: [
                        {
                            name: '광주시장1',
                            Id: 11,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '전북',
            fine: [
                {
                    name: '전북구',
                    market: [
                        {
                            name: '전북시장1',
                            Id: 12,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '부산/경남',
            fine: [
                {
                    name: '부산구',
                    market: [
                        {
                            name: '부산시장1',
                            Id: 13,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '대구/경북',
            fine: [
                {
                    name: '경북구',
                    market: [
                        {
                            name: '경북시장1',
                            Id: 14,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
        {
            name: '제주',
            fine: [
                {
                    name: '제주구',
                    market: [
                        {
                            name: '제주시장1',
                            Id: 15,
                        },
                    ],
                },
                // 다른 구 정보...
            ],
        },
    ],
});

export default locationState;
