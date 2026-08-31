
import { createContext, useState } from "react"

export const AppContext = createContext()

export function AppProvider({ children }) {

    const [pendingTasks, setPendingTasks] = useState(null)
    const [completedTasks, setCompletedTasks] = useState(null)
    const [failedTasks, setFailedTasks] = useState(null)
    const [createTask, setCreateTask] = useState(false)

    function addToTasks(category, id, task) {
        if (category.toLowerCase() == "completed") {
            setCompletedTasks(prev => ({
                ...prev,
                [id]: task
            }))
        }
        if (category.toLowerCase() == "failed") {
            setFailedTasks(prev => ({
                ...prev,
                [id]: task
            }));

        }
        if (category.toLowerCase() == "pending") {
            setPendingTasks(prev => ({
                ...prev,
                [id]: task
            }))
        }
    }

    function removeFromTasks(category, taskId) {
        if (category.toLowerCase() == "completed") {
            setCompletedTasks(prev => {
                const next = { ...prev }
                delete next[taskId];
                return next;
            });
        }
        if (category.toLowerCase() == "failed") {
            setFailedTasks(prev => {
                const next = { ...prev }
                delete next[taskId];
                return next;
            });
        }
        if (category.toLowerCase() == "pending") {
            setPendingTasks(prev => {
                const next = { ...prev }
                delete next[taskId];
                return next;
            });
        }
    }

    function getTask(taskId, category) {
        if (category.toLowerCase() == "pending") {
            return pendingTasks[taskId]
        } else if (category.toLowerCase() == "completed") {
            return completedTasks[taskId]
        } else if (category.toLowerCase() == "failed") {
            return failedTasks[taskId]
        }
    }

    return (
        <AppContext.Provider value={{
            pendingTasks, setPendingTasks,
            completedTasks, setCompletedTasks,
            failedTasks, setFailedTasks,
            createTask, setCreateTask,
            addToTasks, removeFromTasks,
            getTask
        }}>
            {children}
        </AppContext.Provider>
    )
}