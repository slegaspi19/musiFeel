import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthenticationContext = createContext(null);

export const AuthenticationProvider = ({children}: any) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    const login = async({username, password}: any) => {
        console.log('login context');
        console.log({username, password});
    }

    return (
        <AuthenticationContext.Provider value={{ user, accessToken, error, login }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext