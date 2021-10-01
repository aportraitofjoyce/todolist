import React, {useCallback, useEffect, useState} from 'react'
import s from './Snackbar.module.css'

type SnackbarPropsType = {
    text: string | null
    open: boolean
    onClose: () => void
}

export const Snackbar: React.FC<SnackbarPropsType> = React.memo(props => {
    const {text, open, onClose} = props
    const [isOpen, setIsOpen] = useState<boolean>(open)

    const closeSnackbar = useCallback(() => {
        setIsOpen(false)
        onClose()
    }, [onClose])

    useEffect(() => {
        setIsOpen(open)

        const timeoutID = setTimeout(() => {
            closeSnackbar()
        }, 5000)

        return () => clearTimeout(timeoutID)
    }, [closeSnackbar, open])

    return (
        <>
            {isOpen &&
			<div className={s.snackbarContainer}>
				<div>{text ? text : 'I am Snackbar'}</div>
				<span onClick={closeSnackbar}>x</span>
			</div>}
        </>
    )
})