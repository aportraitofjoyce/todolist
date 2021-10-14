import React from 'react'
import {Alerts} from './components/UI/Alerts/Alerts'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store/store'
import {AppRouter} from './components/AppRouter'
import {Navigation} from './components/Navigation/Navigation'

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Alerts/>
                <Navigation/>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    )
}