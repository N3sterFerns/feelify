import { createContext, useState } from "react";


export const AuthContext = createContext() 



export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [btnLoader, setBtnLoader] = useState(false)

    return <AuthContext.Provider value={{user, setUser, setLoading, loading, setBtnLoader, btnLoader, setBtnLoader}}>{children}</AuthContext.Provider>
}