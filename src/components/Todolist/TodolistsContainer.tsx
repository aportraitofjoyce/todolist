import React, {useCallback, useEffect} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import s from './Todolist.module.css'
import {useDispatch, useSelector} from 'react-redux'
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
import {todolistsAPI} from '../../api/todolists-api'
import {StateType} from '../../types/common-types'
import {tasksAPI} from '../../api/tasks-api'

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

    useEffect(() => {
        //todolistsAPI.requestTodolists().then(result => console.log(result.data))
        //todolistsAPI.createTodolist('New').then(result => console.log(result.data.data.item))
        //todolistsAPI.deleteTodolist('3b36fdf1-ea63-48a6-98f8-61b96ab582c0').then(result => console.log(result.data))
        //todolistsAPI.updateTodolist('b0a27143-b69f-4a7c-8ee8-0f7aec3132b7', 'test').then(result => console.log(result))

        tasksAPI.requestTasks('b666734c-0203-4046-90c6-096d740661e9').then(response => console.log(response.data))
        //tasksAPI.deleteTask('b666734c-0203-4046-90c6-096d740661e9', '3546a83a-2973-4234-85af-0440d112922b').then(response => console.log(response))
        //tasksAPI.createTask('b666734c-0203-4046-90c6-096d740661e9', 'test').then(response => console.log(response.data))
        //tasksAPI.updateTask('b666734c-0203-4046-90c6-096d740661e9', '2642eba0-dda4-4cf4-902d-b7c83918e575', 'new task name').then(response => console.log(response))
    }, [])

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