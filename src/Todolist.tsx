import React from 'react'
import {FilterValuesType, TaskType} from './App'
import {Button} from './components/Button'
import {Input} from './components/Input'
import {Checkbox} from './components/Checkbox'

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const changeFilterCallbackHandler = (value: FilterValuesType) => props.changeTodolistFilter(value, props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>

            <Input addTask={props.addTask} id={props.id}/>

            <ul>
                {props.tasks.map(t => {
                    const removeTaskCallbackHandler = () => props.removeTask(t.id, props.id)
                    const changeStatusCallbackHandler = (isDone: boolean) => props.changeStatus(t.id, isDone, props.id)

                    return (
                        <li key={t.id}>
                            <Button value={'Delete'} clickAction={removeTaskCallbackHandler}/>
                            <Checkbox checked={t.isDone} changeStatus={changeStatusCallbackHandler}/>
                            <span className={t.isDone ? 'completed' : ''}>{t.title}</span>
                        </li>
                    )
                })}
            </ul>

            <div>
                <Button
                    value={'All'}
                    clickAction={() => changeFilterCallbackHandler('All')}
                    filter={props.filter}/>

                <Button
                    value={'Active'}
                    clickAction={() => changeFilterCallbackHandler('Active')}
                    filter={props.filter}/>

                <Button
                    value={'Completed'}
                    clickAction={() => changeFilterCallbackHandler('Completed')}
                    filter={props.filter}/>
            </div>
        </div>
    )
}
