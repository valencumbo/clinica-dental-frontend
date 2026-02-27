import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '../../services/authService'
import toast from 'react-hot-toast'
import '../AuthScreens.css'

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            await registerUser(formData)
            toast.success('¡Registro exitoso! Por favor, revisá tu correo para verificar tu cuenta antes de ingresar.', { duration: 10000 })
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Error en el registro')
            toast.error('No se pudo completar el registro')
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-logo">✨</div>
                <h2>Registrarse</h2>
                <p>Crea tu cuenta administrativa</p>

                {error && <div className="error-msg">⚠️ {error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Tu nombre"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn-auth">Crear Cuenta</button>
                </form>

                <div className="auth-footer">
                    ¿Ya tienes cuenta? <Link to="/login" className="auth-link">Inicia Sesión</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen