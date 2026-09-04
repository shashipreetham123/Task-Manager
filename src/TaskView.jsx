import './TaskView.css'
import Card from './Card'
import { useState, useContext } from 'react'
import { Modal } from './Modal'
import { AppContext } from './AppContext'
import { PlusIcon } from './Icons'


function TaskView({tasks, category}) {

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
                {Object.entries(tasks).length == 0 && (<div className='empty-text'>No {category} Tasks</div>)}
                <div className="layout">
                    {
                        Object.entries(tasks).map(([id, task]) => {
                            return <Card key={id} id={id} task={task} category={category} setModal={setModal}></Card>
                        })
                    }
                </div>
            </div>

            { (category == "Pending") && (<div className="create-new-btn" tabIndex={0} onClick={() => {setCreateTask(true)}}>
                <PlusIcon />
                <div>Create New Task</div>
            </div>
            )
            }
        </>
    )
}

export default TaskView