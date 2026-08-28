import './TaskView.css'
import Card from './Card'

function TaskView({details, status}) {
    return (
        <div className="container">
            <h1>{status} Tasks</h1>
            <div className="layout">
                {
                    details.map((task, i) => {
                        return <Card key={i} details={task} status={status}></Card>
                    })
                }

            </div>
        </div>
    )
}

export default TaskView