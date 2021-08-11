import React, {useEffect, useState} from 'react'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, CssBaseline, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

const TODOLIST_ID_1 = v1()
const TODOLIST_ID_2 = v1()

export const App = () => {
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: TODOLIST_ID_1, title: 'What to learn', filter: 'All'},
        {id: TODOLIST_ID_2, title: 'What to buy', filter: 'All'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [TODOLIST_ID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],

        [TODOLIST_ID_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cola', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Smoke', isDone: true},
        ],
    })

    useEffect(() => {
        const todolistsString = localStorage.getItem('todolists')
        if (todolistsString) {
            const todolistsInit = JSON.parse(todolistsString)
            setTodolists(todolistsInit)
        }

        const tasksString = localStorage.getItem('tasks')
        if (tasksString) {
            const tasksInit = JSON.parse(tasksString)
            setTasks(tasksInit)
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists))
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [todolists, tasks])

    const removeTask = (taskID: string, TODOLIST_ID: string) => {
        tasks[TODOLIST_ID] = tasks[TODOLIST_ID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, TODOLIST_ID: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[TODOLIST_ID] = [newTask, ...tasks[TODOLIST_ID]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, TODOLIST_ID: string) => {
        tasks[TODOLIST_ID] = tasks[TODOLIST_ID].map(t => (t.id === taskID ? {...t, isDone} : t))
        setTasks({...tasks})
    }
    const changeTaskTitle = (taskID: string, title: string, TODOLIST_ID: string) => {
        tasks[TODOLIST_ID] = tasks[TODOLIST_ID].map(t => (t.id === taskID ? {...t, title} : t))
        setTasks({...tasks})
    }
    const sortTasksByName = (TODOLIST_ID: string) => {
        const newTasks =
            tasks[TODOLIST_ID]
                .sort((a: TaskType, b: TaskType) => a['title']
                    .localeCompare(b['title']))
        setTasks({...tasks, newTasks})
    }
    const sortTasksByComplete = (TODOLIST_ID: string) => {
        const newTasks =
            tasks[TODOLIST_ID]
                .sort((a: TaskType, b: TaskType) => String(a['isDone'])
                    .localeCompare(String(b['isDone'])))
        setTasks({...tasks, newTasks})
    }

    const addTodolist = (title: string) => {
        const NEW_TODOLIST_ID = v1()
        const newTodolist: TodolistType = {
            id: NEW_TODOLIST_ID,
            title: title,
            filter: "All"
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [NEW_TODOLIST_ID]: []})
    }
    const removeTodolist = (TODOLIST_ID: string) => {
        setTodolists(todolists.filter(tdl => tdl.id !== TODOLIST_ID))
        delete tasks[TODOLIST_ID]
    }
    const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => {
        setTodolists(todolists.map(tdl => (tdl.id === TODOLIST_ID ? {...tdl, filter} : tdl)))
    }
    const changeTodolistTitle = (title: string, TODOLIST_ID: string) => {
        setTodolists(todolists.map(tdl => (tdl.id === TODOLIST_ID ? {...tdl, title} : tdl)))
    }

    const tasksToRender = (todolist: TodolistType): TaskType[] => {
        switch (todolist.filter) {
            case 'Completed':
                return tasks[todolist.id].filter(t => t.isDone)
            case 'Active':
                return tasks[todolist.id].filter(t => !t.isDone)
            default:
                return tasks[todolist.id]
        }
    }

    return (
        <>
            <CssBaseline/>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth={"md"}>
                <AddItemForm addItem={addTodolist}/>

                <Grid container spacing={5}>
                    {todolists.map(todolist =>
                        <Todolist
                            sortTasksByName={sortTasksByName}
                            sortTasksByComplete={sortTasksByComplete}
                            key={todolist.id}
                            TODOLIST_ID={todolist.id}
                            title={todolist.title}
                            filter={todolist.filter}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTodolistFilter={changeTodolistFilter}
                            removeTodolist={removeTodolist}
                            tasksToRender={tasksToRender(todolist)}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}/>
                    )}
                </Grid>
            </Container>
        </>
    )
}