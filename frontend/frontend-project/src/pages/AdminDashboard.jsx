import React, { useEffect, useState } from 'react'

import api from '../api/axios'

const AdminDashboard = () => {

  const [appointments, setAppointments] = useState([])

  const [doctors, setDoctors] = useState([])

  const [patients, setPatients] = useState([])

  const [revenue, setRevenue] = useState(0)

  // FETCH ALL DATA

  const fetchData = async () => {

    try{

      const appointmentRes = await api.get(
        'appointments/'
      )

      const doctorRes = await api.get(
        'doctors/'
      )

      const patientRes = await api.get(
        'patients/'
      )

      setAppointments(appointmentRes.data)

      setDoctors(doctorRes.data)

      setPatients(patientRes.data)

      // TOTAL REVENUE

      let total = 0

      appointmentRes.data.forEach((item)=>{

        total += Number(item.fee || 500)

      })

      setRevenue(total)

    }catch(error){

      console.log(error)
    }
  }

  useEffect(()=>{

    fetchData()

  },[])

  // COMPLETED APPOINTMENTS

  const completedAppointments =
    appointments.filter(
      item => item.status === 'Completed'
    ).length

  // CANCELLED APPOINTMENTS

  const cancelledAppointments =
    appointments.filter(
      item => item.status === 'Cancelled'
    ).length

  return (

    <div className='p-5 bg-gray-100 min-h-screen'>

      {/* HEADER */}

      <div className='mb-10'>

        <h1 className='text-4xl font-bold text-blue-800'>
          Admin Dashboard
        </h1>

        <p className='text-gray-600 mt-2'>
          Clinic Analytics & Management
        </p>

      </div>

      {/* ANALYTICS CARDS */}

      <div className='grid md:grid-cols-4 gap-5 mb-10'>

        <div className='bg-white p-6 rounded-3xl shadow-lg'>

          <h2 className='text-xl font-semibold text-gray-700'>
            Total Appointments
          </h2>

          <p className='text-4xl font-bold text-blue-700 mt-3'>
            {appointments.length}
          </p>

        </div>

        <div className='bg-white p-6 rounded-3xl shadow-lg'>

          <h2 className='text-xl font-semibold text-gray-700'>
            Completed
          </h2>

          <p className='text-4xl font-bold text-green-600 mt-3'>
            {completedAppointments}
          </p>

        </div>

        <div className='bg-white p-6 rounded-3xl shadow-lg'>

          <h2 className='text-xl font-semibold text-gray-700'>
            Cancelled
          </h2>

          <p className='text-4xl font-bold text-red-600 mt-3'>
            {cancelledAppointments}
          </p>

        </div>

        <div className='bg-white p-6 rounded-3xl shadow-lg'>

          <h2 className='text-xl font-semibold text-gray-700'>
            Revenue
          </h2>

          <p className='text-4xl font-bold text-purple-700 mt-3'>
            ₹ {revenue}
          </p>

        </div>

      </div>

      {/* SECOND ROW */}

      <div className='grid md:grid-cols-2 gap-5 mb-10'>

        {/* PATIENT ANALYTICS */}

        <div className='bg-white p-6 rounded-3xl shadow-lg'>

          <h2 className='text-2xl font-bold text-blue-700 mb-5'>
            Patient Analytics
          </h2>

          <div className='space-y-4'>

            <div className='flex justify-between bg-gray-100 p-4 rounded-xl'>

              <span>Total Registered Patients</span>

              <span className='font-bold'>
                {patients.length}
              </span>

            </div>

            <div className='flex justify-between bg-gray-100 p-4 rounded-xl'>

              <span>Total Patients Checked</span>

              <span className='font-bold'>
                {appointments.length}
              </span>

            </div>

          </div>

        </div>

        {/* DOCTOR STATUS */}

        <div className='bg-white p-6 rounded-3xl shadow-lg'>

          <h2 className='text-2xl font-bold text-blue-700 mb-5'>
            Doctor Day-wise Status
          </h2>

          <div className='space-y-4'>

            {
              doctors.map((doctor)=>(

                <div
                  key={doctor.id}
                  className='bg-gray-100 p-4 rounded-xl'
                >

                  <h3 className='font-bold text-lg'>
                    Dr. {doctor.name}
                  </h3>

                  <p>
                    Specialization :
                    {doctor.specialization}
                  </p>

                  <p>
                    Fee :
                    ₹ {doctor.fee}
                  </p>

                </div>
              ))
            }

          </div>

        </div>

      </div>

      {/* REVENUE BY DOCTOR */}

      <div className='bg-white p-6 rounded-3xl shadow-lg mb-10'>

        <h2 className='text-2xl font-bold text-blue-700 mb-5'>
          Revenue By Doctor
        </h2>

        <div className='grid md:grid-cols-3 gap-5'>

          {
            doctors.map((doctor)=>(

              <div
                key={doctor.id}
                className='bg-gray-100 p-5 rounded-2xl'
              >

                <h3 className='font-bold text-xl mb-3'>
                  Dr. {doctor.name}
                </h3>

                <p>
                  Revenue :
                  ₹ {
                    appointments
                    .filter(
                      item => item.doctor === doctor.id
                    )
                    .length * Number(doctor.fee || 500)
                  }
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard