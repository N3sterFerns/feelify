import { useState } from "react";
import { createContext } from "react";


export const SongContext = createContext()


export const SongProvider = ({ children }) => {

    const [song, setSong] = useState({
        _id: "69a9538f67f1a2b4c891fdc6",
        url: "https://ik.imagekit.io/zkhawn4rb/feelify/songs/Happy_-_From__Despicable_Me_2__0smOtnwyj.mp3",
        posterUrl: "https://ik.imagekit.io/zkhawn4rb/feelify/posters/Happy_-_From__Despicable_Me_2__EO2BuYe33.jpeg",
        title: "Happy - From Despicable Me 2",
        mood: "happy",
    })
    const [loading, setLoading] = useState(false)
    const [analyzedDetails, setAnalyzedDetails] = useState(()=>{
        const data = JSON.parse(localStorage.getItem("feelify"))
        return data ? data: null
    })
    const [recommendations, setRecommendations] = useState([])
    const [expression, setExpression] = useState( JSON.parse(localStorage.getItem("feelify"))?.expression || "Detecting...");
    const [moodHistory, setMoodHistory] = useState([])
    const [analyticsGraph, setAnalyticsGraph] = useState([])


    return <SongContext.Provider value={{ setSong, song, loading, setLoading, analyzedDetails, setAnalyzedDetails,
        recommendations, setRecommendations, expression, setExpression, moodHistory, setMoodHistory,
        analyticsGraph, setAnalyticsGraph
     }}>{children}</SongContext.Provider>
}