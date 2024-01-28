// import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import Booking from './pages/Booking';
import AddCar from './pages/AddCar';
// import 'antd/dist/antd.css';
import ImageUploadForm from './components/ImageUploadForm';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookingcar" element={<BookingCar />} />
          <Route path="/booking/:carid" element={<Booking />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/editcar/:carid" element={<EditCar />} />
        </Routes>
      </BrowserRouter>
      {/* <ImageUploadForm /> */}
    </div>
  );
}

export default App;
