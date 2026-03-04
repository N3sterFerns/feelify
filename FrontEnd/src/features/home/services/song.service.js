import { axiosInstance } from "../../../utils/axiosInstance"


export const getSong = async ({mood})=>{
    const res = await axiosInstance.get(`/songs?mood=${mood}`)
    return res.data
}