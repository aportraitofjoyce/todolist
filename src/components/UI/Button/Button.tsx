import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from 'react'
import s from './Button.module.css'
import {useAppSelector} from '../../../hooks/hooks'

export type DefaultButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonProps = DefaultButtonProps & {
    active?: boolean
    grouped?: boolean
}

export const Button: FC<ButtonProps> = memo(({active, grouped, className, disabled, ...rest}) => {
    const isLoading = useAppSelector(state => state.app.isLoading)
    const classNames = `${s.default} ${active ? s.active : ''} ${grouped ? s.grouped : ''} ${className ? className : ''}`

    return <button className={classNames} disabled={disabled || isLoading}{...rest}/>
})