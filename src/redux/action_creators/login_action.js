import {SAVE_USER_INFO} from '../action_types'
export const createSaveUserInfoAction = (value) => {
    localStorage.setItem('user',JSON.stringify(value.username))
    localStorage.setItem('token',JSON.stringify(value._id))
    // localStorage.setItem('token',value)
    localStorage.setItem('isLogin',true)
    return {type:SAVE_USER_INFO,data:value}
}


