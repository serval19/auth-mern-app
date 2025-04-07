import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'

function Signup() {
  const [loginInfo,setloginInfo] = useState({
    name:'',
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copyLoginInfo={...loginInfo}
    copyLoginInfo[name]=value
    setloginInfo(copyLoginInfo)
  }
  return (
    <div className='signup'>
      <h1>Signup</h1>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name'/>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} type='email' name='email'  placeholder='Enter your Email'/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} type='password' name='password'  placeholder='Enter your password'/>
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