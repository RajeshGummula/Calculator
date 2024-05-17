import React, { useReducer } from 'react'
import DigitButtton from './DigitButtton'
import OperationBtn from './OperationBtn'

export const ACTIONS={
    ADD_DIGIT :'add-digit',
    REMOVE_ALL :'remove-all',
    CHOOSE_OPERATION :'choose-operation',
    EVALUATION :'evaluation',
    REMOVE_DIGIT :'remove-digit'
 
 }

 function reducer(state,{type,payload})
 {
 switch(type){
     case ACTIONS.ADD_DIGIT :
      if(state.overwrite)
        return{
      ...state,
      currentValue:payload.digit,
      overwrite :false
      }
      if(payload.digit=='0'&&state.currentValue==0) return state;
      if(payload.digit==='.'&&state.currentValue.includes('.')) return state;
      return{
        ...state,
         currentValue :`${state.currentValue||""}${payload.digit}`
      }
      case ACTIONS.REMOVE_ALL :
        return {};
      case ACTIONS.REMOVE_DIGIT :
        if(state.overwrite)
          return{
          ...state,
          overwrite:false,
          currentValue:null
          }
          if(state.currentValue.length==1)
            return{
          ...state,
          currentValue:null
          }
          if(state.currentValue==null) return state
        return{
          ...state,
          currentValue:`${state.currentValue.slice(0,-1)}`
        }
 
   case ACTIONS.CHOOSE_OPERATION :
    if(state.currentValue==null&&state.prevValue==null) return state
    if(state.prevValue==null){
      return {
        ...state,
        prevValue:`${state.currentValue||""}`,
        operation:`${payload.operation}`,
        currentValue:null

      }}
      if(state.currentValue==null){
        return{
          ...state,
          operation : payload.operation
        }
      }
      return {
        ...state,
        prevValue:evaluate(state),
        operation:`${payload.operation}`,
        currentValue:null

      }
      case ACTIONS.EVALUATION:
        if(state.currentValue==null ||state.prevValue==null||state.operation==null)
          return state;
        return {
          ...state,
          overwrite:true,
          prevValue:null,
          currentValue:evaluate(state),
          operation:null
  
        }
    }
     
 }
const evaluate=({prevValue,currentValue,operation})=>{
  const pre=parseFloat(prevValue);
  const crnt=parseFloat(currentValue);
  if(isNaN(pre)||isNaN(crnt)) return ''
  let compute='';
  switch(operation){
    case '+' : compute=pre+crnt;break;
    case '-' : compute=pre-crnt;break;
    case '*' :compute=pre*crnt;break;
    case '÷' :compute=pre/crnt ;
  }
  return compute.toString();
}

const INTEGER_FORMATTER=Intl.NumberFormat('en-us',{
  maximumFractionDigits:0,
})
// IT is a normal fn
function formatInteger(IntegerValue){
  if(IntegerValue==null) return 
  const [IntegerPart,decimalPart]=IntegerValue.split('.')
  if(decimalPart==null) return INTEGER_FORMATTER.format(IntegerPart)
  return `${INTEGER_FORMATTER.format(IntegerPart)}.${decimalPart}`
}

const Calci = () => {
//   In the below we deconstructed action into  the type aswell as payload
const [{prevValue,currentValue,operation},dispatch]=useReducer(reducer,{});


   
  return (

      <div className='calculator-grid'>
        <div className='output'>
        <div className='prev-value'>{formatInteger(prevValue)} {operation}</div>
        <div className='current-value'>{formatInteger(currentValue)} </div>
        </div>
       
            <button className='span-two' onClick={()=>dispatch({type:ACTIONS.REMOVE_ALL})}>AC</button>
            <button onClick={()=>dispatch({type:ACTIONS.REMOVE_DIGIT})}>DEL</button>
            <OperationBtn operation='÷' dispatch={dispatch}/>
        
            <DigitButtton digit='1' dispatch={dispatch}/>
            <DigitButtton digit='2' dispatch={dispatch}/>
            <DigitButtton digit='3' dispatch={dispatch}/>
            <OperationBtn operation='*' dispatch={dispatch}/>
            <DigitButtton digit='4' dispatch={dispatch}/>
            <DigitButtton digit='5' dispatch={dispatch}/>
            <DigitButtton digit='6' dispatch={dispatch}/>
            <OperationBtn operation='+' dispatch={dispatch}/>
            <DigitButtton digit='7' dispatch={dispatch}/>
            <DigitButtton digit='8' dispatch={dispatch}/>
            <DigitButtton digit='9' dispatch={dispatch}/>
            <OperationBtn operation='-' dispatch={dispatch}/>
             <DigitButtton digit='.' dispatch={dispatch}/>
            <DigitButtton digit='0' dispatch={dispatch}/>
            <button className='span-two' onClick={()=>dispatch({type:ACTIONS.EVALUATION})} >=</button>
     
      </div>

  )
}

export default Calci
