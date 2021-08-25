import React from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import s from './Todolist.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../store/store'
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

export const TodolistContainer = () => {
    const tasks = useSelector<StateType, TasksType>(state => state.tasks)
    const todolists = useSelector<StateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const removeTask = (taskID: string, TODOLIST_ID: string) => {
        dispatch(removeTaskAC(taskID, TODOLIST_ID))
    }

    const addTask = (title: string, TODOLIST_ID: string) => {
        dispatch(addTaskAC(title, TODOLIST_ID))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, TODOLIST_ID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, TODOLIST_ID))
    }

    const changeTaskTitle = (taskID: string, title: string, TODOLIST_ID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, TODOLIST_ID))
    }

    const sortTasksByName = (TODOLIST_ID: string) => {
        dispatch(sortTasksByNameAC(TODOLIST_ID))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const removeTodolist = (TODOLIST_ID: string) => {
        dispatch(removeTodolistAC(TODOLIST_ID))
    }

    const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => {
        dispatch(changeTodolistFilterAC(filter, TODOLIST_ID))
    }

    const changeTodolistTitle = (title: string, TODOLIST_ID: string) => {
        dispatch(changeTodolistTitleAC(title, TODOLIST_ID))
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