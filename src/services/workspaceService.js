import { ServerError } from "../utils/errorUtils"

const URL_API = import.meta.env.VITE_API_URL

export async function getWorkspaceList() {
    const response_http = await fetch(
        URL_API + '/api/treatments',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
            },
        }
    )
    
    const response = await response_http.json()
    
    // Evaluamos response_http.ok que es el estado real de la petición de red
    if (!response_http.ok) {
        throw new ServerError(response.message || 'Error al obtener las áreas de la clínica', response_http.status)
    }
    
    return response
}

export async function createWorkspace(workspace_data) {
    const response_http = await fetch(
        URL_API + '/api/treatments',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
            },
            body: JSON.stringify(workspace_data)
        }
    )
    
    const response = await response_http.json()
    
    if (!response_http.ok) {
        throw new ServerError(response.message || 'Error al crear el área de la clínica', response_http.status)
    }
    
    return response
}

export async function deleteTreatment(id) {
    const response_http = await fetch(
        URL_API + '/api/treatments/' + id,
        {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
            }
        }
    )
    
    const response = await response_http.json()
    
    if (!response_http.ok) {
        throw new ServerError(response.message || 'Error al eliminar el tratamiento', response_http.status)
    }
    
    return response
}

export async function updateTreatment(id, treatment_data) {
    const response_http = await fetch(
        URL_API + '/api/treatments/' + id,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token'),
            },
            body: JSON.stringify(treatment_data)
        }
    )
    
    const response = await response_http.json()
    
    if (!response_http.ok) {
        throw new ServerError(response.message || 'Error al actualizar el tratamiento', response_http.status)
    }
    
    return response
}