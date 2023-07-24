import React from 'react'
import "../styles/input.css"
const Input = ({label,placeHolder}) => {
  return (
    <div style={{display:'flex',justifyContent:'flex-end',marginTop:"1rem",marginBottom:"1rem"}}>
        <label className='mylabel'>{label} {" "}</label>
        <input type="text" placeholder={placeHolder} className='myinput'/>
    </div>
  )
}

export default Input