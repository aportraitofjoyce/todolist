import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import {AppRouter} from './AppRouter'
import {Navigation} from '../components/Navigation/Navigation'
import {Alerts} from '../components/UI/Alerts/Alerts'

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