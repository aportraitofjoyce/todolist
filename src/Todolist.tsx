import React from 'react'
import {FilterValuesType, TaskType} from './App'
import {Button} from './components/Button'
import {AddItemForm} from './components/AddItemForm'
import {Checkbox} from './components/Checkbox'
import {EditableSpan} from "./components/EditableSpan";

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
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const changeTodolistFilterHandler = (filter: FilterValuesType) => props.changeTodolistFilter(filter, props.TODOLIST_ID)
    const removeTodolistHandler = () => props.removeTodolist(props.TODOLIST_ID)
    const addTask = (title: string) => props.addTask(title, props.TODOLIST_ID)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.TODOLIST_ID)

    return (
        <div className={'todolistContainer'}>

            <div className={'todolistHeaderWrapper'}>
                <div className={'todolistHeaderContainer'}>
                    <h2>
                        <EditableSpan title={props.title}
                                      changeTitle={changeTodolistTitle}/>
                    </h2>
                    <Button value={'x'}
                            className={'deleteButton'}
                            onClick={removeTodolistHandler}
                            icon={'TrashIcon'}/>
                </div>
                <AddItemForm addItem={addTask}/>
            </div>

            <ul className={'tasksContainer'}>
                {props.tasksToRender.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.TODOLIST_ID)
                    const changeTaskStatusHandler = (isDone: boolean) => props.changeTaskStatus(t.id, isDone, props.TODOLIST_ID)
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.TODOLIST_ID)

                    return (
                        <li key={t.id} className={'singleTaskContainer'}>
                            <Checkbox checked={t.isDone}
                                      changeStatus={changeTaskStatusHandler}/>

                            <EditableSpan title={t.title}
                                          className={t.isDone ? 'completed' : ''}
                                          changeTitle={changeTaskTitle}
                            />

                            <Button value={'x'}
                                    onClick={removeTaskHandler}
                                    className={'deleteButton'}
                                    icon={'TrashIcon'}/>
                        </li>
                    )
                })}
            </ul>

            <div className={'filterButtonsContainer'}>
                <Button value={'All'}
                        onClick={() => changeTodolistFilterHandler('All')}
                        filter={props.filter}/>

                <Button value={'Active'}
                        onClick={() => changeTodolistFilterHandler('Active')}
                        filter={props.filter}/>

                <Button value={'Completed'}
                        onClick={() => changeTodolistFilterHandler('Completed')}
                        filter={props.filter}/>
            </div>
        </div>
    )
}