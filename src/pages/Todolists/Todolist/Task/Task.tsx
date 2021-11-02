import React, {FC, memo, useCallback} from 'react'
import s from '../../Todolists.module.css'
import {TaskResponse} from '../../../../api/tasks-api'
import {TaskStatuses} from '../../../../types/server-response-types'
import {Checkbox} from '../../../../components/UI/Checkbox/Checkbox'
import {EditableSpan} from '../../../../components/UI/EditableSpan/EditableSpan'
import {IconButton} from '../../../../components/UI/Button/IconButton'
import {Delete} from '../../../../components/Icons/Delete'
import {deleteTask, updateTaskStatus, updateTaskTitle} from '../../../../store/reducers/tasks-reducer/tasks-reducer'
import {useAppDispatch} from '../../../../hooks/hooks'

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
        })), [dispatch])

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTitle({todolistID, taskID: task.id, title}))
    }, [dispatch])

    const removeTaskHandler = useCallback(() => {
        dispatch(deleteTask({taskID: task.id, todolistID}))
    }, [dispatch])

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