import {AppReducerType} from '../../../types/app-types'
import {APP_ACTIONS_TYPES, AppActionsType} from '../../actions/app-actions'

const initialState: AppReducerType = {
    status: 'idle',
    error: 'I am test ERROR and i live only 5 seconds'
}

export const appReducer = (state = initialState, action: AppActionsType): AppReducerType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_STATUS:
            return {...state, status: action.payload.status}

        case APP_ACTIONS_TYPES.SET_ERROR:
            return {...state, error: action.payload.error}

        default:
            return state
    }
}