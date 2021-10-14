import React, {useCallback, useEffect, useState} from 'react'
import s from './Alerts.module.css'

type SnackbarPropsType = {
    type: 'error' | 'success'
    text: string | null
    open: boolean
    onClose: () => void
}

// TODO: Alerts have combined state and hiding all in one time. Need to implement id deps
export const Snackbar: React.FC<SnackbarPropsType> = React.memo(props => {
    const {type, text, open, onClose} = props
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
			<div className={`${s.snackbarContainer} ${type === 'error' && s.error}`}>
				<div>{text ? text : 'I am Alert'}</div>
				<span onClick={closeSnackbar}>X</span>
			</div>}
        </>
    )
})