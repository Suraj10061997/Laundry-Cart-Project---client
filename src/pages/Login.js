import React, { useState } from 'react';
import "./Login.css";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {userLogin,handleAuthPage} from "./redux/features/userSlice";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(handleAuthPage(true))
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        console.log("sdf")
        e.preventDefault();
        if(email === "" || password === ""){
          return toast.error("One or more fields are empty");
        }
        const formValue = {
          email:email,
          password:password,
        }
        dispatch(userLogin({formValue,navigate,toast}));
      }
       
    const GoToRegister = () =>{
        navigate("/register");
    }
    return (
        <>
            <div className='main-section-1'>
                <div className='section-div-1'>
                    <div className='inner-div-1'>
                        <div className='laundry-text-1'>
                            <h1 >Laundry <br />
                                Services</h1>
                        </div>
                        <div className='door-step-text-1'><h5>Doorstep Wash <span>&#38;</span> DryClean Service</h5></div>
                        <div className='do-not-account-text'><h6>Don't Have An Account</h6></div>
                        <div >
                            <button className='register-btn-1' onClick={GoToRegister}>Register</button>
                        </div>
                    </div>
                </div>
                <div className='section-div-2'>
                    <div>
                        <div className='inner-div-2'>
                            <div className='sign-heading-text-2-div'>
                                <h4 className='sign-heading-text-2'>SIGN IN</h4>
                            </div>
                            <div className='form-div-2'>
                                <div className='form-div-2-flex'>
                                    <div>
                                        <span className='mini-mobile-email-text'>Email</span>
                                        <br />
                                        <br />
                                        <input
                                            className='box-input-field-2'
                                            type="text"
                                            placeholder='noname@gmail.com'
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <TogglePassword password={password} setPassword={setPassword} />
                                </div>
                            </div>
                            <div className='sign-in-div'>
                                <button className='sign-in-btn-1' onClick={handleSubmit}>Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const TogglePassword = ({ password, setPassword }) => {
    const [toggle, setToggle] = useState(false);
    const ToggleHandler = () => {
        if (toggle === false) {
            setToggle(true);
            return;
        }
        setToggle(false);
    }
    return (
        <>
            <div className="lock-input-container">
                <div>
                    <span className='mini-password-text'>Password</span>
                    <br />
                    <br />
                    <input
                        className='box-input-field-2'
                        type={toggle === false ? "password" : "text"}
                        placeholder='* * * *'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className="padlock-img" onClick={ToggleHandler}>
                    {toggle === false ? <i class="fa-solid fa-lock"></i> : <i class="fa-solid fa-lock-open"></i>}
                </span>
            </div>
            <div className='forget-password-text-1'><div>Forget Password?</div></div>
        </>
    );
}
export default Login;