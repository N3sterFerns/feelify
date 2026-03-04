import { useState } from "react";
import { createContext } from "react";


export const SongContext = createContext()


export const SongProvider = ({ children }) => {

    const [song, setSong] = useState({
        _id: "69a7e8e65f7cb58a9cca1dd0",
        url: "https://ik.imagekit.io/zkhawn4rb/feelify/songs/Jatt_Mehkma__RiskyjaTT.CoM__2fbP9GqwD.mp3",
        posterUrl: "https://ik.imagekit.io/zkhawn4rb/feelify/posters/Jatt_Mehkma__RiskyjaTT.CoM__mU-F-SWMP.jpeg",
        title: "Jatt Mehkma (RiskyjaTT.CoM)",
        mood: "happy",
    })
    const [loading, setLoading] = useState(false)


    return <SongContext.Provider value={{ setSong, song, loading, setLoading }}>{children}</SongContext.Provider>
}