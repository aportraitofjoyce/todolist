import React, {useCallback} from 'react'
import s from './Task.module.css'
import {Checkbox} from '../../UI/Checkbox/Checkbox'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {IconButton} from '../../UI/Button/IconButton'
import {Delete} from '../../Icons/Delete/Delete'

type TaskPropsType = {
    TODOLIST_ID: string
    id: string
    checked: boolean
    title: string
    removeTask: (id: string, TODOLIST_ID: string) => void
    changeTaskTitle: (id: string, title: string, TODOLIST_ID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, TODOLIST_ID: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTask = useCallback(() => props.removeTask(props.id, props.TODOLIST_ID),
        [props.id, props.TODOLIST_ID])

    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.id, title, props.TODOLIST_ID),
        [props.id, props.TODOLIST_ID])

    const changeTaskStatus = useCallback((isDone: boolean) => props.changeTaskStatus(props.id, isDone, props.TODOLIST_ID),
        [props.id, props.TODOLIST_ID])

    return (
        <div className={s.taskContentContainer}>
            <div className={s.taskContent}>
                <Checkbox checked={props.checked}
                          changeTaskStatus={changeTaskStatus}/>

                <EditableSpan title={props.title}
                              changeTitle={changeTaskTitle}/>
            </div>

            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})