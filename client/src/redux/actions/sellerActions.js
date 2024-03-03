import axios from "axios";


export const getallseller=()=>async dispatch=>{

  dispatch({type: 'LOADING' , payload:true})

  try {
      const response = await axios.get('/api/sellerdetails/getallseller')
      dispatch({type: 'GET_ALL_SELLERS', payload:response.data})
      // console.log(response.data);
      dispatch({type: 'LOADING' , payload:false})
  } catch (error) {
      console.log(error)
      dispatch({type: 'LOADING' , payload:false})
  }

}