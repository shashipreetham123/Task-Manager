import './TaskView.css'
import Card from './Card'
import { useState } from 'react'
function TaskView({ tasks, category }) {

    const [modal, setModal] = useState(<></>)
    const [modalVisible, showModal] = useState(false)

    return (
        <>
            {modalVisible && modal}
            <div className="task-container">
                <h1>{category} Tasks</h1>
                <div className="layout">
                    {
                        tasks.map((task, i) => {
                            return <Card key={i} task={task} category={category} setModal={setModal} showModal={showModal}></Card>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TaskView