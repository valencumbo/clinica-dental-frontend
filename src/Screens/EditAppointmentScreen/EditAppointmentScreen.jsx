import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router'
import { getAppointmentById, updateAppointment } from '../../services/appointmentService'
import { getPatients } from '../../services/patientService'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import toast from 'react-hot-toast'
import '../EditTreatmentScreen/EditTreatmentScreen.css'

const EditAppointmentScreen = () => {
    const { id } = useParams()
    const { workspace_list } = useContext(WorkspaceContext)
    const treatments = Array.isArray(workspace_list) ? workspace_list : workspace_list?.data || []

    const [patients, setPatients] = useState([])
    const [formData, setFormData] = useState({
        patientId: '',
        date: '',
        treatmentId: '',
        status: 'pending'
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const patientsRes = await getPatients()
                setPatients(patientsRes.data || patientsRes.payload || [])

                const appRes = await getAppointmentById(id)
                const appointment = appRes.data || appRes.payload

                if (appointment) {
                    const datePart = appointment.date ? appointment.date.split('T')[0] : ''
                    const timePart = appointment.time || '00:00'
                    
                    setFormData({
                        patientId: appointment.patient?._id || appointment.patient || '',
                        date: `${datePart}T${timePart}`,
                        treatmentId: appointment.treatment?._id || appointment.treatment || '',
                        status: appointment.status || 'pending'
                    })
                }
            } catch (error) {
                toast.error("Error al cargar los datos del turno")
            } finally {
                setIsFetching(false)
            }
        }
        loadData()
    }, [id])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const loadToast = toast.loading('Actualizando turno...')

        try {
            const [datePart, timePart] = formData.date.split('T')

            const updatedData = {
                patient: formData.patientId,
                treatment: formData.treatmentId,
                date: datePart,
                time: timePart,
                status: formData.status
            }

            await updateAppointment(id, updatedData)
            toast.success('¡Turno actualizado!', { id: loadToast })
            window.location.href = '/appointments'
        } catch (error) {
            toast.error("Error al actualizar: " + error.message, { id: loadToast })
            setIsLoading(false)
        }
    }

    if (isFetching) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h3>Cargando turno...</h3></div>

    return (
        <div className="create-container">
            <div className="create-card" style={{ borderTopColor: '#ffc107' }}>
                <div className="create-header" style={{ backgroundColor: '#fff8e5' }}>
                    <h2 style={{ color: '#856404' }}>✏️ Editar Turno</h2>
                    <p style={{ color: '#d39e00' }}>Modificá la fecha, tratamiento o estado.</p>
                </div>

                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label>Paciente:</label>
                        <select name="patientId" value={formData.patientId} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da' }}>
                            <option value="">-- Seleccioná un paciente --</option>
                            {patients.map(p => (
                                <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Fecha y Hora:</label>
                        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Tratamiento / Servicio:</label>
                        <select name="treatmentId" value={formData.treatmentId} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da' }}>
                            <option value="">-- Seleccioná un tratamiento --</option>
                            {treatments.map(t => (
                                <option key={t._id} value={t._id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Estado del Turno:</label>
                        <select name="status" value={formData.status} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ced4da' }}>
                            <option value="pending">Pendiente</option>
                            <option value="completed">Realizado</option>
                            <option value="cancelled">Cancelado</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <Link to="/appointments" className="btn-cancel">Cancelar</Link>
                        <button type="submit" disabled={isLoading} className="btn-submit" style={{ backgroundColor: '#ffc107', color: '#212529', fontWeight: 'bold' }}>
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAppointmentScreen