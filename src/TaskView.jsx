import './TaskView.css'
import Card from './Card'
import { useState } from 'react'
import { Modal } from './Modal'
function TaskView({ tasks, category }) {

    const [modal, setModal] = useState({
        type: null,
        editTask: null,
        visible: false
    })

    function modalClose() {
        setModal(prev => ({
            ...prev,
            visible: false
        }))
    }

    return (
        <>
            {modal.visible && (<Modal type={modal.type} editTask={modal.editTask} onClose={modalClose}/>)}
            <div className="task-container">
                <h1>{category} Tasks</h1>
                <div className="layout">
                    {
                        tasks.map((task, i) => {
                            return <Card key={i} task={task} category={category} setModal={setModal}></Card>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TaskView