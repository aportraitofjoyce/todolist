import React from 'react';
import {FilterValuesType} from "../App";

type ButtonPropsType = {
    value: string
    clickAction: () => void
    filterStatus?: FilterValuesType
}

export function Button(props: ButtonPropsType) {
    return (
        <button onClick={props.clickAction}
                className={props.filterStatus === props.value ? 'activeButton' : ''}>
            {props.value}
        </button>
    )
}