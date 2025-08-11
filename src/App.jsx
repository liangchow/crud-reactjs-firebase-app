import { useEffect, useState } from 'react'
import './index.css'
import {db} from './firebase'
import {query, collection, where, addDoc, getDocs, doc, getDoc} from 'firebase/firestore'

// https://www.javascripttutorial.net/react-tutorial/react-todo-app/
// https://upmostly.com/tutorials/build-a-todo-app-in-react-using-hooks
// https://www.youtube.com/watch?v=drF8HbnW87w

function App() {

  // const [todos, setTodos] = useState([
  //   {firstName: "Joe", lastName: "Doe", comment: "You are awesome!", rating: 4, status: true, src: ""},
  //   {firstName: "Simone", lastName: "Ming", comment: "You're the best ;) I have not met people like you. I am wishing you the best in your future endeavors", rating: 5, status: false, src: ""},
  //   {firstName: "Jane", lastName: "Moon", comment: "Aiks! You are getting there.", rating: 4, status: true, src: ""}
  //   ])
  const [todos, setTodos] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)

  function handleAddTodo(newFirstName, newLastName, newFeedback, newRating){
    const newTodo = {firstName: newFirstName, lastName: newLastName, comment: newFeedback, rating: newRating, status: true, src: ""}
    const updatedTodos = [newTodo, ...todos]
    setTodos(updatedTodos)
  }

  function handleToggleStatus(index){
    const updatedTodos = [...todos]
    updatedTodos[index].status = !updatedTodos[index].status
    setTodos(updatedTodos)
    console.log(updatedTodos[index])
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

  // Read user data from firebase. 
  // Who is the current user (RecipientID)? 
  // We should see two comments:
  // 1. "Test User 3 is mehh", 1/5 by test-user-1 (UO)
  // 2. "Great to work with Test User 3", 5/5 by test-user-2 (T2)
  useEffect(()=>{
    async function fetchUser(){
      const currentUser = 'test-user-3'

      try {
        console.log('Fetching user data')
        const docRef = doc(db, 'users', currentUser)
        const docSnap = await getDoc(docRef)
        let userData = {}
        if (docSnap.exists()){
          console.log('Found user data')
          userData = docSnap.data()
          console.log(userData)
        }
      } catch(err) {
      console.log(err)
    }}
    fetchUser()
  },[])


  // Create todo
  const createTodo = async (e) => {
    e.preventDefault()
    if (comment === ''){
      alert('Please enter a valid comment.')
      return
    }
    
    // Set current user as peerID (the person giving feedback)
    const currentUser = 'test-user-1' // This would normally come from authentication
    
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        firstName: firstName,
        lastName: lastName,
        comment: comment,
        rating: rating,
        status: true,
        peerID: peerID,
        recipientId: currentUser // The person receiving the feedback
      })
      
      console.log('Document written with ID: ', docRef.id)
      
      // Clear form fields after submission
      setFirstName('')
      setLastName('')
      setComment('')
      setRating(0)
      
      // Refresh todos list
      fetchTodos()
    } catch (err) {
      console.error('Error adding document: ', err)
    }
  }

  // Function to fetch todos with peer data
  const fetchTodos = async () => {
    // Set current user
    const currentUser = 'test-user-3'
    try {
      const q = query(collection(db, "todos"), where("recipientId", "==", currentUser))
      // const q = query(collection(db, "demos"), where("rating", ">", 1))
      const querySnapshot = await getDocs(q)
      let todosArr = []

      if (querySnapshot){
        console.log('Found user data')
        
        // Create an array of promises to fetch user data for each todo
        const todoPromises = querySnapshot.docs.map(async (doc) => {
          const todoData = doc.data()
          const todoWithId = {...todoData, id: doc.id}
          
          // Check if peerID exists
          if (todoData.peerID) {
            try {
              // Get the user document using peerID
              const userDoc = await getDoc(doc(db, 'users', todoData.peerID))
              
              if (userDoc.exists()) {
                const userData = userDoc.data()
                // Add peer's firstName and lastName to todo object
                return {
                  ...todoWithId,
                  firstName: userData.firstName || '',
                  lastName: userData.lastName || ''
                }
              }
            } catch (userErr) {
              console.log('Error fetching peer data:', userErr)
            }
          }
          
          // Return the original todo if no peerID or error occurred
          return todoWithId
        })
        
        // Wait for all promises to resolve
        todosArr = await Promise.all(todoPromises)
      }
      
      setTodos(todosArr)
      console.log('Todos with peer data:', todosArr)
    } catch (err) {
      console.log('Error fetching todos:', err)
    }
    // finally {setLoading(false)}
  }

  // Read todos and peerID from firebase on component mount
  useEffect(() => {
    fetchTodos()
  },[])


  // Update todo in firebase
  // Delete todo


  return (
    <div className='flex flex-col flex-1 gap-4'>
      
      <div className='flex flex-1 w-full justify-center gap-2 p-4'>
        <form onSubmit={createTodo} className='flex flex-wrap gap-2 items-center'>
          <input className='rounded-3xl border-2 border-solid border-indigo-300 px-2' placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input className='rounded-3xl border-2 border-solid border-indigo-300 px-2' placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input className='rounded-3xl border-2 border-solid border-indigo-300 px-2' placeholder="Enter feedback" value={comment} onChange={(e) => setComment(e.target.value)} required />
          <div className='flex items-center'>
            {[...Array(5)].map((star, starIndex) => {
              starIndex += 1
              return (
                    <button type='button' key={starIndex} className={'text-2xl cursor-pointer opacity-50 ' + (starIndex <= (hover || rating) ? 'text-amber-400' : '')}
                      onClick={()=> setRating(starIndex)}
                      onMouseEnter={() => setHover(starIndex)}
                      onMouseLeave={() => setHover(rating)}>
                        <span>&#9733;</span>
                    </button>
              )            
            })}
          </div>
          <button type='submit' className='text-indigo-600 hover:text-indigo-400 cursor-pointer transition duration-200 px-4 py-1 rounded-3xl border-2 border-solid border-indigo-300'> Submit</button>
        </form>
      </div>
      
      <ul className='flex flex-col flex-1 gap-1 p-4'>
        { todos && todos.length > 0 ? (
          todos?.map((todo, todoIndex) => (
            <li key={todoIndex} className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
              <div className='flex ml-1 w-15'>
                {headshot(todo)}
              </div>
              <div className={'flex flex-col ml-1 w-full ' + (todo.status == false ? ' opacity-50' : '')}>     
                <span className='text-lg sm:text-xl font-semibold '>{todo.firstName} {todo.lastName}</span>
                {todo.peerFirstName && todo.peerLastName && (
                  <span className='text-sm text-indigo-600'>From: {todo.peerFirstName} {todo.peerLastName}</span>
                )}
                <span className='text-base sm:text-lg'>{todo.comment}</span>
              </div>
              <div className='flex p-2 ml-1 text-nowrap '>⭐ {todo.rating}/5</div>
              <div className='flex flex-col items-center p-2 gap-2 '>
                <button onClick={() => handleToggleStatus(todoIndex)}><i className={"text-indigo-600 hover:text-indigo-400 cursor-pointer transition duration-200 " + (todo.status == false ? " fa-solid fa-eye-slash opacity-50" : " fa-solid fa-eye")}></i></button>
              </div>
            </li>
          ))) 
          : (<p>Looks like something is missing</p>)
        }
      </ul>

      <h2 className='text-indigo-800 text-center'>Display Below:</h2>

      <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos?.filter(todo => todo.status == true).map((todo, todoIndex) => (
            <li key={todoIndex} className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
              <div className='flex ml-1 w-15'>
                {headshot(todo)}
              </div>
              <div className='flex flex-col ml-1 w-full'>     
                <span className='text-lg sm:text-xl font-semibold '>{todo.firstName} {todo.lastName}</span>
                {todo.peerFirstName && todo.peerLastName && (
                  <span className='text-sm text-indigo-600'>From: {todo.peerFirstName} {todo.peerLastName}</span>
                )}
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
