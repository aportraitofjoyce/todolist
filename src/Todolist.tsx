import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import {AddItemForm} from './components/AddItemForm'
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton, Paper, Typography} from "@material-ui/core";
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
    sortTasksByName: (TODOLIST_ID: string) => void
    sortTasksByComplete: (TODOLIST_ID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const changeTodolistFilter = (filter: FilterValuesType) => props.changeTodolistFilter(filter, props.TODOLIST_ID)
    const removeTodolist = () => props.removeTodolist(props.TODOLIST_ID)
    const addTask = (title: string) => props.addTask(title, props.TODOLIST_ID)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.TODOLIST_ID)
    const sortTasksByName = () => props.sortTasksByName(props.TODOLIST_ID)
    const sortTasksByComplete = () => props.sortTasksByComplete(props.TODOLIST_ID)

    return (
        <Grid item xs>
            <Paper sx={{padding: '24px'}}>
                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                        <EditableSpan title={props.title}
                                      changeTitle={changeTodolistTitle}/>
                    </Typography>

                    <IconButton aria-label="delete"
                                onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </Grid>

                <AddItemForm addItem={addTask}/>

                {props.tasksToRender.map(t => {
                    const removeTask = () => props.removeTask(t.id, props.TODOLIST_ID)
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.TODOLIST_ID)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.TODOLIST_ID)
                    }

                    return (
                        <Grid container justifyContent={'space-between'} alignItems={'center'} key={t.id}>
                            <div>
                                <Checkbox checked={t.isDone}
                                          onChange={changeTaskStatus}/>

                                <EditableSpan title={t.title}
                                              changeTitle={changeTaskTitle}/>
                            </div>

                            <IconButton aria-label="delete"
                                        onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                        </Grid>
                    )
                })}
            </Paper>

            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{mt: '24px'}} fullWidth>
                <Button onClick={() => changeTodolistFilter('All')}
                        color={props.filter === 'All' ? "secondary" : "primary"}>All
                </Button>
                <Button onClick={() => changeTodolistFilter('Active')}
                        color={props.filter === 'Active' ? "secondary" : "primary"}>Active
                </Button>
                <Button onClick={() => changeTodolistFilter('Completed')}
                        color={props.filter === 'Completed' ? "secondary" : "primary"}>Completed
                </Button>
            </ButtonGroup>
            
            <h4 style={{marginBottom: '8px'}}>Sort:</h4>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                <Button onClick={sortTasksByName}>By name</Button>
                <Button onClick={sortTasksByComplete}>By complete</Button>
            </ButtonGroup>
        </Grid>
    )
}