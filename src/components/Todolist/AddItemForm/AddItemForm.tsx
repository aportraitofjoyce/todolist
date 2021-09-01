import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {Button} from '../../UI/Button/Button'
import {Input} from '../../UI/Input/Input'
import s from './AddItemForm.module.css'

type InputPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<InputPropsType> = React.memo((props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }, [error])

    const onClickHandler = useCallback(() => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setTitle('')
            setError(true)
        }
    }, [props.addItem, title])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickHandler()
    }, [onClickHandler])

    return (
        <div className={s.container}>
            <Input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={error ? 'Field is required' : ''}/>
            <Button onClick={onClickHandler}>Add</Button>
        </div>
    )
})