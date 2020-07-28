import {combineReducers} from 'redux'
import loginReducer from './login.recuder'

export default combineReducers({
    userInfo:loginReducer
})