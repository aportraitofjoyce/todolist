import {StateType} from '../types/common-types'

export const loadState = () => {
    try {
        const preloadedState = localStorage.getItem('todolistState')
        return preloadedState === null ? undefined : JSON.parse(preloadedState)
    } catch (err) {
        return undefined
    }
}

export const saveState = (state: StateType) => {
    try {
        const loadedState = JSON.stringify(state)
        localStorage.setItem('todolistState', loadedState)
    } catch {
    }
}