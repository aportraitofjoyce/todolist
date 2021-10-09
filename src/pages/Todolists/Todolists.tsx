import React, {FC, useCallback, useEffect} from 'react'
import s from './Todolists.module.css'
import {useDispatch} from 'react-redux'
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
import {FilterValuesType} from '../../types/todolists-types'
import {TaskStatuses} from '../../types/server-response-types'
import {useAppSelector} from '../../hooks/hooks'
import {AddItemForm} from '../../components/UI/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'

export const Todolists: FC = () => {
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector(state => state.todolists)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodolists())
    }, [dispatch])

    const removeTaskHandler = useCallback(async (taskID: string, todolistID: string) => {
        dispatch(deleteTask(taskID, todolistID))
    }, [dispatch])

    const addTaskHandler = useCallback((title: string, todolistID: string) => {
        dispatch(createTask(todolistID, title))
    }, [dispatch])

    const changeTaskStatusHandler = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        dispatch(updateTaskStatus(todolistID, taskID, status))
    }, [dispatch])

    const changeTaskTitleHandler = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(updateTaskTitle(todolistID, taskID, title))
    }, [dispatch])

    const sortTasksByNameHandler = useCallback((todolistID: string) => {
        dispatch(sortTasksByName(todolistID))
    }, [dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    const removeTodolistHandler = useCallback((todolistID: string) => {
        dispatch(deleteTodolist(todolistID))
    }, [dispatch])

    const changeTodolistFilterHandler = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilter(filter, todolistID))
    }, [dispatch])

    const changeTodolistTitleHandler = useCallback((title: string, todolistID: string) => {
        dispatch(updateTodolistTitle(todolistID, title))
    }, [dispatch])

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
                                                changeTodolistTitle={changeTodolistTitleHandler}
                                                sortTasksByName={sortTasksByNameHandler}/>)}
            </div>
        </div>
    )
}