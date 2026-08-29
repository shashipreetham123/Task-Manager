import './Modal.css'
import { CrossIcon } from './Icons'
import { useState } from 'react'

export function Modal( {type, editTask, onClose} ) {
    if(type == "edit") {
        return <EditModal editTask={editTask} onClose={onClose}/>
    }else if(type == "empty") {

    }else {
        return <h1>Hello World</h1>
    }
}


function EditModal({ editTask, onClose }) {

    const [taskName, setTaskName] = useState(editTask.name)
    const [compDate, setCompDate] = useState(editTask.finalDateOfCompletion)

    function updateTaskName(e) {
        setTaskName(e.target.value)
    }
    function updateCompDate(e) {
        setCompDate(e.target.value)
    }

    function saveChanges() {
        
    }

    return (
        <div className="modal-container on-top">
            <div className="modal">
                <div className="modal-head">
                    <div className="modal-name">Edit Task</div>

                    <div className="modal-close-button" onClick={onClose}>
                        <CrossIcon></CrossIcon>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-input-group">
                        <label>Task Name: </label>
                        <input placeholder='Enter Task Name' onChange={updateTaskName} value={taskName} type="text" />
                    </div>
                    <div className="modal-input-group">
                        <label>Date of Completion: </label>
                        <input placeholder='Date of Completion' onChange={updateCompDate} value={compDate} type="date" />
                    </div>
                    <div className="modal-button-group">
                        <button onClick={saveChanges}>Save</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

