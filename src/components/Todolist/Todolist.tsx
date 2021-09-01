import React, {useCallback} from 'react'
import s from './Todolist.module.css'
import {FilterValuesType, TaskType} from './TodolistsContainer'
import {AddItemForm} from './AddItemForm/AddItemForm'
import {EditableSpan} from './EditableSpan/EditableSpan'
import {Button} from '../UI/Button/Button'
import {IconButton} from '../UI/Button/IconButton'
import {Delete} from '../Icons/Delete/Delete'
import {Task} from './Task/Task'

type TodolistPropsType = {
    TODOLIST_ID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskID: string, TODOLIST_ID: string) => void
    addTask: (title: string, TODOLIST_ID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, TODOLIST_ID: string) => void
    changeTodolistFilter: (filter: FilterValuesType, TODOLIST_ID: string) => void
    removeTodolist: (TODOLIST_ID: string) => void
    changeTaskTitle: (taskID: string, title: string, TODOLIST_ID: string) => void
    changeTodolistTitle: (title: string, TODOLIST_ID: string) => void
    sortTasksByName: (TODOLIST_ID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((props) => {
    const changeTodolistFilter = useCallback((filter: FilterValuesType) => props.changeTodolistFilter(filter, props.TODOLIST_ID),
        [props.changeTodolistFilter, props.TODOLIST_ID])

    const changeTodolistFilterToAll = useCallback(() => props.changeTodolistFilter('All', props.TODOLIST_ID),
        [props.changeTodolistFilter, props.TODOLIST_ID])

    const changeTodolistFilterToActive = useCallback(() => props.changeTodolistFilter('Active', props.TODOLIST_ID),
        [props.changeTodolistFilter, props.TODOLIST_ID])

    const changeTodolistFilterToCompleted = useCallback(() => props.changeTodolistFilter('Completed', props.TODOLIST_ID),
        [props.changeTodolistFilter, props.TODOLIST_ID])

    const removeTodolist = useCallback(() => props.removeTodolist(props.TODOLIST_ID),
        [props.removeTodolist, props.TODOLIST_ID])

    const addTask = useCallback((title: string) => props.addTask(title, props.TODOLIST_ID),
        [props.addTask, props.TODOLIST_ID])

    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.TODOLIST_ID),
        [props.changeTodolistTitle, props.TODOLIST_ID])

    const sortTasksByName = useCallback(() => props.sortTasksByName(props.TODOLIST_ID),
        [props.sortTasksByName, props.TODOLIST_ID])

    const tasksToRender = useCallback((filter: FilterValuesType) => {
        switch (filter) {
            case 'Completed':
                return props.tasks.filter(t => t.isDone)
            case 'Active':
                return props.tasks.filter(t => !t.isDone)
            default:
                return props.tasks
        }
    }, [props.tasks])

    return (
        <div className={s.todolistContainer}>

            <div className={s.titleContainer}>
                <EditableSpan title={props.title}
                              changeTitle={changeTodolistTitle}/>

                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </div>

            <div className={s.addTaskContainer}>
                <AddItemForm addItem={addTask}/>
            </div>

            <div>
                {tasksToRender(props.filter).map(t => {
                    return (
                        <Task key={t.id}
                              TODOLIST_ID={props.TODOLIST_ID}
                              id={t.id}
                              checked={t.isDone}
                              title={t.title}
                              removeTask={props.removeTask}
                              changeTaskTitle={props.changeTaskTitle}
                              changeTaskStatus={props.changeTaskStatus}/>
                    )
                })}
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={changeTodolistFilterToAll}
                        active={props.filter === 'All'}
                        grouped>
                    All
                </Button>

                <Button onClick={changeTodolistFilterToActive}
                        active={props.filter === 'Active'}
                        grouped>
                    Active
                </Button>

                <Button onClick={changeTodolistFilterToCompleted}
                        active={props.filter === 'Completed'}
                        grouped>
                    Completed
                </Button>

            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={sortTasksByName}
                        grouped>
                    Sort by name
                </Button>
            </div>

        </div>
    )
})