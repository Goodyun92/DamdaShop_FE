import { atom } from 'recoil';

const accountState = atom({
    key: 'accountState',
    default: {
        userId: 9,
        id: 'id',
        password: 'pw',
        name: 'name',
        phoneNumber: '1234',
        // myShop: '1', //가게 만들면 가게id
        largeLoc: '1',
        fineLoc: '1',
        marketLoc: '1',
        marketId: 5, //시장 id
        accountBank: '신한',
        accountNum: '1234',
    },
});

export default accountState;
