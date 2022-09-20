import { useState } from "react";
import { useUserContext } from "./UserContextHook";


export const useLogin = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useUserContext()

    const login = async (email, pin)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, pin})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(josn))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}