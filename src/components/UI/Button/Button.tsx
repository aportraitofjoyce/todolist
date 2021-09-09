import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    active?: boolean
    grouped?: boolean
}

export const Button: React.FC<ButtonPropsType> = React.memo((props) => {
    const {active, grouped, className, ...rest} = props

    const finalClassName = `${s.default} ${active ? s.active : ''} ${grouped ? s.grouped : ''} ${className ? className : ''}`

    return (
        <button
            className={finalClassName}
            {...rest}
        />
    )
})
