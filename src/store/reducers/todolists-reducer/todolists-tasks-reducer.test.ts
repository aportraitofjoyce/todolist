import {TasksType, TodolistType} from '../../../components/Todolist/TodolistsContainer'
import {todolistsReducer} from './todolists-reducer'
import {tasksReducer} from '../tasks-reducer/tasks-reducer'
import {addTodolist} from '../../actions/todolists-actions/todolists-actions'


test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolist('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.NEW_TODOLIST_ID)
    expect(idFromTodolists).toBe(action.NEW_TODOLIST_ID)
})
