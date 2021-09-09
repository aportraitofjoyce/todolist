import React, {useCallback} from 'react'
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

export const TodolistsContainer = () => {
    const tasks = useSelector<StateType, TasksType>(state => state.tasks)
    const todolists = useSelector<StateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, TODOLIST_ID: string) => {
        dispatch(removeTaskAC(taskID, TODOLIST_ID))
    }, [dispatch])

    const addTask = useCallback((title: string, TODOLIST_ID: string) => {
        dispatch(addTaskAC(title, TODOLIST_ID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, TODOLIST_ID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, TODOLIST_ID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, TODOLIST_ID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, TODOLIST_ID))
    }, [dispatch])

    const sortTasksByName = useCallback((TODOLIST_ID: string) => {
        dispatch(sortTasksByNameAC(TODOLIST_ID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const removeTodolist = useCallback((TODOLIST_ID: string) => {
        dispatch(removeTodolistAC(TODOLIST_ID))
    }, [dispatch])

    const changeTodolistFilter = useCallback((filter: FilterValuesType, TODOLIST_ID: string) => {
        dispatch(changeTodolistFilterAC(filter, TODOLIST_ID))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, TODOLIST_ID: string) => {
        dispatch(changeTodolistTitleAC(title, TODOLIST_ID))
    }, [dispatch])

    return (
        <div className={'App'}>
            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodolist}/>
            </div>

            <div className={s.todolistsWrapper}>
                {todolists.map(tdl =>
                    <Todolist
                        key={tdl.id}
                        TODOLIST_ID={tdl.id}
                        title={tdl.title}
                        filter={tdl.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}
                        tasks={tasks[tdl.id]}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        sortTasksByName={sortTasksByName}
                    />
                )}
            </div>
        </div>
    )
}