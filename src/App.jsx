import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import TaskView from "./TaskView"
import Modifier from "./Modifier"
import Deleter from "./Deleter"

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

  function removeFromTasks(tasks, setTasks, i) {
    setTasks(prevTasks =>
      prevTasks.filter((_, index) => index !== Number(i))
    )
  }

  function removeFromPendingTasks(i) {
    removeFromTasks(pendingTasks, setPendingTasks, i)
  }
  function removeFromCompletedTasks(i) {
    removeFromTasks(completedTasks, setCompletedTasks, i)
  }
  function removeFromFailedTasks(i) {
    removeFromFailedTasks(failedTasks, setFailedTasks, i)
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
        <Route path="/modify/pending/:task" element={<Modifier tasks={pendingTasks} addToPendingTasks={addToPendingTasks} removeFromTasks={removeFromPendingTasks} />}></Route>
        <Route path="/modify/completed/:task" element={<Modifier tasks={completedTasks} addToPendingTasks={addToPendingTasks} removeFromTasks={removeFromCompletedTasks} />}></Route>
        <Route path="/modify/failed/:task" element={<Modifier tasks={failedTasks} addToPendingTasks={addToPendingTasks} removeFromTasks={removeFromFailedTasks} />}></Route>
        <Route path="/delete/pending/:task" element={<Deleter tasks={pendingTasks} removeFromTasks={removeFromPendingTasks} />}> </Route>
        <Route path="/delete/completed/:task" element={<Deleter tasks={completedTasks} removeFromTasks={removeFromCompletedTasks}/>}></Route>
        <Route path="/delete/failed/:task" element={<Deleter tasks={failedTasks} removeFromTasks={removeFromFailedTasks}/>}></Route>
      </Routes>
    </>
  )
}

export default App