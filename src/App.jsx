import { useReducer, useState } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { v4 as uuidv4 } from 'uuid'
import { TasksContext, TasksDispatchContext } from "./Context"

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, [
    {
      id: 1,
      description: 'Learn React',
      completed: false,
      color: 'red',
      date: new Date().toLocaleString(),
      deadline: '2022-12-31'
    }
  ])

  function tasksReducer(tasks, action) {
    switch (action.type) {
      case 'ADD_TASK':
        return [...tasks, {
          id: action.id,
          description: action.description,
          completed: action.completed,
          color: action.color,
          date: action.date,
          deadline: action.deadline
        }]
      case 'REMOVE_TASK':
        return tasks.filter(task => task.id !== action.id)
      case 'EDIT_TASK':
        return tasks.map(task => task.id === action.id ? { ...task, description: action.description } : task)
      case 'TOGGLE_TASK':
        return tasks.map(task => task.id === action.id ? { ...task, completed: !task.completed } : task)
      case 'COLOR_TASK':
        return tasks.map(task => task.id === action.id ? { ...task, color: action.color } : task)
      case 'DEADLINE_TASK':
        return tasks.map(task => task.id === action.id ? { ...task, deadline: action.deadline } : task)
      default:
        return tasks
    }
  }

  function handleAddTask(description, completed, color, date, deadline) {
    dispatch({
      type: 'ADD_TASK',
      id: uuidv4.v4(),
      description,
      completed,
      color,
      date,
      deadline
    })
  }

  function handleRemoveTask(id) {
    dispatch({
      type: 'REMOVE_TASK',
      id
    })
  }

  function handleEditTask(id, description) {
    dispatch({
      type: 'EDIT_TASK',
      id,
      description
    })
  }

  function handleToggleTask(id) {
    dispatch({
      type: 'TOGGLE_TASK',
      id
    })
  }

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <div className='App w-full h-full px-44 flex flex-col justify-center items-center'>
          <TaskForm />
          <TaskList />
        </div>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

export default App
