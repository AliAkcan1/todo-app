import { useContext } from "react"
import SingleTask from "./SingleTask"
import { TasksContext } from "../Context"

function TaskList({ onTaskDelete, onTaskEdit, onTaskToggle }) {
    const tasks = useContext(TasksContext)

    return (
        <div className="w-full h-fit min-h-96 p-8 bg-primary rounded-xl">
            <ul className="flex flex-col gap-4">
                {tasks && tasks.map((task) => (
                    <SingleTask key={task.id} task={task} onTaskDelete={onTaskDelete} onTaskToggle={onTaskToggle} onEdit={onTaskEdit} />
                ))}
            </ul>
        </div>
    )
}

export default TaskList