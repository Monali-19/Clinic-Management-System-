import React from 'react'

import { useLocation } from 'react-router-dom'

import Sidebar from './components/Sidebar'

import Navbar from './components/Navbar'

import AppRoutes from './routes/AppRoutes'

const App = () => {

  const location = useLocation()

  const isLoginPage = location.pathname === '/login'

  return (

    <div className='flex'>

      {
        !isLoginPage && <Sidebar />
      }

      <div className='flex-1 bg-gray-100 min-h-screen'>

        {
          !isLoginPage && <Navbar />
        }

        <AppRoutes />

      </div>

    </div>
  )
}

export default App