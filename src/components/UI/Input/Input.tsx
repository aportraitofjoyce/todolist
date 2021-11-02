import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, KeyboardEvent, memo, useState} from 'react'
import s from './Input.module.css'
import {EyeIcon} from '../../Icons/Eye'
import {useAppSelector} from '../../../hooks/hooks'

export type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputProps = DefaultInputProps & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    password?: boolean
}

export const Input: FC<InputProps> = memo(props => {
    const {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        password,
        disabled,
        ...restProps
    } = props

    const isLoading = useAppSelector(state => state.app.isLoading)
    const [isPassword, setIsPassword] = useState(!password)

    const passwordToggle = () => setIsPassword(!isPassword)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        onEnter && e.key === 'Enter' && onEnter()
    }

    const finalSpanClassName = `${s.errorMessage} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? s.inputError : ''} ${s.default} ${className ? className : ''}`

    return (
        <div className={s.container}>
            <input type={password && isPassword ? 'text' : type}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={finalInputClassName}
                   placeholder={'Type text here...'}
                   disabled={disabled || isLoading}
                   {...restProps}/>
            {password && <div className={s.eye} onClick={passwordToggle}><EyeIcon/></div>}
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
})