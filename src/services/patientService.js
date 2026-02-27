import { ServerError } from "../utils/errorUtils"

const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getPatients = async () => {
    const res = await fetch(`${URL_API}/api/patients`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    });

    const response = await res.json();
    if (!res.ok) throw new ServerError(response.message || 'Error al obtener pacientes', res.status);
    return response;
};

export const createPatient = async (data) => {
    const res = await fetch(`${URL_API}/api/patients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(data)
    });

    const response = await res.json();
    if (!res.ok) throw new ServerError(response.message || 'Error al registrar', res.status);
    return response;
};

export const getPatientById = async (id) => {
    const res = await fetch(`${URL_API}/api/patients/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    });
    const response = await res.json();
    if (!res.ok) throw new ServerError(response.message || 'Error al obtener paciente', res.status);
    return response;
};

export const updatePatient = async (id, data) => {
    const res = await fetch(`${URL_API}/api/patients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(data)
    });
    const response = await res.json();
    if (!res.ok) throw new ServerError(response.message || 'Error al actualizar', res.status);
    return response;
};