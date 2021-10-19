import React from 'react'
import s from './Alerts.module.css'
import {AlertError} from './AlertError'

export const Alerts: React.FC = () => {
    return (
        <div className={s.alertsWrapper}>
            <AlertError/>
        </div>
    )
}