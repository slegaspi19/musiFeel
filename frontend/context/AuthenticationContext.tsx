import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthenticationContext = createContext(null as any);

export const AuthenticationProvider = ({children}: any) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const login = async({username, password}: any) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const body = {
            username,
            password,
        }

        try {
            const { data: accessResponse } = await axios.post('http://localhost:3000/api/login/', body, config);
    
            if (accessResponse && accessResponse.user) {
                setUser(accessResponse.user);
            }
    
            if (accessResponse && accessResponse.access) {
                setAccessToken(accessResponse.access);
            }
    
            router.push('/');
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                return;
            } else if (error.request) {
                setError('Something went wrong');
                return;
            } else {
                setError('Something went wrong');
                return;
            }
        }
    }

    const register = async ({ username, email, password, password2 }: any) => {
        if (password !== password2) {
            setError("Passwords do not match");
            return;
        }

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        const body = {
            username,
            email,
            password,
        }

        try {
            await axios.post('http://localhost:3000/api/register/', body, config);
            login({username, password});
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                return;
            } else if (error.request) {
                setError('Something went wrong');
                return;
            } else {
                setError('Something went wrong');
                return;
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/api/logout/');
            setUser(null);
            setAccessToken(null);
        } catch(error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                return;
            } else if (error.request) {
                setError('Something went wrong');
                return;
            } else {
                setError('Something went wrong');
                return;
            }
        }
    }

	const checkLoginStatus = async () => {
		try {
			// api request to api/user in nextjs
			const { data } = await axios.post('http://localhost:3000/api/user')

			// set user and access token in state
			setUser(data.user)
			setAccessToken(data.access)
		} catch(error: any) {
			if (error.response & error.response.data) {
		  		setError(error.response.data.message)
		  		return      
		    } else if (error.request) {
			    setError('Something went wrong')
			    return  
		    } else {
				setError('Something went wrong')
				return
		    }
		}
	}

    const clearError = () => {
        setError("");
    }

    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, clearError, login, register, logout}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext