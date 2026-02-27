import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import { deleteTreatment } from '../../services/workspaceService' 
import './HomeScreen.css'

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list_error, workspace_list } = useContext(WorkspaceContext)
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleDelete = async (id, name) => {
        if (window.confirm(`¿Estás seguro de que deseás eliminar el tratamiento: "${name}"?`)) {
            try {
                await deleteTreatment(id)
                window.location.reload()
            } catch (error) {
                alert("Error al eliminar: " + error.message)
            }
        }
    }

    if (workspace_list_loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando panel de la clínica...</p>
            </div>
        )
    }

    if (workspace_list_error) {
        return (
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div className="logo-container">
                        <span className="tooth-icon">🦷</span>
                        <h1>Clínica Dental Manager</h1>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                </header>
                <div className="error-banner" style={{ margin: '40px' }}>
                    <span>⚠️ Error al cargar los datos: {workspace_list_error.message}</span>
                </div>
            </div>
        )
    }

    const treatmentsList = Array.isArray(workspace_list) 
        ? workspace_list 
        : workspace_list?.data 
        || workspace_list?.payload 
        || []

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo-container">
                    <span className="tooth-icon">🦷</span>
                    <h1>Clínica Dental Manager</h1>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                    Cerrar Sesión
                </button>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-actions">
                    <h2>Tratamientos Disponibles</h2>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link to="/appointments" className="btn-primary" style={{ backgroundColor: '#28a745' }}>
                            📅 Ver Agenda de Turnos
                        </Link>
                        <Link to="/patients" className="btn-primary" style={{ backgroundColor: '#17a2b8' }}>
                            👥 Ver Pacientes
                        </Link>
                        <Link to="/create-workspace" className="btn-primary">
                            + Nuevo Tratamiento
                        </Link>
                    </div>
                    <Link to="/create-patient" className="btn-primary" style={{ backgroundColor: '#007bff' }}>
                            👤 Nuevo Paciente
                        </Link>
                </div>

                <div className="workspaces-grid">
                    {
                        treatmentsList && treatmentsList.length > 0 ? (
                            treatmentsList.map(treatment => (
                                <div key={treatment._id} className="workspace-card">
                                    <div className="card-header">
                                        <h3>{treatment.name}</h3>
                                    </div>
                                    <div className="card-body">
                                        <p>{treatment.description || "Sin descripción detallada."}</p>
                                        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
                                        <p style={{ margin: '5px 0', color: '#2c3e50' }}>
                                            <strong>Precio:</strong> ${treatment.price}
                                        </p>
                                        <p style={{ margin: '5px 0', color: '#2c3e50' }}>
                                            <strong>Duración:</strong> {treatment.duration} min
                                        </p>
                                    </div>
                                    <div className="card-footer" style={{ display: 'flex', gap: '10px' }}>
                                        <Link 
                                            to={`/edit-treatment/${treatment._id}`} 
                                            className="btn-secondary" 
                                            style={{ 
                                                flex: 1, 
                                                textDecoration: 'none', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                backgroundColor: '#fff3cd',
                                                color: '#856404',
                                                border: '1px solid #ffeeba'
                                            }}
                                        >
                                            Editar
                                        </Link>
                                        <button 
                                            className="btn-secondary" 
                                            style={{ flex: 1, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}
                                            onClick={() => handleDelete(treatment._id, treatment.name)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <span className="empty-icon">📂</span>
                                <p>Aún no hay tratamientos configurados en la clínica.</p>
                            </div>
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export default HomeScreen