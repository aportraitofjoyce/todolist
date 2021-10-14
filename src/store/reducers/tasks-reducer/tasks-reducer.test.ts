import {
    addTask,
    changeTaskStatus,
    changeTaskTitle, removeTask,
    setTasks, sortTasksByName,
    tasksReducer, TasksType
} from './tasks-reducer'
import {TasksResponseType} from '../../../api/tasks-api'
import {addTodolist, removeTodolist, setTodolists} from '../todolists-reducer/todolists-reducer'

let startState: TasksType

beforeEach(() => {
    startState = {
        'TD1': [
            {
                id: '1',
                title: 'CSS',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD1'
            },
            {
                id: '2',
                title: 'JS',
                status: 2,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD1'
            },
            {
                id: '3',
                title: 'React',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD1'
            }
        ],
        'TD2': [
            {
                id: '1',
                title: 'bread',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD2'
            },
            {
                id: '2',
                title: 'milk',
                status: 2,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD2'
            },
            {
                id: '3',
                title: 'tea',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD2'
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTask('2', 'TD2'))

    expect(endState).toEqual({
        'TD1': [
            {
                id: '1',
                title: 'CSS',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD1'
            },
            {
                id: '2',
                title: 'JS',
                status: 2,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD1'
            },
            {
                id: '3',
                title: 'React',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD1'
            }
        ],
        'TD2': [
            {
                id: '1',
                title: 'bread',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD2'
            },
            {
                id: '3',
                title: 'tea',
                status: 0,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: 0,
                entityStatus: 'idle',
                todoListId: 'TD2'
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const newTask: TasksResponseType = {
        id: '100',
        title: 'juice',
        status: 0,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: 0,
        entityStatus: 'idle',
        todoListId: 'TD2',
    }
    const endState = tasksReducer(startState, addTask(newTask))

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(4)
    expect(endState['TD2'][0].id).toBeDefined()
    expect(endState['TD2'][0].title).toBe('juice')
    expect(endState['TD2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatus('TD2', '2', 2))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].status).toBe(2)
})

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitle('TD2', '2', 'cofee'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].title).toBe('cofee')
})

test('tasks of specified todolist should be sorted by name', () => {
    const endState = tasksReducer(startState, sortTasksByName('TD2'))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
    const newTask = {
        id: '100',
        title: 'juice',
        status: 0,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: 0,
        todoListId: 'TD2'
    }
    const endState = tasksReducer(startState, addTodolist(newTask))
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

test('Empty arrays of tasks should be added after set todolists', () => {
    const action = setTodolists([
        {id: '1', title: 'What to learn', order: 0, addedDate: ''},
        {id: '2', title: 'What to buy', order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('Tasks should be added for selected todolist', () => {
    const action = setTasks(startState['TD1'], 'TD1')
    const endState = tasksReducer({'TD1': [], 'TD2': []}, action)

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(0)
})