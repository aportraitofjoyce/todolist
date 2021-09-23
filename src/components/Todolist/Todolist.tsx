import React, {useCallback} from 'react'
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm/AddItemForm'
import {EditableSpan} from './EditableSpan/EditableSpan'
import {Button} from '../UI/Button/Button'
import {IconButton} from '../UI/Button/IconButton'
import {Delete} from '../Icons/Delete/Delete'
import {Task} from './Task/Task'
import {FilterValuesType} from '../../types/todolists-types'
import {TasksResponseType, TaskStatuses} from '../../api/tasks-api'

type TodolistPropsType = {
    TODOLIST_ID: string
    title: string
    tasks: TasksResponseType[]
    filter: FilterValuesType
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
        TODOLIST_ID,
        title,
        tasks,
        filter,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTodolistFilter,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle,
        sortTasksByName
    } = props

    const changeFilterToAllHandler = useCallback(() => changeTodolistFilter('All', TODOLIST_ID),
        [changeTodolistFilter, TODOLIST_ID])

    const changeFilterToActiveHandler = useCallback(() => changeTodolistFilter('Active', TODOLIST_ID),
        [changeTodolistFilter, TODOLIST_ID])

    const changeFilterToCompletedHandler = useCallback(() => changeTodolistFilter('Completed', TODOLIST_ID),
        [changeTodolistFilter, TODOLIST_ID])

    const removeTodolistButtonHandler = useCallback(() => removeTodolist(TODOLIST_ID),
        [removeTodolist, TODOLIST_ID])

    const addNewTaskHandler = useCallback((title: string) => addTask(title, TODOLIST_ID),
        [addTask, TODOLIST_ID])

    const taskEditHandler = useCallback((title: string) => changeTodolistTitle(title, TODOLIST_ID),
        [changeTodolistTitle, TODOLIST_ID])

    const sortButtonHandler = useCallback(() => sortTasksByName(TODOLIST_ID),
        [sortTasksByName, TODOLIST_ID])

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

    return (
        <div className={s.todolistContainer}>
            <div className={s.titleContainer}>
                <EditableSpan title={title} changeTitle={taskEditHandler}/>
                <IconButton onClick={removeTodolistButtonHandler}><Delete/></IconButton>
            </div>

            <div className={s.addTaskContainer}>
                <AddItemForm addItem={addNewTaskHandler}/>
            </div>

            <div>
                {tasksToRender(filter).map(t => <Task key={t.id}
                                                      TODOLIST_ID={TODOLIST_ID}
                                                      id={t.id}
                                                      checked={t.status === TaskStatuses.Completed}
                                                      title={t.title}
                                                      removeTask={removeTask}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTaskStatus={changeTaskStatus}/>
                )}
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={changeFilterToAllHandler} active={filter === 'All'} grouped>
                    All
                </Button>

                <Button onClick={changeFilterToActiveHandler} active={filter === 'Active'} grouped>
                    Active
                </Button>

                <Button onClick={changeFilterToCompletedHandler} active={filter === 'Completed'} grouped>
                    Completed
                </Button>
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={sortButtonHandler} grouped>Sort by name</Button>
            </div>
        </div>
    )
})