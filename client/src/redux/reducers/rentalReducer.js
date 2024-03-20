// Initial state for the rental data
const initialState = {
    rental: [],
  };
  
  export const rentalReducer = (state=initialState, action)=>{
  
    switch(action.type)
    {
       case 'GET_ALL_RENTAL' : {
           return{
               ...state,
               rental : action.payload
           }
       }
       default:return state
        // Update your Redux reducer or logic to handle the removal
  case 'REMOVE_PENDING_RENTAL':
    return {
      ...state,
      rental: state.rental.filter(rent => rent._id !== action.payload),
    };
  
        
        
    }
  
  }
  
  export default rentalReducer;