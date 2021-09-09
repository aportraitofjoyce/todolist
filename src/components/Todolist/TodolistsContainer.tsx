import React, {useCallback} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import s from './Todolist.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {StateType} from '../../store/store'
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    sortTasksByName
} from '../../store/actions/tasks-actions/tasks-actions'
import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist
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

    const removeTaskHandler = useCallback((taskID: string, TODOLIST_ID: string) => {
        dispatch(removeTask(taskID, TODOLIST_ID))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string, TODOLIST_ID: string) => {
        dispatch(addTask(title, TODOLIST_ID))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((taskID: string, isDone: boolean, TODOLIST_ID: string) => {
        dispatch(changeTaskStatus(taskID, isDone, TODOLIST_ID))
    }, [dispatch])

    const changeTaskTitleHandler = useCallback((taskID: string, title: string, TODOLIST_ID: string) => {
        dispatch(changeTaskTitle(taskID, title, TODOLIST_ID))
    }, [dispatch])

    const sortTasksByNameHandler = useCallback((TODOLIST_ID: string) => {
        dispatch(sortTasksByName(TODOLIST_ID))
    }, [dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolist(title))
    }, [dispatch])

    const removeTodolistHandler = useCallback((TODOLIST_ID: string) => {
        dispatch(removeTodolist(TODOLIST_ID))
    }, [dispatch])

    const changeTodolistFilterHandler = useCallback((filter: FilterValuesType, TODOLIST_ID: string) => {
        dispatch(changeTodolistFilter(filter, TODOLIST_ID))
    }, [dispatch])

    const changeTodolistTitleHandler = useCallback((title: string, TODOLIST_ID: string) => {
        dispatch(changeTodolistTitle(title, TODOLIST_ID))
    }, [dispatch])

    return (
        <div className={'App'}>
            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodolistHandler}/>
            </div>

            <div className={s.todolistsWrapper}>
                {todolists.map(tdl =>
                    <Todolist
                        key={tdl.id}
                        TODOLIST_ID={tdl.id}
                        title={tdl.title}
                        filter={tdl.filter}
                        removeTask={removeTaskHandler}
                        addTask={addTaskHandler}
                        changeTaskStatus={changeTaskStatusHandler}
                        changeTodolistFilter={changeTodolistFilterHandler}
                        removeTodolist={removeTodolistHandler}
                        tasks={tasks[tdl.id]}
                        changeTaskTitle={changeTaskTitleHandler}
                        changeTodolistTitle={changeTodolistTitleHandler}
                        sortTasksByName={sortTasksByNameHandler}/>
                )}
            </div>
        </div>
    )
}