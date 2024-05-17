import { ACTIONS } from "./Calci";
import React from 'react'

const DigitButtton = ({dispatch,digit}) => {
  return (
    <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</button>
  )
}

export default DigitButtton 
