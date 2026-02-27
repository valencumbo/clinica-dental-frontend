import React from 'react'
import { Link } from 'react-router'
import useCreateWorkspace from '../../hooks/useCreateWorkspace'
import './CreateWorkspaceScreen.css'

const CreateWorkspaceScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        isLoading,
        error,
        errors
    } = useCreateWorkspace()

    return (
        <div className="create-container">
            <div className="create-card">
                <div className="create-header">
                    <h2>🩺 Agregar Nuevo Tratamiento</h2>
                    <p>Registrá un nuevo servicio para la clínica dental.</p>
                </div>
                
                <form onSubmit={onSubmitForm} className="create-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Tratamiento:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form_state.name}
                            onChange={onChangeFieldValue}
                            placeholder="Ej: Ortodoncia con brackets"
                            className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form_state.description}
                            onChange={onChangeFieldValue}
                            placeholder="Detalles sobre en qué consiste el tratamiento..."
                            rows="3"
                            className={errors.description ? 'input-error' : ''}
                        />
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Precio Estimado ($):</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={form_state.price}
                            onChange={onChangeFieldValue}
                            placeholder="Ej: 50000"
                            className={errors.price ? 'input-error' : ''}
                        />
                        {errors.price && <span className="error-text">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duración Estimada (minutos):</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={form_state.duration}
                            onChange={onChangeFieldValue}
                            placeholder="Ej: 45"
                            className={errors.duration ? 'input-error' : ''}
                        />
                        {errors.duration && <span className="error-text">{errors.duration}</span>}
                    </div>

                    {error && (
                        <div className="server-error">
                            ⚠️ {error.message}
                        </div>
                    )}

                    <div className="form-actions">
                        <Link to="/home" className="btn-cancel">
                            Cancelar
                        </Link>
                        <button type="submit" disabled={isLoading} className="btn-submit">
                            {isLoading ? 'Guardando...' : 'Guardar Tratamiento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkspaceScreen