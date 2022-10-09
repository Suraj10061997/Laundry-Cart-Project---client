import {useEffect} from "react";
import './App.css';

import { useDispatch} from "react-redux";
import { setUser } from "./pages/redux/features/userSlice";

import TakeOrders from './pages/TakeOrders';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/Navbar';
import CreateOrder from './pages/CreateOrder';

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(()=>{
    if(user){
      dispatch(setUser(user));
    } 
    //eslint-disable-next-line
  },[])
  return (
    <Router>
      <ToastContainer/>
      <NavBar/>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/takeorders" exact element={<TakeOrders/>} />
          <Route path="/createorder" exact element={<CreateOrder/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
