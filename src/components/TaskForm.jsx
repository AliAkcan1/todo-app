import { useContext, useState } from "react";
import { TasksDispatchContext } from "../Context";

function TaskForm() {
    const dispatch = useContext(TasksDispatchContext)

    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [color, setColor] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_TASK',
            id: Math.floor(Math.random() * 1000) + 1,
            description,
            completed: false,
            color,
            date: new Date().toLocaleString(),
            deadline
        })
        setDescription("");
        setDeadline("");
        setColor("");
    };

    return (
        <div className="TaskForm">
            <form onSubmit={handleSubmit} className="my-4 flex justify-center items-center gap-8">
                <div className="flex flex-col">
                    <label htmlFor="description" className="block font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="deadline" className="block font-medium">
                        Deadline
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="color" className="block font-medium">
                        Color
                    </label>
                    <input
                        type="color"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-2 mt-6"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;