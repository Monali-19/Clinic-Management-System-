import React, { useEffect, useState } from 'react'

import api from '../api/axios'
import ProtectedRoute from '../components/ProtectedRoute'

const Prescriptions = () => {

  const [prescriptions, setPrescriptions] = useState([])

  const [patients, setPatients] = useState([])

  const [doctors, setDoctors] = useState([])

  const [formData, setFormData] = useState({
    patient:'',
    doctor:'',
    medicines:'',
    dosage:'',
    remarks:'',
    prescription_date:'',
  })

  // FETCH PRESCRIPTIONS

  const fetchPrescriptions = async () => {

    try{

      const response = await api.get(
        'prescriptions/'
      )

      setPrescriptions(response.data)

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

    fetchPrescriptions()

    fetchPatients()

    fetchDoctors()

  },[])

  // ADD PRESCRIPTION

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      await api.post(
        'prescriptions/',
        formData
      )

      alert("Prescription Added Successfully")

      setFormData({
        patient:'',
        doctor:'',
        medicines:'',
        dosage:'',
        remarks:'',
        prescription_date:'',
      })

      fetchPrescriptions()

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
            Prescription Management
          </h1>

          <p className='text-gray-600 mt-2'>
            Add & Manage Patient Prescriptions
          </p>

        </div>

        <div className='bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg'>

          Total Prescriptions :
          <span className='font-bold ml-2'>
            {prescriptions.length}
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

        {/* MEDICINES */}

        <textarea
          rows="4"
          placeholder='Medicines'
          value={formData.medicines}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              medicines:e.target.value
            })
          }
        />

        {/* DOSAGE */}

        <textarea
          rows="4"
          placeholder='Dosage Instructions'
          value={formData.dosage}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              dosage:e.target.value
            })
          }
        />

        {/* REMARKS */}

        <textarea
          rows="4"
          placeholder='Remarks'
          value={formData.remarks}
          className='border p-3 rounded-xl outline-none focus:border-blue-500 md:col-span-2'
          onChange={(e)=>
            setFormData({
              ...formData,
              remarks:e.target.value
            })
          }
        />

        {/* DATE */}

        <input
          type="date"
          value={formData.prescription_date}
          className='border p-3 rounded-xl outline-none focus:border-blue-500 md:col-span-2'
          onChange={(e)=>
            setFormData({
              ...formData,
              prescription_date:e.target.value
            })
          }
        />

        {/* BUTTON */}

        <button
          className='bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl text-lg font-semibold md:col-span-2 active:scale-95'
        >
          Add Prescription
        </button>

      </form>

      {/* PRESCRIPTION CARDS */}

      <div className='grid md:grid-cols-3 gap-6'>

        {
          prescriptions.map((prescription)=>(

            <div
              key={prescription.id}
              className='bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition'
            >

              <h1 className='text-2xl font-bold text-blue-800 mb-4'>
                Prescription
              </h1>

              <div className='space-y-3 text-gray-700'>

                <p>
                  <span className='font-semibold'>
                    Medicines:
                  </span>

                  {prescription.medicines}
                </p>

                <p>
                  <span className='font-semibold'>
                    Dosage:
                  </span>

                  {prescription.dosage}
                </p>

                <p>
                  <span className='font-semibold'>
                    Remarks:
                  </span>

                  {prescription.remarks}
                </p>

                <p>
                  <span className='font-semibold'>
                    Date:
                  </span>

                  {prescription.prescription_date}
                </p>

              </div>

              {/* DOWNLOAD */}

              <button
                className='mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl w-full'
              >
                Download Prescription
              </button>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Prescriptions