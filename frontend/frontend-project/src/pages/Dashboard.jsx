import React from 'react'

const Dashboard = () => {

  return (

    <div className='p-5'>

      <h1 className='text-4xl font-bold mb-10'>
        Admin Dashboard
      </h1>

      <div className='grid md:grid-cols-3 gap-5'>

        <div className='bg-blue-500 text-white p-10 rounded-2xl shadow-lg'>
          <h1>Total Doctors</h1>
          <p className='text-5xl font-bold'>20</p>
        </div>

        <div className='bg-green-500 text-white p-10 rounded-2xl shadow-lg'>
          <h1>Appointments</h1>
          <p className='text-5xl font-bold'>100</p>
        </div>

        <div className='bg-purple-500 text-white p-10 rounded-2xl shadow-lg'>
          <h1>Revenue</h1>
          <p className='text-5xl font-bold'>₹50K</p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard