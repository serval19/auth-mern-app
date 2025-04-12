import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleSuccess,handleError } from '../utils'

function Login() {
  const [loginInfo,setloginInfo] = useState({
    email:'',
    password:''
  })
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copyLoginInfo={...loginInfo}
    copyLoginInfo[name]=value
    setloginInfo(copyLoginInfo)
  }
  const handleLogin=async (e)=>{
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email || !password){
       return handleError('All fields are required!')
    }
    try{
      const url="http://localhost:8080/auth/login"
      const response=await fetch(url,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      const result=await response.json()
      const { success, message,error,jwtToken,name }=result
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/home')
        },1000)
      }
      else if(error){
        const details=error?.details[0].message
        handleError(details)
      }
      else if (!success){
        handleError(message)
      }

    }
    catch(err){
      handleError(err);
    }
  }
  return (
    <div className='signup'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>  
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} type='email' name='email'  placeholder='Enter your Email'
          value={loginInfo.email}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} type='password' name='password'  placeholder='Enter your password'
          value={loginInfo.password}/>
        </div>
        <button>Signup</button>
        <span>Don't have an account?
          <Link to='/signup'>Signup</Link>
        </span>
      </form>
      <ToastContainer/>

    </div>
  )
}

export default Login