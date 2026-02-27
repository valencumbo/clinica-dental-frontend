import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContext } from '../Context/AuthContext'

const ProtectedRoute = () => {
    const { isLogged } = useContext(AuthContext)

    // Si el usuario no esta logueado, lo redirigimos a login
    if (!isLogged) {
        return <Navigate to="/login" replace />
    }

    // Si esta logueado, lo dejamos pasar
    return <Outlet />
}

export default ProtectedRoute