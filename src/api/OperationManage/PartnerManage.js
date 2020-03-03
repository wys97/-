/* 合作机构管理接口信息 */
import axiosService from "../axios";

/*
 * 合作机构管理列表查询
 */
export async function queryPartnerList({partnerNo, partnerName, partnerBusiness, partnerStatus, page, limit}) {
  const params = {
    partnerNo,
    partnerName,
    partnerBusiness,
    partnerStatus,
    page,
    limit
  };
  return axiosService({
    url: '/admin-api/partner/list',
    method: 'post',
    data: params
  });
}

/*
 * 合作机构管理新增
 */
export async function addPartner({
                                   partnerNo,
                                   partnerName,
                                   partnerStatus,
                                   partnerBusiness,
                                   contactEmail,
                                   setupDate,
                                   areaNo,
                                   licenseNo,
                                   licenseBeginDate,
                                   licenseEndDate,
                                   licenseAddress,
                                   licenseAreaNo,
                                   stateTaxNo,
                                   localTaxNo,
                                   organizationNo,
                                   organizationEndDate,
                                   socialCreditNo,
                                   isLoanUser,
                                   totalAsset,
                                   totalLiability,
                                   registeredCapital,
                                   paidCapital,
                                   partnerScale,
                                   operatorDescription,
                                   businessDescription,
                                   businessAddress,
                                   postcode,
                                   actualController,
                                   creditRating,
                                   remark
                                 }) {
  const params = {
    partnerNo,
    partnerName,
    partnerStatus,
    partnerBusiness,
    contactEmail,
    setupDate: setupDate && setupDate._d ? new Date(setupDate._d).Format('yyyy-MM-dd') : '',
    areaNo,
    licenseNo,
    licenseBeginDate: licenseBeginDate && licenseBeginDate._d ? new Date(licenseBeginDate._d).Format('yyyy-MM-dd') : '',
    licenseEndDate: licenseEndDate && licenseEndDate._d ? new Date(licenseEndDate._d).Format('yyyy-MM-dd') : '',
    licenseAddress,
    licenseAreaNo,
    stateTaxNo,
    localTaxNo,
    organizationNo,
    organizationEndDate: organizationEndDate && organizationEndDate._d ? new Date(organizationEndDate._d).Format('yyyy-MM-dd') : '',
    socialCreditNo,
    isLoanUser,
    totalAsset,
    totalLiability,
    registeredCapital,
    paidCapital,
    partnerScale,
    operatorDescription,
    businessDescription,
    businessAddress,
    postcode,
    actualController,
    creditRating,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/add',
    method: 'post',
    data: params
  });
}

/*
 * 合作机构管理修改
 */
export async function editPartner({
                                    partnerNo,
                                    partnerName,
                                    partnerStatus,
                                    partnerBusiness,
                                    contactEmail,
                                    setupDate,
                                    areaNo,
                                    licenseNo,
                                    licenseBeginDate,
                                    licenseEndDate,
                                    licenseAddress,
                                    licenseAreaNo,
                                    stateTaxNo,
                                    localTaxNo,
                                    organizationNo,
                                    organizationEndDate,
                                    socialCreditNo,
                                    isLoanUser,
                                    totalAsset,
                                    totalLiability,
                                    registeredCapital,
                                    paidCapital,
                                    partnerScale,
                                    operatorDescription,
                                    businessDescription,
                                    businessAddress,
                                    postcode,
                                    actualController,
                                    creditRating,
                                    remark
                                  }) {
  const params = {
    partnerNo,
    partnerName,
    partnerStatus,
    partnerBusiness,
    contactEmail,
    setupDate: setupDate && setupDate._d ? new Date(setupDate._d).Format('yyyy-MM-dd') : '',
    areaNo,
    licenseNo,
    licenseBeginDate: licenseBeginDate && licenseBeginDate._d ? new Date(licenseBeginDate._d).Format('yyyy-MM-dd') : '',
    licenseEndDate: licenseEndDate && licenseEndDate._d ? new Date(licenseEndDate._d).Format('yyyy-MM-dd') : '',
    licenseAddress,
    licenseAreaNo,
    stateTaxNo,
    localTaxNo,
    organizationNo,
    organizationEndDate: organizationEndDate && organizationEndDate._d ? new Date(organizationEndDate._d).Format('yyyy-MM-dd') : '',
    socialCreditNo,
    isLoanUser,
    totalAsset,
    totalLiability,
    registeredCapital,
    paidCapital,
    partnerScale,
    operatorDescription,
    businessDescription,
    businessAddress,
    postcode,
    actualController,
    creditRating,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/update',
    method: 'post',
    data: params
  });
}

/*
 * 合作机构管理启用
 */
export async function enablePartner(id) {
  return axiosService({
    url: '/admin-api/partner/enable/' + id,
    method: 'post'
  });
}

/*
 * 合作机构管理停用
 */
export async function disablePartner(id) {
  return axiosService({
    url: '/admin-api/partner/disable/' + id,
    method: 'post'
  });
}

/**
 * 合作机构删除
 */
export async function deletePartner(id) {
  return axiosService({
    url: '/admin-api/partner/delete/' + id,
    method: 'post'
  });
}

/*
 * 合作机构管理详情
 */
export async function partnerDetail(id) {
  return axiosService({
    url: '/admin-api/partner/detail/' + id,
    method: 'post'
  });
}

/*
 * 合作机构状态查询
 */
export async function queryPartnerStatus() {
  return axiosService({
    url: '/admin-api/partner/status',
    method: 'post'
  });
}

/*
 * 合作机构类型查询
 */
export async function queryPartnerType() {
  return axiosService({
    url: '/admin-api/partner/type',
    method: 'post'
  });
}

/*
 * 是否贷款运用方
 */
export async function queryLoanUser() {
  return axiosService({
    url: '/admin-api/partner/loan-user',
    method: 'post'
  });
}

/*
 * 企业类型
 */
export async function queryCompanyType() {
  return axiosService({
    url: '/admin-api/partner/scale',
    method: 'post'
  });
}

/*
 * 股东类型
 */
export async function queryStockholderType() {
  return axiosService({
    url: '/admin-api/partner/shareholder-type',
    method: 'post'
  });
}

/*
 * 币种
 */
export async function queryCurrency() {
  return axiosService({
    url: '/admin-api/partner/currency',
    method: 'post'
  });
}

/*
 * 实际控制人标志
 */
export async function queryControllerFlag() {
  return axiosService({
    url: '/admin-api/partner/controller-flag',
    method: 'post'
  });
}

/*
 * 联系人类型
 */
export async function queryContactRole() {
  return axiosService({
    url: '/admin-api/partner/contact-role',
    method: 'post'
  });
}

/*
 * 联系人证件类型
 */
export async function queryIdentityType() {
  return axiosService({
    url: '/admin-api/common/identity-type',
    method: 'post'
  });
}

/*
 * 联系人职务
 */
export async function queryContactDuty() {
  return axiosService({
    url: '/admin-api/partner/contact-duty',
    method: 'post'
  });
}

/*
 * 行政区划查询
 */
export async function queryAreaList() {
  return axiosService({
    url: '/admin-api/partner/area-list',
    method: 'post'
  });
}

/*
 * 资质等级查询
 */
export async function queryCertificateRank() {
  return axiosService({
    url: 'admin-api/partner/certificate-level',
    method: 'post'
  });
}

/*
 * 资质信息列表查询
 */
export async function queryCertificateList({partnerNo}) {
  return axiosService({
    url: '/admin-api/partner/list-certificate/' + partnerNo,
    method: 'post'
  });
}

/*
 * 资质信息明细查询
 */
export async function certificateDetail(id) {
  return axiosService({
    url: '/admin-api/partner/detail-certificate/' + id,
    method: 'post'
  });
}

/*
 * 资质信息新增
 */
export async function addCertificate({partnerNo, certificateNo, certificateName, certificateLevel, issueDate, endDate, issueOrgan, certificateDescription, remark}) {
  const params = {
    partnerNo,
    certificateNo,
    certificateName,
    certificateLevel,
    issueDate: issueDate && issueDate._d ? new Date(issueDate._d).Format('yyyy-MM-dd') : '',
    endDate: endDate && endDate._d ? new Date(endDate._d).Format('yyyy-MM-dd') : '',
    issueOrgan,
    certificateDescription,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/add-certificate',
    method: 'post',
    data: params
  });
}

/*
 * 资质信息修改
 */
export async function editCertificate({certificateId, certificateNo, certificateName, certificateLevel, issueDate, endDate, issueOrgan, certificateDescription, remark}) {
  const params = {
    certificateId,
    certificateNo,
    certificateName,
    certificateLevel,
    issueDate: issueDate._d ? new Date(issueDate._d).Format('yyyy-MM-dd') : issueDate,
    endDate: endDate._d ? new Date(endDate._d).Format('yyyy-MM-dd') : endDate,
    issueOrgan,
    certificateDescription,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/update-certificate',
    method: 'post',
    data: params
  });
}

/*
 * 资质信息删除
 */
export async function delCertificate(id) {
  return axiosService({
    url: '/admin-api/partner/delete-certificate/' + id,
    method: 'post'
  });
}

/*
 * 财务信息列表查询
 */
export async function queryFinanceList({partnerNo}) {
  return axiosService({
    url: '/admin-api/partner/list-finance/' + partnerNo,
    method: 'post'
  });
}

/*
 * 财务信息明细查询
 */
export async function financeDetail(id) {
  return axiosService({
    url: '/admin-api/partner/detail-finance/' + id,
    method: 'post'
  });
}

/*
 * 财务信息新增
 */
export async function addFinance({partnerNo, reportEndDate, totalAsset, totalLiability, currentAsset, currentLiability, ownerEquity, saleCost, saleRevenue, incomeTax, netProfit, netCash, borrowAmount, interestExpense, cashAmount, netAsset, saleIncomeGrowth, saleProfitGrowth, assetLiabilityRatio, remark}) {
  const params = {
    partnerNo,
    reportEndDate: new Date(reportEndDate._d).Format('yyyy-MM-dd'),
    totalAsset,
    totalLiability,
    currentAsset,
    currentLiability,
    ownerEquity,
    saleCost,
    saleRevenue,
    incomeTax,
    netProfit,
    netCash,
    borrowAmount,
    interestExpense,
    cashAmount,
    netAsset,
    saleIncomeGrowth,
    saleProfitGrowth,
    assetLiabilityRatio,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/add-finance',
    method: 'post',
    data: params
  });
}

/*
 * 财务信息修改
 */
export async function editFinance({financeId, reportEndDate, totalAsset, totalLiability, currentAsset, currentLiability, ownerEquity, saleCost, saleRevenue, incomeTax, netProfit, netCash, borrowAmount, interestExpense, cashAmount, netAsset, saleIncomeGrowth, saleProfitGrowth, assetLiabilityRatio, remark}) {
  const params = {
    financeId,
    reportEndDate: reportEndDate._d ? new Date(reportEndDate._d).Format('yyyy-MM-dd') : reportEndDate,
    totalAsset,
    totalLiability,
    currentAsset,
    currentLiability,
    ownerEquity,
    saleCost,
    saleRevenue,
    incomeTax,
    netProfit,
    netCash,
    borrowAmount,
    interestExpense,
    cashAmount,
    netAsset,
    saleIncomeGrowth,
    saleProfitGrowth,
    assetLiabilityRatio,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/update-finance',
    method: 'post',
    data: params
  });
}

/*
 * 财务信息删除
 */
export async function delFinance(id) {
  return axiosService({
    url: '/admin-api/partner/delete-finance/' + id,
    method: 'post'
  });
}

/*
 * 股东信息列表查询
 */
export async function queryShareholderList({partnerNo}) {
  return axiosService({
    url: '/admin-api/partner/list-shareholder/' + partnerNo,
    method: 'post'
  });
}

/*
 * 股东信息明细查询
 */
export async function shareholderDetail(id) {
  return axiosService({
    url: '/admin-api/partner/detail-shareholder/' + id,
    method: 'post'
  });
}

/*
 * 股东信息新增
 */
export async function addShareholder({partnerNo, shareholderName, shareholderType, phone, shareCertificateNo, shareRatio, shareAmount, shareCurrency, shareDate, controllerFlag, address, remark}) {
  const params = {
    partnerNo,
    shareholderName,
    shareholderType,
    phone,
    shareCertificateNo,
    shareRatio,
    shareAmount,
    shareCurrency,
    shareDate: new Date(shareDate._d).Format('yyyy-MM-dd'),
    controllerFlag,
    address,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/add-shareholder',
    method: 'post',
    data: params
  });
}

/*
 * 股东信息修改
 */
export async function editShareholder({shareholderId, shareholderName, shareholderType, phone, shareCertificateNo, shareRatio, shareAmount, shareCurrency, shareDate, controllerFlag, address, remark}) {
  const params = {
    shareholderId,
    shareholderName,
    shareholderType,
    phone,
    shareCertificateNo,
    shareRatio,
    shareAmount,
    shareCurrency,
    shareDate: shareDate._d ? new Date(shareDate._d).Format('yyyy-MM-dd') : shareDate,
    controllerFlag,
    address,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/update-shareholder',
    method: 'post',
    data: params
  });
}

/*
 * 股东信息删除
 */
export async function delShareholder(id) {
  return axiosService({
    url: '/admin-api/partner/delete-shareholder/' + id,
    method: 'post'
  });
}

/*
 * 联系人信息列表查询
 */
export async function queryContactList({partnerNo}) {
  return axiosService({
    url: '/admin-api/partner/list-contact/' + partnerNo,
    method: 'post'
  });
}

/*
 * 联系人信息明细查询
 */
export async function contactDetail(id) {
  return axiosService({
    url: '/admin-api/partner/detail-contact/' + id,
    method: 'post'
  });
}

/*
 * 联系人信息新增
 */
export async function addContact({partnerNo, contactName, contactRole, phone, identityType, identityNo, contactDuty, contactEmail, contactTax, remark}) {
  const params = {
    partnerNo,
    contactName,
    contactRole,
    phone,
    identityType,
    identityNo,
    contactDuty,
    contactEmail,
    contactTax,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/add-contact',
    method: 'post',
    data: params
  });
}

/*
 * 联系人信息修改
 */
export async function editContact({contactId, contactName, contactRole, phone, identityType, identityNo, contactDuty, contactEmail, contactTax, remark}) {
  const params = {
    contactId,
    contactName,
    contactRole,
    phone,
    identityType,
    identityNo,
    contactDuty,
    contactEmail,
    contactTax,
    remark
  };
  return axiosService({
    url: '/admin-api/partner/update-contact',
    method: 'post',
    data: params
  });
}

/*
 * 联系人信息删除
 */
export async function delContact(id) {
  return axiosService({
    url: '/admin-api/partner/delete-contact/' + id,
    method: 'post'
  });
}

/*
 * 接口配置详情查询
 */
export async function interfaceDetail(id) {
  return axiosService({
    url: '/admin-api/partner/detail-config/' + id,
    method: 'post'
  })
}

/*
 * 接口配置保存
 */
export async function saveInterface({partnerNo, systemPublicKey, partnerPublicKey, partnerNotifyUrl, partnerIpWhitelist}) {
  const params = {
    partnerNo,
    systemPublicKey,
    partnerPublicKey,
    partnerNotifyUrl,
    partnerIpWhitelist
  };
  return axiosService({
    url: '/admin-api/partner/save-config',
    method: 'post',
    data: params
  })
}

/*
 * 系统公钥查询
 */
export async function getSysKey() {
  return axiosService({
    url: '/admin-api/partner/secret-key',
    method: 'post'
  })
}

/*
 * 评级信息列表查询
 */
export async function queryRankList({partnerNo}) {
  return axiosService({
    url: '/admin-api/partner/rating-info/' + partnerNo,
    method: 'post'
  })
}

/*
 * 评级明细信息查询
 */
export async function queryRankDetail(ratingId) {
  return axiosService({
    url: '/admin-api/partner/rating-detail/' + ratingId,
    method: 'post'
  })
}

export default {
  queryPartnerList,
  addPartner,
  editPartner,
  enablePartner,
  disablePartner,
  deletePartner,
  partnerDetail,
  queryPartnerStatus,
  queryPartnerType,
  queryLoanUser,
  queryCompanyType,
  queryStockholderType,
  queryCurrency,
  queryControllerFlag,
  queryContactRole,
  queryIdentityType,
  queryContactDuty,
  queryAreaList,
  queryCertificateRank,
  queryCertificateList,
  certificateDetail,
  addCertificate,
  editCertificate,
  delCertificate,
  queryFinanceList,
  financeDetail,
  addFinance,
  editFinance,
  delFinance,
  queryShareholderList,
  shareholderDetail,
  addShareholder,
  editShareholder,
  delShareholder,
  queryContactList,
  contactDetail,
  addContact,
  editContact,
  delContact,
  interfaceDetail,
  saveInterface,
  getSysKey,
  queryRankList,
  queryRankDetail
}

Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
