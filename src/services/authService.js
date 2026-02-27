import { ServerError } from "../utils/errorUtils"

const URL_API = import.meta.env.VITE_API_URL;

export async function loginUser(email, password) {
    const response_http = await fetch(
        URL_API + '/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        }
    )
    
    const response = await response_http.json()
    
    if (!response_http.ok) {
        throw new ServerError(response.message || 'Error al iniciar sesión', response_http.status)
    }
    
    return response
}

export async function registerUser(userData) {
    const response_http = await fetch(
        URL_API + '/api/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }
    )

    const response = await response_http.json()
    
    if (!response_http.ok) {
        throw new ServerError(response.message || 'Error en el registro', response_http.status)
    }
    
    return response
}