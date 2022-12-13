import { useState } from 'react';
import TodoForm from './TodoForm';
import './App.css';
import { TodoItem } from './TodoItem';
function App() {
const[todos,settodos]=useState([])
  const addtodo=(text)=>
  {
    let id=1;
    if(todos.length>0)
    {
      id=todos[0].id+1;
    }
    const newtodo={
      text:text,
      id:id,
      key:id,
    }
    settodos(()=>[newtodo,...todos])
  }
const element=todos.map((e1)=> (
  <TodoItem
  
  />

))

console.log(todos)

  return (
    
    <div className="App">
     
     <div className='form'>
     <h1 className='Title'>Todo List</h1>
      <TodoForm addtodo={addtodo} />
      {element }
     </div>
    </div>
  );
}

export default App;
