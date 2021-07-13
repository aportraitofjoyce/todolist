import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    const addTask = (title: string) => {
            let newTask = {id: v1(), title: title, isDone: false}
            setTasks([newTask, ...tasks])
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>("All")

    let tasksForTodolist = tasks
    if (filter === "Active") tasksForTodolist = tasks.filter(t => !t.isDone)
    if (filter === "Completed") tasksForTodolist = tasks.filter(t => t.isDone)

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        const taskToChange = tasks.find(t => t.id === id)
        if (taskToChange) taskToChange.isDone = isDone
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filterStatus={filter}
            />
        </div>
    )
}

export default App
