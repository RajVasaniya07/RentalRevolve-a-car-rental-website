import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/actions/bookingActions";
import { Col, Row, DatePicker } from "antd";
import Spinner from "../../components/Spinner";
import moment from "moment";
import getUser from "../getUser";
import getSeller from "../getSeller";
const { RangePicker } = DatePicker;

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = localStorage.getItem("id");
  const users = getUser();
  const sellers = getSeller();

  // Create a new Date object
const currentDate = new Date();

// Define month names
const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Get the individual components of the date
const month = monthNames[currentDate.getMonth()];
const day = currentDate.getDate();
const year = currentDate.getFullYear();

// Create a formatted date string
const todayDate = `${month} ${day < 10 ? '0' + day : day} ${year}`;


const [selectedDate, setSelectedDate] = useState(todayDate);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const handleLogout = () => {
    window.location = "/BookingCar";
  };

  const onclick = () => {
    window.location = "/";
  };

  const onclick1 = () => {
    window.location = "/employeeDash";
  };

  const handleLogout1 = () => {
    if (localStorage.getItem("email")) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("seller");
      localStorage.removeItem("customer");
      localStorage.removeItem('employee');

      window.location = "/";
    } else {
      window.location = "/afterHome";
    }
  };
  const minDate = moment();

  const disabledDate = (current) => {
    return current && current < minDate;
  };
  function filteredBookings(date) {
   
      const formattedDate = date.format("MMM DD YYYY");
      console.log(formattedDate);

    setSelectedDate(formattedDate);
  }

  return (
    <>
      <header className="header" data-header>
        <div className="container">
          <div className="overlay" data-overlay />
          <a href="#" className="logo"></a>
          <nav className="navbar" data-navbar>
            <ul className="navbar-list"></ul>
          </nav>
          <div className="header-actions">
            <button
              className="btn"
              aria-labelledby="aria-label-txt"
              onClick={onclick}
            >
              <span id="aria-label-txt">Home</span>
            </button>

            <button
              className="btn"
              aria-labelledby="aria-label-txt"
              onClick={handleLogout1}
            >
              <span id="aria-label-txt">
                {" "}
                {localStorage.getItem("email") ? "Logout" : "Login"}
              </span>
            </button>

            <button
              className="btn"
              aria-labelledby="aria-label-txt"
              onClick={onclick1}
            >
              <span id="aria-label-txt">Back page</span>
            </button>

            {/* <button
              className="btn"
              aria-labelledby="aria-label-txt"
              href="/BookingCar"
              onClick={handleLogout}
            >
              <span id="aria-label-txt">Explore cars</span>
            </button> */}
            <button className="btn user-btn" aria-label="Profile">
              <ion-icon name="person-outline" />
            </button>

            <button
              className="nav-toggle-btn"
              data-nav-toggle-btn
              aria-label="Toggle Menu"
            >
              <span className="one" />
              <span className="two" />
              <span className="three" />
            </button>
          </div>
        </div>
      </header>


      

      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>
      <br></br>
      <br></br>

      <DatePicker
        onChange={filteredBookings}
        placeholder="Select a date"
        // disabledDate={disabledDate}
        format="MMM DD YYYY"
        style={{ marginBottom: "16px" }}
      />

      <h3 className="text-center mt-2">My Bookings</h3>
      {/* {users.map((user) => {
        return(<>{user.email}<br></br></>);
      })
    }
    <br></br>
    {sellers.map((seller) => {
        return(<>{seller.email}<br></br></>);
      })
    } */}
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings.map((booking) => {
            const date1 = booking.bookedTimeSlots.from.slice(0,11);
            // console.log(date1);
            if(selectedDate===date1 ){
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Total hours : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per hour : <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total amount : <b>{booking.totalAmount}</b>
                    </p>
                    <p>
                      Car Id : <b>{booking.car._id}</b>
                    </p>
                  </Col>
  
                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id : <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>
  
                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.car.image}
                      height="140"
                      className="p-2"
                    />
                  </Col>
                </Row>
              );
            }
            else{
              return <></>;
            }
            
          })}
        </Col>
      </Row>
    </>
  );
}

export default UserBookings;
