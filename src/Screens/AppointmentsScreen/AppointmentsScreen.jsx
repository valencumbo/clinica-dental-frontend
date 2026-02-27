import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getAppointments } from '../../services/appointmentService'
import toast from 'react-hot-toast'
import './AppointmentsScreen.css'

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

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no definida'
        const date = new Date(dateString)
        return date.toLocaleDateString('es-AR', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
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
                                🕒 {formatDate(appointment.date)}
                            </div>
                            <div className="appointment-details">
                                <p><strong>Paciente:</strong> {appointment.patientName || 'No registrado'}</p>
                                <p><strong>Tratamiento:</strong> {appointment.treatment?.name || 'No especificado'}</p>
                            </div>
                            <span className={`status-badge status-${appointment.status || 'pending'}`}>
                                {appointment.status === 'completed' ? 'Realizado' : appointment.status === 'cancelled' ? 'Cancelado' : 'Pendiente'}
                            </span>
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