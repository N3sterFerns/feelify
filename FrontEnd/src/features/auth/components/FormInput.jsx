import React from 'react'
// import "../styles/login.scss"


const FormInput = ({name="Email", logo="mail", type="email", placeholder="Email or Username", value, setUserDetails, id="email"}) => {

    const handleUserDetails = (e)=>{
        const value = e.target.value
        setUserDetails((prev)=>({...prev, [id]: value}))

    }

    return (
        <div className="form-group">
            <label htmlFor={id}>{name}</label>
            <div className="input-wrapper password-wrapper">
                <span className="input-icon material-symbols-outlined">{logo}</span>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={handleUserDetails}
                    name={type}
                    placeholder={placeholder}
                    required 
                />
            </div>
        </div>
    )
}

export default FormInput