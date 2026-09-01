import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import UserContext from './components/UserContext'
import NotesWindow from './components/NotesWindow'
import Docs from './components/docs'
import axios from 'axios'

function App() {
  const [selected, setSelected] = useState();
  const [user, setUser] = useState()
  const [notes, setNotes] = useState([])
  const [currentTitle, setCurrentTitle] = useState("title here")
  const [currentContent, setCurrentContent] = useState("notes here...")


  const getUser = async () => {
      if (!user) {
        try {
          const token = localStorage.getItem("Authorization");
          const usr = await axios.get("http://localhost:3000/user", {
            headers: {
              Authorization: token,
            }
          })

          setUser({
            userName: usr.data.userName,
            notes: usr.data.notes
          })
        } catch (err) {
          console.log(err)
        }
      }
    }


  useEffect(() => {
    getUser()

  }, [])

  useEffect(() => {
    if (user) {
      setNotes(user.notes)
      console.log(user)
    }
  }, [user])

  const router = createBrowserRouter((user) ? [
    {
      path: '/',
      element: <><Navbar nele={{ "lnk": "/signup", "nnm": "SignUp" }} /><NotesWindow /></>
    }
  ] : [
    {
      path: '/',
      element: <><Navbar nele={{ "lnk": "/signup", "nnm": "SignUp" }} /><Docs/></>
    },
    {
      path: '/login',
      element: <><Navbar nele={{ "lnk": "/signup", "nnm": "SignUp" }} /><Login /></>
    },
    {
      path: '/signup',
      element: <><Navbar nele={{ "lnk": "/login", "nnm": "SignIn" }} /><Signup /></>
    }
  ])

  return (
    <UserContext.Provider value={{ user, selected, setSelected, setUser, notes, setNotes, currentTitle, setCurrentTitle, currentContent, setCurrentContent ,getUser}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
