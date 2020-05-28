import * as constants from "./constants";
const stateInit = {
  clientManage: {
    //贷款业务管理-客户管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  creditDivision: {
    //贷款业务管理-授信分案-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  creditManage: {
    //贷款业务管理-授信申请记录-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  creditUserList: {
    //贷款业务管理-授信用户列表-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  loanApplyManage: {
    //贷款业务管理-支用管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  iouManage: {
    //贷款业务管理-借据管理-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  loanDetail: {
    //贷款业务管理-放款明细-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  refundDetail: {
    //贷款业务管理-还款明细-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  debtDetail: {
    //贷款业务管理-还款借据明细-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  overdueDetail: {
    //贷款业务管理-逾期明细-默认初始数据
    formValue: {
      isClear: false,
    },
    page: 1,
    limit: 10
  },
  overdueRepayDetail: {
    //贷款业务管理-退票明细-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  overpaymentDetail: {
    //贷款业务管理-溢缴款明细-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  offlinePayment: {
    //贷款业务管理-线下还款登记-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  feeWaiver: {
    //贷款业务管理-息费调整-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  },
  postpone: {
    //贷款业务管理-息费调整-默认初始数据
    formValue: {},
    page: 1,
    limit: 10
  }
};
export default (state = stateInit, action) => {
  //贷款业务管理-客户管理-页面数据修改
  if (action.type === constants.CLIENT_FORMVALUE) {
    return Object.assign({}, state, {
      clientManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-授信分案-页面数据修改
  if (action.type === constants.CREDIT_DIVISION) {
    return Object.assign({}, state, {
      creditDivision: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-授信申请记录-页面数据修改
  if (action.type === constants.CREDIT_MANAGE) {
    return Object.assign({}, state, {
      creditManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-授信用户列表-页面数据修改
  if (action.type === constants.CREDIT_USERLIST) {
    return Object.assign({}, state, {
      creditUserList: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-支用管理-页面数据修改
  if (action.type === constants.DISBURSE_FORMVALUE) {
    return Object.assign({}, state, {
      loanApplyManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-借据管理-页面数据修改
  if (action.type === constants.IOU_FORMVALUE) {
    return Object.assign({}, state, {
      iouManage: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-放款明细-页面数据修改
  if (action.type === constants.LOAN_FORMVALUE) {
    return Object.assign({}, state, {
      loanDetail: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-还款明细-页面数据修改
  if (action.type === constants.REFUND_FORMVALUE) {
    return Object.assign({}, state, {
      refundDetail: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-还款借据明细-页面数据修改
  if (action.type === constants.DEBT_FORMVALUE) {
    return Object.assign({}, state, {
      debtDetail: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //贷款业务管理-逾期明细-页面数据修改
  if (action.type === constants.OVERDUE_FORMVALUE) {
    return Object.assign({}, state, {
      overdueDetail: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
   //贷款业务管理-退票明细-页面数据修改
   if (action.type === constants.OVERDUEREPAY_FORMVALUE) {
    return Object.assign({}, state, {
      overdueRepayDetail: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
//贷款业务管理-溢缴款明细-页面数据修改
if (action.type === constants.OVERPAYMENT_FORMVALUE) {
  return Object.assign({}, state, {
    overpaymentDetail: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}
//贷款业务管理-线下还款登记-页面数据修改
if (action.type === constants.OFFLINE_PAYMENT) {
  return Object.assign({}, state, {
    offlinePayment: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}
//贷款业务管理-息费调整-页面数据修改
if (action.type === constants.FEEWAIVER_FORMVALUE) {
  return Object.assign({}, state, {
    feeWaiver: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}
//贷款业务管理-展期管理-页面数据修改
if (action.type === constants.POSTPONE_FORMVALUE) {
  return Object.assign({}, state, {
    postpone: {
      formValue: action.value.formValue,
      page: action.value.page,
      limit: action.value.limit
    }
  });
}


  if (action.type === constants.INIT_IALIZE) {
    if (action.path == "/baseinfo/customer") {
      //客户管理-页面数据-初始化
      return Object.assign({}, state, {
        clientManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/hnairLoanManage/creditDivision") {
      //授信分案-页面数据-初始化
      return Object.assign({}, state, {
        creditDivision: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/hnairLoanManage/creditManage") {
      //授信申请记录-页面数据-初始化
      return Object.assign({}, state, {
        creditManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/hnairLoanManage/creditUserList") {
      //授信用户列表-页面数据-初始化
      return Object.assign({}, state, {
        creditUserList: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/assetManage/loanApply") {
      //支用管理-页面数据-初始化
      return Object.assign({}, state, {
        loanApplyManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/assetManage/IOUManage") {
      //借据管理-页面数据-初始化
      return Object.assign({}, state, {
        iouManage: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/fundManage/hnairLoanDetail") {
      //放款明细-页面数据-初始化
      return Object.assign({}, state, {
        loanDetail: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/fundManage/hnairRepayDetail") {
      //还款明细-页面数据-初始化
      return Object.assign({}, state, {
        refundDetail: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/fundManage/hnairRepayment") {
      //还款借据明细-页面数据-初始化
      return Object.assign({}, state, {
        debtDetail: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/postLendingManage/hnairOverdueRepay") {
      //逾期明细-页面数据-初始化
      return Object.assign({}, state, {
        overdueDetail: {
          formValue: {
            isClear: false,
          },
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/hnairLoanManage/hnairDrawBack") {
      //退票明细-页面数据-初始化
      return Object.assign({}, state, {
        overdueRepayDetail: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/hnairLoanManage/hnairRefundManage") {
      //溢缴款明细-页面数据-初始化
      return Object.assign({}, state, {
        overpaymentDetail: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/businessChange/HnairofflineRegister") {
      //线下还款登记-页面数据-初始化
      return Object.assign({}, state, {
        offlinePayment: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/businessChange/feeWaiver") {
      //息费调整-页面数据-初始化
      return Object.assign({}, state, {
        feeWaiver: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/businessChange/postponeManage") {
      //展期管理-页面数据-初始化
      return Object.assign({}, state, {
        postpone: {
          formValue: {},
          page: 1,
          limit: 10
        }
      });
    }
  }
  return state;
};
