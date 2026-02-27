const API_URL = import.meta.env.VITE_API_URL + '/api/appointments';

export const createAppointment = async (data, token) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await res.json();
};