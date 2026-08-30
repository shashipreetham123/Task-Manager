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
  const [createTask, setCreateTask] = useState(false)


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

  function addToTasks(category, id, task) {
    if (category == "completed") {
      setCompletedTasks(prev => ({
        ...prev,
        [id]: task
      }))
    }
    if (category == "failed") {
      setFailedTasks(prev => ({
        ...prev,
        [id]: task
      }));

    }
    if (category == "pending") {
      setPendingTasks(prev => ({
        ...prev,
        [id]: task
      }))
    }
  }

  function removeFromTasks(category, taskId) {
    if (category == "completed") {
      setCompletedTasks(prev => {
        delete prev[taskId];
        return prev;
      });
    }
    if (category == "failed") {
      setFailedTasks(prev => {
        delete prev[taskId];
        return prev;
      });
    }
    if (category == "pending") {
      setPendingTasks(prev => {
        delete prev[taskId];
        return prev;
      });
    }
  }

  if (!pendingTasks || !completedTasks || !failedTasks) {
    return <h1>Loading</h1>
  }


  return (
    <>
      <Navbar setCreateTask={setCreateTask} />
      <Routes>
        <Route path="/" element={<TaskView createTask={createTask} setCreateTask={setCreateTask} addToTasks={addToTasks} removeFromTasks={removeFromTasks} tasks={pendingTasks} category="Pending" />}></Route>
        <Route path="/completed" element={<TaskView createTask={createTask} setCreateTask={setCreateTask} addToTasks={addToTasks} removeFromTasks={removeFromTasks} tasks={completedTasks} category="Completed" />}></Route>
        <Route path="/failed" element={<TaskView createTask={createTask} setCreateTask={setCreateTask} addToTasks={addToTasks} removeFromTasks={removeFromTasks} tasks={failedTasks} category="Failed" />}></Route>
      </Routes>
    </>
  )
}

export default App