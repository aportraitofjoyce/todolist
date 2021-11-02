import React, {ChangeEvent, FC, memo} from 'react'
import s from './Checkbox.module.css'
import {DefaultInputProps} from '../Input/Input'
import {useAppSelector} from '../../../hooks/hooks'

type CheckboxProps = DefaultInputProps & {
    onChangeCallback?: (status: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = memo(props => {
    const {onChangeCallback, onChange, className, children, disabled, ...restProps} = props
    const isLoading = useAppSelector(state => state.app.isLoading)

    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeCallback && onChangeCallback(e.currentTarget.checked)
    }

    const classNames = `${s.checkbox}${className ? className : ''}`

    return (
        <label className={s.label}>
            <input type={'checkbox'}
                   onChange={onCheckboxChangeHandler}
                   disabled={disabled || isLoading}
                   className={classNames}
                   {...restProps}/>
            {children && <span>{children}</span>}
        </label>
    )
})