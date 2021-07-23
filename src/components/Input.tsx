import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button} from "./Button";

type InputPropsType = {
    addTask: (title: string, todolistID: string) => void
    id: string
}

export function Input(props: InputPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onClickHandler = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
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
        <div>
            <div className={'inputDataContainer'}>
                <input onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       value={title}
                       className={error ? 'dataInput error' : 'dataInput'}
                       placeholder={'What to add?'}
                />
                <Button value={'Add'} onClick={onClickHandler}/>
            </div>
            {error && <div className={'errorMessage'}>Field is required</div>}
        </div>
    )
}
