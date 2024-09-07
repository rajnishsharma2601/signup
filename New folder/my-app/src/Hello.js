import {useState} from 'react'

function Hello() {
const [todos, setTodos] =useState(['todo1','todo2']);

  return (
<>
     {todos.map((todo)=><li>{todo}</li>)}
     <button onClick={()=>setTodos([...todos,'another one'])}>Click</button>
</> 
 );
}

export default Hello;