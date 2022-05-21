import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ChiTietChuyenXe from './components/ChiTietChuyenXe';
import DatVe from './components/DatVe';
import ThanhToan from './components/ThanhToan';

function App() {
  return (
    <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/chuyenXe/:chuyenXeId' element={<ChiTietChuyenXe />} />
            <Route path='/chuyenXe/:chuyenXeId/datVe' element={<DatVe />} />
            <Route path='/chuyenXe/:chuyenXeId/thanhToan' element={<ThanhToan />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </>
  );
}

export default App;
