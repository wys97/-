import * as constants from "./constants";

/**
 * 生成 CLIENT_FORMVALUE 动作的函数
 * @param {String} value 客户管理-筛查参数与页码 
 */
export const clientFormValue = value => {
  return {
    type: constants.CLIENT_FORMVALUE,
    value
  }
}

/**
 * 生成 CREDIT_DIVISION 动作的函数
 * @param {String} value 授信分案-筛查参数与页码 
 */
export const creditDivision = value => {
  return {
    type: constants.CREDIT_DIVISION,
    value
  }
}

/**
 * 生成 CREDIT_MANAGE 动作的函数
 * @param {String} value 授信申请记录-筛查参数与页码 
 */
export const creditManage = value => {
  return {
    type: constants.CREDIT_MANAGE,
    value
  }
}

/**
 * 生成 CREDIT_USERLIST 动作的函数
 * @param {String} value 授信用户列表-筛查参数与页码 
 */
export const creditUserList = value => {
  return {
    type: constants.CREDIT_USERLIST,
    value
  }
}

/**
 * 生成 CLIENT_FORMVALUE 动作的函数
 * @param {String} value 支用管理-筛查参数与页码 
 */
export const disburseFormValue = value => {
  return {
    type: constants.DISBURSE_FORMVALUE,
    value
  }
}

/**
 * 生成 IOU_FORMVALUE 动作的函数
 * @param {String} value 借据管理-筛查参数与页码 
 */
export const iouFormValue = value => {
  return {
    type: constants.IOU_FORMVALUE,
    value
  }
}

/**
 * 生成 LOAN_FORMVALUE 动作的函数
 * @param {String} value 放款明细-筛查参数与页码 
 */
export const loanFormValue = value => {
  return {
    type: constants.LOAN_FORMVALUE,
    value
  }
}

/**
 * 生成 REFUND_FORMVALUE 动作的函数
 * @param {String} value 还款明细-筛查参数与页码 
 */
export const refundFormValue = value => {
  return {
    type: constants.REFUND_FORMVALUE,
    value
  }
}
/**
 * 生成 REFUND_FORMVALUE 动作的函数
 * @param {String} value 还款借据明细-筛查参数与页码 
 */
export const debtFormValue = value => {
  return {
    type: constants.DEBT_FORMVALUE,
    value
  }
}

/**
 * 生成 OVERDUE_FORMVALUE 动作的函数
 * @param {String} value 逾期明细-筛查参数与页码 
 */
export const overdueFormValue = value => {
  return {
    type: constants.OVERDUE_FORMVALUE,
    value
  }
}

/**
 * 生成 OVERDUEREPAY_FORMVALUE 动作的函数
 * @param {String} value 退票明细-筛查参数与页码 
 */
export const overdueRepayFormValue = value => {
  return {
    type: constants.OVERDUEREPAY_FORMVALUE,
    value
  }
}

/**
 * 生成 OVERPAYMENT_FORMVALUE 动作的函数
 * @param {String} value 溢缴款明细-筛查参数与页码 
 */
export const overpaymentFormValue = value => {
  return {
    type: constants.OVERPAYMENT_FORMVALUE,
    value
  }
}

/**
 * 生成 OFFLINE_PAYMENT 动作的函数
 * @param {String} value 线下还款登记-筛查参数与页码 
 */
export const offlinePayment = value => {
  return {
    type: constants.OFFLINE_PAYMENT,
    value
  }
}

/**
 * 生成 FEEWAIVER_FORMVALUE 动作的函数
 * @param {String} value 息费调整-筛查参数与页码 
 */
export const feeWaiver = value => {
  return {
    type: constants.FEEWAIVER_FORMVALUE,
    value
  }
}
/**
 * 生成 FEEWAIVER_FORMVALUE 动作的函数
 * @param {String} value 展期-筛查参数与页码 
 */
export const postpone = value => {
  return {
    type: constants.POSTPONE_FORMVALUE,
    value
  }
}

/**
 * 生成 INIT_IALIZE 动作的函数
 * @param {String} value 初始化创库-筛查参数与页码 
 */
export const initialize = path => {
  return {
    type: constants.INIT_IALIZE,
    path
  }
}

