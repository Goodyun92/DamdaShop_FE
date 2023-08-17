import { atom } from 'recoil';

const accountState = atom({
    key: 'accountState',
    default: {
        userId: 9,
        id: 'id',
        password: 'pw',
        name: 'name',
        phoneNumber: '1234',
        largeLoc: '1',
        fineLoc: '1',
        marketLoc: '1', //1번 가게 이름으로 초기화
        marketId: 5, //시장 id 1번으로 초기화
        accountBank: '신한',
        accountNum: '1234',
    },
});

export default accountState;
