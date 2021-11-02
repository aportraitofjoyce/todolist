import {appReducer, setAppError, setAppInitialized, setAppIsLoading} from './app-reducer'

let startState: any

beforeEach(() => {
    startState = {isLoading: false, error: '', isInitialized: false}
})

test('App should be initialized', () => {
    const endState = appReducer(startState, setAppInitialized({status: true}))
    expect(endState.isInitialized).toBe(true)
})

test('App status should be correct', () => {
    const endState = appReducer(startState, setAppIsLoading({status: true}))
    expect(endState.isLoading).toBe(true)
})

test('App error message should be correct', () => {
    const endState = appReducer(startState, setAppError({error: 'I am error'}))
    expect(endState.error).not.toBe('')
    expect(endState.error).toBe('I am error')
})