import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

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
            <TextField id="standard-basic" label="What to add?" variant="standard"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}/>

            <IconButton onClick={onClickHandler}>
                <Add/>
            </IconButton>
        </div>
    )
}
