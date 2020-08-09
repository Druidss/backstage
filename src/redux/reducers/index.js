import {combineReducers} from 'redux'
import loginReducer from './login.recuder'
import menuReducder from './menu_recuder'
import productReducer from './product_recuder'

export default combineReducers({
    userInfo:loginReducer,
    title:menuReducder,
    productList:productReducer
})