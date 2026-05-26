import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => {

  return (

    <div className='min-h-screen bg-gray-100'>

      {/* NAVBAR */}

      <div className='bg-blue-900 text-white p-5 flex justify-between items-center'>

        <h1 className='text-3xl font-bold'>
          Clinic CMS
        </h1>

        <div className='flex gap-5'>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

      {/* HERO SECTION */}

      <div className='flex flex-col justify-center items-center text-center py-32 px-5'>

        <h1 className='text-6xl font-bold mb-5'>
          Clinic Management System
        </h1>

        <p className='text-xl text-gray-600 mb-10'>
          Modern Healthcare Management Platform
        </p>

        <div className='flex gap-5'>

          <Link
            to="/login"
            className='bg-blue-600 text-white px-8 py-3 rounded-xl'
          >
            Login
          </Link>

          <Link
            to="/register"
            className='bg-green-600 text-white px-8 py-3 rounded-xl'
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Home