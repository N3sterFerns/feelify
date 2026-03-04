import { useContext } from "react";
import { SongContext } from "../song.context";




export const useSong =  ()=>{
    const context = useContext(SongContext)
    const {song, setSong, loading, setLoading} = context;

    const handleGetSong = async (mood)=>{
        try {
            setLoading(true)
            const res = await getSong({mood: mood})
            setSong(res.song)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return {song, loading, handleGetSong}
}