import React,{useEffect} from 'react'
import "./CreateOrder.css";
import {useDispatch} from "react-redux";
import PastOrder from '../components/PastOrder';
import LeftNavBar from '../components/LeftNavBar';
import FeaturesPart from '../components/FeaturesPart';
import { handleAuthPage } from './redux/features/userSlice';
import {handleViewOrder} from '../pages/redux/features/orderSlice';
const CreateOrder = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(handleViewOrder(null));
    dispatch(handleAuthPage(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const user = JSON.parse(localStorage.getItem("profile"));
  if(!user) return window.location.href="/";
  return (
    <div className="main-container--1">
        <LeftNavBar/>
        <div className="main-container--2">
          <FeaturesPart/>
          <PastOrder/>
        </div>
    </div>
  )
}

export default CreateOrder