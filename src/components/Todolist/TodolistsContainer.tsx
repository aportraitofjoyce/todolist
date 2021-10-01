import React, {useCallback, useEffect} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import s from './Todolist.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {
    createTask,
    deleteTask,
    sortTasksByName,
    updateTaskStatus,
    updateTaskTitle
} from '../../store/actions/tasks-actions'
import {
    changeTodolistFilter,
    createTodolist,
    deleteTodolist,
    getTodolists,
    updateTodolistTitle,
} from '../../store/actions/todolists-actions'
import {StateType} from '../../types/common-types'
import {FilterValuesType, TodolistType} from '../../types/todolists-types'
import {TasksType} from '../../types/tasks-types'
import {TaskStatuses} from '../../api/tasks-api'

export const TodolistsContainer = () => {
    const tasks = useSelector<StateType, TasksType>(state => state.tasks)
    const todolists = useSelector<StateType, TodolistType[]>(state => state.todolists)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodolists())
    }, [dispatch])

    const removeTaskHandler = useCallback(async (taskID: string, TODOLIST_ID: string) => {
        dispatch(deleteTask(taskID, TODOLIST_ID))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string, TODOLIST_ID: string) => {
        dispatch(createTask(TODOLIST_ID, title))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((taskID: string, status: TaskStatuses, TODOLIST_ID: string) => {
        dispatch(updateTaskStatus(TODOLIST_ID, taskID, status))
    }, [dispatch])

    const changeTaskTitleHandler = useCallback((taskID: string, title: string, TODOLIST_ID: string) => {
        dispatch(updateTaskTitle(TODOLIST_ID, taskID, title))
    }, [dispatch])

    const sortTasksByNameHandler = useCallback((TODOLIST_ID: string) => {
        dispatch(sortTasksByName(TODOLIST_ID))
    }, [dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    const removeTodolistHandler = useCallback((TODOLIST_ID: string) => {
        dispatch(deleteTodolist(TODOLIST_ID))
    }, [dispatch])

    const changeTodolistFilterHandler = useCallback((filter: FilterValuesType, TODOLIST_ID: string) => {
        dispatch(changeTodolistFilter(filter, TODOLIST_ID))
    }, [dispatch])

    const changeTodolistTitleHandler = useCallback((title: string, TODOLIST_ID: string) => {
        dispatch(updateTodolistTitle(TODOLIST_ID, title))
    }, [dispatch])

    return (
        <div className={'App'}>
            <h1>Todolist</h1>

            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodolistHandler}/>
            </div>

            <div className={s.todolistsWrapper}>
                {todolists.map(tdl => <Todolist key={tdl.id}
                                                todolist={tdl}
                                                tasks={tasks[tdl.id]}
                                                removeTask={removeTaskHandler}
                                                addTask={addTaskHandler}
                                                changeTaskStatus={changeTaskStatusHandler}
                                                changeTodolistFilter={changeTodolistFilterHandler}
                                                removeTodolist={removeTodolistHandler}
                                                changeTaskTitle={changeTaskTitleHandler}
                                                changeTodolistTitle={changeTodolistTitleHandler}
                                                sortTasksByName={sortTasksByNameHandler}/>)}
            </div>
        </div>
    )
}