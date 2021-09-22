import {
    tasksReducer
} from './tasks-reducer'
import {
    addTask,
    changeTaskStatus,
    changeTaskTitle, removeTask,
    sortTasksByName
} from '../../actions/tasks-actions/tasks-actions'
import {addTodolist, removeTodolist} from '../../actions/todolists-actions/todolists-actions'
import {TasksType} from '../../../types/tasks-types'

let startState: TasksType

beforeEach(() => {
    startState = {
        'TD1': [
            {id: '1', title: 'CSS', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD1'},
            {id: '2', title: 'JS', status: 2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD1'},
            {id: '3', title: 'React', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD1'}
        ],
        'TD2': [
            {id: '1', title: 'bread', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD2'},
            {id: '2', title: 'milk', status: 2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD2'},
            {id: '3', title: 'tea', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD2'}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTask('2', 'TD2'))

    expect(endState).toEqual({
        'TD1': [
            {id: '1', title: 'CSS', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD1'},
            {id: '2', title: 'JS', status: 2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD1'},
            {id: '3', title: 'React', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD1'}
        ],
        'TD2': [
            {id: '1', title: 'bread', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD2'},
            {id: '3', title: 'tea', status: 0, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: 0, todoListId: 'TD2'}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTask('juice', 'TD2'))

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(4)
    expect(endState['TD2'][0].id).toBeDefined()
    expect(endState['TD2'][0].title).toBe('juice')
    expect(endState['TD2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatus('2', 2, 'TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].status).toBe(2)
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
