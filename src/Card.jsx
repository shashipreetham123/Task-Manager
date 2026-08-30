import './Card.css'
import { TrashIcon, EditIcon, CheckIcon } from './Icons'
import { caplitalize, dateReverse, isDate } from './Util'

function Card({ id, task, category, setModal }) {
    const keyIgnore = ["name", "status"]

    function showModal(type) {
        setModal({
            type,
            task,
            category,
            visible: true,
            taskId: id
        })

    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{task.name}</h2>
                {
                    Object.entries(task).map(([key, value]) => {
                        if (value && !keyIgnore.includes(key)) {
                            let ky = caplitalize(key)
                            let val = value
                            if (isDate(value)) {
                                val = dateReverse(value)
                            }
                            return <p key={key}>{ky}: {val}</p>
                        }
                    })
                }
            </div>
            <div className="card-actions">
                <button className="btn-action" onClick={() => showModal("create-edit")}>
                    <EditIcon></EditIcon>
                    <div>{category == "pending" ? "Edit" : "Recreate"}</div>
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