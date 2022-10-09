import React,{useState} from "react";
import "./Navbar.css";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () =>{
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const {isAuthPage} = useSelector(state=>({...state.auth}));
    const user = JSON.parse(localStorage.getItem("profile"));
    const ShowLogoutBtn = () =>{
        setShow(!show);
    }
    const SetLogout = () =>{
        setShow(!show);
        localStorage.clear();
        toast.success("Logout successfully");
        navigate("/");
    }
    return(
        <div className="nav">
            <div className="laundry1-text">Laundry</div>
            {isAuthPage ? (
                 <ul>
                 <li>Home</li>
                 <li>Pricing</li>
                 <li>Career</li>
                 <li className="sign-in-text-1" style={{color:"white"}}>Sign In</li>
             </ul>
            ) : (
                <ul>
                <li>Pricing</li>
                <li>Career</li>
                <li className="sign-in-text-1-1" onClick={ShowLogoutBtn}>
                    <div className={`${show ? "logout-holder2":"logout-holder1"}`} onClick={SetLogout}>Log Out</div>
                    <div className="image-holder">
                        <img src="./images/user.svg" alt="user" />
                    </div>
                    <div className="user-text-holder">
                        {user?(<h4>{user.result.name}</h4>):(<h4>N/A</h4>)}
                    </div>
                </li>
            </ul>
            )}
           
        </div>
    )
}

export default NavBar;