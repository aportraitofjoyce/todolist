import React, {FC, memo} from 'react'
import s from './Alerts.module.css'
import {AlertError} from './AlertError'

export const Alerts: FC = memo(() => {
    return (
        <div className={s.alertsWrapper}>
            <AlertError/>
        </div>
    )
})