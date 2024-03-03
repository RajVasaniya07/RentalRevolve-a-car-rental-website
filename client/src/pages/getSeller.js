import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallseller } from "../redux/actions/sellerActions";
function getSeller (){
    const dispatch = useDispatch();
  
    const { sellers } = useSelector((state) => state.sellersReducer);
    useEffect(() => {
      dispatch(getallseller());
    }, []);
    return sellers;
  
}

export default getSeller;