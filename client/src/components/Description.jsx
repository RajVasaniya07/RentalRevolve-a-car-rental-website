import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import { bookCar } from "../redux/actions/bookingActions";
import moment from "moment";

import { useParams } from "react-router-dom"; 
const minDate = moment();
const { RangePicker } = DatePicker;
const disabledDate = (current) => {
  return current && current < minDate;
};

function generateReceiptId() {
  const timestamp = Date.now().toString(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 10000).toString(); // Generate a random number
  return timestamp + '-' + randomNum; // Combine timestamp and random number
}




const Description = () => {
  // const minDate = moment();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const { carid } = useParams(); 
  // const [car, setcar] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);



  // const disabledDate = (current) => {
  //   return current && current < minDate;
  // };

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const foundCar = cars.find((o) => o._id === carid);
      setCar(foundCar);
      console.log("Found car:", foundCar); // Check car content
    }
  }, [cars, dispatch, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);

    if (driver) {
      setTotalAmount(totalAmount + totalHours * 30);
    }
  }, [driver, totalHours]);

  const selectTimeSlots = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setFrom(dateStrings[0]);
      setTo(dateStrings[1]);
      setTotalHours(dates[1].diff(dates[0], "hours"));
    } else {
      // Handle case where dates are not properly selected
      console.error("Invalid dates selected");
    }
  };

  // const selectTimeSlots = (dates, dateStrings) => {
  //   setFrom(dateStrings[0]);
  //   setTo(dateStrings[1]);
  //   setTotalHours(dates[1].diff(dates[0], "hours"));
  // };
  async function bookNow() {
    try {

      const overlappingSlot = car.bookedTimeSlots.find(slot => {
        return (
            (moment(from).isBetween(slot.from, slot.to) || moment(to).isBetween(slot.from, slot.to)) ||
            (moment(slot.from).isBetween(from, to) || moment(slot.to).isBetween(from, to))
        );
    });

    if (overlappingSlot) {
        alert('Selected time slot is already booked. Please choose a different time slot.');
        return;
    }

        // Generate a unique receipt ID
        const receiptId = generateReceiptId();

        const reqObj = {
            user: localStorage.getItem("id"),
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
                from,
                to,
            },
        };

        // Step 1: Make payment request
        const paymentResponse = await fetch("http://localhost:5000/order", {
            method: "POST",
            body: JSON.stringify({
                amount: totalAmount * 100, // Amount should be in paisa (multiply by 100 for INR)
                currency: "INR",
                receipt: receiptId, // Use the generated receipt ID
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const paymentOrder = await paymentResponse.json();

        // Step 2: Initialize Razorpay payment
        var options = {
            "key": "rzp_test_Qq4Kg4885FDFcJ", // Enter the Key ID generated from the Dashboard
            "amount": totalAmount * 100, // Amount is in currency subunits. Default currency is INR.
            "currency": "INR",
            "name": "RentalRevolve", // Your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": paymentOrder.id, // Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                try {
                    // Dispatch action to handle booking
                    dispatch(bookCar({
                      ...reqObj, // Include the booking details
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_signature: response.razorpay_signature,
                  }));
                  
                } catch (error) {
                    console.error("Error during booking:", error);
                }
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        // Initialize Razorpay payment
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    } catch (error) {
        console.error("Error during booking:", error);
    }
}


  
  return (
  <>
    {/* {loading && <Spinner />} */}
    {car && (
      <div style={{height:"600px",width:"700px", marginTop:"100px"}}>
        <section className="description" >
          <p className="pre" style={{ fontSize: "50px" }}>{car.name}</p>
          <div className="price">
            <p> <b>{car.rentPerHour}</b> Rent Per hour/-</p>
            <div className="main-tag">
              <p style={{ fontSize: "16px" }}>Fuel Type : {car.fuelType}</p>
            </div>
            <p>Max Persons :<b>{car.capacity}</b></p>
          </div>
        </section>
          <Divider dashed style={{ borderColor: "black" }}>
          Select Time Slots
        </Divider>

        <RangePicker
          disabledDate={disabledDate}
          showTime={{ format: "HH:mm" }}
          format="MMM DD YYYY HH:mm"
          onChange={selectTimeSlots}
        />

        
<br />

  <button
    className="btn1 mt-2"
    onClick={() => {
    setShowModal(true);
    }}
  >
  See Booked Slots
</button>

  {from && to &&(
<div>
<p>Total Hours : {totalHours}</p>
<p>Rent Per Hour : <b>{car.rentPerHour}</b></p>
<Checkbox
  onChange={(e) => {
    if (e.target.checked) {
      setDriver(true);
    } else {
      setDriver(false);
    }
  }}
>
  Driver Required
</Checkbox>

<h4>Total Amount : {totalAmount}</h4>

<button className="btn1" onClick={bookNow}>
  Book Now
</button>
</div>
)}

 </div>
    )}

{car.name && (
        <Modal
          open={showModal}
          closable={false}
          footer={false}
          title="Booked time slots"
        >
          
          <div className="p-2">
            {car.bookedTimeSlots.map((slot) => {
              return (
                <button className="btn1 mt-2">
                  {slot.from} - {slot.to}
                </button>
                
              );
              
            })}
            <br></br>
            <br></br>
          
            <div className="text-right mt-5" >
              <button className="btn1" onClick={() => setShowModal(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </Modal>
      )}


  </>
);

};

export default Description;
