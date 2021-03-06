import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react'
import {Button} from '../Button/Button'
import {Input} from '../Input/Input'
import s from './AddItemForm.module.css'

type AddItemFormProps = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormProps> = memo(({addItem}) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        error && setError(false)
    }, [error])

    const onClickHandler = useCallback(() => {
        if (value.trim()) {
            addItem(value.trim())
            setValue('')
        } else {
            setValue('')
            setError(true)
        }
    }, [addItem, value])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickHandler()
    }, [onClickHandler])

    return (
        <div className={s.container}>
            <Input value={value}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={error ? 'Field is required' : ''}/>
            <Button onClick={onClickHandler}>Add</Button>
        </div>
    )
})