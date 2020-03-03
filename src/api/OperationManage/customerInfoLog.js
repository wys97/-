/* 查询客户额度变更日志 */
import axiosService from "../axios";

//用户产品额度
export async function getCustomerLimit(id){
   return axiosService({
        url:'/admin-api-hnair/customer-credit/limit/'+id,
        method:'get',
    })
}

//额度变更日志
export async function pointsDetailList(params){
      
    return axiosService({
        url:'/admin-api-hnair/customer-credit/limit-change-log',
        method:'post',
        data:params
    })
}





export default {
    getCustomerLimit,
    pointsDetailList
}