import { ServerError } from "../utils/errorUtils"

const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getAppointments = async () => {
    const res = await fetch(`${URL_API}/api/appointments`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    });

    const response = await res.json();

    if (!res.ok) {
        throw new ServerError(response.message || 'Error al obtener los turnos', res.status);
    }

    return response;
};

export const createAppointment = async (data) => {
    const res = await fetch(`${URL_API}/api/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(data)
    });

    const response = await res.json();

    if (!res.ok) {
        throw new ServerError(response.message || 'Error al agendar el turno', res.status);
    }

    return response;
};