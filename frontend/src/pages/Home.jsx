import React, { useEffect, useState } from 'react'

function Home() {
  const [loggedInUser,setLoggedInuser]=useState("")
  useEffect(()=>{
    setLoggedInuser(localStorage.getItem('loggedInUser'))
  },[])
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}></button>
    </div>
  )
}

export default Home