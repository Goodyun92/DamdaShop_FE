import './App.css';
import { RecoilRoot } from 'recoil';
import MainHome from './pages/MainHome';
import Search from './pages/Search';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AfterSignup from './pages/Signup/AfterSignup';
import ShowProducts from './pages/ShowProducts';
import ShowMarkets from './pages/ShowMarkets';
import Frame from './components/Frame';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import CreateShop from './pages/CreateShop';
import Shop from './pages/Shop';
import PostProduct from './pages/PostProduct';
import EditProduct from './pages/EditProduct';
import MyPage from './pages/MyPage';
import OrderHistory from './pages/OrderHistory';
import MyStamp from './pages/MyStamp';
import AfterCreateShop from './pages/AfterCreateShop';

//mypage 추가

// const Container = styled.div`
//     background-color: white;
//     width: 375px;
//     height: 812px;
// `;

function App() {
    return (
        <RecoilRoot>
            <Frame>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/mainHome" element={<MainHome />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/afterSignup" element={<AfterSignup />} />
                        <Route path="/showProducts" element={<ShowProducts />} />
                        <Route path="/showMarkets" element={<ShowMarkets />} />
                        <Route path="/createShop" element={<CreateShop />} />
                        <Route path="/afterCreateShop" element={<AfterCreateShop />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/postProduct" element={<PostProduct />} />
                        <Route path="/editProduct" element={<EditProduct />} />
                        <Route path="/myPage" element={<MyPage />} />
                        <Route path="/orderHistory" element={<OrderHistory />} />
                        <Route path="/myStamp" element={<MyStamp />} />
                    </Routes>
                </Router>
            </Frame>
        </RecoilRoot>
    );
}

export default App;
