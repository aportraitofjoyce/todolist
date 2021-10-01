import React, {useCallback} from 'react'
import s from './Task.module.css'
import {Checkbox} from '../../UI/Checkbox/Checkbox'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {IconButton} from '../../UI/Button/IconButton'
import {Delete} from '../../Icons/Delete/Delete'
import {TasksResponseType} from '../../../api/tasks-api'
import {TaskStatuses} from '../../../types/server-response-types'

type TaskPropsType = {
    todolistID: string
    task: TasksResponseType
    removeTask: (id: string, TODOLIST_ID: string) => void
    changeTaskTitle: (id: string, title: string, TODOLIST_ID: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, TODOLIST_ID: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(props => {
    const {todolistID, task, removeTask, changeTaskTitle, changeTaskStatus} = props

    const onButtonClickHandler = useCallback(() => removeTask(task.id, todolistID),
        [removeTask, task.id, todolistID])

    const spanHandler = useCallback((title: string) => changeTaskTitle(task.id, title, todolistID),
        [changeTaskTitle, task.id, todolistID])

    const checkboxHandler = useCallback((status: boolean) => changeTaskStatus(task.id, status ? TaskStatuses.Completed : TaskStatuses.inProgress, todolistID),
        [changeTaskStatus, task.id, todolistID])

    return (
        <div className={s.taskContentContainer}>
            <div className={s.taskContent}>
                <Checkbox checked={task.status === TaskStatuses.Completed} changeTaskStatus={checkboxHandler}/>
                <EditableSpan title={task.title} changeTitle={spanHandler}/>
            </div>

            <IconButton onClick={onButtonClickHandler} disabled={task.entityStatus === 'loading'}><Delete/></IconButton>
        </div>
    )
})