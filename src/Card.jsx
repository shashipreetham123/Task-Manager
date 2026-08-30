import './Card.css'
import { TrashIcon, EditIcon, CheckIcon } from './Icons'

function Card({ id, task, category, setModal }) {
    const keyMapping = {
        "dateCreated": "Date Created",
        "dateOfCompletion": "Date of Completion",
        "finalDateOfCompletion": "Final Date of Completion",
        "status": "Status"
    }

    function showModal(type) {
        setModal({
            type: type,
            task: task,
            visible: true,
            taskId: id
        })

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
                <button className="btn-action" onClick={() => showModal("edit")}>
                    <EditIcon></EditIcon>
                    <div>Edit</div>
                </button>
                <button className="btn-action" onClick={() => showModal("delete-conformation")}>
                    <TrashIcon></TrashIcon>
                    <div>Delete</div>
                </button>
                {
                    (category == "Pending" &&
                        <>
                            <button className="btn-action" onClick={() => showModal("mark-complete-conformation")}>
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