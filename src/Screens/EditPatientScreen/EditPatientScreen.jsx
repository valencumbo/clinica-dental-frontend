import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { getPatientById, updatePatient } from '../../services/patientService'
import toast from 'react-hot-toast'
import '../EditTreatmentScreen/EditTreatmentScreen.css' 

const EditPatientScreen = () => {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '', email: '', clinicalHistory: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    // Cargamos los datos del paciente
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await getPatientById(id)
                const patientData = response.data || response.payload
                if (patientData) {
                    setFormData({
                        firstName: patientData.firstName || '',
                        lastName: patientData.lastName || '',
                        phone: patientData.phone || '',
                        email: patientData.email || '',
                        clinicalHistory: patientData.clinicalHistory || ''
                    })
                }
            } catch (error) {
                toast.error("Error al cargar datos del paciente")
            } finally {
                setIsFetching(false)
            }
        }
        fetchPatient()
    }, [id])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const loadToast = toast.loading('Actualizando paciente...')

        try {
            await updatePatient(id, formData)
            toast.success('¡Datos actualizados con éxito!', { id: loadToast })
            window.location.href = '/patients'
        } catch (error) {
            toast.error("Error al actualizar: " + error.message, { id: loadToast })
            setIsLoading(false)
        }
    }

    if (isFetching) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h3>Cargando ficha médica...</h3></div>

    return (
        <div className="create-container">
            <div className="create-card" style={{ borderTopColor: '#0056b3' }}>
                <div className="create-header" style={{ backgroundColor: '#e6f2ff' }}>
                    <h2 style={{ color: '#0056b3' }}>✏️ Editar Paciente</h2>
                    <p style={{ color: '#007bff' }}>Actualizá los datos y la historia clínica.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="create-form">
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Nombre:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Apellido:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Teléfono:</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Email (Opcional):</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Historia Clínica / Antecedentes:</label>
                        <textarea name="clinicalHistory" value={formData.clinicalHistory} onChange={handleChange} rows="5" />
                    </div>

                    <div className="form-actions">
                        <Link to="/patients" className="btn-cancel">Cancelar</Link>
                        <button type="submit" disabled={isLoading} className="btn-submit" style={{ backgroundColor: '#0056b3', color: '#fff' }}>
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPatientScreen