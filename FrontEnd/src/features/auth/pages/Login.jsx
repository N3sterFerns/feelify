import React, { useState } from 'react'
import "../styles/login.scss"
import FormInput from '../components/FormInput'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

const Login = () => {

    const [userDetails, setUserDetails] = useState({
        identifier: "",
        password: ""
    })

    const navigate = useNavigate()

    const { loginUser, btnLoader } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let field = userDetails.identifier.includes("@") ? "email" : "username"
        const data = { password: userDetails.password, [field]: userDetails.identifier }
        try {
            await loginUser(data)
            navigate("/")
            toast.success("Logged In successfully.", { position: "top-right" })
        } catch (error) {
            toast.error("Something went wrong, Try Again.", { position: "top-right" })
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
                        Find your <span>Rhythm</span> with us.
                    </h1>
                    <p>
                        Experience the next generation of Ai-powered music discover tailored with your mood.
                    </p>

                </div>
            </div>

            <div className="right-side">
                <div className="mobile-bg"></div>

                <div className="login-card">
                    <div className="header">
                        <h2>Welcome Back</h2>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>

                        <FormInput id={'identifier'} value={userDetails.identifier} setUserDetails={setUserDetails} type='text' placeholder='Username or Email' logo='account_circle' name='Username or email' />


                        <FormInput id={'password'} value={userDetails.password} setUserDetails={setUserDetails} type='password' placeholder='Password' logo='lock' name='Password' />

                        <div className="label-row">
                            <a href="#">Forgot password?</a>
                        </div>

                        <button className="submit-btn">
                            {btnLoader ? (
                                <svg width={25} height={25} fill="hsl(228, 80%, 60%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
                            ):(
                                <span>Log in to Feelify</span>
                            )}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="signup-link">
                        Don't have an account? <Link to={'/register'}>Create an account</Link>
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

export default Login