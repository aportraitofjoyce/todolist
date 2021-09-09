import {
    tasksReducer
} from './tasks-reducer'
import {TasksType} from '../../../components/Todolist/TodolistsContainer'
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle, removeTask,
    sortTasksByName
} from '../../actions/tasks-actions/tasks-actions'
import {addTodolist, removeTodolist} from '../../actions/todolists-actions/todolists-actions'

let startState: TasksType

beforeEach(() => {
    startState = {
        'TD1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'TD2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTask('2', 'TD2'))

    expect(endState).toEqual({
        'TD1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'TD2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTask('juice', 'TD2'))

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(4)
    expect(endState['TD2'][0].id).toBeDefined()
    expect(endState['TD2'][0].title).toBe('juice')
    expect(endState['TD2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatus('2', false, 'TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitle('2', 'cofee', 'TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].title).toBe('cofee')
})

test('tasks of specified todolist should be sorted by name', () => {
    const endState = tasksReducer(startState, sortTasksByName('TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolist('new todolist'))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'TD1' && k !== 'TD2')

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
    const action = removeTodolist('TD2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['TD2']).not.toBeDefined()
})
