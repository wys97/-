/* 角色管理相关接口 */
import axiosService from "../axios";

/*
 * 合同信息列表查询
 */
export async function queryContractInfo ({
     contractNo,
     customerName,
     identityNo,
     phone,
     partnerName,
     projectName,
     productName,
     page,
     limit
}) {
  const params = {
    contractNo,
    customerName,
    identityNo,
    phone,
    partnerName,
    projectName,
    productName,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/loan-apply-contract/list',
    method: 'post',
    data: params
  });
}

export default {
  queryContractInfo
}
