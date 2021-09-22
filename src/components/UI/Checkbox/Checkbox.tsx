import React, {ChangeEvent} from 'react'
import s from './Checkbox.module.css'

type CheckboxPropsType = {
    checked: boolean
    changeTaskStatus: (status: boolean) => void
}

export const Checkbox: React.FC<CheckboxPropsType> = React.memo((props) => {
    const {checked, changeTaskStatus} = props

    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(e.currentTarget.checked)
    }

    return <input type='checkbox'
                  checked={checked}
                  onChange={onCheckboxChangeHandler}
                  className={s.checkbox}/>
})