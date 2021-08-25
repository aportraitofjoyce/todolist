import React from 'react'
import s from './Todolist.module.css'
import {FilterValuesType, TaskType, TodolistType} from './TodolistContainer'
import {AddItemForm} from './AddItemForm/AddItemForm'
import {EditableSpan} from './EditableSpan/EditableSpan'
import {Button} from '../UI/Button/Button'
import {Checkbox} from '../UI/Checkbox/Checkbox'
import {IconButton} from '../UI/Button/IconButton'
import {Delete} from '../Icons/Delete/Delete'
import {useSelector} from 'react-redux'
import {StateType} from '../../store/store'

type TodolistPropsType = {
    TODOLIST_ID: string
    title: string
    tasksToRender: TaskType[]
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

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const changeTodolistFilter = (filter: FilterValuesType) => props.changeTodolistFilter(filter, props.TODOLIST_ID)
    const removeTodolist = () => props.removeTodolist(props.TODOLIST_ID)
    const addTask = (title: string) => props.addTask(title, props.TODOLIST_ID)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.TODOLIST_ID)
    const sortTasksByName = () => props.sortTasksByName(props.TODOLIST_ID)

    return (
        <div className={s.todolistContainer}>
            <div className={s.titleContainer}>
                <EditableSpan title={props.title}
                              changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </div>

            <div className={s.addTaskContainer}>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {props.tasksToRender.map(t => {
                    const removeTask = () => props.removeTask(t.id, props.TODOLIST_ID)
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.TODOLIST_ID)
                    const changeTaskStatus = (isDone: boolean) => {
                        props.changeTaskStatus(t.id, isDone, props.TODOLIST_ID)
                    }

                    return (
                        <div key={t.id}>
                            <div className={s.taskContentContainer}>
                                <div className={s.taskContent}>
                                    <Checkbox checked={t.isDone}
                                              changeStatus={changeTaskStatus}/>

                                    <EditableSpan title={t.title}
                                                  changeTitle={changeTaskTitle}/>
                                </div>
                                <IconButton onClick={removeTask}><Delete/></IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={() => changeTodolistFilter('All')}
                        active={props.filter === 'All'}
                        grouped>
                    All
                </Button>
                <Button onClick={() => changeTodolistFilter('Active')}
                        active={props.filter === 'Active'}
                        grouped>
                    Active
                </Button>
                <Button onClick={() => changeTodolistFilter('Completed')}
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
}