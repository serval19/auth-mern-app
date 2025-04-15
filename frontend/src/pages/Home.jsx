import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'

function Home() {
  const [loggedInUser, setLoggedInuser] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoggedInuser(localStorage.getItem('loggedInUser'))
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('user logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }
  
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products"
      const headers={
        headers:{
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers)
      const result = await response.json()
      console.log(result)
    } catch (err) {
      handleError(err)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home