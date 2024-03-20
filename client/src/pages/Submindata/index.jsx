import React, { useState, useEffect } from "react";
import "./RentalForm.css"; // Import your CSS file
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { submitRentalForm } from "../../redux/actions/rentalActions";
import { useParams } from "react-router-dom";
import { getAllRental, editRental } from "../../redux/actions/rentalActions";
import { getAllBookings } from "../../redux/actions/bookingActions";
const RentalForm = () => {
  const [renterName, setRenterName] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [suggestionComplaint, setSuggestionComplaint] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [documentVerified, setDocumentVerified] = useState(false);
  const [carId, setCarId] = useState(""); // New state for Car ID
  const [dropTimeValue, setDropTimeValue] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { rental } = useSelector((state) => state.rentalReducer);
  // const { bookings } = useSelector((state) => state.bookingsReducer);
  // const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRental());
    // dispatch(getAllBookings());
    // console.log(bookings)

  }, []);
  const rent1 = rental.find((rent) => rent._id === id);

  useEffect(() => {
    if (rent1) {
      setCarId(rent1.carId);
      setDocumentVerified(rent1.documentVerified);
      setPickupTime(rent1.pickupTime);
      setRenterName(rent1.renterName);
      setEmail(rent1.email);
      setTotalAmount(rent1.totalAmount);
      setSuggestionComplaint(rent1.suggestionComplaint);
    }
  }, [rent1]);

  const change = () => {
    window.location = "/employeeDash";
  };
  console.log(rent1);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    // Reset drop time to null when status is "pending"
    if (newStatus === "pending") {
      setDropTime(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate totalAmount to ensure it is a number
    if (isNaN(totalAmount)) {
      alert("Please enter a valid number for Total Amount.");
      return;
    }
    // Validate email to ensure it is not empty
    if (!email.trim()) {
      alert("Please enter a valid email address.");
      return;
    }

    // Create an object with the rental data
    const rentalData = {
      renterName,
      pickupTime,
      dropTime,
      suggestionComplaint,
      totalAmount,
      email,
      documentVerified,
      status,
      carId,
    };

    // Log the rentalData to the console
    console.log(rentalData);

    if (rent1) {
      console.log("1");
      dispatch(editRental({ ...rentalData, _id: id }));
    } else {
      console.log("11");
      dispatch(submitRentalForm(rentalData));
    }
    // Dispatch the action with the rental data

    // Make an asynchronous call
    try {
      // const response = await axios.post(
      //   "/api/rentals/check-car-and-send-email",
      //   {
      //     carId,
      //     renterName,
      //     pickupTime,
      //     dropTime,
      //     status,
      //     email,
      //     // Add other form fields here
      //   }
      // );
      // console.log(response.data.message);
      // After successfully updating the data, call the endpoint to delete the pending entry
      // const deleteResponse = await axios.delete(/api/rentals/delete-pending/${id});
      // console.log(deleteResponse.data.message);
    } catch (error) {
      console.error("Error updating or deleting pending entry:", error);
    }
  };
  const calculateDropTimeValue = (pickupTime, dropTime) => {
    // Convert pickup and drop time strings to Date objects
    const pickupDateTime = new Date(pickupTime);
    const dropDateTime = new Date(dropTime);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = dropDateTime - pickupDateTime;

    const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);
    const fineAmount = timeDifferenceHours * 350;

    // Calculate the drop time value
    
    // Update the dropTimeValue state
    setDropTimeValue(fineAmount);
  };

  return (
    <div className="rental-form-container">
      <center>
        <h1>Rental Form</h1>
      </center>
      <br></br>

      <form onSubmit={handleSubmit}>
        <label>
          Car Renter Name:
          <input
            type="text"
            value={renterName}
            onChange={(e) => setRenterName(e.target.value)}
            style={{ border: "solid black 1px" }}
            required
          />
        </label>
        <label>
          Car ID:
          <input
            type="text"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            style={{ border: "solid black 1px" }}
            required
          />
        </label>

        {/* <label>
          Payment ID:
          <input type="text" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} required />
        </label> */}

<label>
        Actual Car Pickup Time:
        <input
          type="datetime-local"
          value={pickupTime}
          onChange={(e) => {
            const newPickupTime = e.target.value;
            setPickupTime(newPickupTime);
            calculateDropTimeValue(newPickupTime, dropTime);
          }}
          style={{ border: "solid black 1px" }}
          required
        />
      </label>

        <label>
          Actual Car Drop Time:
          {status !== "pending" ? (
             <input
             type="datetime-local"
             value={dropTime}
             onChange={(e) => {
               const newDropTime = e.target.value;
               setDropTime(newDropTime);
               calculateDropTimeValue(pickupTime, newDropTime);
             }}
             style={{ border: "solid black 1px" }}
             required={status === "carReturned"}
             disabled={status !== "carReturned"}
           />
          ) : (
            <span style={{ color: "gray" }}>
              Drop time disabled for pending status
            </span>
          )}
        </label>

        <label>
          
          Suggestion or Complaint:
          {status !== "pending" ? (

          <input
            value={suggestionComplaint}
            onChange={(e) => setSuggestionComplaint(e.target.value)}
            style={{ border: "solid black 1px" }}
            disabled={status !== "carReturned"}
            required={status === "carReturned"}

          >
            
          </input>
          ) : (
            <span style={{ color: "gray" }}>
              Drop time disabled for pending status
            </span>
          )}
        </label>

        <label>
        Drop Time Value:
        {status !== "pending" ? (
          <input
            type="text"
            pattern="[0-9]*"
            value={dropTimeValue}
            onChange={(e) => setTotalAmount(e.target.value)}
            title="Please enter a valid number"
            style={{ border: "solid black 1px" }}
            required={status === "carReturned"}
            disabled={status !== "carReturned"}
          />
          ) : (
            <span style={{ color: "gray" }}>
              Drop time disabled for pending status
            </span>
          )}
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: "solid black 1px" }}
            required
          />
        </label>
        <label>
          Car Return Status:
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            style={{ border: "solid black 1px" }}
            required
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="pending">Pending</option>
            <option value="carReturned">Car Returned</option>
          </select>
        </label>

        {/* Display message when drop time is disabled for pending status */}

        <br></br>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={documentVerified}
            onChange={() => setDocumentVerified(!documentVerified)}
          />
          Document Verified by Employee
        </label>

        <button
          onClick={change}
          type="submit"
          style={{ backgroundColor: "#007bff", color: "#fff" }}
        >
          Submit
        </button>
      </form>
      
    </div>
  );
};

export default RentalForm;