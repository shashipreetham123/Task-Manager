import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import TaskView from "./TaskView"

function readFile(name, callback) {
  fetch(`http://localhost:5000/read/data`, {
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

  const [data, setData] = useState(null)

  useEffect(() => {
    readFile("data", (result) => {
      if (result) {
        setData(JSON.parse(result.data))
      }
    })
  }, [])
  
  if (!data) {
    return <h1>Loading</h1>
  }


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskView details={data.pending} status="Pending" />}></Route>
        <Route path="/completed" element={<TaskView details={data.completed} status="Completed" />}></Route>
        <Route path="/failed" element={<TaskView details={data.failed} status="Failed" />}></Route>

      </Routes>
    </>
  )
}

export default App