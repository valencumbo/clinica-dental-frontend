import React, { useState, useContext } from 'react'
import { Link } from 'react-router'
import { createAppointment } from '../../services/appointmentService'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import toast from 'react-hot-toast'
import '../EditTreatmentScreen/EditTreatmentScreen.css' 

const CreateAppointmentScreen = () => {
    const { workspace_list } = useContext(WorkspaceContext)
    const treatments = Array.isArray(workspace_list) ? workspace_list : workspace_list?.data || []

    const [formData, setFormData] = useState({
        patientName: '',
        date: '',
        treatmentId: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const loadToast = toast.loading('Agendando turno...')

        try {
            const appointmentData = {
                patientName: formData.patientName,
                date: new Date(formData.date).toISOString(),
                treatment: formData.treatmentId,
                status: 'pending' // Estado inicial por defecto
            }

            await createAppointment(appointmentData)
            toast.success('¡Turno agendado con éxito!', { id: loadToast })
            
            window.location.href = '/appointments'
        } catch (error) {
            toast.error("Error al agendar: " + error.message, { id: loadToast })
            setIsLoading(false)
        }
    }

    return (
        <div className="create-container">
            <div className="create-card" style={{ borderTopColor: '#28a745' }}>
                <div className="create-header" style={{ backgroundColor: '#f0fff4' }}>
                    <h2 style={{ color: '#155724' }}>📅 Agendar Nuevo Turno</h2>
                    <p style={{ color: '#28a745' }}>Completá los datos para reservar un espacio</p>
                </div>
                
                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label>Nombre del Paciente (Provisorio):</label>
                        <input 
                            type="text" 
                            name="patientName" 
                            value={formData.patientName} 
                            onChange={handleChange} 
                            placeholder="Ej: Juan Pérez"
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Fecha y Hora:</label>
                        <input 
                            type="datetime-local" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Tratamiento / Servicio:</label>
                        <select 
                            name="treatmentId" 
                            value={formData.treatmentId} 
                            onChange={handleChange} 
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '1rem' }}
                        >
                            <option value="">-- Seleccioná un tratamiento --</option>
                            {treatments.map(t => (
                                <option key={t._id} value={t._id}>
                                    {t.name} (${t.price})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-actions">
                        <Link to="/appointments" className="btn-cancel">Cancelar</Link>
                        <button type="submit" disabled={isLoading} className="btn-submit" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                            {isLoading ? 'Guardando...' : 'Confirmar Turno'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAppointmentScreen