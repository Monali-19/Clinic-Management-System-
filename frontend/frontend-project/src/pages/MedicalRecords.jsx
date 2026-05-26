import React, { useEffect, useState } from 'react'

import api from '../api/axios'

const MedicalRecords = () => {

  const [records, setRecords] = useState([])

  const [patients, setPatients] = useState([])

  const [doctors, setDoctors] = useState([])

  const [formData, setFormData] = useState({
    patient:'',
    doctor:'',
    diagnosis:'',
    patient_history:'',
    previous_prescription:'',
    appointment_history:'',
  })

  // FETCH RECORDS

  const fetchRecords = async () => {

    try{

      const response = await api.get(
        'medical-records/'
      )

      setRecords(response.data)

    }catch(error){

      console.log(error)
    }
  }

  // FETCH PATIENTS

  const fetchPatients = async () => {

    try{

      const response = await api.get(
        'patients/'
      )

      setPatients(response.data)

    }catch(error){

      console.log(error)
    }
  }

  // FETCH DOCTORS

  const fetchDoctors = async () => {

    try{

      const response = await api.get(
        'doctors/'
      )

      setDoctors(response.data)

    }catch(error){

      console.log(error)
    }
  }

  useEffect(()=>{

    fetchRecords()

    fetchPatients()

    fetchDoctors()

  },[])

  // ADD RECORD

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      await api.post(
        'medical-records/',
        formData
      )

      alert("Medical Record Added Successfully")

      setFormData({
        patient:'',
        doctor:'',
        diagnosis:'',
        patient_history:'',
        previous_prescription:'',
        appointment_history:'',
      })

      fetchRecords()

    }catch(error){

      console.log(error)

      alert("Something went wrong")
    }
  }

  return (

    <div className='p-5 bg-gray-100 min-h-screen'>

      {/* HEADER */}

      <div className='flex justify-between items-center mb-10 flex-wrap gap-5'>

        <div>

          <h1 className='text-4xl font-bold text-blue-800'>
            Medical Records
          </h1>

          <p className='text-gray-600 mt-2'>
            Manage Patient Medical History
          </p>

        </div>

        <div className='bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg'>

          Total Records :
          <span className='font-bold ml-2'>
            {records.length}
          </span>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-3xl shadow-lg grid md:grid-cols-2 gap-5 mb-10'
      >

        {/* PATIENT */}

        <select
          value={formData.patient}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              patient:e.target.value
            })
          }
        >

          <option value="">
            Select Patient
          </option>

          {
            patients.map((patient)=>(

              <option
                key={patient.id}
                value={patient.id}
              >
                {patient.patient_name}
              </option>
            ))
          }

        </select>

        {/* DOCTOR */}

        <select
          value={formData.doctor}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              doctor:e.target.value
            })
          }
        >

          <option value="">
            Select Doctor
          </option>

          {
            doctors.map((doctor)=>(

              <option
                key={doctor.id}
                value={doctor.id}
              >
                Dr. {doctor.name}
              </option>
            ))
          }

        </select>

        {/* DIAGNOSIS */}

        <textarea
          rows="4"
          placeholder='Diagnosis Records'
          value={formData.diagnosis}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              diagnosis:e.target.value
            })
          }
        />

        {/* PATIENT HISTORY */}

        <textarea
          rows="4"
          placeholder='Patient History'
          value={formData.patient_history}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              patient_history:e.target.value
            })
          }
        />

        {/* PREVIOUS PRESCRIPTION */}

        <textarea
          rows="4"
          placeholder='Previous Prescriptions'
          value={formData.previous_prescription}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              previous_prescription:e.target.value
            })
          }
        />

        {/* APPOINTMENT HISTORY */}

        <textarea
          rows="4"
          placeholder='Appointment History'
          value={formData.appointment_history}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              appointment_history:e.target.value
            })
          }
        />

        {/* BUTTON */}

        <button
          className='bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl text-lg font-semibold md:col-span-2 active:scale-95'
        >
          Add Medical Record
        </button>

      </form>

      {/* RECORD CARDS */}

      <div className='grid md:grid-cols-3 gap-6'>

        {
          records.map((record)=>(

            <div
              key={record.id}
              className='bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition'
            >

              <h1 className='text-2xl font-bold text-blue-800 mb-4'>
                Medical Record
              </h1>

              <div className='space-y-3 text-gray-700'>

                <p>
                  <span className='font-semibold'>
                    Diagnosis:
                  </span>

                  {record.diagnosis}
                </p>

                <p>
                  <span className='font-semibold'>
                    Patient History:
                  </span>

                  {record.patient_history}
                </p>

                <p>
                  <span className='font-semibold'>
                    Previous Prescription:
                  </span>

                  {record.previous_prescription}
                </p>

                <p>
                  <span className='font-semibold'>
                    Appointment History:
                  </span>

                  {record.appointment_history}
                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default MedicalRecords