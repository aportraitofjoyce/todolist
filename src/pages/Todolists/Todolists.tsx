import React, {FC, memo, useCallback, useEffect} from 'react'
import s from './Todolists.module.css'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {AddItemForm} from '../../components/UI/AddItemForm/AddItemForm'
import {Todolist} from './Todolist'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {createTodolist, fetchTodolists,} from '../../store/reducers/todolists-reducer/todolists-reducer'

export const Todolists: FC = memo(() => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector(state => state.todolists)

    const addTodolistHandler = useCallback((title: string) =>
        dispatch(createTodolist({title})), [dispatch])

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodolists())
    }, [dispatch, isLoggedIn])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Todolist</h1>

            <div className={s.addTodolistContainer}>
                <AddItemForm addItem={addTodolistHandler}/>
            </div>

            <div className={s.todolistsWrapper}>
                {todolists.map(tdl => <Todolist key={tdl.id} todolist={tdl} tasks={tasks[tdl.id]}/>)}
            </div>
        </div>
    )
})