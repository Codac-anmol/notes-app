import React, { useContext } from 'react'
import { useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from './UserContext'



const Signup = () => {
  const navigate = useNavigate()
 
  const [lEmail, setlEmail] = useState("")
  const [lPass, setlPass] = useState("")
  const [lName, setlName] = useState("")
  const { user,setUser,notes} = useContext(UserContext)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className='loginBox'>
      <h1>SIGNUP @Notes</h1>
      Name
      <Input type="text" clss="lname inp" placeholder="Simran" value={lName} setfxn={setlName} />
      Email
      <Input type="email" clss="lEmail inp" placeholder="xyz@abc.fun" value={lEmail} setfxn={setlEmail} />
      Password
      <Input type="password" clss="lpass inp" placeholder="" value={lPass} setfxn={setlPass} />
      <button className='btn' onClick={async () => {
        await axios({

          method: 'post',

          url: `${BACKEND_URL}/user/register`,

          data: {
            email: lEmail,
            name:lName,
            password: lPass,
          }

        })

          .then(response => {
            setUser({
              userName: response.data.userName,
              notes: response.data.notes,
            })
            localStorage.setItem("Authorization",response.data.token)
          })
          .then(()=>{console.log(notes)})
          .then(() => navigate("/"))
          .catch(error => console.log(error));
          
       

          
      }}>Submmit</button>
      
    </div>)
}

export default Signup
