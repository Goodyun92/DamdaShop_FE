import { atom } from 'recoil';

const accountState = atom({
    key: 'accountState',
    default: {
        id: '',
        password: '',
        //location : 상도시장
    },
});

export default accountState;
