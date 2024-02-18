// import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import Booking from './pages/Booking';
import AddCar from './pages/AddCar';
import UserBookings from './pages/UserBookings';
// import 'antd/dist/antd.css';
import ImageUploadForm from './components/ImageUploadForm';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

import { Navigate } from "react-router-dom";
import Main from "./pages/Main/index";
import Signup from "./pages/Singup/index";
import Login from "./pages/Login/index";
import EmailVerify from "./pages/EmailVerify/index";
import EmailVerify1 from "./pages/EmailVerify1/index";
import ForgotPassword from "./pages/ForgotPassword/index";
import PasswordReset from "./pages/PasswordReset/index";
import AdminMain from "./pages/adminMain/index";
import AdminLogin from "./pages/adminLogin/index";
import AdminSingup from "./pages/adminSingup";

function App() {
  const isAuthenticatedUser = localStorage.getItem("token");
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookingcar" element={<BookingCar />} />
          <Route path="/booking/:carid" element={isAuthenticatedUser ?<Booking />:  <Login/>} /> 
          <Route path='/userbookings' element={<UserBookings/>} />       
            <Route path="/addcar" element={<AddCar />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/editcar/:carid" element={<EditCar />} />

          {user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify1 />} />
			<Route path="/adminUser/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			<Route path="/adminlogin" exact element={<AdminLogin/>} />
			<Route path="/adminsingup" exact element={<AdminSingup/>} />
			<Route path="/adminlogin" exact element={<AdminLogin/>} />
			<Route path="/adminMain" exact element={<AdminMain/>} />
        </Routes>
      </BrowserRouter>
      {/* <ImageUploadForm /> */}
    </div>
  );
}

export default App;
