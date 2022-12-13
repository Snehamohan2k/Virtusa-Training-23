import React from 'react'
import { useState } from 'react'
const TodoForm = (props) => {
const[texttodo,settexttodo]=useState()
const handlesubmit=(e)=>
{
    e.preventDefault()
    props.addtodo(texttodo)

}

  return (
    <div>
        <form onSubmit={{handlesubmit}}>
       
            <input onChange={(e)=> settexttodo(e.target.value)}/>
            <button>Add Todo</button>
           
        </form>
    </div>
  )
}

export default TodoForm