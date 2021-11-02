import React, {FC, memo, useCallback, useEffect} from 'react'
import s from '../Todolists.module.css'
import {Task} from './Task/Task'
import {TaskResponse} from '../../../api/tasks-api'
import {TaskStatuses} from '../../../types/server-response-types'
import {EditableSpan} from '../../../components/UI/EditableSpan/EditableSpan'
import {IconButton} from '../../../components/UI/Button/IconButton'
import {Delete} from '../../../components/Icons/Delete'
import {AddItemForm} from '../../../components/UI/AddItemForm/AddItemForm'
import {Button} from '../../../components/UI/Button/Button'
import {createTask, fetchTasks} from '../../../store/reducers/tasks-reducer/tasks-reducer'
import {
    changeTodolistFilter,
    deleteTodolist,
    FilterValuesType,
    TodolistType,
    updateTodolistTitle
} from '../../../store/reducers/todolists-reducer/todolists-reducer'
import {useAppDispatch} from '../../../hooks/hooks'

type TodolistProps = {
    todolist: TodolistType
    tasks: TaskResponse[]
}

export const Todolist: FC<TodolistProps> = memo(({todolist, tasks}) => {
    const dispatch = useAppDispatch()

    const addTaskHandler = useCallback((title: string) =>
        dispatch(createTask({title, todolistID: todolist.id})), [dispatch, todolist.id])

    const changeTodolistTitleHandler = useCallback((title: string) =>
        dispatch(updateTodolistTitle({title, todolistID: todolist.id})), [dispatch, todolist.id])

    const removeTodolistHandler = useCallback(() =>
        dispatch(deleteTodolist({todolistID: todolist.id})), [dispatch, todolist.id])

    const changeFilterHandler = useCallback((filter: FilterValuesType) =>
        dispatch(changeTodolistFilter({filter, todolistID: todolist.id})), [dispatch, todolist.id])

    const tasksToRender = useCallback((filter: FilterValuesType) => {
        switch (filter) {
            case 'Completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            case 'Active':
                return tasks.filter(t => t.status !== TaskStatuses.Completed)
            default:
                return tasks
        }
    }, [tasks])

    useEffect(() => {
        dispatch(fetchTasks({todolistID: todolist.id}))
    }, [dispatch, todolist.id])

    return (
        <div className={s.todolistContainer}>
            <div className={s.titleContainer}>
                <EditableSpan title={todolist.title} changeTitle={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </div>

            <div className={s.addTaskContainer}>
                <AddItemForm addItem={addTaskHandler}/>
            </div>

            <div>
                {tasksToRender(todolist.filter).map(t => <Task key={t.id} task={t} todolistID={todolist.id}/>)}
            </div>

            <div className={s.buttonsContainer}>
                <Button onClick={() => changeFilterHandler('All')} active={todolist.filter === 'All'} grouped>
                    All
                </Button>

                <Button onClick={() => changeFilterHandler('Active')} active={todolist.filter === 'Active'} grouped>
                    Active
                </Button>

                <Button onClick={() => changeFilterHandler('Completed')} active={todolist.filter === 'Completed'}
                        grouped>
                    Completed
                </Button>
            </div>
        </div>
    )
})