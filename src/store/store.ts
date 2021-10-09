import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {todolistsReducer} from './reducers/todolists-reducer/todolists-reducer'
import {tasksReducer} from './reducers/tasks-reducer/tasks-reducer'
import {appReducer} from './reducers/app-reducer/app-reducer'

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))