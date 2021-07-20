import React from 'react'
import {FilterValuesType} from '../App'
import {TrashIcon} from "./TrashIcon";

type ButtonPropsType = {
    value: string
    onClick: () => void
    className?: string | undefined
    filter?: FilterValuesType
    icon?: string
}

export function Button(props: ButtonPropsType) {
    const finalButtonClassName = `${props.filter === props.value ? 'activeButton' : ''} ${props.className}`

    return (
        <button
            onClick={props.onClick}
            className={finalButtonClassName}
        >
            {props.icon ? <TrashIcon/> : props.value}
        </button>
    )
}