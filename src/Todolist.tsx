import React from 'react';
import {FilterValuesType, TaskType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {Checkbox} from "./components/Checkbox";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filterStatus: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    const changeFilterCallbackHandler = (value: FilterValuesType) => props.changeFilter(value)

    return <div>
        <h3>{props.title}</h3>
        <Input addTask={props.addTask}/>

        <ul>
            {props.tasks.map(t => {

                const removeTaskCallbackHandler = () => props.removeTask(t.id)
                const changeStatusCallbackHandler = (isDone: boolean) => props.changeStatus(t.id, isDone)

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
            <Button value={'All'}
                    clickAction={() => changeFilterCallbackHandler('All')}
                    filterStatus={props.filterStatus}/>

            <Button value={'Active'}
                    clickAction={() => changeFilterCallbackHandler('Active')}
                    filterStatus={props.filterStatus}/>

            <Button value={'Completed'}
                    clickAction={() => changeFilterCallbackHandler('Completed')}
                    filterStatus={props.filterStatus}/>
        </div>
    </div>
}