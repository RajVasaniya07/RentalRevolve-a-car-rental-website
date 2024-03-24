// Import necessary dependencies
import axios from "axios";

// Action types
export const SUBMIT_RENTAL_FORM = "SUBMIT_RENTAL_FORM";

// Action creator for submitting the rental form
export const submitRentalForm = (rentalData) => async (dispatch) => {
  try {
    // Send a POST request to your server to handle the database interaction
    const response = await axios.post("/api/rentals/addRental", rentalData);
    // const email = await axios.post("/api/rentals/check-car-and-send-email", rentalData);


    // Dispatch the action with the response data
    dispatch({
      type: SUBMIT_RENTAL_FORM,
      payload: response.data,
    });

    // Handle any additional logic after the form submission if needed
    console.log("Form submitted successfully!");
  } catch (error) {
    // Handle errors, dispatch an error action, or display an error message
    console.error("Error submitting form:", error);
  }
};

export const getAllRental = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/rentals/getallRental");
    dispatch({ type: "GET_ALL_RENTAL", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editRental = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    console.log("edit");
    await axios.post("/api/rentals/editRental", reqObj);

    dispatch({ type: "LOADING", payload: false });
    // message.success("Rental details updated successfully");
    setTimeout(() => {
      // window.location.href = "/EmployeeDash";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};