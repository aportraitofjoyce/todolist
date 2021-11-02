import React, {FC, memo} from 'react'
import s from './Progress.module.css'

export const Progress: FC = memo(() => {
    return (
        <div className={s.progressContainer}>
            <div className={s.progressBar}/>
        </div>
    )
})