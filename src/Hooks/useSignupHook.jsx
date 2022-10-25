import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const useSignup = ()=> {
    const[error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [success, setSuccess] = useState(null);

    const signup = async(name, last_name, email, pin, class_of, img, signature) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const response = await axios.post('https://booksigning.onrender.com/api/user/signup', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, last_name, email, pin, class_of, img, signature})
        })

        if (!response.ok){
            setIsLoading(false)
            setError(response.data.error)
        }
        if (response.ok){
            setSuccess(response.data.success)
            setIsLoading(false)
        }
        return success
    }

    return {signup, isLoading, error, success}
}