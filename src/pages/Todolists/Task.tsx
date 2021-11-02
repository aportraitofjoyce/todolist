import React, {FC, memo, useCallback} from 'react'
import s from './Todolists.module.css'
import {useAppDispatch} from '../../hooks/hooks'
import {TaskResponse} from '../../api/tasks-api'
import {deleteTask, updateTaskStatus, updateTaskTitle} from '../../store/reducers/tasks-reducer/tasks-reducer'
import {TaskStatuses} from '../../types/server-response-types'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {EditableSpan} from '../../components/UI/EditableSpan/EditableSpan'
import {IconButton} from '../../components/UI/Button/IconButton'
import {Delete} from '../../components/Icons/Delete'

type TaskProps = {
    todolistID: string
    task: TaskResponse
}

export const Task: FC<TaskProps> = memo(({todolistID, task}) => {
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = useCallback((status: boolean) =>
        dispatch(updateTaskStatus({
            todolistID,
            taskID: task.id,
            status: status ? TaskStatuses.Completed : TaskStatuses.inProgress
        })), [dispatch, todolistID, task.id])

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTitle({todolistID, taskID: task.id, title}))
    }, [dispatch, todolistID, task.id])

    const removeTaskHandler = useCallback(() => {
        dispatch(deleteTask({taskID: task.id, todolistID}))
    }, [dispatch, todolistID, task.id])

    return (
        <div className={s.taskContentContainer}>
            <div className={s.taskContent}>
                <Checkbox checked={task.status === TaskStatuses.Completed} onChangeCallback={changeTaskStatusHandler}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
            </div>

            <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
        </div>
    )
})