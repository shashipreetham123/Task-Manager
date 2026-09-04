import './Modal.css'
import { CrossIcon } from './Icons'
import { useContext, useState } from 'react'
import { getDate, caplitalize, dateReverse, isDate } from './Util'
import { AppContext } from './AppContext'

export function Modal({ type, taskCategory, taskId, onClose }) {

    if (type == "create-edit") {
        return <CreateModifyModal
            taskId={taskId}
            onClose={onClose}
            taskCategory={taskCategory}
        />
    } else if (type == "delete-conformation") {
        return <DeleteConformationModal
            taskCategory={taskCategory}
            taskId={taskId}
            onClose={onClose}
        />
    } else if (type == "mark-complete-conformation") {
        return <MarkCompleteModal
            taskCategory={taskCategory}
            taskId={taskId}
            onClose={onClose}
        />
    } else if (type == "view") {
        return <ViewModal taskCategory={taskCategory} taskId={taskId} onClose={onClose} />
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

function validateInputs(taskName, created, deadline) {
    let status = {
        valid: true,
        errs: []
    }
    if (taskName != undefined) {
        if (taskName.trim() == "") {
            status.valid = false
            status.errs.push("Task Name is Required")
        }
    }
    if (created != undefined && deadline != undefined) {

        const todayDate = new Date(getDate())

        if (created.trim() == "") {
            status.valid = false
            status.errs.push("Creation Date is Required")
        }

        if (deadline.trim() == "") {
            status.valid = false
            status.errs.push("Deadline Date is Required")
        }

        if (status.valid) {
            const createdDate = new Date(created)
            const deadLineDate = new Date(deadline)


            if (deadLineDate < createdDate) {
                status.valid = false
                status.errs.push("Deadline cannot be Before Creation")
            }

            if (deadLineDate < todayDate) {
                status.valid = false
                status.errs.push("Cannot Create a Task Whose Deadline is Finished")
            }
        }

    }

    return status
}


function CreateModifyModal({ taskCategory, taskId, onClose }) {

    const { createTask, setCreateTask, addToTasks, removeFromTasks, getTask } = useContext(AppContext)



    const task = getTask(taskId, createTask ? "" : taskCategory)

    const [taskName, setTaskName] = useState(createTask ? "" : task.name)
    const [createdDate, setCreatedDate] = useState(createTask ? "" : task.created)
    const [compDate, setCompDate] = useState(createTask ? "" : task.deadline)
    const [errMessage, setErrMessage] = useState("")
    const [desc, setDesc] = useState("")

    function updateTaskName(e) {
        setTaskName(e.target.value)
    }
    function updateCompDate(e) {
        setCompDate(e.target.value)
    }
    function upcreatedDate(e) {
        setCreatedDate(e.target.value)
    }

    function updateDesc(e) {
        setDesc(e.target.value)
    }

    function updateData() {

        const validStatus = validateInputs(taskName, createdDate, compDate)

        if (!validStatus.valid) {
            setErrMessage(validStatus.errs[0])
            return
        }


        const modifiedTask = {
            "name": taskName,
            "created": createdDate,
            "deadline": compDate,
            "status": "pending",
            "description": desc,
            "completed": null
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
                        <input placeholder='Learn React Basics' onChange={updateTaskName} value={taskName} type="text" />
                    </div>

                    <div className="modal-input-group">
                        <label>Decription (Optional): </label>
                        <textarea value={desc} onChange={updateDesc} placeholder='Learn the fundamentals of React, including components, props, state, and events.'></textarea>
                    </div>


                    <div className="modal-input-group">
                        <label>Date of Creation: </label>
                        <input onChange={upcreatedDate} value={createdDate} type="date" />
                    </div>

                    <div className="modal-input-group">
                        <label>Date of Completion: </label>
                        <input onChange={updateCompDate} value={compDate} type="date" />
                    </div>

                    <div className="modal-err-message">{errMessage}</div>

                    <div className="modal-button-group">
                        <button onClick={saveChanges}>{createTask ? "Create" : "Save"}</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

function ViewModal({ taskId, taskCategory, onClose }) {

    const { getTask } = useContext(AppContext)
    const task = getTask(taskId, taskCategory)


    return (
        <div className="modal-container on-top">
            <div className="modal">
                <ModalHead title={task.name} onClose={onClose} />
                <div className="modal-body">

                    {
                        Object.entries(task).map(([key, value]) => {
                            if (value) {
                                let ky = caplitalize(key)
                                let val = value
                                if (isDate(value)) {
                                    val = dateReverse(value)
                                }else{
                                    val = caplitalize(val)
                                }
                                return <p key={key}><strong>{ky}</strong>: {val}</p>
                            }
                        })
                    }

                </div>
            </div>
        </div >
    )

}

function DeleteConformationModal({ taskId, taskCategory, onClose }) {

    const { removeFromTasks, getTask } = useContext(AppContext)
    const task = getTask(taskId, taskCategory)


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

function MarkCompleteModal({ taskId, taskCategory, onClose }) {

    const { addToTasks, removeFromTasks, getTask } = useContext(AppContext)
    const task = getTask(taskId, taskCategory)


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