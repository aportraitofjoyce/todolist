import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type IconButtonPropsType = DefaultButtonPropsType & {}

export const IconButton: React.FC<IconButtonPropsType> = (
    {
        className,
        ...restProps
    }
) => {
    const finalClassName = `${s.icon} ${className ? className : ''}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}