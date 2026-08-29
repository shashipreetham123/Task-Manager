import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import TaskView from "./TaskView"

function readFile(name, callback) {
  fetch(`http://localhost:5000/read/${name}`, {
    "method": "GET"
  }).then(resp => {
    return resp.json()
  }).then((data) => {
    callback(data, null)
  }).catch(err => {
    callback(null, err)
  })
}


function App() {
  const [pendingTasks, setPendingTasks] = useState(null)
  const [completedTasks, setCompletedTasks] = useState(null)
  const [failedTasks, setFailedTasks] = useState(null)

  useEffect(() => {
    readFile("pending", (result) => {
      if (result && !result.err) {
        setPendingTasks(JSON.parse(result.data))
      } 
    })
    readFile("completed", (result) => {
      if (result && !result.err) {
        setCompletedTasks(JSON.parse(result.data))
      }
    })
    readFile("failed", (result) => {
      if (result && !result.err) {
        setFailedTasks(JSON.parse(result.data))
      }
    })
    
  }, [])

  function addToPendingTasks(details) {
    setPendingTasks(prevTasks => [...prevTasks, details])
  }

  function removeFromTasks(setTasks, i) {
    setTasks(prevTasks =>
      prevTasks.filter((_, index) => index !== Number(i))
    )
  }

  

  if (!pendingTasks || !completedTasks || !failedTasks)  {
    return <h1>Loading</h1>
  }
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskView tasks={pendingTasks} category="Pending" />}></Route>
        <Route path="/completed" element={<TaskView tasks={completedTasks} category="Completed" />}></Route>
        <Route path="/failed" element={<TaskView tasks={failedTasks} category="Failed" />}></Route>
      </Routes>
    </>
  )
}

export default App