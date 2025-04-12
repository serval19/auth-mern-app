import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleSuccess,handleError } from '../utils'

function Signup() {
  const [loginInfo,setloginInfo] = useState({
    name:'',
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
  const handleSignup=async (e)=>{
    e.preventDefault();
    const {name,email,password}=loginInfo;
    if(!name || !email || !password){
       return handleError('All fields are required!')
    }
    try{
      const url="http://localhost:8080/auth/signup"
      const response=await fetch(url,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      const result=await response.json()
      const { success, message,error }=result
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name'
          value={loginInfo.name}/>
        </div>
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
        <span>Already have an account?
          <Link to='/login'>Login</Link>
        </span>
      </form>
      <ToastContainer/>

    </div>
  )
}

export default Signup