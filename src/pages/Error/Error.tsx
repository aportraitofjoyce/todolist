import React, {FC} from 'react'
import {useHistory} from 'react-router-dom'
import {Button} from '../../components/UI/Button/Button'
import s from './Error.module.css'

export const Error: FC = () => {
    const history = useHistory()

    return (
        <div className={s.wrapper}>
            <h1>Page not found!</h1>
            <img src='https://cdn.statically.io/img/i.pinimg.com/originals/ef/0b/58/ef0b58bc4be3f9622c10a73fe685c57d.jpg'
                 alt='error'/>
            <Button onClick={() => history.goBack()}>Go back</Button>
        </div>
    )
}