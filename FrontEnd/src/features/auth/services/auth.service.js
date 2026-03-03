import {axiosInstance} from "../../../utils/axiosInstance"


export const register = async (userDetails)=>{
    const res = await axiosInstance.post("/auth/register", userDetails)
    return res.data

}

export const login = async (userDetails)=>{
    try {
        const res = await axiosInstance.post("/auth/login", userDetails)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async ()=>{
    try {
        const res = await axiosInstance.get("/auth")
        return res.data
    } catch (error) {
        console.log(error)
    }
}