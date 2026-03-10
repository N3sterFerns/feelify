import { axiosInstance } from "../../../utils/axiosInstance"


export const getSong = async ({mood, intensity, level, recommended})=>{
    const res = await axiosInstance.get(`/songs?mood=${mood}&intensity=${intensity}&level=${level}&recommended=${recommended}`)
    return res.data
}


export const getMoodHistory = async ()=>{
    const res = await axiosInstance.get("/songs/mood-history")
    return res.data;
}
export const clearMoodHistory = async ()=>{
    const res = await axiosInstance.get("/songs/clear-history")
    console.log(res)
    return res.data;
}
export const analytics = async ()=>{
    const res = await axiosInstance.get("/songs/analytics")
    return res.data;
}