import React, {useCallback, useEffect} from 'react'
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm/AddItemForm'
import {EditableSpan} from './EditableSpan/EditableSpan'
import {Button} from '../UI/Button/Button'
import {IconButton} from '../UI/Button/IconButton'
import {Delete} from '../Icons/Delete/Delete'
import {Task} from './Task/Task'
import {FilterValuesType, TodolistType} from '../../types/todolists-types'
import {TasksResponseType, TaskStatuses} from '../../api/tasks-api'
import {useDispatch} from 'react-redux'
import {getTasks} from '../../store/actions/tasks-actions'

type TodolistPropsType = {
    todolist: TodolistType
    tasks: TasksResponseType[]
    removeTask: (taskID: string, TODOLIST_ID: string) => void
    addTask: (title: string, TODOLIST_ID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, TODOLIST_ID: string) => void
    changeTodolistFilter: (filter: FilterValuesType, TODOLIST_ID: string) => void
    removeTodolist: (TODOLIST_ID: string) => void
    changeTaskTitle: (taskID: string, title: string, TODOLIST_ID: string) => void
    changeTodolistTitle: (title: string, TODOLIST_ID: string) => void
    sortTasksByName: (TODOLIST_ID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(props => {
    const {
        todolist,
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTodolistFilter,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle,
        sortTasksByName
    } = props

    const dispatch = useDispatch()

    const changeFilterToAllHandler = useCallback(() => changeTodolistFilter('All', todolist.id),
        [changeTodolistFilter, todolist.id])

    const changeFilterToActiveHandler = useCallback(() => changeTodolistFilter('Active', todolist.id),
        [changeTodolistFilter, todolist.id])

    const changeFilterToCompletedHandler = useCallback(() => changeTodolistFilter('Completed', todolist.id),
        [changeTodolistFilter, todolist.id])

    const removeTodolistButtonHandler = useCallback(() => removeTodolist(todolist.id),
        [removeTodolist, todolist.id])

    const addNewTaskHandler = useCallback((title: string) => addTask(title, todolist.id),
        [addTask, todolist.id])

    const taskEditHandler = useCallback((title: string) => changeTodolistTitle(title, todolist.id),
        [changeTodolistTitle, todolist.id])

    const sortButtonHandler = useCallback(() => sortTasksByName(todolist.id),
        [sortTasksByName, todolist.id])

    const tasksToRender = useCallback((filter: FilterValuesType) => {
        switch (filter) {
            case 'Completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            case 'Active':
                return tasks.filter(t => t.status !== TaskStatuses.Completed)
            default:
                return tasks
        }
    }, [tasks])

    useEffect(() => {
        dispatch(getTasks(todolist.id))
    }, [dispatch, todolist.id])

    return (
        <div className={s.todolistContainer}>
            <div className={s.titleContainer}>
                <EditableSpan title={todolist.title} changeTitle={taskEditHandler}/>
                <IconButton onClick={removeTodolistButtonHandler}><Delete/></IconButton>
            </div>

            <div className={s.addTaskContainer}>
                <AddItemForm addItem={addNewTaskHandler}/>
            </div>

            <div>
                {tasksToRender(todolist.filter).map(t => <Task key={t.id}
                                                               TODOLIST_ID={todolist.id}
                                                               id={t.id}
                                                               checked={t.status === TaskStatuses.Completed}
                                                               title={t.title}
                                                               removeTask={removeTask}
                                                               changeTaskTitle={changeTaskTitle}
                                                               changeTaskStatus={changeTaskStatus}/>
                )}
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={changeFilterToAllHandler} active={todolist.filter === 'All'} grouped>
                    All
                </Button>

                <Button onClick={changeFilterToActiveHandler} active={todolist.filter === 'Active'} grouped>
                    Active
                </Button>

                <Button onClick={changeFilterToCompletedHandler} active={todolist.filter === 'Completed'} grouped>
                    Completed
                </Button>
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={sortButtonHandler} grouped>Sort by name</Button>
            </div>
        </div>
    )
})