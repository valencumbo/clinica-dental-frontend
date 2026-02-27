import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getPatients } from '../../services/patientService'
import toast from 'react-hot-toast'
import './PatientsScreen.css'

const PatientsScreen = () => {
    const [patients, setPatients] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getPatients()
                const data = response.data || response.payload || []
                setPatients(data)
            } catch (error) {
                toast.error("Error al cargar pacientes: " + error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPatients()
    }, [])

    return (
        <div className="patients-container">
            <Link to="/home" className="btn-back" style={{ color: '#007bff', display: 'inline-block', marginBottom: '20px', textDecoration: 'none', fontWeight: 'bold' }}>
                ← Volver al Panel Principal
            </Link>

            <div className="patients-header">
                <h2>👥 Directorio de Pacientes</h2>
                <Link to="/create-patient" className="btn-new-patient">
                    + Nuevo Paciente
                </Link>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>Cargando directorio...</h3>
                </div>
            ) : patients.length > 0 ? (
                <div className="patients-grid">
                    {patients.map(patient => (
                        <div key={patient._id} className="patient-card">
                            <div>
                                <div className="patient-name">
                                    {patient.firstName} {patient.lastName}
                                </div>
                                <div className="patient-details">
                                    <p>📱 <strong>Tel:</strong> {patient.phone}</p>
                                    <p>✉️ <strong>Email:</strong> {patient.email || 'No registrado'}</p>
                                    <p>📋 <strong>Historia:</strong> {
                                        patient.clinicalHistory?.length > 50 
                                            ? patient.clinicalHistory.substring(0, 50) + '...' 
                                            : (patient.clinicalHistory || 'Sin antecedentes')
                                    }</p>
                                </div>
                            </div>
                            <div className="patient-actions">
                                <Link to={`/edit-patient/${patient._id}`} className="btn-edit">
                                    ✏️ Editar Ficha
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#6c757d' }}>
                    <span style={{ fontSize: '3rem' }}>📇</span>
                    <h3>No hay pacientes registrados.</h3>
                    <p>Agregá tu primer paciente para empezar a armar las historias clínicas.</p>
                </div>
            )}
        </div>
    )
}

export default PatientsScreen