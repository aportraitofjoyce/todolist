import React, {FC} from 'react'
import {useHistory} from 'react-router-dom'
import {Button} from '../../components/UI/Button/Button'

export const Error: FC = () => {
    const history = useHistory()

    return (
        <div>
            <h1>ERROR 404</h1>
            <Button onClick={() => history.goBack()}>Go back</Button>
        </div>
    )
}