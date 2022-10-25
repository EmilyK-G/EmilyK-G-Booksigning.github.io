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

        if(!response.ok){
            setIsLoading(false)
            setError(response.data.error)
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(response.data))

            dispatch({type: 'LOGIN', payload: response.data})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}
