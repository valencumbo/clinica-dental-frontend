import React, { useState } from 'react'
import { Link } from 'react-router'
import { createPatient } from '../../services/patientService'
import toast from 'react-hot-toast'
import '../EditTreatmentScreen/EditTreatmentScreen.css'

const CreatePatientScreen = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        clinicalHistory: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const loadToast = toast.loading('Registrando paciente en la base de datos...')

        try {
            await createPatient(formData)
            toast.success('¡Paciente registrado con éxito!', { id: loadToast })
            window.location.href = '/home'
        } catch (error) {
            toast.error("Error al registrar: " + error.message, { id: loadToast })
            setIsLoading(false)
        }
    }

    return (
        <div className="create-container">
            <div className="create-card" style={{ borderTopColor: '#007bff' }}>
                <div className="create-header" style={{ backgroundColor: '#e6f2ff' }}>
                    <h2 style={{ color: '#0056b3' }}>👤 Nuevo Paciente</h2>
                    <p style={{ color: '#007bff' }}>Ingresá los datos personales y la historia clínica.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="create-form">
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Nombre:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Ej: María" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Apellido:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Ej: Gómez" />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Teléfono:</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Ej: 1123456789" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Email (Opcional):</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="maria@correo.com" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Historia Clínica / Antecedentes:</label>
                        <textarea 
                            name="clinicalHistory" 
                            value={formData.clinicalHistory} 
                            onChange={handleChange} 
                            rows="4" 
                            placeholder="Alergias, medicamentos, cirugías previas, etc..."
                        />
                    </div>

                    <div className="form-actions">
                        <Link to="/home" className="btn-cancel">Cancelar</Link>
                        <button type="submit" disabled={isLoading} className="btn-submit" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                            {isLoading ? 'Guardando...' : 'Registrar Paciente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePatientScreen