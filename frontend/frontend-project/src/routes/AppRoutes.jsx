import React from 'react'

import {
    Routes,
    Route
} from 'react-router-dom'

import Home from '../pages/Home'

import Login from '../pages/Login'

import Register from '../pages/Register'

import Dashboard from '../pages/Dashboard'

import Doctors from '../pages/Doctors'

import Appointments from '../pages/Appointments'
import Prescriptions from '../pages/Prescriptions'
import ProtectedRoute from '../components/ProtectedRoute'
import MedicalRecords from '../pages/MedicalRecords'
import AdminDashboard from '../pages/AdminDashboard'

const AppRoutes = () => {

    return (

        <Routes>

            <Route
                path='/'
                element={<Home />}
            />

            <Route
                path='/login'
                element={<Login />}
            />

            <Route
                path='/register'
                element={<Register />}
            />

            <Route
                path='/dashboard'
                element={<Dashboard />}
            />

            <Route
                path='/doctors'
                element={<Doctors />}
            />

            <Route
                path='/appointments'
                element={<Appointments />}
            />
            <Route
                path='/prescriptions'
                element={
                    <ProtectedRoute>
                        <Prescriptions />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/medical-records'
                element={
                    <ProtectedRoute>
                        <MedicalRecords />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/admin-dashboard'
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>
    )
}

export default AppRoutes