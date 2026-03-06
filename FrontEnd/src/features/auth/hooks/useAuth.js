import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { getUser, login, logout, register } from "../services/auth.service";
import { toast } from "react-toastify";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { setUser, user, setLoading, loading } = context;

    const registerUser = async (userDetails) => {
        try {
            const res = await register(userDetails)
            setUser(res.user)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const loginUser = async (userDetails) => {
        try {
            const res = await login(userDetails)
            setUser(res.user)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getUserData = async () => {
        try {
            const res = await getUser()
            if (res) {
                setUser(res.user)
            }

        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
            } else {
                throw error
            }
        } finally {
            setLoading(false)
        }
    }

    const getLogOut = async () => {
        try {
            await logout()
        } catch (error) {
            throw error
        }

    }

    useEffect(() => {
        getUserData()
    }, [])

    return { registerUser, loginUser, getUserData, user, loading, getLogOut }
}