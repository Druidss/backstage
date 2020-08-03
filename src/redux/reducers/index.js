import {combineReducers} from 'redux'
import loginReducer from './login.recuder'
import menuRecuder from './menu_recuder'

export default combineReducers({
    userInfo:loginReducer,
    title:menuRecuder
})