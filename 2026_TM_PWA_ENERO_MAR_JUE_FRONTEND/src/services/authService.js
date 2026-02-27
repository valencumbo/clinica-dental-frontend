import { ServerError } from "../utils/errorUtils"


const URL_API = import.meta.env.VITE_API_URL;

export async function login(email, password) {
    const response_http = await fetch(
        URL_API + '/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    password: password,
                    email: email
                }
            )
        }
    )
    const response = await response_http.json()
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}

export async function register(username, password, email) {
    const response_http = await fetch(
        URL_API + '/api/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //Configuramos que voy enviar JSON en la peticion
            },
            body: JSON.stringify( //transforma un Object a JSON en formato string
                {
                    username: username,
                    password: password,
                    email: email
                }
            )
        }
    )

    //Transformar la respuesta HTTP para obtener los datos que nos envio por body el servidor
    //Como el servidor envia JSON debemos tomar la response como json (.json())
    const response = await response_http.json()
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}
/* 
response body example:
{
    "message": "Usuario creado exitosamente",
    "status": 201,
    "ok": true,
    "data": null
}
*/