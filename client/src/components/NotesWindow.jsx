import React, { useEffect, useState, useContext } from 'react'
import List from './List'
import Card from './Card'
import Input from './Input'
import '../css/NotesWindow.css'
import '../css/Input.css'
import UserContext from './UserContext'
import axios from 'axios'
import Textarea from './Textarea'


const NotesWindow = (props) => {
  const { user, selected, setSelected, notes, setNotes, currentContent, setCurrentContent, currentTitle, setCurrentTitle } = useContext(UserContext)




  useEffect(() => {

    if (selected) {
      const selectedNote = notes.find(
        (note) => note._id === selected
      )
      if (selectedNote) {
        setCurrentTitle(selectedNote.title);
        setCurrentContent(selectedNote.content);
      }
    } else {
      setCurrentTitle("...title here ")
      setCurrentContent("...note here")
    }

  }, [selected, notes])
  


  return (

    <div className='notesWindow'>
      <div className="listWindow">{
        notes.map((note) => {
          const formattedDate = new Date(note.updatedAt).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }
          );

          return (<List id={note._id} key={note._id} title={note.title} date={formattedDate} setSelected={setSelected} selected={selected} />)
        })}</div>
      < Textarea setTitle={setCurrentTitle} currentTitle={currentTitle} setCurrentContennt={setCurrentContent} currentContent={currentContent} />
    </div>
  )
}

export default NotesWindow
