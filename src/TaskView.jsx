import './TaskView.css'
import Card from './Card'

function TaskView({tasks, category}) {
    return (
        <div className="container">
            <h1>{category} Tasks</h1>
            <div className="layout">
                {
                    tasks.map((task, i) => {
                        return <Card key={i} task={task} category={category}></Card>
                    })
                }
            </div>
        </div>
    )
}

export default TaskView