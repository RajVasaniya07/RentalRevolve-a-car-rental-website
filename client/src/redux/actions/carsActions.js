import { message } from 'antd';
import axios from 'axios';

export const getAllCars=()=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/cars/getallcars')
        dispatch({type: 'GET_ALL_CARS', payload:response.data})
        dispatch({type: 'LOADING' , payload:false})
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }

}




export const addCar = (reqObj) => async (dispatch) => {
  // Log the request object for debugging
  console.log('Request Object:', reqObj);

  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post('/api/cars/addcar', reqObj);

    // Log the server response for debugging
    console.log('Server Response:', response.data);

    dispatch({ type: 'LOADING', payload: false });
    message.success('New car added successfully');

    setTimeout(() => {
      window.location.href = '/Main';
    }, 500);
  } catch (error) {
    // Log the error details for debugging
    console.error('Error:', error);

    // Check if the error response has data (e.g., server validation errors)
    if (error.response && error.response.data) {
      console.error('Error Response Data:', error.response.data);
    }

    dispatch({ type: 'LOADING', payload: false });
    message.error('Failed to add a new car. Please check the console for details.');
  }
};

export const editCar=(reqObj)=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
         await axios.post('/api/cars/editcar' , reqObj)
       
         dispatch({type: 'LOADING' , payload:false})
         message.success('Car details updated successfully')
         setTimeout(() => {
            window.location.href='/Main'
         }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const deleteCar=(reqObj)=>async dispatch=>{

  dispatch({type: 'LOADING' , payload:true})

  try {
       await axios.post('/api/cars/deletecar' , reqObj)
     
       dispatch({type: 'LOADING' , payload:false})
       message.success('Car deleted successfully')
       setTimeout(() => {
          window.location.reload()
       }, 500);
  } catch (error) {
      console.log(error)
      dispatch({type: 'LOADING' , payload:false})
  }
    

}

export const CheckAvailability = (reqObj) => async (dispatch) => {
  console.log("click1");
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.post('/api/cars/checkavailability', reqObj); // Assuming '/api/cars/checkavailability' is the correct endpoint for checking availability
    dispatch({ type: 'GET_ALL_CARS', payload: response.data }); // Assuming 'GET_ALL_CARS' is the action type for updating car availability
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};
