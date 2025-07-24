import { useState } from 'react'
import './index.css'

function App() {

  const [todos, setTodos] = useState([
    {firstName: "Joe", lastName: "Doe", comment: "You are awesome!", rating: 4, status: true, src: ""},
    {firstName: "Simone", lastName: "Ming", comment: "You're the best ;) I have not met people like you. I am wishing you the best in your future endeavors", rating: 5, status: true, src: ""},
    ])

  const [status, setStatus] = useState(true)

  function handleToggleStatus(index){
      setStatus(!status)
      console.log(status)
      todos[index].status == status;
      console.log(todos[index].status)
    }

  function headshot(peer){
    if (peer.src) {
      return (
        <image className='rounded-full border border-solid border-indigo-500 ' src={peer.src} width={40} height={40} style={{objectFit: "contain"}} alt="pp" />
    )} else {
      return (
        <div className='size-[40px] rounded-full bg-indigo-500 inline-flex items-center justify-center '>
            <p className={'text-base text-indigo-50 '}>{peer.firstName[0]}{peer.lastName[0]}</p>
        </div>
      )
    }
  }

  return (
    <div className='flex flex-col flex-1 gap-10'>
      <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => (
          <li key={todoIndex} className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
            <div className='flex ml-1 w-15'>
                      {headshot(todo)}
            </div>
            <div className='flex flex-col ml-1 w-full'>     
              <span className='text-lg sm:text-xl font-semibold '>{todo.firstName} {todo.lastName}</span>
              <span className='text-base sm:text-lg'>{todo.comment}</span>
            </div>
            <div className='flex p-2 ml-1 text-nowrap '>⭐ {todo.rating}/5</div>
            <div className='flex flex-col items-center p-2 gap-2 '>
              <button onClick={() => handleToggleStatus(todoIndex)}><i className={"text-indigo-600 hover:text-indigo-400 cursor-pointer transition " + (status==true ? " fa-solid fa-eye-slash" : " fa-solid fa-eye")}></i></button>
            </div>
          </li>
        ))}

      </ul>
    </div>
  )

}

export default App
