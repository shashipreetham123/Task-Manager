import './TaskView.css'
import Card from './Card'
import { useState } from 'react'
import { Modal } from './Modal'
function TaskView({ createTask, setCreateTask, addToTasks, removeFromTasks, tasks, category }) {

    const [modal, setModal] = useState({
        type: null,
        task: null,
        category: null,
        visible: false,
        taskId: null
    })

    function modalClose() {
        setModal(prev => ({
            ...prev,
            visible: false
        }))
    }

    return (
        <>
            {createTask && (<Modal type="create-edit" createTask={createTask} setCreateTask={setCreateTask} addToTasks={addToTasks} onClose={() => setCreateTask(false)}/>)}
            {modal.visible && (<Modal type={modal.type} taskCategory={modal.category} removeFromTasks={removeFromTasks} addToTasks={addToTasks} taskId={modal.taskId} task={modal.task} onClose={modalClose}/>)}
            <div className="task-container">
                <div className="layout">
                    {
                        Object.entries(tasks).map(([id, task]) => {
                            return <Card key={id} id={id} task={task} category={category} setModal={setModal}></Card>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TaskView