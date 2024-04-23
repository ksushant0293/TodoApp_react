import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function App() {
  const [todo, setTodo] = useState("")
  const[todos, setTodos] = useState([])
  const[showFinished, setShowFinished] = useState(true)

  useEffect(()=>{
   let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

  const saveTols = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) =>{
    setShowFinished (!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !==id
    });
    setTodos(newTodos)
    saveTols()
  }

  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !==id
    });
    setTodos(newTodos)
    saveTols()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    console.log(todos);
    saveTols()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()
  }
  

  return (
    <>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-200 min-h-[80vh] w-1/2">

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold text-center'>Add a Task</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5'/>
          <button onClick={handleAdd} disabled={ todo.length <= 3} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold disabled:bg-blue-500 text-white rounded-lg '>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No task to display</div>}
          {todos.map(item=>{

          return(showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full my-3 justify-between">
            <div className='flex gap-5'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            
                  <div className="buttons flex h-full">
                   <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-lg mx-1 '><FaEdit /></button>
                   <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-lg mx-1 '><MdDelete /></button>
                  </div>
                 </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
