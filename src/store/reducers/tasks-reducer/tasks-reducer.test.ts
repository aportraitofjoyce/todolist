import {
    tasksReducer
} from './tasks-reducer'
import {TasksType} from '../../../components/Todolist/TodolistContainer'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, removeTaskAC,
    sortTasksByNameAC
} from '../../actions/tasks-actions/tasks-actions'
import {addTodolistAC, removeTodolistAC} from '../../actions/todolists-actions/todolists-actions'

test('correct task should be deleted from correct array', () => {
    const startState: TasksType = {
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

    const endState = tasksReducer(startState, removeTaskAC('2', 'TD2'))

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
    const startState: TasksType = {
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

    const endState = tasksReducer(startState, addTaskAC('juice', 'TD2'))

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(4)
    expect(endState['TD2'][0].id).toBeDefined()
    expect(endState['TD2'][0].title).toBe('juice')
    expect(endState['TD2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksType = {
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

    const endState = tasksReducer(startState, changeTaskStatusAC('2', false, 'TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startState: TasksType = {
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

    const endState = tasksReducer(startState, changeTaskTitleAC('2', 'cofee', 'TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].title).toBe('cofee')
})

test('tasks of specified todolist should be sorted by name', () => {
    const startState: TasksType = {
        'TD1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'TD2': [
            {id: '1', title: 'tea', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'bread', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, sortTasksByNameAC('TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
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

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'TD1' && k !== 'TD2')

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
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

    const action = removeTodolistAC('TD2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['TD2']).not.toBeDefined()
})
