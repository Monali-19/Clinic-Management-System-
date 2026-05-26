import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import api from '../api/axios'

const Appointments = () => {

  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])

  const [doctors, setDoctors] = useState([])

  const [formData, setFormData] = useState({
    patient_name:'',
    patient_age:'',
    gender:'',
    mobile:'',
    doctor:'',
    appointment_date:'',
    appointment_time:'',
    disease:'',
    address:'',
  })

  // FETCH APPOINTMENTS

  const fetchAppointments = async () => {

    try{

      const response = await api.get(
        'appointments/'
      )

      setAppointments(response.data)

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

    fetchAppointments()

    fetchDoctors()

  },[])

  // BOOK APPOINTMENT

  const handleSubmit = async (e) => {

    e.preventDefault()

    // LOGIN CHECK

    const token = localStorage.getItem('token')

    if(!token){

      alert(
        "Please Login First To Book Appointment"
      )

      navigate('/login')

      return
    }

    // REQUIRED FIELD VALIDATION

    if(
      !formData.patient_name ||
      !formData.patient_age ||
      !formData.gender ||
      !formData.mobile ||
      !formData.doctor ||
      !formData.appointment_date ||
      !formData.appointment_time ||
      !formData.disease ||
      !formData.address
    ){

      alert("All Fields Are Required")

      return
    }

    // MOBILE VALIDATION

    const mobileRegex = /^[0-9]{10}$/

    if(!mobileRegex.test(formData.mobile)){

      alert(
        "Mobile Number Must Be 10 Digits"
      )

      return
    }

    // AGE VALIDATION

    if(formData.patient_age < 1){

      alert("Enter Valid Age")

      return
    }

    try{

      // SAVE PATIENT RECORD

      await api.post(
        'patients/',
        {
          patient_name: formData.patient_name,
          patient_age: formData.patient_age,
          gender: formData.gender,
          mobile: formData.mobile,
          disease: formData.disease,
          address: formData.address,
        }
      )

      // SAVE APPOINTMENT

      await api.post(
        'appointments/',
        formData
      )

      alert(
        "Appointment Booked Successfully"
      )

      setFormData({
        patient_name:'',
        patient_age:'',
        gender:'',
        mobile:'',
        doctor:'',
        appointment_date:'',
        appointment_time:'',
        disease:'',
        address:'',
      })

      fetchAppointments()

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
            Book Appointment
          </h1>

          <p className='text-gray-600 mt-2'>
            Manage Patient Appointments
          </p>

        </div>

        <div className='bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg'>

          Total Appointments :

          <span className='font-bold ml-2'>
            {appointments.length}
          </span>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-3xl shadow-lg grid md:grid-cols-2 gap-5 mb-10'
      >

        {/* PATIENT NAME */}

        <input
          type="text"
          placeholder='Patient Name'
          value={formData.patient_name}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              patient_name:e.target.value
            })
          }
        />

        {/* AGE */}

        <input
          type="number"
          placeholder='Patient Age'
          value={formData.patient_age}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              patient_age:e.target.value
            })
          }
        />

        {/* GENDER */}

        <select
          value={formData.gender}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              gender:e.target.value
            })
          }
        >

          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        {/* MOBILE */}

        <input
          type="text"
          placeholder='Mobile Number'
          value={formData.mobile}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              mobile:e.target.value
            })
          }
        />

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

        {/* DATE */}

        <input
          type="date"
          value={formData.appointment_date}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              appointment_date:e.target.value
            })
          }
        />

        {/* TIME */}

        <input
          type="time"
          value={formData.appointment_time}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              appointment_time:e.target.value
            })
          }
        />

        {/* DISEASE */}

        <input
          type="text"
          placeholder='Disease / Problem'
          value={formData.disease}
          className='border p-3 rounded-xl outline-none focus:border-blue-500'
          onChange={(e)=>
            setFormData({
              ...formData,
              disease:e.target.value
            })
          }
        />

        {/* ADDRESS */}

        <textarea
          rows="4"
          placeholder='Address'
          value={formData.address}
          className='border p-3 rounded-xl outline-none focus:border-blue-500 md:col-span-2'
          onChange={(e)=>
            setFormData({
              ...formData,
              address:e.target.value
            })
          }
        />

        {/* BUTTON */}

        <button
          className='bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl text-lg font-semibold md:col-span-2 active:scale-95'
        >
          Book Appointment
        </button>

      </form>

      {/* APPOINTMENT CARDS */}

      <div className='grid md:grid-cols-3 gap-6'>

        {
          appointments.map((appointment)=>(

            <div
              key={appointment.id}
              className='bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition'
            >

              <div className='flex items-center gap-4 mb-5'>

                <div className='w-16 h-16 rounded-full bg-blue-700 text-white flex justify-center items-center text-2xl font-bold'>

                  {appointment.patient_name?.charAt(0)}

                </div>

                <div>

                  <h1 className='text-2xl font-bold text-blue-800'>
                    {appointment.patient_name}
                  </h1>

                  <p className='text-gray-500'>
                    {appointment.disease}
                  </p>

                </div>

              </div>

              <div className='space-y-2 text-gray-700'>

                <p>
                  <span className='font-semibold'>
                    Age:
                  </span>

                  {appointment.patient_age}
                </p>

                <p>
                  <span className='font-semibold'>
                    Gender:
                  </span>

                  {appointment.gender}
                </p>

                <p>
                  <span className='font-semibold'>
                    Mobile:
                  </span>

                  {appointment.mobile}
                </p>

                <p>
                  <span className='font-semibold'>
                    Appointment Date:
                  </span>

                  {appointment.appointment_date}
                </p>

                <p>
                  <span className='font-semibold'>
                    Appointment Time:
                  </span>

                  {appointment.appointment_time}
                </p>

                <p>
                  <span className='font-semibold'>
                    Address:
                  </span>

                  {appointment.address}
                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Appointments