import React, { useState,useEffect } from 'react';
import "./Register.css";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {userRegister,handleAuthPage} from "./redux/features/userSlice";

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");

    useEffect(()=>{
        dispatch(handleAuthPage(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleSubmit = (e) =>{
      console.log("sdf")
      e.preventDefault();
      if(name === "" || email === "" || password === "" || phone === "" || state === "" || district === "" || address === "" || pincode === ""){
        return toast.error("One or more fields are empty");
      }
      const formValue = {
        name:name,
        email:email,
        password:password,
        phone:phone,
        state:state,
        district:district,
        address:address,
        pincode:pincode
      }
      dispatch(userRegister({formValue,navigate,toast}));
    }
    
    const GoToSignIn = () =>{
        navigate("/");
    }
    return (
        <>
            <div className='main-section-3'>
                <div className='section-div-3'>
                    <div className='inner-div-3'>
                        <div className='laundry-text-3'>
                            <h1 >Laundry <br />
                                Services</h1>
                        </div>
                        <div className='door-step-text-3'><h5>Doorstep Wash <span>&#38;</span> <br />DryClean Service</h5></div>
                        <div className='already-account-text'><h6>Already Have Account</h6></div>
                        <br />
                        <div >
                            <button className='sign-in-btn-3' onClick={GoToSignIn}>Sign In</button>
                        </div>
                    </div>
                </div>
                <div className='section-div-4'>
                    <div className='register-text-div'>
                        <div>REGISTER</div>
                    </div>
                    <div className='form-parent-container'>
                        <div className='form-parent'>
                            <div className='form-child-1' >
                                <div>
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='Name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='Phone'
                                        value={phone}
                                        onChange={(event) => {
                                            setPhone(event.target.value);                                  
                                        }}
                                    />
        
                                </div>
                                <div >
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='District'
                                        value={district}
                                        onChange={(event) => setDistrict(event.target.value)}
                                    />
                                </div>
                                <div >
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='Pincode'
                                        value={pincode}
                                        onChange={(event) => setPincode(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='form-child-2'>
                                <div >
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='Email'
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                          
                                        }}
                                    />
                                    
                                </div>
                                <div >
                                    <TogglePassword password={password} setPassword={setPassword} />
                                </div>
                                <div >
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='State'
                                        value={state}
                                        onChange={(event) => setState(event.target.value)}
                                    />
                                </div>
                                <div >
                                    <input
                                        className='register-input-field'
                                        type="text"
                                        placeholder='Address'
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='terms-condition-div'>
                        <label>
                            <input className="register-checkbox" id="checkbox" type="checkbox" />
                            <span className="terms-conditions-text">I agree to Terms & Condition receiving marketing and promotional materials</span>
                        </label>
                    </div>
                    <div className='register-div' >
                        <button className='register-div-button' onClick={handleSubmit} type="submit">Register</button>
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
            <div className='lock-input-container2'>
                <input
                    className='register-input-field'
                    type={toggle === false ? "password" : "text"}
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <span className="padlock-img2" onClick={ToggleHandler}>
                    {toggle === false ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-lock-open"></i>}
                </span>
            </div>
        </>
    );
}
export default Register