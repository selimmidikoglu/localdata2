import { applyMiddleware, createStore, combineReducers} from 'redux';
import {businessReducer} from './reducers/businessReducer';
import {passbetweenReducer} from './reducers/passbetweenReducer'
import {searchNameReducer} from './reducers/searchNameReducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
let RootReducer = combineReducers({
    businessReducer: businessReducer,
    passbetweenReducer: passbetweenReducer,
    searchNameReducer:searchNameReducer
})

const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)))


export default store;