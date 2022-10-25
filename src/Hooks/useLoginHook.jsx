import { useState } from "react";
import { useUserContext } from "./useUserContextHook";
import axios from "axios";
axios.defaults.withCredentials = true;


export const useLogin = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUserContext()

    const login = async (email, pin)=>{
        setIsLoading(true)
        setError(null)

        const response = await axios.post('https://booksigning.onrender.com/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, pin})
        })

        const data = await response.data;

        if(!response.ok){
            setIsLoading(false)
            setError(data.error)
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(data))

            dispatch({type: 'LOGIN', payload: data})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}
