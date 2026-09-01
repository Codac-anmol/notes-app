import React from 'react'
import '../css/list.css'
import UserContext from './UserContext'
import axios from 'axios'

const List = (props) => {


  return (
    <div className='list' className={(props.selected===props.id)?"selected":""} key={props.id} onClick={(e) => {
      
      (props.selected===props.id)? props.setSelected(null) : props.setSelected(props.id)
      
    }} >
      <div className="name">{props.title}</div>
      <div className="date">{props.date}</div>
    </div>
  )
}

export default List
