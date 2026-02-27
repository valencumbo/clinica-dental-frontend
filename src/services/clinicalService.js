import { ServerError } from "../utils/errorUtils";
const URL_API = import.meta.env.VITE_API_URL;

export async function getTreatments() {
    const response_http = await fetch(URL_API + '/api/treatments');
    const response = await response_http.json();
    if (!response_http.ok) {
        throw new ServerError(response.message, response_http.status);
    }
    return response.data;
}

export async function createAppointment(appointmentData) {
    const response_http = await fetch(URL_API + '/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
    });
    const response = await response_http.json();
    if (!response_http.ok) {
        throw new ServerError(response.message, response_http.status);
    }
    return response;
}