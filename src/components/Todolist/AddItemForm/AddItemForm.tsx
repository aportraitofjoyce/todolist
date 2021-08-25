import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button} from '../../UI/Button/Button'
import {Input} from '../../UI/Input/Input'
import s from './AddItemForm.module.css'

type InputPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: InputPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickHandler = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setTitle('')
            setError(true)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickHandler()
    }

    return (
        <div className={s.container}>
            <Input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={error ? 'Field is required' : ''}/>
            <Button onClick={onClickHandler}>Add</Button>
        </div>
    )
}
