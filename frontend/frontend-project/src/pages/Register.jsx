import React, { useState } from 'react'

import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'patient'
  })

  const [errors, setErrors] = useState({})

  // PASSWORD VALIDATION
  const validatePassword = (password) => {

    // Minimum 8 Characters
    const minLength = /.{8,}/

    // Capital Letter
    const capitalLetter = /[A-Z]/

    // Number
    const number = /[0-9]/

    // Special Symbol
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/

    if(!minLength.test(password)){
      return "Password must contain minimum 8 characters"
    }

    if(!capitalLetter.test(password)){
      return "Password must contain one capital letter"
    }

    if(!number.test(password)){
      return "Password must contain one number"
    }

    if(!specialChar.test(password)){
      return "Password must contain one special symbol"
    }

    return ""
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    let validationErrors = {}

    // USERNAME VALIDATION
    if(formData.username.trim() === ''){
      validationErrors.username = "Username is required"
    }

    // EMAIL VALIDATION
    if(formData.email.trim() === ''){
      validationErrors.email = "Email is required"
    }

    // PASSWORD VALIDATION
    const passwordError = validatePassword(
      formData.password
    )

    if(passwordError){
      validationErrors.password = passwordError
    }

    // CONFIRM PASSWORD
    if(
      formData.password !== formData.confirmPassword
    ){
      validationErrors.confirmPassword =
      "Passwords do not match"
    }

    setErrors(validationErrors)

    // STOP FORM IF ERRORS
    if(
      Object.keys(validationErrors).length > 0
    ){
      return
    }

    try{

      await axios.post(
        'http://127.0.0.1:8000/api/register/',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      )

      alert("Account Created Successfully")

      navigate('/login')

    }catch(error){

      console.log(error)

      alert("Registration Failed")
    }
  }

  return (

    <div className='min-h-screen flex justify-center items-center bg-gray-100 px-5'>

      <form
        onSubmit={handleSubmit}
        className='bg-white p-10 rounded-3xl shadow-xl w-full max-w-md'
      >

        <h1 className='text-4xl font-bold mb-8 text-center text-blue-700'>
          Create Account
        </h1>

        {/* USERNAME */}

        <div className='mb-5'>

          <input
            type="text"
            placeholder='Enter Username'
            className='border w-full p-3 rounded-xl outline-none focus:border-blue-500'
            value={formData.username}
            onChange={(e)=>
              setFormData({
                ...formData,
                username:e.target.value
              })
            }
          />

          {
            errors.username &&
            <p className='text-red-500 mt-1 text-sm'>
              {errors.username}
            </p>
          }

        </div>

        {/* EMAIL */}

        <div className='mb-5'>

          <input
            type="email"
            placeholder='Enter Email'
            className='border w-full p-3 rounded-xl outline-none focus:border-blue-500'
            value={formData.email}
            onChange={(e)=>
              setFormData({
                ...formData,
                email:e.target.value
              })
            }
          />

          {
            errors.email &&
            <p className='text-red-500 mt-1 text-sm'>
              {errors.email}
            </p>
          }

        </div>

        {/* PASSWORD */}

        <div className='mb-5'>

          <input
            type="password"
            placeholder='Enter Password'
            className='border w-full p-3 rounded-xl outline-none focus:border-blue-500'
            value={formData.password}
            onChange={(e)=>
              setFormData({
                ...formData,
                password:e.target.value
              })
            }
          />

          {
            errors.password &&
            <p className='text-red-500 mt-1 text-sm'>
              {errors.password}
            </p>
          }

        </div>

        {/* CONFIRM PASSWORD */}

        <div className='mb-5'>

          <input
            type="password"
            placeholder='Confirm Password'
            className='border w-full p-3 rounded-xl outline-none focus:border-blue-500'
            value={formData.confirmPassword}
            onChange={(e)=>
              setFormData({
                ...formData,
                confirmPassword:e.target.value
              })
            }
          />

          {
            errors.confirmPassword &&
            <p className='text-red-500 mt-1 text-sm'>
              {errors.confirmPassword}
            </p>
          }

        </div>

        {/* PASSWORD RULES */}

        <div className='bg-gray-100 p-4 rounded-xl mb-5 text-sm text-gray-700'>

          <p className='font-semibold mb-2'>
            Password must contain:
          </p>

          <ul className='list-disc pl-5 space-y-1'>

            <li>Minimum 8 characters</li>

            <li>One Capital Letter</li>

            <li>One Number</li>

            <li>One Special Symbol</li>

          </ul>

        </div>

        {/* BUTTON */}

        <button
          className='bg-green-600 hover:bg-green-700 transition text-white w-full py-3 rounded-xl text-lg font-semibold active:scale-95'
        >
          Register
        </button>

        {/* LOGIN LINK */}

        <p className='mt-6 text-center text-gray-600'>

          Already have an account?

          <Link
            to="/login"
            className='text-blue-600 ml-2 font-semibold'
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Register