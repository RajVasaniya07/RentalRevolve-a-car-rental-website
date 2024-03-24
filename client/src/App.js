// import logo from './logo.svg';
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Login from './pages/Login';
import BookingCar from "./pages/BookingCar";
import Booking from "./pages/Booking";
import AddCar from "./pages/AddCar";
// import 'antd/dist/antd.css';
import ImageUploadForm from "./components/ImageUploadForm";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";
import UserBookings from "./pages/UserBookings";
import Carchart from "./pages/admindashboard/Usersdata";
import UserBookingtwo from "./pages/admindashboard/Revenue";
import Dashboard from "../src/pages/admindash/UserBookings";
import { Navigate } from "react-router-dom";
import Main from "./pages/Main/index";
import Mainchart from "./pages/Main/graph";
import Chart from "./pages/Main/dashboard";
import Signup from "./pages/Singup/index";
import Login from "./pages/Login/index";
import EmailVerify from "./pages/EmailVerify/index";
import EmailVerify1 from "./pages/EmailVerify1/index";
import EmailVerify2 from "./pages/EmailVerify2/index";
import EmailVerify3 from "./pages/EmailVerify3/index";
import ForgotPassword from "./pages/ForgotPassworduser/index";
import ForgotPassword1 from "./pages/ForgotPasswordseller/index";
import ForgotPassword2 from "./pages/ForgotPasswordadmin/index";
import PasswordReset from "./pages/PasswordReset/index";
import PasswordReset1 from "./pages/PasswordReset1/index";
import PasswordReset2 from "./pages/PasswordReset2/index";
import PasswordReset3 from "./pages/PasswordReset3/index";
import SignupEmployee from "./pages/SingupEmployee/index";
import LoginEmployee from "./pages/LoginEmployee/index";
import EmployeeDash from "./pages/employeeDash/index";
import EmpDash from "./pages/employeeDash/empDash";
import ForgotPasswordemp from "./pages/ForgotPassworduserEmployee";
import AdminMain from "./pages/adminMain/index";
import AdminLogin from "./pages/adminLogin/index";
import AdminSingup from "./pages/adminSingup";
import Red from "../src/pages/red/index";
import AfterHome from "../src/pages/afterHome/index";
import SellerLogin from "../src/pages/SellerLogin/index";
import SellerSingup from "../src/pages/SellerSingup/index";
import Dashboard1 from "./scenes/dashboard";
import Submitdata from "./pages/Submindata/index";

function App() {
  const isAuthenticatedUser = localStorage.getItem("email");
  const user = localStorage.getItem("email");
  const isseller = localStorage.getItem("seller");
  const iscustomer = localStorage.getItem("customer");
  const isadmin = localStorage.getItem("admin");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* {/* <Route path="/admindashboard" element={< UserBooking/>}/> */}
          {/* <Route path="/Mainchart" element={<Mainchart/>}/> */}
          <Route path="/sellerdashboard" element={<Chart />} />
          <Route path="/new" element={<Dashboard1 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/bookingcar"
            element={isseller ? <Main /> : <BookingCar />}
          />
          <Route
            path="/booking/:carid"
            element={isAuthenticatedUser ? <Booking /> : <Login />}
          />
          <Route path="/userbookings" element={<UserBookings />} />
          <Route
            path="/addcar"
            element={isAuthenticatedUser ? <AddCar /> : <SellerLogin />}
          />
          <Route path="/admin" element={isadmin ? <AdminHome /> : <Home />} />
          <Route path="/editcar/:carid" element={<EditCar />} />
          {user && <Route path="/" exact element={<Main />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify1 />} />
          <Route
            path="/sellerUser/:id/verify/:token"
            element={<EmailVerify2 />}
          />
          <Route
            path="/adminUser/:id/verify/:token"
            element={<EmailVerify />}
          />
          <Route path="/forgot-password-user" element={<ForgotPassword />} />
          <Route path="/forgot-password-seller" element={<ForgotPassword1 />} />
          <Route path="/forgot-password-admin" element={<ForgotPassword2 />} />

          <Route
            path="/password-reset-user/:id/user/:token"
            element={<PasswordReset />}
          />
          <Route
            path="/password-reset-seller/:id/seller/:token"
            element={<PasswordReset1 />}
          />
          <Route
            path="/password-reset-admin/:id/admin/token"
            element={<PasswordReset2 />}
          />
          <Route path="/adminlogin" exact element={<AdminLogin />} />
          <Route path="/adminsingup" exact element={<AdminSingup />} />
          {/* <Route path="/adminMain" exact element={<AdminMain/>} /> */}
          {/* <Route path="/red"  element={isAuthenticatedUser ?<Red />:  <Login/>} /> */}
          <Route
            path="/afterHome"
            exact
            element={isseller ? <Home /> : <AfterHome />}
          />
          <Route path="/SellerLogin" exact element={<SellerLogin />} />
          <Route path="/SellerSingup" exact element={<SellerSingup />} />
          <Route path="/Main" exact element={isseller ? <Main /> : <Home />} />
          <Route path="/EmployeeSignup" exact element={<SignupEmployee />} />
          <Route path="/EmployeeLogin" exact element={<LoginEmployee />} />
          <Route
            path="/EmployeeUser/:id/verify/:token"
            element={<EmailVerify3 />}
          />
          <Route
            path="/forgot-password-employee"
            element={<ForgotPasswordemp />}
          />
           <Route
            path="/empdash"
            element={<EmpDash />}
          />
          <Route
            path="/submitdata"
            element={<Submitdata/>}
          />
          <Route path="/Submitdata/:id" exact element={<Submitdata/>}  />
          <Route
            path="/password-reset-employee/:id/admin/:token"
            element={<PasswordReset3 />}
          />
          <Route path="/EmployeeDash" element={<EmployeeDash />} />
        </Routes>
      </BrowserRouter>
      {/* <ImageUploadForm /> */}
    </div>
  );
}

export default App;
