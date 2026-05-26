import React, { useEffect, useState } from 'react'

import api from '../api/axios'

const Doctors = () => {

  const [doctors, setDoctors] = useState([])

  const [formData, setFormData] = useState({
    name:'',
    specialization:'',
    qualification:'',
    experience:'',
    fee:'',
    mobile:'',
    email:'',
    hospital:'',
    available_days:'',
    available_time:'',
  })

  const [editId, setEditId] = useState(null)

  // FETCH DOCTORS
  const fetchDoctors = async () => {

    try{

      const response = await api.get('doctors/')

      setDoctors(response.data)

    }catch(error){

      console.log(error)
    }
  }

  useEffect(()=>{

    fetchDoctors()

  },[])

  // ADD + UPDATE DOCTOR
  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      if(editId){

        await api.put(
          `doctors/${editId}/`,
          formData
        )

        alert("Doctor Updated Successfully")

        setEditId(null)

      }else{

        await api.post(
          'doctors/',
          formData
        )

        alert("Doctor Added Successfully")
      }

      setFormData({
        name:'',
        specialization:'',
        qualification:'',
        experience:'',
        fee:'',
        mobile:'',
        email:'',
        hospital:'',
        available_days:'',
        available_time:'',
      })

      fetchDoctors()

    }catch(error){

      console.log(error)

      alert("Something went wrong")
    }
  }

  // DELETE
  const deleteDoctor = async(id)=>{

    try{

      await api.delete(`doctors/${id}/`)

      alert("Doctor Deleted Successfully")

      fetchDoctors()

    }catch(error){

      console.log(error)
    }
  }

  // EDIT
  const handleEdit = (doctor) => {

    setFormData(doctor)

    setEditId(doctor.id)
  }

  return (

    <div className='p-5 bg-gray-100 min-h-screen'>

      {/* HEADING */}

      <div className='flex justify-between items-center mb-10'>

        <div>

          <h1 className='text-4xl font-bold text-blue-800'>
            Doctor Management
          </h1>

          <p className='text-gray-600 mt-2'>
            Manage Doctors Information
          </p>

        </div>

        <div className='bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg'>

          Total Doctors :
          <span className='font-bold ml-2'>
            {doctors.length}
          </span>

        </div>

      </div>

      {/* FORM */}

      {
        localStorage.getItem('role') === 'admin' && (

          <form
            onSubmit={handleSubmit}
            className='bg-white p-8 rounded-3xl shadow-lg grid md:grid-cols-3 gap-5 mb-10'
          >

            {/* NAME */}

            <input
              type="text"
              placeholder='Doctor Name'
              value={formData.name}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  name:e.target.value
                })
              }
            />

            {/* SPECIALIZATION */}

            <input
              type="text"
              placeholder='Specialization'
              value={formData.specialization}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  specialization:e.target.value
                })
              }
            />

            {/* QUALIFICATION */}

            <input
              type="text"
              placeholder='Qualification'
              value={formData.qualification}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  qualification:e.target.value
                })
              }
            />

            {/* EXPERIENCE */}

            <input
              type="number"
              placeholder='Experience'
              value={formData.experience}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  experience:e.target.value
                })
              }
            />

            {/* FEES */}

            <input
              type="number"
              placeholder='Consultation Fee'
              value={formData.fee}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  fee:e.target.value
                })
              }
            />

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

            {/* EMAIL */}

            <input
              type="email"
              placeholder='Email Address'
              value={formData.email}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  email:e.target.value
                })
              }
            />

            {/* HOSPITAL */}

            <input
              type="text"
              placeholder='Hospital Name'
              value={formData.hospital}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  hospital:e.target.value
                })
              }
            />

            {/* AVAILABLE DAYS */}

            <input
              type="text"
              placeholder='Available Days'
              value={formData.available_days}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  available_days:e.target.value
                })
              }
            />

            {/* AVAILABLE TIME */}

            <input
              type="text"
              placeholder='Available Time'
              value={formData.available_time}
              className='border p-3 rounded-xl outline-none focus:border-blue-500'
              onChange={(e)=>
                setFormData({
                  ...formData,
                  available_time:e.target.value
                })
              }
            />

            {/* BUTTON */}

            <button
              className='bg-blue-700 hover:bg-blue-800 transition text-white py-3 rounded-xl text-lg font-semibold active:scale-95 md:col-span-3'
            >
              {
                editId
                ?
                'Update Doctor'
                :
                'Add Doctor'
              }
            </button>

          </form>
        )
      }

      {/* DOCTOR CARDS */}

      <div className='grid md:grid-cols-3 gap-6'>

        {
          doctors.map((doctor)=>(

            <div
              key={doctor.id}
              className='bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition'
            >

              {/* PROFILE */}

              <div className='flex items-center gap-4 mb-5'>

                <div className='w-16 h-16 rounded-full bg-blue-700 text-white flex justify-center items-center text-2xl font-bold'>

                  {doctor.name?.charAt(0)}

                </div>

                <div>

                  <h1 className='text-2xl font-bold text-blue-800'>
                    Dr. {doctor.name}
                  </h1>

                  <p className='text-gray-500'>
                    {doctor.specialization}
                  </p>

                </div>

              </div>

              {/* DETAILS */}

              <div className='space-y-2 text-gray-700'>

                <p>
                  <span className='font-semibold'>
                    Qualification:
                  </span>

                  {doctor.qualification}
                </p>

                <p>
                  <span className='font-semibold'>
                    Experience:
                  </span>

                  {doctor.experience} Years
                </p>

                <p>
                  <span className='font-semibold'>
                    Fees:
                  </span>

                  ₹{doctor.fee}
                </p>

                <p>
                  <span className='font-semibold'>
                    Mobile:
                  </span>

                  {doctor.mobile}
                </p>

                <p>
                  <span className='font-semibold'>
                    Email:
                  </span>

                  {doctor.email}
                </p>

                <p>
                  <span className='font-semibold'>
                    Hospital:
                  </span>

                  {doctor.hospital}
                </p>

                <p>
                  <span className='font-semibold'>
                    Available Days:
                  </span>

                  {doctor.available_days}
                </p>

                <p>
                  <span className='font-semibold'>
                    Available Time:
                  </span>

                  {doctor.available_time}
                </p>

              </div>

              {/* BUTTONS */}

              {
                localStorage.getItem('role') === 'admin' && (

                  <div className='flex gap-3 mt-6'>

                    <button
                      onClick={() => handleEdit(doctor)}
                      className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex-1'
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDoctor(doctor.id)}
                      className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex-1'
                    >
                      Delete
                    </button>

                  </div>
                )
              }

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Doctors