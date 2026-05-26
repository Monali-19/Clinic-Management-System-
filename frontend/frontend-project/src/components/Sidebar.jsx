import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    return (

        <div className='w-64 min-h-screen bg-blue-900 text-white p-5'>

            <h1 className='text-3xl font-bold mb-10'>
                Clinic CMS
            </h1>

            <div className='flex flex-col gap-5 text-lg'>

                <Link to="/">Dashboard</Link>

                <Link to="/doctors">Doctors</Link>

                <Link to="/appointments">Appointments</Link>
                <Link to="/prescriptions"> Prescriptions </Link>
                <Link to="/medical-records">Medical Records</Link>
                <Link to="/admin-dashboard">Admin Dashboard</Link>

            </div>

        </div>
    )
}

export default Sidebar