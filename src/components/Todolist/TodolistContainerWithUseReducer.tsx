import React, {useReducer} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import s from './Todolist.module.css'

import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, sortTasksByNameAC
} from '../../store/actions/tasks-actions/tasks-actions'
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC
} from '../../store/actions/todolists-actions/todolists-actions'
import {tasksReducer} from '../../store/reducers/tasks-reducer/tasks-reducer'
import {TODOLIST_ID_1, TODOLIST_ID_2, todolistsReducer} from '../../store/reducers/todolists-reducer/todolists-reducer'
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
export type TasksType = {
    [key: string]: TaskType[]
}

export const TodolistContainerWithUseReducer = () => {
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: TODOLIST_ID_1, title: 'What to learn', filter: 'All'},
        {id: TODOLIST_ID_2, title: 'What to buy', filter: 'All'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [TODOLIST_ID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],

        [TODOLIST_ID_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cola', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Smoke', isDone: true}
        ]
    })


    const removeTask = (taskID: string, TODOLIST_ID: string) => {
        dispatchTasks(removeTaskAC(taskID, TODOLIST_ID))
    }

    const addTask = (title: string, TODOLIST_ID: string) => {
        dispatchTasks(addTaskAC(title, TODOLIST_ID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, TODOLIST_ID: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, TODOLIST_ID))
    }

    const changeTaskTitle = (taskID: string, title: string, TODOLIST_ID: string) => {
        dispatchTasks(changeTaskTitleAC(taskID, title, TODOLIST_ID))
    }

    const sortTasksByName = (TODOLIST_ID: string) => {
        dispatchTasks(sortTasksByNameAC(TODOLIST_ID))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const removeTodolist = (TODOLIST_ID: string) => {
        const action = removeTodolistAC(TODOLIST_ID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => {
        dispatchTodolists(changeTodolistFilterAC(filter, TODOLIST_ID))
    }

    const changeTodolistTitle = (title: string, TODOLIST_ID: string) => {
        dispatchTodolists(changeTodolistTitleAC(title, TODOLIST_ID))
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

    return (
        <div className={'App'}>
            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodolist}/>
            </div>

            <div className={s.todolistsWrapper}>
                {todolists.map(todolist =>
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
                        tasksToRender={tasksToRender(todolist)}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        sortTasksByName={sortTasksByName}
                    />
                )}
            </div>
        </div>
    )
}