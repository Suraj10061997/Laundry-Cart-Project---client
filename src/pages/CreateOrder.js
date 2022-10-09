import React from 'react'
import "./CreateOrder.css";
import {useDispatch} from "react-redux";
import PastOrder from '../components/PastOrder';
import LeftNavBar from '../components/LeftNavBar';
import FeaturesPart from '../components/FeaturesPart';
import { handleAuthPage } from './redux/features/userSlice';
import {handleViewOrder} from '../pages/redux/features/orderSlice';
const CreateOrder = () => {
  const dispatch = useDispatch();
  dispatch(handleViewOrder(null));
  dispatch(handleAuthPage(false));
  const user = JSON.parse(localStorage.getItem("profile"));
  if(!user) return window.location.href="/";
  return (
    <div class="main-container--1">
        <LeftNavBar/>
        <div class="main-container--2">
          <FeaturesPart/>
          <PastOrder/>
        </div>
    </div>
  )
}

export default CreateOrder