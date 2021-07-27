import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button} from "./Button";

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
        <div>
            <div className={'inputDataContainer'}>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'dataInput error' : 'dataInput'}
                       placeholder={'What to add?'}
                />
                <Button value={'Add'} onClick={onClickHandler}/>
            </div>
            {error && <div className={'errorMessage'}>Field is required</div>}
        </div>
    )
}
