import {
    addTodolist,
    changeTodolistEntityStatus,
    changeTodolistFilter,
    changeTodolistTitle,
    FilterValuesType,
    removeTodolist,
    setTodolists,
    todolistsReducer, TodolistType
} from './todolists-reducer'
import {v1} from 'uuid'

let todolistID1: string
let todolistID2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'All', entityStatus: 'idle', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'All', entityStatus: 'idle', order: 0, addedDate: ''}
    ]
})

test('Correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('Correct todolist should be added', () => {
    const newTodolist = {
        id: '100',
        title: 'What to learn',
        order: 0,
        addedDate: ''
    }

    const endState = todolistsReducer(startState, addTodolist(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(newTodolist.id)
})

test('Correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'Completed'
    const endState = todolistsReducer(startState, changeTodolistFilter(newFilter, todolistID2))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})

test('Correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolists'
    const endState = todolistsReducer(startState, changeTodolistTitle(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('Requested todolists should be added correctly', () => {
    const endState = todolistsReducer([], setTodolists(startState))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[0].filter).toBe('All')
})

test('Todolists entity status should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistEntityStatus(todolistID1, 'loading'))

    expect(endState[0].entityStatus).toBe('loading')
})