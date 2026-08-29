import { useState } from 'react'
import './Card.css'
import { TrashIcon, EditIcon, CheckIcon } from './Icons'
import { Modal } from './Modal'


function Card({ task, category, setModal, showModal }) {
    const keyMapping = {
        "dateCreated": "Date Created",
        "dateOfCompletion": "Date of Completion",
        "finalDateOfCompletion": "Final Date of Completion",
        "status": "Status"
    }


    function showEditModal() {
        setModal(<Modal type="edit" editTask={task} showModal={showModal}/>)
        showModal(true)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{task.name}</h3>
                {
                    Object.entries(task).map(([key, value]) => {
                        if (value && key != "id" && key != "name") {
                            return <p key={key}>{keyMapping[key]}: {value}</p>
                        }
                    })
                }
            </div>
            <div className="card-actions">
                <button className="btn-action" onClick={showEditModal}>
                    <EditIcon></EditIcon>
                    <div>Edit</div>
                </button>
                <button className="btn-action">
                    <TrashIcon></TrashIcon>
                    <div>Delete</div>
                </button>
                {
                    (category == "Pending" &&
                        <>
                            <button className="btn-action">
                                <CheckIcon></CheckIcon>
                                <div>Mark as Complete</div>
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Card