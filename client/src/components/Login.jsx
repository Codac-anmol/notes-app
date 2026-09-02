import React, { useState ,useContext} from 'react'
import Input from './Input'
import '../css/login.css'
import UserContext from './UserContext'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate()
  const [lEmail, setlEmail] = useState("")
  const [lPass, setlPass] = useState("")
  const { user,setUser,notes} = useContext(UserContext)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


  return (
    <div className='loginBox'>
      <h1>LOGIN @Notes</h1>
      Email
      <Input type="email" clss="lEmail inp" placeholder="xyz@abc.fun" value={lEmail} setfxn={setlEmail} />
      Password
      <Input type="password" clss="lEmail inp" placeholder="" value={lPass} setfxn={setlPass} />
      <button className='btn' onClick={async () => {
        await axios({

          method: 'post',

          url: `${BACKEND_URL}/user/login`,

          data: {
            email: lEmail,
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
    </div>

  )
}

export default Login
