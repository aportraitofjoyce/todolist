import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from './components/AddItemForm'
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, Grid, IconButton, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
        <Grid item spacing={8}>
            <Paper style={{padding: '16px'}}>
                <h2>
                    <EditableSpan title={props.title}
                                  changeTitle={changeTodolistTitle}/>
                    <IconButton aria-label="delete"
                                onClick={removeTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h2>
                <AddItemForm addItem={addTask}/>
            </Paper>

            <Paper style={{padding: '16px', margin: '16px 0'}}>
                {props.tasksToRender.map(t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.TODOLIST_ID)
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.TODOLIST_ID)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.TODOLIST_ID)
                    }

                    return (
                        <div key={t.id}>
                            <Checkbox checked={t.isDone}
                                      onChange={changeTaskStatusHandler}/>

                            <EditableSpan title={t.title}
                                          changeTitle={changeTaskTitle}/>

                            <IconButton aria-label="delete"
                                        onClick={removeTaskHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </Paper>

            <div style={{padding: '16px'}}>
                <Button variant={"contained"}
                        onClick={() => changeTodolistFilterHandler('All')}
                        color={props.filter === 'All' ? "secondary" : "primary"}>All
                </Button>
                <Button variant={"contained"}
                        onClick={() => changeTodolistFilterHandler('Active')}
                        style={{margin: '0 8px'}}
                        color={props.filter === 'Active' ? "secondary" : "primary"}>Active
                </Button>
                <Button variant={"contained"}
                        onClick={() => changeTodolistFilterHandler('Completed')}
                        color={props.filter === 'Completed' ? "secondary" : "primary"}>Completed
                </Button>
            </div>

        </Grid>
    )
}