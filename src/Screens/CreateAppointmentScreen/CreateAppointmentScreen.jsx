import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router'
import { createAppointment } from '../../services/appointmentService'
import { getPatients } from '../../services/patientService'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import toast from 'react-hot-toast'
import '../EditTreatmentScreen/EditTreatmentScreen.css' 

const CreateAppointmentScreen = () => {
    const { workspace_list } = useContext(WorkspaceContext)
    const treatments = Array.isArray(workspace_list) ? workspace_list : workspace_list?.data || []

    // Estado para guardar los pacientes de la base de datos
    const [patients, setPatients] = useState([])

    const [formData, setFormData] = useState({
        patientId: '', 
        date: '',
        treatmentId: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    // Buscamos los pacientes al abrir la pantalla
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getPatients()
                const data = response.data || response.payload || []
                setPatients(data)
            } catch (error) {
                toast.error("No se pudieron cargar los pacientes")
            }
        }
        fetchPatients()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const loadToast = toast.loading('Agendando turno...')

        try {
            const [datePart, timePart] = formData.date.split('T')

            const appointmentData = {
                patient: formData.patientId,
                treatment: formData.treatmentId,
                date: datePart,
                time: timePart,
                status: 'pending'
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
                    <p style={{ color: '#28a745' }}>Seleccioná un paciente y reservá un espacio</p>
                </div>
                
                <form onSubmit={handleSubmit} className="create-form">
                    
                    <div className="form-group">
                        <label>Paciente:</label>
                        <select 
                            name="patientId" 
                            value={formData.patientId} 
                            onChange={handleChange} 
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '1rem', backgroundColor: '#fff' }}
                        >
                            <option value="">-- Seleccioná un paciente --</option>
                            {patients.map(p => (
                                <option key={p._id} value={p._id}>
                                    {p.firstName} {p.lastName} {p.phone ? `(${p.phone})` : ''}
                                </option>
                            ))}
                        </select>
                        {patients.length === 0 && (
                            <small style={{ color: '#dc3545', display: 'block', marginTop: '5px' }}>
                                No hay pacientes registrados. Por favor creá uno primero.
                            </small>
                        )}
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
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da', fontSize: '1rem', backgroundColor: '#fff' }}
                        >
                            <option value="">-- Seleccioná un tratamiento --</option>
                            {treatments.map(t => (
                                <option key={t._id} value={t._id}>
                                    {t.name} - ${t.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-actions">
                        <Link to="/appointments" className="btn-cancel">Cancelar</Link>
                        <button type="submit" disabled={isLoading || patients.length === 0} className="btn-submit" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                            {isLoading ? 'Guardando...' : 'Confirmar Turno'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateAppointmentScreen