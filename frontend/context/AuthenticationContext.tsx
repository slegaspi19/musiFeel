import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}: any) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

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

        const { data } = await axios.post('http://localhost:3000/api/login/', body, config);   
        console.log(data);
    }

    return (
        <AuthenticationContext.Provider value={{ login }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext