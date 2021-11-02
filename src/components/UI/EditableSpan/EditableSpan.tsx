import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react'
import {Input} from '../Input/Input'

type EditableSpanProps = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanProps> = memo(({title, changeTitle}) => {
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