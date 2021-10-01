import React from 'react'
import s from './Alerts.module.css'
import {ErrorSnackbar} from './ErrorSnackbar'

export const Alerts: React.FC = () => {
    return (
        <div className={s.alertsWrapper}>
            <ErrorSnackbar/>
        </div>
    )
}