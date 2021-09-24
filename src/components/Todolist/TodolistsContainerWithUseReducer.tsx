import React, {useReducer} from 'react'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import s from './Todolist.module.css'
import {
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
    sortTasksByName
} from '../../store/actions/tasks-actions/tasks-actions'
import {
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist
} from '../../store/actions/todolists-actions/todolists-actions'
import {tasksReducer} from '../../store/reducers/tasks-reducer/tasks-reducer'
import {todolistsReducer} from '../../store/reducers/todolists-reducer/todolists-reducer'
import {FilterValuesType, TodolistType} from '../../types/todolists-types'
import {TasksResponseType, TaskStatuses} from '../../api/tasks-api'

export const TodolistsContainerWithUseReducer = () => {
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {})

    const removeTaskHandler = (taskID: string, TODOLIST_ID: string) => {
        dispatchTasks(removeTask(taskID, TODOLIST_ID))
    }

    const addTaskHandler = (title: string, TODOLIST_ID: string) => {
        // Error
        //dispatchTasks(createTask(TODOLIST_ID, title))
    }

    const changeTaskStatusHandler = (taskID: string, status: TaskStatuses, TODOLIST_ID: string) => {
        dispatchTasks(changeTaskStatus(TODOLIST_ID, taskID, status))
    }

    const changeTaskTitleHandler = (taskID: string, title: string, TODOLIST_ID: string) => {
        dispatchTasks(changeTaskTitle(taskID, title, TODOLIST_ID))
    }

    const sortTasksByNameHandler = (TODOLIST_ID: string) => {
        dispatchTasks(sortTasksByName(TODOLIST_ID))
    }

    const addTodolistHandler = (title: string) => {
        // const action = addTodolist(title)
        // dispatchTodolists(action)
        // dispatchTasks(action)
    }

    const removeTodolistHandler = (TODOLIST_ID: string) => {
        const action = removeTodolist(TODOLIST_ID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodolistFilterHandler = (filter: FilterValuesType, TODOLIST_ID: string) => {
        dispatchTodolists(changeTodolistFilter(filter, TODOLIST_ID))
    }

    const changeTodolistTitleHandler = (title: string, TODOLIST_ID: string) => {
        dispatchTodolists(changeTodolistTitle(title, TODOLIST_ID))
    }

    const tasksToRender = (todolist: TodolistType): TasksResponseType[] => {
        switch (todolist.filter) {
            case 'Completed':
                return tasks[todolist.id].filter(t => t.status)
            case 'Active':
                return tasks[todolist.id].filter(t => !t.status)
            default:
                return tasks[todolist.id]
        }
    }

    return (
        <div className={'App'}>
            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodolistHandler}/>
            </div>

            <div className={s.todolistsWrapper}>
                {todolists.map(todolist =>
                    <Todolist
                        key={todolist.id}
                        TODOLIST_ID={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        removeTask={removeTaskHandler}
                        addTask={addTaskHandler}
                        changeTaskStatus={changeTaskStatusHandler}
                        changeTodolistFilter={changeTodolistFilterHandler}
                        removeTodolist={removeTodolistHandler}
                        tasks={tasksToRender(todolist)}
                        changeTaskTitle={changeTaskTitleHandler}
                        changeTodolistTitle={changeTodolistTitleHandler}
                        sortTasksByName={sortTasksByNameHandler}
                    />
                )}
            </div>
        </div>
    )
}