import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import api from './api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./Constants";
import { Children, useEffect, useState } from "react";

let ProtectedRoutes = ({children})=>{
    const [isAuthorized, setIsAuthorized] = useState(null)
    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
    })
    const refreshToken = async ()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("http://13.48.43.42:8000/auth/api/token/refresh/", {
                refresh : refreshToken})
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        } catch (error){
            console.log(error)
            setIsAuthorized(false)
        }
    }
    const auth = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000
        if(tokenExpiration > now){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }
    }
    if (isAuthorized === null){
        return <div>loading....</div>
    }
    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoutes