import React, {ChangeEvent} from 'react'
import s from './Checkbox.module.css'

type CheckboxPropsType = {
    checked: boolean
    changeStatus: (isDone: boolean) => void
}

export const Checkbox = (props: CheckboxPropsType) => {
    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(e.currentTarget.checked)
    }
    return <input type='checkbox' checked={props.checked} onChange={onCheckboxChangeHandler} className={s.checkbox}/>
}