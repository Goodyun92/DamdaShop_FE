import './App.css';
import { RecoilRoot } from 'recoil';
import MainHome from './pages/MainHome';
import Search from './pages/Search';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ShowProducts from './pages/ShowProducts';
import Frame from './components/Frame';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

//login 여부 확인 해서 mypage or login 둘중 하나로 페이지 이동

const Container = styled.div`
    background-color: white;
    width: 375px;
    height: 812px;
`;

function App() {
    return (
        <RecoilRoot>
            <Frame>
                <Container>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" />} />
                            <Route path="/mainHome" element={<MainHome />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/showProducts" element={<ShowProducts />} />
                        </Routes>
                    </Router>
                </Container>
            </Frame>
        </RecoilRoot>
    );
}

export default App;
