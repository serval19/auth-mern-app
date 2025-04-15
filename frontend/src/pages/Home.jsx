import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'


function Home() {
  const [loggedInUser,setLoggedInuser]=useState("")
  const navigate=useNavigate()
  useEffect(()=>{
    setLoggedInuser(localStorage.getItem('loggedInUser'))
  },[])
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('user logged out')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home