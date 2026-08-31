import './TaskView.css'
import Card from './Card'
import { useState, useContext } from 'react'
import { Modal } from './Modal'
import { AppContext } from './AppContext'


function TaskView({tasks, category }) {

    const {createTask, setCreateTask} = useContext(AppContext)

    const [modal, setModal] = useState({
        type: null,
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
            {createTask && (<Modal type="create-edit" onClose={() => setCreateTask(false)}/>)}
            {modal.visible && (<Modal type={modal.type} taskCategory={modal.category} taskId={modal.taskId} onClose={modalClose}/>)}
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