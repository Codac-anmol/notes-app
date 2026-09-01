import React, { useContext } from 'react'
import '../css/Controls.css'
import UserContext from './UserContext'
import axios from 'axios'
import { data, Navigate } from 'react-router-dom'

const Controls = () => {

  const { getUser, selected, setUser, notes, setNotes, currentContent, user, currentTitle, setSelected, setCurrentContent, setCurrentTitle } = useContext(UserContext)
  return (
    <div className='btnContainer' >

      {(selected)
        ?
        (((notes.find((note) => note._id === selected)).title === currentTitle) && ((notes.find((note) => note._id === selected)).content === currentContent) ?
          <button className='btns'
            onClick={async (e) => {
              const token = localStorage.getItem("Authorization")
              const res = await axios.delete("http://localhost:3000/notes/del",
                {
                  headers: {
                    Authorization: token,
                  },
                  data: {
                    id: selected,
                  }

                }
              )
              console.log(res.data);
              setUser({
                userName: res.data.user.name,
                notes: res.data.user.notes,
              });

              setSelected(undefined);
            }}
          >Delete</button> :
          <><button className='btns' onClick={() => { setCurrentContent((notes.find((note) => note._id === selected)).content); setCurrentTitle((notes.find((note) => note._id === selected)).title) }}>cancel</button>
            <button className='btns' onClick={async (e) => {
              const token = localStorage.getItem("Authorization")
              const res = await axios.patch("http://localhost:3000/notes/update",
                {

                  id: selected,
                  title: currentTitle,
                  content: currentContent,

                },
                {
                  headers: {
                    Authorization: token
                  }
                }

              )
              setNotes(prev =>
                prev.map(note =>
                  note._id === selected
                    ? {
                      ...note,
                      title: currentTitle,
                      content: currentContent,
                    }
                    : note
                )
              )

              console.log(res.data);
            }}
            >save</button></>
        )
        :
        <><button className='btns' onClick={async () => {
          const token = localStorage.getItem("Authorization")
          const newNote = await axios.post("http://localhost:3000/notes/create",
            {
              title: currentTitle,
              content: currentContent
            },
            {
              headers: {
                Authorization: token,
              },


            });



          setUser((prev) => ({
            ...prev,
            notes: [...prev.notes, newNote.data.newNote]
          }))
          setNotes(prev => [...prev, newNote]);

          setSelected(undefined);

        }}>create</button></>
      }
    </ div>
  )
}

export default Controls
