const API_URL = import.meta.env.VITE_API_URL + '/api/treatments';

export const getTreatments = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    return json.data; // Retorna los tratamientos para el listado
};