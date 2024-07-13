import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom";



export const PrivateGuard = ({ children }) => {

    const { isAuthenticated } = useContext(AuthContext)


    if (!isAuthenticated) {
        return <Navigate to='/home' replace />
    }

    return children ? children : <Outlet />

}