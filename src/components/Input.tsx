import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputPropsType = {
    addTask: (title: string) => void
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
            props.addTask(title.trim())
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
            <input onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   value={title}
                   className={error ? 'error' : ''}
            />
            <button onClick={onClickHandler}>Add</button>
            {error && <div className={'errorMessage'}>Field is required</div>}
        </div>
    )
}