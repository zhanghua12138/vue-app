/*
    api模块有2种:
        1. 只维护API的接口地址
            import {
                sellApi
            } from './utils/sellAPIs.js'

            axios
                .get(sellApi,{
                    params : {}
                })
                .then(resp=> this.xxx=resp.data )

        2. 提供发送到API接口请求后的promise对象 (推荐)
            import {
                getSeller
            } from './utils/sellAPIs.js'

            getSeller({id:110}).then(resp=> this.xxx=resp.data )
*/
// 1. 引入axios模块
import axios from "axios";
// 2. 声明接口方法
// const getSeller = function(paramData){
//     return axios
//             .get(
//                 'http://localhost/api/seller', // api地址
//                 {
//                     params:paramData // 请求参数
//                 });
// }

/** 获取商家接口 */
const getSeller = function(id){
    return axios
        .get(
            'http://localhost/api/seller', // api地址
            {
                params:{
                    id:id
                } // 请求参数
            });
}
/** 获取商品接口 */
const listGoods = function(sellerId){
    return axios
        .get(
            'http://localhost/api/goods', // api地址
            {
                params:{
                    seller:sellerId
                } // 请求参数(前端传入后台的参数)
            });
}
// 3. 封装到返回模块中
export {
    getSeller, // 获取商家接口
    listGoods  // 获取商品接口
};
