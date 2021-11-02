import React, {FC, memo} from 'react'
import s from './Loader.module.css'

export const Loader: FC = memo(() => {
    return (
        <div className={s.loadingWrapper}>
            <div className={s.loading}>
                <div/>
                <div/>
            </div>
        </div>
    )
})