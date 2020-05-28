import * as constants from "./constants";

/**
 * 生成 CREDIT_APPROVAL 动作的函数
 * @param {String} value 授信审批-筛查参数与页码 
 */
export const creditApproval = value => {
  return {
    type: constants.CREDIT_APPROVAL,
    value
  }
}

/**
 * 生成 TEAMS_APPROVAL 动作的函数
 * @param {String} value 支用审批-筛查参数与页码 
 */
export const teamsApproval = value => {
  return {
    type: constants.TEAMS_APPROVAL,
    value
  }
}

/**
 * 生成 OFFLINE_REPAY 动作的函数
 * @param {String} value 线下还款登记审批-筛查参数与页码 
 */
export const offlineRepay = value => {
  return {
    type: constants.OFFLINE_REPAY,
    value
  }
}
/**
 * 生成 OFFLINE_REPAY 动作的函数
 * @param {String} value 展期审批-筛查参数与页码 
 */
export const postponeApprove = value => {
  return {
    type: constants.POSTPONE_APPROVE,
    value
  }
}

/**
 * 生成 FEE_WAIVER 动作的函数
 * @param {String} value 息费减免审批-筛查参数与页码 
 */
export const feeWaiver = value => {
  return {
    type: constants.FEE_WAIVER,
    value
  }
}

/**
 * 生成 BLACK_LIST 动作的函数
 * @param {String} value 息费减免审批-筛查参数与页码 
 */
export const blackList = value => {
  return {
    type: constants.BLACK_LIST,
    value
  }
}

/**
 * 生成 APPROVAL_INITIALIZE 动作的函数
 * @param {String} value 初始化创库-筛查参数与页码 
 */
export const approvalInitialization = path => {
  return {
    type: constants.APPROVAL_INITIALIZE,
    path
  }
}
