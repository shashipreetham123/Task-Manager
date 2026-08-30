import './Modal.css'
import { CrossIcon } from './Icons'
import { useState } from 'react'
import { getDate } from './Util'

export function Modal({ type, taskCategory, addToTasks, removeFromTasks, task, taskId, onClose, setCreateTask, createTask }) {

    if (type == "create-edit") {
        return <CreateModifyModal
            addToTasks={addToTasks}
            removeFromTasks={removeFromTasks}
            createTask={createTask}
            setCreateTask={setCreateTask}
            task={task}
            taskId={taskId}
            onClose={onClose}
            taskCategory={taskCategory}
        />
    } else if (type == "delete-conformation") {
        return <DeleteConformationModal taskCategory={taskCategory} removeFromTasks={removeFromTasks} taskId={taskId} task={task} onClose={onClose} />
    } else if (type == "mark-complete-conformation") {
        return <MarkCompleteModal taskCategory={taskCategory} taskId={taskId} task={task} onClose={onClose} addToTasks={addToTasks} removeFromTasks={removeFromTasks} />
    } else {
        return <h1>Hello World</h1>
    }
}


function ModalHead({ title, onClose }) {
    return (
        <div className="modal-head">
            <div className="modal-name"><strong>{title.toUpperCase()}</strong></div>

            <div className="modal-close-button" onClick={onClose}>
                <CrossIcon></CrossIcon>
            </div>
        </div>
    )
}




function CreateModifyModal({ createTask, taskCategory, taskId, task, addToTasks, removeFromTasks, onClose, setCreateTask }) {

    const [taskName, setTaskName] = useState(createTask ? "" : task.name)
    const [createdDate, setCreatedDate] = useState(createTask ? "" : task.created)
    const [compDate, setCompDate] = useState(createTask ? "" : task.deadline)

    function updateTaskName(e) {
        setTaskName(e.target.value)
    }
    function updateCompDate(e) {
        setCompDate(e.target.value)
    }
    function upcreatedDate(e) {
        setCreatedDate(e.target.value)
    }

    function updateData() {
        const modifiedTask = {
            "name": taskName,
            "created": createdDate,
            "deadline": compDate,
            "status": "pending",
            "dateOfCompletion": null
        }
        const newID = Date.now()

        addToTasks("pending", newID, modifiedTask)
        if (createTask) {
            setCreateTask(false)
        } else {
            removeFromTasks(taskCategory, taskId)
        }

        
        onClose()
    }

    function saveChanges() {
        updateData()
    }

    return (
        <div className="modal-container on-top">
            <div className="modal">
                <ModalHead title="Create or Edit Task" onClose={onClose} />
                <div className="modal-body">
                    <div className="modal-input-group">
                        <label>Task Name: </label>
                        <input placeholder='Enter Task Name' onChange={updateTaskName} value={taskName} type="text" />
                    </div>
                    <div className="modal-input-group">
                        <label>Date of Creation: </label>
                        <input placeholder='Date of Creation' onChange={upcreatedDate} value={createdDate} type="date" />
                    </div>

                    <div className="modal-input-group">
                        <label>Date of Completion: </label>
                        <input placeholder='Date of Completion' onChange={updateCompDate} value={compDate} type="date" />
                    </div>

                    <div className="modal-button-group">
                        <button onClick={saveChanges}>{createTask ? "Create" : "Save"}</button>
                        <button onClick={onClose}>Close</button>

                    </div>
                </div>
            </div>
        </div >


    )
}

function DeleteConformationModal({ taskId, task, taskCategory, removeFromTasks, onClose }) {
    function updateChanges() {
        removeFromTasks(taskCategory, taskId)
    }
    function saveChanges() {
        updateChanges()
        onClose()
    }

    return (
        <div className="modal-container on-top">
            <div className="modal">
                <ModalHead title="Delete Task" onClose={onClose} />
                <div className="modal-body">
                    <p>Are you Sure you want to Delete <strong>{task.name}</strong> Task</p>
                    <div className="modal-button-group">
                        <button onClick={saveChanges}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

function MarkCompleteModal({ taskId, task, taskCategory, addToTasks, removeFromTasks, onClose }) {
    function updateChanges() {

        const updated = {
            ...task,
            completed: getDate()
        }

        addToTasks("completed", taskId, updated)

        removeFromTasks(taskCategory, taskId)
    }
    function saveChanges() {
        updateChanges()
        onClose()
    }

    return (
        <div className="modal-container on-top">
            <div className="modal">
                <ModalHead title="Mark as Complete" onClose={onClose} />
                <div className="modal-body">
                    <p>Are you Sure you want to Mark <strong>{task.name}</strong> Task as Complete</p>
                    <div className="modal-button-group">
                        <button onClick={saveChanges}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </div >
    )
}