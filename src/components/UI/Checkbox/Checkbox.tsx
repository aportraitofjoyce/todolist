import React, {ChangeEvent} from 'react'
import s from './Checkbox.module.css'

type CheckboxPropsType = {
    checked: boolean
    changeTaskStatus: (isDone: boolean) => void
}

export const Checkbox = React.memo((props: CheckboxPropsType) => {
    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(e.currentTarget.checked)
    }

    return <input type="checkbox" checked={props.checked} onChange={onCheckboxChangeHandler} className={s.checkbox}/>
})