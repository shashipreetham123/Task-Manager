import './Card.css'
import { TrashIcon, EditIcon, CheckIcon } from './Icons'

import { useNavigate } from 'react-router-dom'

function Card({ task, category, index }) {
    const navigate = useNavigate()

    const keyMapping = {
        "dateCreated": "Date Created",
        "dateOfCompletion": "Date of Completion",
        "finalDateOfCompletion": "Final Date of Completion",
        "status": "Status"
    }

    function navigateToRoute(e) {
        navigate(e.target.closest(".btn-action").dataset.linkTo)
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
                <button className="btn-action" data-link-to={`/modify/${category.toLowerCase()}/${index}`} onClick={navigateToRoute}>
                    <EditIcon></EditIcon>
                    <div>Edit</div>
                </button>
                <button className="btn-action" data-link-to={`/delete/${category.toLowerCase()}/${index}`} onClick={navigateToRoute}>
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