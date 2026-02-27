import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { updateTreatment } from '../../services/workspaceService'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import toast from 'react-hot-toast'
import './EditTreatmentScreen.css'

const EditTreatmentScreen = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { workspace_list } = useContext(WorkspaceContext)
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Obtenemos la lista de tratamientos del contexto
        const list = Array.isArray(workspace_list) ? workspace_list : workspace_list?.data || []
        // Buscamos el tratamiento que coincida con el ID de la URL
        const currentTreatment = list.find(t => t._id === id)
        
        if (currentTreatment) {
            setFormData({
                name: currentTreatment.name,
                description: currentTreatment.description || '',
                price: currentTreatment.price,
                duration: currentTreatment.duration
            })
        }
    }, [id, workspace_list])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const loadToast = toast.loading('Actualizando tratamiento...')
        
        try {
            await updateTreatment(id, {
                ...formData,
                price: Number(formData.price),
                duration: Number(formData.duration)
            })
            
            toast.success('¡Tratamiento actualizado!', { id: loadToast })
            navigate('/home')
        } catch (error) {
            toast.error("Error: " + error.message, { id: loadToast })
            setIsLoading(false)
        }
    }

    return (
        <div className="create-container">
            <div className="create-card">
                <div className="create-header">
                    <h2>✏️ Editar Tratamiento</h2>
                    <p>Modificá los valores del servicio dental</p>
                </div>
                
                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label>Nombre del Servicio:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            rows="3" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio ($):</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Duración Estándar (min):</label>
                        <input 
                            type="number" 
                            name="duration" 
                            value={formData.duration} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-actions">
                        <Link to="/home" className="btn-cancel">Cancelar</Link>
                        <button type="submit" disabled={isLoading} className="btn-submit">
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTreatmentScreen