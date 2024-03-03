const initialData = {
    sellers : [],

};

export const sellersReducer = (state=initialData , action)=>{

     switch(action.type)
     {
        case 'GET_ALL_SELLERS' : {
            return{
                ...state,
                sellers : action.payload
            }
        }
        default:return state
         
         
         
     }

}