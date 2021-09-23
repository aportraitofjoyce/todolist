import React, {useCallback} from 'react'
import s from './Task.module.css'
import {Checkbox} from '../../UI/Checkbox/Checkbox'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {IconButton} from '../../UI/Button/IconButton'
import {Delete} from '../../Icons/Delete/Delete'
import {TaskStatuses} from '../../../api/tasks-api'

type TaskPropsType = {
    TODOLIST_ID: string
    id: string
    checked: boolean
    title: string
    removeTask: (id: string, TODOLIST_ID: string) => void
    changeTaskTitle: (id: string, title: string, TODOLIST_ID: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, TODOLIST_ID: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(props => {
    const {TODOLIST_ID, id, checked, title, removeTask, changeTaskTitle, changeTaskStatus} = props

    const onButtonClickHandler = useCallback(() => removeTask(id, TODOLIST_ID),
        [removeTask, id, TODOLIST_ID])

    const spanHandler = useCallback((title: string) => changeTaskTitle(id, title, TODOLIST_ID),
        [changeTaskTitle, id, TODOLIST_ID])

    const checkboxHandler = useCallback((status: boolean) => changeTaskStatus(id, status ? TaskStatuses.Completed : TaskStatuses.inProgress, TODOLIST_ID),
        [changeTaskStatus, id, TODOLIST_ID])

    return (
        <div className={s.taskContentContainer}>
            <div className={s.taskContent}>
                <Checkbox checked={checked} changeTaskStatus={checkboxHandler}/>
                <EditableSpan title={title} changeTitle={spanHandler}/>
            </div>

            <IconButton onClick={onButtonClickHandler}><Delete/></IconButton>
        </div>
    )
})