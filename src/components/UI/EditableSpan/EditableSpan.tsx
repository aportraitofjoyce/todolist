import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {Input} from '../../UI/Input/Input'

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(props => {
    const {title, changeTitle} = props

    const [value, setValue] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = useCallback(() => setEditMode(true), [])

    const offEditMode = useCallback(() => {
        setEditMode(false)
        changeTitle(value)
    }, [changeTitle, value])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value), [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') offEditMode()
    }, [offEditMode])

    return (
        editMode
            ? <Input value={value}
                     onBlur={offEditMode}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}
                     autoFocus/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})