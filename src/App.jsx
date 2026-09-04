import { useEffect, useContext, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import TaskView from "./TaskView"
import { AppContext } from "./AppContext"
import { writeFile } from "./Util"

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

  const { pendingTasks, setPendingTasks } = useContext(AppContext)
  const { completedTasks, setCompletedTasks } = useContext(AppContext)
  const { failedTasks, setFailedTasks } = useContext(AppContext)

  let loaded = false

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

  useEffect(() => {
    if (loaded) {
      writeFile('pending', pendingTasks, (data) => {
        if (data.err) {
          alert("Error Occured. Couldnt Save Data")
        }
      })
    }
  }, [pendingTasks])

  useEffect(() => {
    if (loaded) {
      writeFile('completed', completedTasks, (data) => {
        if (data.err) {
          alert("Error Occured. Couldnt Save Data")
        }
      })
    }
  }, [completedTasks])

  useEffect(() => {
    if (loaded) {
      writeFile('failed', failedTasks, (data) => {
        if (data.err) {
          alert("Error Occured. Couldnt Save Data")
        }
      })
    }
  }, [failedTasks])


  if (!pendingTasks || !completedTasks || !failedTasks) {
    return <h1>Loading</h1>
  }

  loaded = true


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