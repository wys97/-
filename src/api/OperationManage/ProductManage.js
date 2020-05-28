/* 产品信息列表 */
import axiosService from "../axios";

export async function productList(params) {
  return axiosService({
    url: "/admin-api/product/list",
    method: "post",
    data: params
  });
}

//产品管理-产品类型-下拉框
export async function productType(params) {
  return axiosService({
    url: "/admin-api/product/product-type",
    method: "post",
    data: params
  });
}

//产品管理-产品状态-下拉框
export async function productStatus(params) {
  return axiosService({
    url: "/admin-api/product/product-status",
    method: "post",
    data: params
  });
}

//产品管理-核算类型-下拉框
export async function productAccoutingType(params) {
  return axiosService({
    url: "/admin-api/product/accouting-type",
    method: "post",
    data: params
  });
}

//产品管理-支持的还款方式-下拉框
export async function productRepayMethod(params) {
  return axiosService({
    url: "/admin-api/product/repay-method",
    method: "post",
    data: params
  });
}

// 产品管理-不足月首期还款日-下拉框
export async function repayDate() {
  return axiosService({
    url: "/admin-api/product/first-repay-day",
    method: "post"
  });
}

// 产品管理-首期不足月计息方式-下拉框
export async function calcInterest() {
  return axiosService({
    url: "/admin-api/product/first-interest-method",
    method: "post"
  });
}

//产品管理-整数化方法-下拉框
export async function productRoundMethod(params) {
  return axiosService({
    url: "/admin-api/product/round-method",
    method: "post",
    data: params
  });
}

//产品管理-扣款顺序-下拉框
export async function productRepaySequence(params) {
  return axiosService({
    url: "/admin-api/product/repay-sequence",
    method: "post",
    data: params
  });
}

//产品管理-提还计划更新方式-下拉框
export async function productPrepayChangePlan(params) {
  return axiosService({
    url: "/admin-api/product/prepay-change-plan",
    method: "post",
    data: params
  });
}
//产品管理-提还按日计息下拉-下拉框
export async function prepayInterestMethod () {
  return axiosService({
    url: "/admin-api/common/prepay-interest-method",
    method: "post"
  });
}


//产品管理-提还违约金公式-下拉框
export async function productPrepayDamageFormula(params) {
  return axiosService({
    url: "/admin-api/product/prepay-damage-formula",
    method: "post",
    data: params
  });
}

//产品管理-逾期罚息公式-下拉框
export async function productOverdueFineFormula(params) {
  return axiosService({
    url: "/admin-api/product/overdue-fine-formula",
    method: "post",
    data: params
  });
}

//产品管理-授信风控结果-下拉框
export async function customerCreditCreditResult(params) {
  return axiosService({
    url: "admin-api-hnair/customer-credit/credit-result",
    method: "post",
    data: params
  });
}

//产品管理-合作机构
export async function productPartnerInfo(params) {
  return axiosService({
    url: "/admin-api/common/partner-info",
    method: "post",
    data: params
  });
}

//产品管理-展业地区
export async function productAreaInfo(params) {
  return axiosService({
    url: "/admin-api/product/area-info",
    method: "post",
    data: params
  });
}

//产品管理-详情
export async function productDetail(id) {
  return axiosService({
    url: "/admin-api/product/detail/" + id,
    method: "post"
  });
}

//产品管理-新增
export async function productAdd(params) {
  return axiosService({
    url: "/admin-api/product/add",
    method: "post",
    data: params
  });
}

//产品管理-还款方式配置
export async function productRepayMethodList(params) {
  return axiosService({
    url: "/admin-api/product/repay-method/list/" + params.productNo,
    method: "post"
  });
}

//产品管理-还款方式配置-详情
export async function productRepayMethodDetail(id) {
  return axiosService({
    url: "/admin-api/product/repay-method/detail/" + id,
    method: "post"
  });
}

//产品管理-还款方式配置-新增
export async function productRepayMethodInsert(params) {
  return axiosService({
    url: "/admin-api/product/repay-method/insert",
    method: "post",
    data: params
  });
}
//产品管理-还款方式配置-删除
export async function productRepayMethodDelete(id) {
  return axiosService({
    url: "/admin-api/product/repay-method/delete/" + id,
    method: "post"
  });
}

//产品管理-还款方式配置-修改
export async function productRepayMethodUpdate({
  id,
  productNo,
  repayMethod,
  firstRepayDay,
  firstInterestMethod,
  roundMethod,
  isTerm1,
  isTerm3,
  isTerm6,
  isTerm9,
  isTerm12,
  isTerm24,
  isTerm36
}) {
  const params = {
    id,
    productNo,
    repayMethod,
    firstRepayDay,
    firstInterestMethod,
    roundMethod,
    isTerm1,
    isTerm3,
    isTerm6,
    isTerm9,
    isTerm12,
    isTerm24,
    isTerm36
  };
  return axiosService({
    url: "/admin-api/product/repay-method/update",
    method: "post",
    data: params
  });
}

//产品管理-筛查规则列表
export async function productRuleInfo(params) {
  return axiosService({
    url: "/admin-api/product/rule-info/" + params.productNo,
    method: "post"
  });
}

//产品管理-结算账户列表
export async function productAccountInfo(id) {
  return axiosService({
    url: "/admin-api/product/account-info/" + id,
    method: "post"
  });
}

//产品管理-筛查规则启用
export async function productRuleEnabled(id) {
  return axiosService({
    url: "/admin-api/product/rule-enabled/" + id,
    method: "post"
  });
}

//产品管理-筛查规则停用
export async function productRuleDisabled(id) {
  return axiosService({
    url: "/admin-api/product/rule-disabled/" + id,
    method: "post"
  });
}

//产品管理-修改
export async function productUpdate({
  productNo,
  productStatus,
  productName,
  productType,
  productDescription,
  loanMinAmount,
  loanMaxAmount,
  loanMinTerm,
  loanMaxTerm,
  maxInterestRate,
  areaNo,
  accountingType,
  isFirstInterestFree,
  backoutDay,
  repaySequence,
  isPrepay,
  prepayChangePlan,
  isPrepayDamage,
  prepayDamageFormula,
  prepayDamageRate,
  debitFailDay,
  overdueGraceDay,
  overdueFineFormula,
  overdueRate,
  criticalLimit,
  limitTerm,
  limitRate
}) {
  const params = {
    productNo,
    productStatus,
    productName,
    productType,
    productDescription,
    loanMinAmount,
    loanMaxAmount,
    loanMinTerm,
    loanMaxTerm,
    maxInterestRate,
    areaNo,
    accountingType,
    isFirstInterestFree,
    backoutDay,
    repaySequence,
    isPrepay,
    prepayChangePlan,
    isPrepayDamage,
    prepayDamageFormula,
    prepayDamageRate,
    debitFailDay,
    overdueGraceDay,
    overdueFineFormula,
    overdueRate,
    criticalLimit,
    limitTerm,
    limitRate


  };
  return axiosService({
    url: "/admin-api/product/update",
    method: "post",
    data: params
  });
}

//产品管理-启动
export async function productEnabled(id) {
  return axiosService({
    url: "/admin-api/product/enabled/" + id,
    method: "post"
  });
}

//产品管理-禁用
export async function productDisabled(id) {
  return axiosService({
    url: "/admin-api/product/disabled/" + id,
    method: "post"
  });
}

// 产品管理-删除
export async function productDelete(id) {
  return axiosService({
    url: "/admin-api/product/delete/" + id,
    method: "post"
  });
}

//产品管理-利率配置-列表
export async function rateSettingList(id) {
  return axiosService({
    url: "/admin-api/product/interest-rate/" + id,
    method: "post"
  });
}

//产品管理-利率配置-删除
export async function delRateSetting(id) {
  return axiosService({
    url: "/admin-api/product/delete-interest-rate/" + id,
    method: "post"
  });
}

//产品管理-利率配置-新增
export async function addRateSetting({
  productNo,
  loanMinAmount,
  loanMaxAmount,
  interestRate1,
  interestRate3,
  interestRate6,
  interestRate9,
  interestRate12,
  interestRate24,
  interestRate36,
  maxCreditScore,
  minCreditScore,
  isInternalEmployee
}) {
  const params = {
    productNo,
    loanMinAmount,
    loanMaxAmount,
    interestRate1,
    interestRate3,
    interestRate6,
    interestRate9,
    interestRate12,
    interestRate24,
    interestRate36,
    maxCreditScore,
    minCreditScore,
    isInternalEmployee
  };
  return axiosService({
    url: "/admin-api/product/add-interest-rate",
    method: "post",
    data: params
  });
}

//产品管理-利率配置-修改
export async function editRateSetting({
  id,
  productNo,
  loanMinAmount,
  loanMaxAmount,
  interestRate1,
  interestRate3,
  interestRate6,
  interestRate9,
  interestRate12,
  interestRate24,
  interestRate36,
  maxCreditScore,
  minCreditScore,
  isInternalEmployee
}) {
  const params = {
    id,
    productNo,
    loanMinAmount,
    loanMaxAmount,
    interestRate1,
    interestRate3,
    interestRate6,
    interestRate9,
    interestRate12,
    interestRate24,
    interestRate36,
    maxCreditScore,
    minCreditScore,
    isInternalEmployee
  };
  return axiosService({
    url: "/admin-api/product/update-interest-rate",
    method: "post",
    data: params
  });
}

//产品管理-利率配置-明细
export async function rateSettingDetail(id) {
  return axiosService({
    url: "/admin-api/product/interest-rate-detail/" + id,
    method: "post"
  });
}

//产品管理-提前还款配置- 详情
export async function prepayConfigDetail(id) {
  return axiosService({
    url: "/admin-api/product/prepay-config/detail/" + id,
    method: "post"
  });
}

//产品管理-提前还款配置- 修改
export async function prepaymentModification({
  isPrepay,
  isPrepayDamage,
  prepayChangePlan,
  prepayDamageFormula,
  prepayDamageRate,
  prepayDescription,
  productNo,
  prepayInterestMethod
}) {
  const params = {
    isPrepay,
    isPrepayDamage,
    prepayChangePlan,
    prepayDamageFormula,
    prepayDamageRate,
    prepayDescription,
    productNo,
    prepayInterestMethod
  };
  return axiosService({
    url: "/admin-api/product/prepay-config/update",
    method: "post",
    data: params
  });
}

//产品管理-提还违约金倍数配置-列表
export async function damageRatioList(id) {
  return axiosService({
    url: "/admin-api/product/damage-ratio/list/" + id,
    method: "post"
  });
}

//产品管理-提还违约金倍数配置-详情
export async function damageRatioDetail(id) {
  return axiosService({
    url: "/admin-api/product/damage-ratio/detail/" + id,
    method: "post"
  });
}

//产品管理-提还违约金倍数配置-新增
export async function damageRatioInsert({
  loanTerm,
  minPeriod,
  maxPeriod,
  damageRatio,
  productNo
}) {
  const params = {
    loanTerm,
    minPeriod,
    maxPeriod,
    damageRatio,
    productNo
  };
  return axiosService({
    url: "/admin-api/product/damage-ratio/insert",
    method: "post",
    data: params
  });
}

//产品管理 - 提还违约金倍数配置 - 修改
export async function productDamageRatioUpdate({
  id,
  loanTerm,
  minPeriod,
  maxPeriod,
  damageRatio,
  productNo
}) {
  const params = {
    id,
    loanTerm,
    minPeriod,
    maxPeriod,
    damageRatio,
    productNo
  };
  return axiosService({
    url: "/admin-api/product/damage-ratio/update",
    method: "post",
    data: params
  });
}

//产品管理-提还违约金倍数配置-删除
export async function damageRatioDelete(id) {
  return axiosService({
    url: "/admin-api/product/damage-ratio/delete/" + id,
    method: "post"
  });
}

//产品管理-逾期罚息配置- 详情
export async function overdueConfigDetail(id) {
  return axiosService({
    url: "/admin-api/product/overdue-config/detail/" + id,
    method: "post"
  });
}

//产品管理-逾期罚息配置- 修改
export async function overdueConfigUpdate({
  overdueFineFormula,
  overdueGraceDay,
  overdueRate,
  productNo
}) {
  const params = {
    overdueFineFormula,
    overdueGraceDay,
    overdueRate,
    productNo
  };
  return axiosService({
    url: "/admin-api/product/overdue-config/update",
    method: "post",
    data: params
  });
}

//产品管理-自动审批配置 - 详情
export async function autoApprovalDetail(id) {
  return axiosService({
    url: "/admin-api/product/auto-approval/detail/" + id,
    method: "post"
  });
}

//产品管理-自动审批配置 - 修改
export async function autoApprovalUpdate({
  increaseCreditMaxScore,
  increaseCreditMinLimit,
  increaseCreditRisk,
  loanHistoryOverdue,
  loanMaxScore,
  loanMinAmount,
  loanMinTerm,
  loanRepayMethod,
  loanRisk,
  normalCreditMaxScore,
  normalCreditMinLimit,
  normalCreditRisk,
  renewCreditMaxScore,
  renewCreditMinLimit,
  renewCreditRisk,
  productNo
}) {
  const params = {
    increaseCreditMaxScore,
    increaseCreditMinLimit,
    increaseCreditRisk,
    loanHistoryOverdue,
    loanMaxScore,
    loanMinAmount,
    loanMinTerm,
    loanRepayMethod,
    loanRisk,
    normalCreditMaxScore,
    normalCreditMinLimit,
    normalCreditRisk,
    renewCreditMaxScore,
    renewCreditMinLimit,
    renewCreditRisk,
    productNo
  };
  return axiosService({
    url: "/admin-api/product/auto-approval/update",
    method: "post",
    data: params
  });
}

export default {
  productList,
  productType,
  productStatus,
  productAdd,
  productAccoutingType,
  productRepayMethod,
  productRoundMethod,
  productRepaySequence,
  productPrepayChangePlan,
  productPrepayDamageFormula,
  productOverdueFineFormula,
  productRepayMethodDetail,
  productRepayMethodInsert,
  productRepayMethodUpdate,
  productRepayMethodDelete,
  customerCreditCreditResult,
  productRuleInfo,
  productPartnerInfo,
  productAreaInfo,
  productDetail,
  productRuleEnabled,
  productRuleDisabled,
  productUpdate,
  productEnabled,
  productDisabled,
  productDelete,
  repayDate,
  calcInterest,
  rateSettingList,
  addRateSetting,
  editRateSetting,
  delRateSetting,
  rateSettingDetail,
  productRepayMethodList,
  productAccountInfo,
  prepayConfigDetail,
  damageRatioList,
  overdueConfigDetail,
  autoApprovalDetail,
  prepaymentModification,
  damageRatioDelete,
  productDamageRatioUpdate,
  damageRatioDetail,
  overdueConfigUpdate,
  autoApprovalUpdate,
  damageRatioInsert,
  prepayInterestMethod
};
