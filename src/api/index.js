/* 
  1.项目中所有请求由该文件发出
  2.以后每当发请求之前，都要在该文件里添加一个方法
*/

//引入我们自定义的myAxios
import myAxios from './myAxios'
//引入请求的基本路径
import {BASE_URL} from '../config'

//发起登录请求
export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})
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
