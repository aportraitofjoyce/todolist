import {addTodolist, todolistsReducer, TodolistType} from './todolists-reducer'
import {tasksReducer, TasksType} from '../tasks-reducer/tasks-reducer'


test('ID\'s should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistType> = []

    const newTodolist = {
        id: '100',
        title: 'What to learn',
        order: 0,
        addedDate: ''
    }

    const action = addTodolist(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})