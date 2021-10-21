import React, {FC, useCallback, useEffect} from 'react'
import s from './Todolists.module.css'
import {useDispatch} from 'react-redux'
import {TaskStatuses} from '../../types/server-response-types'
import {useAppSelector} from '../../hooks/hooks'
import {AddItemForm} from '../../components/UI/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {
    changeTodolistFilter,
    createTodolist,
    deleteTodolist,
    FilterValuesType,
    getTodolists,
    updateTodolistTitle
} from '../../store/reducers/todolists-reducer/todolists-reducer'
import {
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTaskTitle,
} from '../../store/reducers/tasks-reducer/tasks-reducer'

export const Todolists: FC = () => {
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getTodolists())
    }, [dispatch])

    const removeTaskHandler = useCallback((taskID: string, todolistID: string) => {
        dispatch(deleteTask({taskID, todolistID}))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string, todolistID: string) => {
        dispatch(createTask({todolistID, title}))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        dispatch(updateTaskStatus({todolistID, taskID, status}))
    }, [dispatch])

    const changeTaskTitleHandler = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(updateTaskTitle({todolistID, taskID, title}))
    }, [dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    const removeTodolistHandler = useCallback((todolistID: string) => {
        dispatch(deleteTodolist(todolistID))
    }, [dispatch])

    const changeTodolistFilterHandler = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilter({filter, todolistID}))
    }, [dispatch])

    const changeTodolistTitleHandler = useCallback((title: string, todolistID: string) => {
        dispatch(updateTodolistTitle(todolistID, title))
    }, [dispatch])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
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
                                                changeTodolistTitle={changeTodolistTitleHandler}/>)}
            </div>
        </div>
    )
}