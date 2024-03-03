import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions/userActions";
function getUser (){
    const dispatch = useDispatch();
  
    const { users } = useSelector((state) => state.usersReducer);
    useEffect(() => {
      dispatch(getAllUsers());
    }, []);
    return users;
  
}

export default getUser;