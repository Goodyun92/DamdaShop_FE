import { atom } from 'recoil';

const accountState = atom({
    key: 'accountState',
    default: {
        id: '',
        password: '',
        name: '',
        phoneNumber: '',
        myShop: '1', //가게 만들면 가게id
        largeLoc: '',
        fineLoc: '',
        marketLoc: '',
        marketId: '5', //시장 id
        accountNum: '',
    },
});

export default accountState;
