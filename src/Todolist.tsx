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

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const changeFilterCallbackHandler = (value: FilterValuesType) => props.changeTodolistFilter(value, props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div className={'todolistContainer'}>


            <div className={'todolistHeaderWrapper'}>
                <div className={'todolistHeaderContainer'}>
                    <h2 className={'todolistTitle'}>{props.title}</h2>
                    <Button value={'x'}
                            className={'deleteButton'}
                            onClick={removeTodolist}
                            icon={'TrashIcon'}
                    />
                </div>

                <Input addTask={props.addTask} id={props.id}/>
            </div>


            <ul className={'tasksContainer'}>
                {props.tasks.map(t => {
                    const removeTaskCallbackHandler = () => props.removeTask(t.id, props.id)
                    const changeStatusCallbackHandler = (isDone: boolean) => props.changeStatus(t.id, isDone, props.id)

                    return (
                        <li key={t.id} className={'singleTaskContainer'}>
                            <Checkbox checked={t.isDone} changeStatus={changeStatusCallbackHandler}/>
                            <span className={t.isDone ? 'completed' : ''}>{t.title}</span>
                            <Button
                                value={'x'}
                                onClick={removeTaskCallbackHandler}
                                className={'deleteButton'}
                                icon={'TrashIcon'}
                            />
                        </li>
                    )
                })}
            </ul>


            {/*ok*/}
            <div className={'filterButtonsContainer'}>
                <Button
                    value={'All'}
                    onClick={() => changeFilterCallbackHandler('All')}
                    filter={props.filter}
                />

                <Button
                    value={'Active'}
                    onClick={() => changeFilterCallbackHandler('Active')}
                    filter={props.filter}
                />

                <Button
                    value={'Completed'}
                    onClick={() => changeFilterCallbackHandler('Completed')}
                    filter={props.filter}
                />
            </div>
        </div>
    )
}
