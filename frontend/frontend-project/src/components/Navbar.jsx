import React from 'react'

import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem('token')

    localStorage.removeItem('role')

    navigate('/login')
  }

  return (

    <div className='bg-white shadow-md p-5 flex justify-between'>

      <h1 className='text-2xl font-bold'>
        Clinic Management System
      </h1>

      <button
        onClick={handleLogout}
        className='bg-red-500 text-white px-5 py-2 rounded-lg active:scale-95'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar