import { useState } from 'react'
import './index.css'

function App() {

  const [todos, setTodos] = useState([
    "I have a dream",
    "It's in the brew"  
  ])


  return (
    <div className='flex flex-col flex-1 gap-10'>
      <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo) => (
          <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
            {todo}
          </li>
        ))}

      </ul>
    </div>
  )

}

export default App
