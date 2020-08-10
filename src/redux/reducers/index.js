import {combineReducers} from 'redux'
import loginReducer from './login.recuder'
import menuReducder from './menu_recuder'
import productReducer from './product_recuder'
import categoryReducer from './category_recuder'


export default combineReducers({
    userInfo:loginReducer,
    title:menuReducder,
    productList:productReducer,
    categoryList:categoryReducer,
})