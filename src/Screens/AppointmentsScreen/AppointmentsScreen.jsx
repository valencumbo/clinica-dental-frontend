import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'
import './AppointmentsScreen.css'
import { getAppointments, deleteAppointment } from '../../services/appointmentService'

const AppointmentsScreen = () => {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAppointments()
                const data = response.data || response.payload || []
                setAppointments(data)
            } catch (error) {
                toast.error("Error al cargar los turnos: " + error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAppointments()
    }, [])

    const handleDelete = async (id) => {
        if(window.confirm('¿Estás seguro de que querés eliminar este turno?')) {
            try {
                await deleteAppointment(id)
                setAppointments(appointments.filter(app => app._id !== id))
                toast.success('Turno eliminado correctamente')
            } catch (error) {
                toast.error('Error al eliminar: ' + error.message)
            }
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no definida'
        const date = new Date(dateString)
        return date.toLocaleDateString('es-AR', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        })
    }

    return (
        <div className="appointments-container">
            <Link to="/home" className="btn-back">← Volver al Panel Principal</Link>

            <div className="appointments-header">
                <h2>📅 Agenda de Turnos</h2>
                <Link to="/create-appointment" className="btn-new-appointment">
                    + Agendar Turno
                </Link>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>Cargando agenda...</h3>
                </div>
            ) : appointments.length > 0 ? (
                <div className="appointments-grid">
                    {appointments.map(appointment => (
                        <div key={appointment._id} className="appointment-card">
                            <div className="appointment-date">
                                🕒 {formatDate(appointment.date)} - {appointment.time} hs
                            </div>
                            <div className="appointment-details">
                                <p><strong>Paciente:</strong> {
                                    appointment.patient 
                                        ? `${appointment.patient.firstName} ${appointment.patient.lastName}` 
                                        : 'No registrado'
                                }</p>
                                <p><strong>Tratamiento:</strong> {appointment.treatment?.name || 'No especificado'}</p>
                            </div>
                            <span className={`status-badge status-${appointment.status || 'pending'}`}>
                                {appointment.status === 'completed' ? 'Realizado' : appointment.status === 'cancelled' ? 'Cancelado' : 'Pendiente'}
                            </span>
                            
                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <Link to={`/edit-appointment/${appointment._id}`} className="btn-edit" style={{ flex: 1 }}>
                                    ✏️ Editar
                                </Link>
                                <button onClick={() => handleDelete(appointment._id)} style={{ flex: 1, backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#6c757d' }}>
                    <span style={{ fontSize: '3rem' }}>📂</span>
                    <h3>No hay turnos agendados aún.</h3>
                    <p>¡Hacé clic en "Agendar Turno" para empezar!</p>
                </div>
            )}
        </div>
    )
}

export default AppointmentsScreen