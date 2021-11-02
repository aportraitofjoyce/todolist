import React, {useCallback, useEffect} from 'react'
import s from '../Todolists.module.css'
import {Task} from './Task/Task'
import {useDispatch} from 'react-redux'
import {TaskResponse} from '../../../api/tasks-api'
import {TaskStatuses} from '../../../types/server-response-types'
import {EditableSpan} from '../../../components/UI/EditableSpan/EditableSpan'
import {IconButton} from '../../../components/UI/Button/IconButton'
import {Delete} from '../../../components/Icons/Delete'
import {AddItemForm} from '../../../components/UI/AddItemForm/AddItemForm'
import {Button} from '../../../components/UI/Button/Button'
import {fetchTasks} from '../../../store/reducers/tasks-reducer/tasks-reducer'
import {FilterValuesType, TodolistType} from '../../../store/reducers/todolists-reducer/todolists-reducer'


type TodolistPropsType = {
    todolist: TodolistType
    tasks: TaskResponse[]
    removeTask: (taskID: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
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
        dispatch(fetchTasks({todolistID: todolist.id}))
    }, [])

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
                                                               task={t}
                                                               todolistID={todolist.id}
                                                               removeTask={removeTask}
                                                               changeTaskTitle={changeTaskTitle}
                                                               changeTaskStatus={changeTaskStatus}/>)}
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
        </div>
    )
})