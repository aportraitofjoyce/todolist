import {appReducer} from './app-reducer'
import {setAppError, setAppStatus} from '../../actions/app-actions'
import {AppReducerType} from '../../../types/app-types'

let startState: AppReducerType

beforeEach(() => {
    startState = {status: 'idle', error: null,}
})

test('App status should be correct', () => {
    const endState = appReducer(startState, setAppStatus('loading'))
    expect(endState.status).toBe('loading')
})

test('App error message should be correct', () => {
    const endState = appReducer(startState, setAppError('I am error'))
    expect(endState.error).not.toBe(null)
    expect(endState.error).toBe('I am error')
})