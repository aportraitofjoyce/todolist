import React, {FC, memo} from 'react'
import s from './Button.module.css'
import {DefaultButtonProps} from './Button'
import {useAppSelector} from '../../../hooks/hooks'

type IconButtonProps = DefaultButtonProps & {}

export const IconButton: FC<IconButtonProps> = memo(({className, disabled, ...restProps}) => {
    const isLoading = useAppSelector(state => state.app.isLoading)
    const classNames = `${s.icon} ${className ? className : ''}`

    return <button className={classNames} disabled={disabled || isLoading} {...restProps}/>
})
