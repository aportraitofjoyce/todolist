import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {TodolistContainer} from './components/Todolist/TodolistContainer'
import {Provider} from 'react-redux'
import {store} from './store/store'
import {TodolistContainerWithUseReducer} from './components/Todolist/TodolistContainerWithUseReducer'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <TodolistContainer/>
            {/*<TodolistContainerWithUseReducer/>*/}
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'))