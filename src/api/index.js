/* 
  1.项目中所有请求由该文件发出
  2.以后每当发请求之前，都要在该文件里添加一个方法
*/

//引入我们自定义的myAxios
import myAxios from './myAxios'
//引入请求的基本路径
import {BASE_URL} from '../config'

//发起登录请求
// export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})
//获取商品列表请求
export const reqCategoryList = ()=> myAxios.get(`${BASE_URL}/manage/category/list`)
// 新增商品的分类
export const reqAddCategory = (categoryName)=> myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更新商品分类
export const reqUpdateCategory = (categoryId,categoryName)=> myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})

//请求商品分页列表
export const reqProductList = (pageNum,pageSize)=> myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

//请求更新商品状态
export const reqUpdateProdStatus = (productId,status)=> myAxios.post(`${BASE_URL}/manage/product/updateStasus`,{productId,status})

//搜索商品
export const reqSearchProductList = (pageNum,pageSize,searchType,keyWord)=> myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})

//根据商品id 获取商品信息
export const reqProductById = (productId)=> myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})

// 删除图片
export const reqDeletePicture = (name)=> myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

//添加商品
export const reqAddProduct = (productObj)=> myAxios.post(`${BASE_URL}/manage/product/add`,{...productObj})


// 私家厨房请求
//登录请求
export const reqLoginCheck = (email,password)=> myAxios.post(`${BASE_URL}/user/loginCheck`,{email,password})

//Disch
//根据菜系返回菜系下所有菜品  CuisineId
export const reqDischList = (CuisineId)=> myAxios.get(`${BASE_URL}/Dish/GetDishByCuisineId`,{params:{CuisineId}})
// 添加菜品
export const reqAddDisch = (CuisineInfo)=> myAxios.post(`${BASE_URL}/Dish/AddDish`,{...CuisineInfo})
//更新菜品图片
export const reqUpdateImg = (DishId,Img)=> myAxios.post(`${BASE_URL}/Dish/UpdateImg`,{DishId,Img})
//改变菜品状态
export const reqChangeStatus = (DishId)=> myAxios.post(`${BASE_URL}/Dish/UpdateImg`,{DishId})

//Chef
// 获得所有厨师信息
export const getAllChef = ()=> myAxios.get(`${BASE_URL}/Chef/GetAll`)
// Chef/GetChefByCuisineId  通过菜系Id获得厨师信息
export const reqChefList = (CuisineId)=> myAxios.get(`${BASE_URL}/Chef/GetChefByCuisineId`,{params:{CuisineId}})
// 通过菜品名称获得厨师信息
export const reqChefbyDishName = (name)=> myAxios.get(`${BASE_URL}/Chef/GetChefByDishName`,{params:{name}})
//删除厨师
export const reqDelChef = (chefId)=> myAxios.post(`${BASE_URL}/chef/del`,{chefId})




//Order 
// 通过用户邮箱获得用户Id
export const getIdbyEmail = (email)=> myAxios.get(`${BASE_URL}/User/getIdByEmail`,{params:{email}})

// 通过用户ID获得订单
export const getOrderbyUserId = (userId)=> myAxios.get(`${BASE_URL}/Order/GetOrderByUserId`,{params:{userId}})
// 异常关闭订单
export const postColseOder = (orderId)=> myAxios.post(`${BASE_URL}/Order/CloseOrder`,{orderId})
