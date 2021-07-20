import React from 'react'
import {FilterValuesType} from '../App'

type ButtonPropsType = {
    value: string
    clickAction: () => void
    filter?: FilterValuesType
}

export function Button(props: ButtonPropsType) {
    return (
        <button
            onClick={props.clickAction}
            className={props.filter === props.value ? 'activeButton' : ''}
        >
            {props.value}
        </button>
    )
}