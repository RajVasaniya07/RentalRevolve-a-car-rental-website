// getSeller.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallseller } from "../redux/actions/sellerActions";

function useSeller() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallseller());
  }, [dispatch]);

  const { sellers } = useSelector((state) => state.sellersReducer);
  return sellers;
}

export default useSeller;
