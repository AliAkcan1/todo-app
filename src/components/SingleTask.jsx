import { useContext, useEffect, useRef, useState } from "react"
import { TasksDispatchContext } from "../Context"
import PropTypes from 'prop-types';

function SingleTask({ task }) {
    const dispatch = useContext(TasksDispatchContext)

    const [editMode, setEditMode] = useState(false)
    const [newDescription, setNewDescription] = useState(task.description)
    const [isCompleted, setIsCompleted] = useState(task.completed)
    const descriptionRef = useRef()

    useEffect(() => {
        if (editMode) {
            descriptionRef.current.focus()
        }
    }, [editMode])

    return (
        <li
            className={
                task.color === 'red' ? 'w-full h-16 flex items-center px-2 bg-red-300 rounded-lg border border-gray-300' :
                    task.color === 'green' ? 'w-full h-16 flex items-center px-2 bg-green-300 rounded-lg border border-gray-300' :
                        task.color === 'yellow' ? 'w-full h-16 flex items-center px-2 bg-yellow-300 rounded-lg border border-gray-300' :
                            'w-full h-16 flex items-center px-2 bg-secondary rounded-lg border border-gray-300'
            }
            key={task.id}
        >
            <input
                type="checkbox"
                className='mr-4 w-8 h-8 bg-red-500'
                checked={isCompleted}
                onClick={() => {
                    setIsCompleted(!isCompleted)
                    dispatch({
                        type: 'TOGGLE_TASK',
                        id: task.id
                    })
                }}
            />
            <div className="flex flex-col">
                <span className="text-md font-bold rounded-lg">
                    {editMode ?
                        <input
                            type="text"
                            className="text-lg rounded-lg font-extrabold border border-black pl-1"
                            onChange={(e) => setNewDescription(e.target.value)}
                            ref={descriptionRef}
                            value={newDescription}
                        />
                        :
                        task.completed ?
                            <s> {task.description} </s>
                            :
                            task.description
                    }
                </span>
                <span className="text-sm font-light"> {task.date}  - {task.deadline} </span>
            </div>
            <div className="h-full flex gap-2 items-center justify-center ml-auto">
                <button
                    className=" bg-quaternary rounded-md text-gray-800 w-10 h-10"
                    onClick={() => dispatch({
                        type: 'REMOVE_TASK',
                        id: task.id
                    })}
                >
                    <i className="fa-solid fa-trash text-lg"></i>
                </button>
                {
                    editMode ?
                        <button
                            className="bg-quaternary rounded-md text-gray-800 w-10 h-10"
                            onClick={() => {
                                setEditMode(!editMode)
                                dispatch({
                                    type: 'EDIT_TASK',
                                    id: task.id,
                                    description: newDescription
                                })
                            }}
                        >
                            <i className="fa-solid fa-check"></i>
                        </button>
                        :
                        <button
                            className=" bg-quaternary rounded-md text-gray-800 w-10 h-10"
                            onClick={() => {
                                setEditMode(!editMode)
                            }}
                        >
                            <i className="fa-solid fa-pen text-lg"></i>
                        </button>
                }
            </div>
        </li>
    )
}

SingleTask.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
};

export default SingleTask