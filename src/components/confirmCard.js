import React from "react";
import "./confirmCard.css";
import { useDispatch} from "react-redux";
import { OpenPopupMsg } from "../pages/redux/features/orderSlice";

const ConfirmCard = () => {
  const dispatch = useDispatch();
  const handleButton = () =>{
    dispatch(OpenPopupMsg())
    window.location.href="/createorder";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  return (
    <>
    <div className="overlay-container">
      <div className="confirmCard"> 
        <div className="confirmCard-circle">
          <img src="/images/check.svg" style={{height: "4rem"}} alt="check"/>
        </div>
        <div style={{width: "35%", marginBottom: "1rem"}}>
          <h2>Your Order is successfully placed</h2>
        </div>
        <div style={{width: "50%", marginBottom: "1rem", color: "black"}}>
          <p>You can track your order in "Orders" section</p>
        </div>
        
          <button
            className="confirmCard-button"
            onClick={handleButton}
          >
            Go to Orders
          </button>
       
      </div>
      <div className="overlay"></div>
      </div>
    </>
  );
}

export default ConfirmCard; 