import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import rootReducer from '../reducers'


export default function configureStore(initalState){
    const store = createStore(
        rootReducer,
        initalState,
        applyMiddleware(logger)
    )
    if(module.hot){
        module.hot.accept('../reducers',()=>{
            const nextStore = require('../reducers')
            store.replaceReducer(nextStore)
        })
    }
    return store
}