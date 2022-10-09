import React from 'react'
import "./Disclaimer.css";
import facebookLogo from "../Images/facebook.svg";
import instagramLogo from "../Images/instagram.svg";
import linkedinLogo from "../Images/linkedin.svg";

function Disclaimer() {
    return (
        <>
            <div className='disclaimer-div'>
                <div className="inside-disclaimer-div">
                    <h4>ABOUT US</h4>
                    <h6>Doorstep Wash <span>&#38;</span> DryClean Service</h6>
                </div>

                <div className="inside-disclaimer-div">
                    <h4>HOME</h4>
                    <h6>Sign In</h6>
                    <h6>Register</h6>
                </div>

                <div className="inside-disclaimer-div">
                    <h4>Pricing</h4>
                </div>

                <div className="inside-disclaimer-div">
                    <h4>Career</h4>
                    <h6>Blogs</h6>
                    <h6>Create</h6>
                </div>

                <div className="inside-disclaimer-div">
                    <h4>Contact</h4>
                </div>

                <div className="inside-disclaimer-div">
                    <h4>SOCIAL MEDIA</h4>
                    <div className="inside-disclaimer-div-images" style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <div className='logo-div'><img src={facebookLogo} alt="facebook" /></div>
                        <div className='logo-div'><img src={instagramLogo} alt="instagram" /></div>
                        <div className='logo-div'><img src={linkedinLogo} alt="linkedin" /></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Disclaimer