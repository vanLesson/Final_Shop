import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {authReducer} from "../Reducers/authReducer"
import {promiseReducer} from "../Reducers/goodReducer"
import {bascketReduser} from "../Reducers/baketReducer"

const reducers = combineReducers({
    //создаем функцию-обертку, которая запустит последовательно counterReducer и booleanReducer передав им ветви c и b хранилища и обновив эти же ветви в случае нового состояния.
    auth: authReducer,
    promise: promiseReducer,
    bascket: bascketReduser,
  })
  
  export const store = createStore(reducers, applyMiddleware(thunk)) //вторым параметром идет миддлварь
  
  store.subscribe(() => console.log(store.getState()))