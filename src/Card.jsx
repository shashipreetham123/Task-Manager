import './Card.css'
import { TrashIcon, EditIcon, CheckIcon } from './Icons'
function Card({task, category}) {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{task.name}</h3>
                {
                    Object.entries(task.details).map(([key, value]) => {
                        if (value) {
                            return (<p key={key} className='card-text'>{value.name}: {value.value}</p>)
                        }
                    })
                }
            </div>
            {
                (category == "Pending" && 
                    <div className="card-actions">
                        <button className="btn-action">
                            <EditIcon></EditIcon>
                            <div>Edit</div>
                        </button>
                        <button className="btn-action">
                            <TrashIcon></TrashIcon>
                            <div>Delete</div>
                        </button>
                        <button className="btn-action">
                            <CheckIcon></CheckIcon>
                            <div>Mark as Complete</div>
                        </button>
                    </div>
                ) 
            }
        </div>
    )
}

export default Card