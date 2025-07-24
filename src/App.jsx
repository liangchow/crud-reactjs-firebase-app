import { useState } from 'react'
import './index.css'

function App() {

  const [todos, setTodos] = useState([
    {firstName: "Joe", lastName: "Doe", comment: "You are awesome!", rating: 4, status: true, src: "https://liangchow.github.io/assets/img/profile/lchow.jpg"},
    {firstName: "Simone", lastName: "Ming", comment: "You're the best ;) I have not met people like you. I am wishing you the best in your future endeavors", rating: 5, status: true, src: ""},
    ])


  return (
    <div className='flex flex-col flex-1 gap-10'>
      <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => (
          <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
            <div className='flex flex-col ml-1 w-full'>     
              <span className='text-lg sm:text-xl font-semibold '>{todo.firstName} {todo.lastName}</span>
              <span className='text-base sm:text-lg'>{todo.comment}</span>
            </div>
            <div className='flex p-2 ml-1 text-nowrap '>⭐ {todo.rating}/5</div>
          </li>
        ))}

      </ul>
    </div>
  )

}

export default App
