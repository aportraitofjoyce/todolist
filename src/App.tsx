import React, {useEffect, useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

const TODOLIST_ID_1 = v1()
const TODOLIST_ID_2 = v1()

export const App = () => {
    // Data
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: TODOLIST_ID_1, title: 'What to Learn', filter: 'All'},
        {id: TODOLIST_ID_2, title: 'What to Buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [TODOLIST_ID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],

        [TODOLIST_ID_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cola', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Smoke', isDone: true},
        ],
    })

    // Local Storage
    useEffect(() => {
        const todolistsString = localStorage.getItem('todolists')
        if (todolistsString) {
            const todolistsInit = JSON.parse(todolistsString)
            setTodolists(todolistsInit)
        }

        const tasksString = localStorage.getItem('tasks')
        if (tasksString) {
            const tasksInit = JSON.parse(tasksString)
            setTasks(tasksInit)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists))
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [todolists, tasks])


    // Actions
    const removeTask = (taskID: string, TODOLIST_ID: string) => {
        tasks[TODOLIST_ID] = tasks[TODOLIST_ID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const addTask = (title: string, TODOLIST_ID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[TODOLIST_ID] = [newTask, ...tasks[TODOLIST_ID]]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, TODOLIST_ID: string) => {
        tasks[TODOLIST_ID] = tasks[TODOLIST_ID].map(t => (t.id === taskID ? {...t, isDone} : t))
        setTasks({...tasks})
    }

    const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => {
        setTodolists(todolists.map(todolist => (todolist.id === TODOLIST_ID ? {...todolist, filter: filter} : todolist)))
    }

    const removeTodolist = (TODOLIST_ID: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== TODOLIST_ID))
        delete tasks[TODOLIST_ID]
    }

    const tasksToRender = (todolist: TodolistType): TaskType[] => {
        switch (todolist.filter) {
            case 'Completed':
                return tasks[todolist.id].filter(t => t.isDone)
            case 'Active':
                return tasks[todolist.id].filter(t => !t.isDone)
            default:
                return tasks[todolist.id]
        }
    }

    // JSX
    return (
        <div className='App'>
            {todolists.map(todolist => {
                return (
                    <Todolist
                        key={todolist.id}
                        TODOLIST_ID={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}
                        tasksToRender={tasksToRender(todolist)}/>
                )
            })}
        </div>
    )
}