import {appReducer, setAppError, setAppStatus} from './app-reducer'

let startState: any

beforeEach(() => {
    startState = {status: 'idle', error: null,}
})

test('App status should be correct', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))
    expect(endState.status).toBe('loading')
})

test('App error message should be correct', () => {
    const endState = appReducer(startState, setAppError({error: 'I am error'}))
    expect(endState.error).not.toBe(null)
    expect(endState.error).toBe('I am error')
})