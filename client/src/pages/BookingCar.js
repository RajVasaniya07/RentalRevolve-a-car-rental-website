import { Row, Col, DatePicker } from "antd";
import CarCard from "../components/CarCard";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Link } from "react-router-dom";
import moment from "moment";
import Fuse from "fuse.js"; // Import Fuse.js
import Footer from "../components/Footer";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { RangePicker } = DatePicker;

const BookingCar = () => {
  const minDate = moment();
  const [totalCars, setTotalcars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sliderValues, setSliderValues] = useState({
    capacity: 0,
    year: 2000,
    mileage: 0,
  });

  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  useEffect(() => {
    // Filter cars based on all parameters
    const filteredCars = cars.filter((car) => {
      // Check if car matches search term
      const fuse = new Fuse([car], {
        keys: ["name", "fuelType"],
        includeScore: true,
        threshold: 0.4,
      });
      const searchResults = fuse.search(searchTerm);
      const searchMatch = searchResults.length > 0;

      // Check if car matches capacity, year, and mileage criteria
      const capacityMatch = car.capacity >= sliderValues.capacity;
      const yearMatch = car.year >= sliderValues.year;
      const mileageMatch = car.mileage >= sliderValues.mileage;

      // Return true if car matches all criteria, or if no filters are applied
      return (
        (!searchTerm || searchMatch) &&
        capacityMatch &&
        yearMatch &&
        mileageMatch
      );
    });

    setTotalcars(filteredCars);
  }, [cars, searchTerm, sliderValues]);

  const disabledDate = (current) => {
    return current && current < minDate;
  };

  function setFilter(dates, dateStrings) {
    var selectedFrom = moment(dateStrings[0]);
    var selectedTo = moment(dateStrings[1]);

    var temp = [];

    for (var car of cars) {
      var isAvailable = true;

      for (var booking of car.bookedTimeSlots) {
        var bookingFrom = moment(booking.from);
        var bookingTo = moment(booking.to);

        if (
          selectedFrom.isBetween(bookingFrom, bookingTo) ||
          selectedTo.isBetween(bookingFrom, bookingTo) ||
          bookingFrom.isBetween(selectedFrom, selectedTo) ||
          bookingTo.isBetween(selectedFrom, selectedTo)
        ) {
          // If the selected time slot overlaps with any booked time slot, mark the car as unavailable
          isAvailable = false;
          break; // No need to check further booked time slots for this car
        }
      }

      if (isAvailable) {
        temp.push(car);
      }
    }

    setTotalcars(temp);
  }

  const handleLogout = () => {
    window.location = "/BookingCar";
  };

  const onclick = () => {
    window.location = "/";
  };

  const onclick1 = () => {
    window.location = "/userbookings";
  };

  const handleLogout1 = () => {
    if (localStorage.getItem("email")) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("seller");
      localStorage.removeItem("customer");
      localStorage.removeItem("employee");

      window.location = "/";
    } else {
      window.location = "/afterHome";
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSliderChange = (key, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <div>
      <header className="header" data-header>
        <div className="container">
          <div className="overlay" data-overlay />
          <h1
            className="h2"
            style={{ fontSize: "35px", marginTop: "10px", color: "#1A9DF4" }}
          >
            RentalRevolve
          </h1>

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
              <span id="aria-label-txt">Previous Bookings</span>
            </button>

            <button
              className="btn"
              aria-labelledby="aria-label-txt"
              href="/BookingCar"
              onClick={handleLogout}
            >
              <span id="aria-label-txt">Explore cars</span>
            </button>
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

      <Row className="mt-40 flex" justify="center">
        
        <Col
          lg={8}
          sm={24}
          
        >
          <RangePicker
          style={{marginLeft:"150px"}}
            disabledDate={disabledDate}
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={setFilter}
          />
        </Col>
        <Col
          lg={4}
          sm={24}
        >
          <input
          style={{marginLeft:"120px", backgroundColor:"white"}}
            type="text"
            placeholder="Search car by Name and Fueltype.."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        
        <Col
          lg={12}
          sm={24}
          
        >
          
          <div style={{ marginRight: "20px",marginLeft:"220px", width: "300px",backgroundColor:"white"}}>
            <p>Capacity: {sliderValues.capacity}</p>
            <Slider
              min={0}
              max={10}
              defaultValue={sliderValues["capacity"]}
              onChange={(value) => handleSliderChange("capacity", value)}
            />
          </div>

          <div style={{ marginRight: "20px",marginLeft:"220px", width: "300px",backgroundColor:"white" }}>
            <p>Year: {sliderValues.year}</p>
            <Slider
              min={2000}
              max={2024}
              defaultValue={sliderValues["year"]}
              onChange={(value) => handleSliderChange("year", value)}
            />
          </div>

          <div style={{ marginRight: "20px",marginLeft:"220px", width: "300px" ,backgroundColor:"white"}}>
            <p>Mileage: {sliderValues.mileage}</p>
            <Slider
              min={0}
              max={100}
              defaultValue={sliderValues["mileage"]}
              onChange={(value) => handleSliderChange("mileage", value)}
            />
          </div>
          
        </Col>
        
        
      </Row>

      <ul className="featured-car-list" style={{ marginLeft: "200px" , marginRight:"200px" ,marginTop:"10px"}}>
        {totalCars.map((car) => (
          <CarCard key={car._id} carData={car} />
        ))}
      </ul>
<br></br>
      <Footer />
    </div>
  );
};

export default BookingCar;