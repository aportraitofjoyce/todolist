import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './Checkbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeCallback?: (status: boolean) => void
}

export const Checkbox: React.FC<CheckboxPropsType> = React.memo(props => {
    const {onChangeCallback, onChange, ...restProps} = props

    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeCallback && onChangeCallback(e.currentTarget.checked)
    }

    return <input type='checkbox'
                  onChange={onCheckboxChangeHandler}
                  className={s.checkbox}
                  {...restProps}/>
})