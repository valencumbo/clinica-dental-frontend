import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export const AUTH_TOKEN_KEY = 'auth_token'

function decodeAuthToken(auth_token) {
    try {
        return jwtDecode(auth_token)
    } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        return null
    }
}

function AuthContextProvider({ children }) {
    const auth_token = localStorage.getItem(AUTH_TOKEN_KEY)
    
    // Evaluamos si hay token Y si se pudo decodificar correctamente
    const initial_session = auth_token ? decodeAuthToken(auth_token) : null
    
    const [isLogged, setIsLogged] = useState(Boolean(initial_session))
    const [session, setSession] = useState(initial_session)

    function saveSession(new_auth_token) {
        localStorage.setItem(AUTH_TOKEN_KEY, new_auth_token)
        
        const session_decoded = decodeAuthToken(new_auth_token)
        
        if (session_decoded) {
            setIsLogged(true)
            setSession(session_decoded)
        } else {
            logout()
        }
    }

    function logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        setIsLogged(false)
        setSession(null)
    }

    const providerValues = {
        saveSession,
        logout,
        session,
        isLogged,
        token: localStorage.getItem(AUTH_TOKEN_KEY)
    }
    
    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider