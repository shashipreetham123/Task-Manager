import { useNavigate, useParams } from "react-router-dom"
import './Modifier.css'
import { useEffect, useState } from "react"

function getDate() {
    const today = new Date();

    const date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    return date
}

function Modifier({ addToPendingTasks, tasks, removeFromTasks }) {
    const { task } = useParams()
    const navigate = useNavigate()

    const [taskName, setTaskName] = useState(task == "new" ? "" : tasks[task].name)
    const [compDate, setCompDate] = useState(task == "new" ? "" : tasks[task].finalDateOfCompletion)

    function updateTaskName(e) {
        setTaskName(e.target.value)
    }

    function updateCompDate(e) {
        setCompDate(e.target.value)
    }

    function updateChanges() {
        addToPendingTasks({
            "name": taskName,
            "dateCreated": getDate(),
            "finalDateOfCompletion": compDate,
            "dateOfCompletion": null,
            "status": "pending"
        })


        removeFromTasks(task)

        saveChanges()
        goBack()

    }

    function saveChanges() {

    }

    function goBack() {
        navigate(-1)
    }

    return (
        <div className="modifier-container">
            <div className="input-group">
                <label htmlFor="task-name">Task Name: </label>
                <input type="text" name="" id="task-name" value={taskName} onChange={updateTaskName} placeholder="Enter the Task Name" />
            </div>
            <div className="input-group">
                <label htmlFor="date-of-completion">Date of Completion: </label>
                <input type="date" name="" value={compDate} onChange={updateCompDate} id="date-of-completion" />
            </div>
            
            <div className="modifier-actions">
                <button className="form-btn-action" onClick={updateChanges}>Save</button>
                <button className="form-btn-action" onClick={goBack}>Exit</button>
            </div>

        </div>
    )
}



export default Modifier