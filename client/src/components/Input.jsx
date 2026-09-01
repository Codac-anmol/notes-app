import React from 'react'


const Input = (props) => {
  return (
      <input
        type={props.type}
        className={props.clss}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e)=> props.setfxn(e.target.value)}
      />
  )
}

export default Input


