import React from 'react'
import {FilterValuesType, TaskType} from './App'
import {Button} from './components/Button'
import {Input} from './components/Input'
import {Checkbox} from './components/Checkbox'

type TodolistPropsType = {
    id: string
    title: string
    tasksToRender: TaskType[]
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const changeFilterHandler = (value: FilterValuesType) => props.changeTodolistFilter(value, props.id)
    const removeTodolistHandler = () => props.removeTodolist(props.id)

    return (
        <div className={'todolistContainer'}>

            {/*Header*/}
            <div className={'todolistHeaderWrapper'}>
                <div className={'todolistHeaderContainer'}>
                    <h2 className={'todolistTitle'}>{props.title}</h2>
                    <Button value={'x'}
                            className={'deleteButton'}
                            onClick={removeTodolistHandler}
                            icon={'TrashIcon'}
                    />
                </div>
                <Input addTask={props.addTask} id={props.id}/>
            </div>

            {/*Container*/}
            <ul className={'tasksContainer'}>
                {props.tasksToRender.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.id)
                    const changeTaskStatusHandler = (isDone: boolean) => props.changeTaskStatus(t.id, isDone, props.id)

                    return (
                        <li key={t.id} className={'singleTaskContainer'}>
                            <Checkbox checked={t.isDone} changeStatus={changeTaskStatusHandler}/>
                            <span className={t.isDone ? 'completed' : ''}>{t.title}</span>
                            <Button value={'x'}
                                    onClick={removeTaskHandler}
                                    className={'deleteButton'}
                                    icon={'TrashIcon'}/>
                        </li>
                    )
                })}
            </ul>

            {/*Footer*/}
            <div className={'filterButtonsContainer'}>
                <Button value={'All'}
                        onClick={() => changeFilterHandler('All')}
                        filter={props.filter}
                />

                <Button value={'Active'}
                        onClick={() => changeFilterHandler('Active')}
                        filter={props.filter}
                />

                <Button value={'Completed'}
                        onClick={() => changeFilterHandler('Completed')}
                        filter={props.filter}
                />
            </div>
        </div>
    )
}
