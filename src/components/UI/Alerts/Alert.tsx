import React, {FC, memo, useCallback, useEffect, useState} from 'react'
import s from './Alerts.module.css'

type SnackbarProps = {
    type: 'error' | 'success'
    text: string
    open: boolean
    onClose: () => void
}

export const Alert: FC<SnackbarProps> = memo(({type, text, open, onClose}) => {
    const [isOpen, setIsOpen] = useState(open)

    const closeSnackbar = useCallback(() => {
        setIsOpen(false)
        onClose()
    }, [onClose])

    useEffect(() => {
        setIsOpen(open)
        const timeoutID = setTimeout(() => {
            closeSnackbar()
        }, 3500)

        return () => clearTimeout(timeoutID)
    }, [closeSnackbar, open])


    return (
        <>
            {isOpen &&
			<div className={`${s.container} ${type === 'error' && s.error}`}>
				<div>{text ? text : 'I am Alert'}</div>
				<span onClick={closeSnackbar}>X</span>
			</div>}
        </>
    )
})