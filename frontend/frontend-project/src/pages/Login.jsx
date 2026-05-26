import React, { useState } from 'react'

import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                formData
            )

            localStorage.setItem(
                'token',
                response.data.access
            )

            localStorage.setItem(
                'role',
                'admin'
            )

            navigate('/')

        } catch (error) {

            alert("Invalid Credentials")
        }
    }

    return (

        <div className='min-h-screen flex justify-center items-center bg-gray-100'>

            <form
                onSubmit={handleLogin}
                className='bg-white p-10 rounded-2xl shadow-lg w-96'
            >

                <h1 className='text-3xl font-bold mb-5 text-center'>
                    Login
                </h1>

                <input
                    type="text"
                    placeholder='Username'
                    className='border w-full p-3 rounded-lg mb-5'
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            username: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder='Password'
                    className='border w-full p-3 rounded-lg mb-5'
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value
                        })
                    }
                />

                <button
                    className='bg-blue-500 w-full text-white py-3 rounded-lg active:scale-95'
                >
                    Login
                </button>
                <p className='mt-5 text-center'>

                    You are not registered?

                    <Link
                        to="/register"
                        className='text-blue-600 ml-2'
                    >
                        Create Account
                    </Link>

                </p>

            </form>

        </div>
    )
}

export default Login