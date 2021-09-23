import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {TodolistsContainer} from './components/Todolist/TodolistsContainer'
import {Provider} from 'react-redux'
import {store} from './store/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <TodolistsContainer/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'))