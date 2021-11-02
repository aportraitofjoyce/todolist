import {
    createTask,
    deleteTask,
    fetchTasks,
    Tasks,
    tasksReducer, updateTaskStatus, updateTaskTitle
} from './tasks-reducer'
import {TaskResponse} from '../../../api/tasks-api'
import {addTodolist, removeTodolist, setTodolists} from '../todolists-reducer/todolists-reducer'
import {TaskStatuses} from '../../../types/server-response-types'

let startState: Tasks

beforeEach(() => {
    startState = {
        'TD1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD1',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                todoListId: 'TD1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD1'
            }
        ],
        'TD2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD2'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                todoListId: 'TD2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD2'
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const args = {taskID: '2', todolistID: 'TD2'}
    const endState = tasksReducer(startState, deleteTask.fulfilled(args, '', args))

    expect(endState).toEqual({
        'TD1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD1',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                todoListId: 'TD1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD1'
            }
        ],
        'TD2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                todoListId: 'TD2'
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const newTask: TaskResponse = {
        id: '100',
        title: 'juice',
        status: 0,
        addedDate: '',
        order: 0,
        todoListId: 'TD2',
    }
    const endState = tasksReducer(startState, createTask.fulfilled({task: newTask}, '', {
        todolistID: 'TD2',
        title: 'juice'
    }))

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(4)
    expect(endState['TD2'][0].id).toBeDefined()
    expect(endState['TD2'][0].title).toBe('juice')
})

test('status of specified task should be changed', () => {
    const args = {todolistID: 'TD2', taskID: '2', status: 2}
    const endState = tasksReducer(startState, updateTaskStatus.fulfilled(args, '', args))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].status).toBe(2)
})

test('title of specified task should be changed', () => {
    const args = {todolistID: 'TD2', taskID: '2', title: 'coffee'}
    const endState = tasksReducer(startState, updateTaskTitle.fulfilled(args, '', args))

    expect(endState['TD2'].length).toBe(3)
    expect(endState['TD2'][1].title).toBe('coffee')
})

test('new array should be added when new todolist is added', () => {
    const newTodo = {
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
    const endState = tasksReducer(startState, addTodolist({todolist: newTodo}))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'TD1' && k !== 'TD2')

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolist({todolistID: 'TD2'})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['TD2']).not.toBeDefined()
})

test('Empty arrays of tasks should be added after set todolists', () => {
    const action = setTodolists({
        todolists: [
            {id: '1', title: 'What to learn', order: 0, addedDate: ''},
            {id: '2', title: 'What to buy', order: 0, addedDate: ''}
        ]
    })

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('Tasks should be added for selected todolist', () => {
    const action = fetchTasks.fulfilled({tasks: startState['TD1'], todolistID: 'TD1'}, '', {todolistID: 'TD1'})
    const endState = tasksReducer({'TD1': [], 'TD2': []}, action)

    expect(endState['TD1'].length).toBe(3)
    expect(endState['TD2'].length).toBe(0)
})