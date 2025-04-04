import React from 'react'
import  Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { Routes,Route, Navigate } from 'react-router-dom'
const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App 