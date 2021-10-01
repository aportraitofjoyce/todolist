import React from 'react'
import s from './Progress.module.css'

export const Progress: React.FC = React.memo(() => {
    return (
        <div className={s.progressContainer}>
            <div className={s.progressBar}/>
        </div>
    )
})