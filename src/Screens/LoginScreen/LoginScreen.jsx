import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'
import '../AuthScreens.css'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            await login(email, password)
            toast.success('¡Bienvenido de nuevo!')
            navigate('/home')
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión')
            toast.error('Credenciales incorrectas')
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-logo">🦷</div>
                <h2>Clínica Dental</h2>
                <p>Gestión de Tratamientos y Turnos</p>

                {error && <div className="error-msg">⚠️ {error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn-auth">Entrar al Panel</button>
                </form>

                <div className="auth-footer">
                    ¿Eres nuevo? <Link to="/register" className="auth-link">Crea una cuenta</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen