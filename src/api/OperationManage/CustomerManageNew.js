/* 客户信息管理相关接口 */
import axiosService from "../axios";

/* 客户信息列表 */
export async function customerManage({
  page,
  limit,
  customerId,
  customerName,
  creditStatus,
  phone,
  identityNo,
  partnerCustomerNo
}) {
  const params = {
    page,
    limit,
    customerId,
    customerName,
    creditStatus, // 授信状态：PASSED: 通过 FAILED: 不通过 PENDING: 复议 UNKNOWN: 未知
    phone,
    identityNo,
    partnerCustomerNo
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/list",
    method: "post",
    data: params
  });
}

/* 客户公共信息查询 */
export async function publicInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detailTop/" + id,
    method: "post"
  });
}

/* 客户基础信息查询 */
export async function baseInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-basic-info/" + id,
    method: "post"
  });
}

/* 客户基础信息修改 */
export async function editBaseInfo({
  areaName,
  areaNo,
  birthDate,
  companyAddress,
  companyAreaName,
  companyAreaNo,
  companyIndustry,
  companyName,
  companyPhone,
  companyScale,
  contactAddress,
  createTime,
  customerId,
  customerName,
  degree,
  degreeText,
  education,
  educationText,
  email,
  gender,
  genderText,
  graduateYear,
  houseAddress,
  houseAreaName,
  houseAreaNo,
  houseType,
  identityNo,
  identityType,
  identityTypeText,
  maritalStatus,
  maritalStatusText,
  partnerName,
  phone,
  residenceAddress,
  residencePhone,
  residencePostcode,
  salaryRange,
  schoolAreaName,
  schoolAreaNo,
  schoolName,
  spouseIdentityNo,
  spouseIdentityType,
  spouseIdentityTypeText,
  spouseName,
  spousePhone,
  shoolProvinceName,
  shoolCityName,
  updateTime,
  workDuty
}) {
  const params = {
    areaName,
    areaNo,
    birthDate,
    companyAddress,
    companyAreaName,
    companyAreaNo,
    companyIndustry,
    companyName,
    companyPhone,
    companyScale,
    contactAddress,
    createTime,
    customerId,
    customerName,
    degree,
    degreeText,
    education,
    educationText,
    email,
    gender,
    genderText,
    graduateYear,
    houseAddress,
    houseAreaName,
    houseAreaNo,
    houseType,
    identityNo,
    identityType,
    identityTypeText,
    maritalStatus,
    maritalStatusText,
    partnerName,
    phone,
    residenceAddress,
    residencePhone,
    residencePostcode,
    salaryRange,
    schoolAreaName,
    schoolAreaNo,
    schoolName,
    spouseIdentityNo,
    spouseIdentityType,
    spouseIdentityTypeText,
    spouseName,
    spousePhone,
    updateTime,
    workDuty
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/update-basic-info",
    method: "post",
    data: params
  });
}

/* 客户账户信息查询 */
export async function accountInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-account-list/" + id,
    method: "post"
  });
}

/* 联系人信息信息查询 */
export async function listCustomerContact({ customerId, page, limit }) {
  const params = {
    customerId,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/listCustomerContact",
    method: "post",
    data: params
  });
}

/* 客户账户信息明细查询 */
export async function accountDetailInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-account-info/" + id,
    method: "post"
  });
}

/* 客户合同信息查询 */
export async function contractInfo({ customerId, page, limit }) {
  const params = {
    customerId,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-contract",
    method: "post",
    data: params
  });
}

/* 金鹏会员信息查询 */
export async function memberInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-partner-customer/" + id,
    method: "post"
  });
}

/* 授信信息查询 */
export async function creditInfo(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/detail-credit/" + id,
    method: "post"
  });
}

/* 授信信息启用冻结 */
export async function enableOrFrozen({ limitStatus, customerId }) {
  const params = {
    limitStatus,
    customerId
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/switchLimitStatus",
    method: "post",
    data: params
  });
}

/* 授信重估 */
export async function creditRefresh(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/refresh/" + id,
    method: "post"
  });
}

/* 授信信息规则详情 */
export async function ruleDetail(customerCreditId) {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/rules/" + customerCreditId,
    method: "post"
  });
}

/* 备注信息列表 */
export async function listRemarkByCustomerId({customerId, page, limit}) {
  const params = {
    customerId,
    page,
    limit
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/listRemarkByCustomerId",
    method: "post",
    data: params
  });
}

/* 备注信息-修改 */
export async function customerUpdateRemar({id, remarkContent}) {
  const params = {
    id,
    remarkContent
  };
  return axiosService({
    url: "/admin-api-hnair/customer-info/updateRemark",
    method: "post",
    data: params
  });
}

/* 备注信息-删除 */
export async function customerDeleteRemark(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/deleteRemark/" + id,
    method: "post"
  });
}

/* 备注信息-详情 */
export async function readRemark(id) {
  return axiosService({
    url: "/admin-api-hnair/customer-info/readRemark/" + id,
    method: "post"
  });
}

/* 备注信息-新增 */
export async function saveCustomerRemark({remarkContent, customerId}) {
  const params = {
    remarkContent,
    customerId
  }
  return axiosService({
    url: "/admin-api-hnair/customer-info/saveCustomerRemark",
    method: "post",
    data: params
  });
}


/* 证件类型 */
export async function cardType() {
  return axiosService({
    url: "/admin-api-hnair/customer-info/identity-type",
    method: "post"
  });
}

/* 户籍所在地 */
export async function areaInfo() {
  return axiosService({
    url: "/admin-api-hnair/customer-info/area-info",
    method: "post"
  });
}

/* 授信状态 */
export async function creditStatusList() {
  return axiosService({
    url: "/admin-api-hnair/customer-credit/listLimitStatusEnum",
    method: "post"
  });
}

/* 性别 */
export async function genderList() {
  return axiosService({
    url: "/admin-api-hnair/customer-info/gender",
    method: "post"
  });
}

/* 婚姻状况 */
export async function maritalStatusList() {
  return axiosService({
    url: "/admin-api-hnair/customer-info/maritalStatus",
    method: "post"
  });
}

/* 最高学历 */
export async function degreeList() {
  return axiosService({
    url: "/admin-api-hnair/customer-info/degree",
    method: "post"
  });
}

/* 最高学位 */
export async function educationList() {
  return axiosService({
    url: "/admin-api-hnair/customer-info/education",
    method: "post"
  });
}

// 导出
export async function exportExcel({customerId, customerName, creditLimit, phone, identityNo, availableLimit, creditStatus, page, limit}) {
  const params = {
    customerId: customerId ? customerId : '',
    customerName: customerName ? customerName : '',
    phone: phone ? phone : '',
    creditLimit: creditLimit ? creditLimit : '',
    identityNo: identityNo ? identityNo : '',
    availableLimit: availableLimit ? availableLimit : '',
    creditStatus: creditStatus ? creditStatus : '',
    page,
    limit
  };
  return axiosService({
    url: '/admin-api-hnair/finace-settle/exporCustomerInfo',
    method: 'post',
    data: params,
    responseType: 'blob'
  });
}

export default {
  customerManage,
  creditStatusList,
  publicInfo,
  baseInfo,
  editBaseInfo,
  accountInfo,
  accountDetailInfo,
  contractInfo,
  memberInfo,
  creditInfo,
  enableOrFrozen,
  cardType,
  areaInfo,
  genderList,
  maritalStatusList,
  degreeList,
  educationList,
  listCustomerContact,
  exportExcel,
  listRemarkByCustomerId,
  customerDeleteRemark,
  customerUpdateRemar,
  saveCustomerRemark,
  readRemark,
  creditRefresh
}

Date.prototype.Format = function(fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
