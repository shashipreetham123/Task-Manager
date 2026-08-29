import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Deleter({ tasks, removeFromTasks }) {
    const { task } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        removeFromTasks(task)
    }, [])

    useEffect(() => {
        navigate('/')
    }, [tasks]);

    return (
        <h1>Deleting</h1>
    )

}

export default Deleter