import React from 'react'
import { render } from 'react-dom'
import Count from './components/count'
import { Provider } from 'react-redux'
import configureStore from './store/index' 

const store = configureStore()
render(
    <Provider store = {store}>
        <Count />
    </Provider>
    , document.querySelector('#container')
)