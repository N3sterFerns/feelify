import { useContext } from "react";
import { SongContext } from "../song.context";
import { analytics, clearMoodHistory, getMoodHistory, getSong } from "../services/song.service";
import { useEffect } from "react";




export const useSong = () => {
    const context = useContext(SongContext)
    const { song, setSong, loading, setLoading, analyzedDetails, setAnalyzedDetails, recommendations, setRecommendations,
        expression, setExpression, moodHistory, setMoodHistory,
        analyticsGraph, setAnalyticsGraph
    } = context;

    const handleGetSong = async ({ emotion, intensity, level }) => {
        try {
            setLoading(true)
            const res = await getSong({ mood: emotion, intensity, level, recommended: expression })
            setSong(res.song)
            const details = {
                mood: res.detectedEmotion,
                intensity: res.intensity,
                level: res.level,
                expression: expression
            }
            setAnalyzedDetails(details)
            localStorage.setItem("feelify", JSON.stringify(details))
            setRecommendations(res.songs)
            const history = await getMoodHistory()
            setMoodHistory(history.history)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getHistory = async () => {
        const history = await getMoodHistory()
        console.log(history)
        setMoodHistory(history.history)
    }

    const clearMoods = async () => {
        await clearMoodHistory()
        localStorage.clear("feelify")
        await getHistory()
        await allAnalytics()
        await handleGetSong()
        setAnalyzedDetails(null)
    }

    const allAnalytics = async () => {
        const res = await analytics();
        setAnalyticsGraph(res.analytics)
        console.log(res)
    };
    const fetchHistory = async () => {
        await getHistory();
    };

    useEffect(() => {
        fetchHistory();
        allAnalytics()
    }, []);

    useEffect(() => {
        const existing = JSON.parse(localStorage.getItem("feelify"))
        localStorage.setItem("feelify", JSON.stringify({ ...existing, expression }))
        allAnalytics()
    }, [analyzedDetails]);





    return { setSong, song, analyticsGraph, loading, handleGetSong, clearMoods, analyzedDetails, recommendations, setExpression, expression, moodHistory }
}