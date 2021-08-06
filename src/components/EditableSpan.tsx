import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') offEditMode()
    }

    return (
        editMode
            ? <TextField
                id="standard-basic" variant="standard"
                value={title}
                onBlur={offEditMode}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}