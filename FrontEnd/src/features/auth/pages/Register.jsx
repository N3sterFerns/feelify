import React, { useState } from 'react'
import "../styles/login.scss"
import FormInput from '../components/FormInput'
import {Link, useNavigate} from "react-router"
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'


const Register = () => {

    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const {registerUser, btnLoader} = useAuth()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            console.log(userDetails)
            await registerUser(userDetails)
            navigate("/")
            toast.success("Feelify account created successfully.", {position: "top-right"})
        } catch (error) {
            console.log(error)
            toast.error("Username or Email already exists.", {position: "top-right"})
        }
    }

  return (
    <div className="container">
            <div className="left-side">

                <div className="overlay"></div>

                <div className="content">
                    <div className="icon-wrapper">
                        <span className="material-symbols-outlined">music_note</span>
                    </div>
                    <h1>
                        Feel the Rhythm with <span>Feelify</span>.
                    </h1>
                    <p>
                        Discover your next favorite track with our AI-powered music
                        recommendation system. Personalized playlists for every mood.
                    </p>

                </div>
            </div>

            <div className="right-side">
                <div className="mobile-bg"></div>

                <div className="login-card">
                    {/* Header */}
                    <div className="header">
                        <h2>Create Account</h2>
                        <p>Please enter your details to register in.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>

                        <FormInput id={'username'} setUserDetails={setUserDetails} value={userDetails.username} type='text' placeholder='Username' logo= 'account_circle' name='Username'/>

                        <FormInput id={'email'} setUserDetails={setUserDetails} value={userDetails.email} type='email' placeholder='Email' logo='mail' name='Email'/>

                        <FormInput id={'password'} setUserDetails={setUserDetails} value={userDetails.password} type='password' placeholder='Password' logo='lock' name='Password'/>

                        <button className="submit-btn" >
                            {btnLoader ? (
                                <svg width={25} height={25} fill="hsl(228, 80%, 60%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
                            ):(
                                <span>Sign in to Feelify</span>
                            )}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="signup-link">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>

                {/* Footer Links */}
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Help Center</a>
                </div>
            </div>
        </div>
  )
}

export default Register