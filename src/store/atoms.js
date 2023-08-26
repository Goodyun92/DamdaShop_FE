import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const accountState = atom({
    key: 'accountState',
    default: {
        userId: 1,
        id: 'myId',
        password: 'myPw',
        name: 'name',
        phoneNumber: '1234',
        largeLoc: '1',
        fineLoc: '1',
        marketLoc: '관악중부시장', //1번 가게 이름으로 초기화
        marketId: 1, //시장 id 1번으로 초기화
        accountBank: '신한',
        accountNum: '1234',
    },
    effects_UNSTABLE: [persistAtom],
});

export default accountState;
