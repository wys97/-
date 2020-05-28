import * as constants from "./constants";
const stateInit = {
  creditApproval: {
    //授信审批-默认初始数据
    formValue: {
      approvalStatus: "APPROVING"
    },
    page: 1,
    limit: 10
  },
  teamsApproval: {
    //支用审批-默认初始数据
    formValue: {
      approvalStatus: "APPROVING"
    },
    page: 1,
    limit: 10
  },
  offlineRepay: {
    //线下还款登记审批-默认初始数据
    formValue: {
      approvalStatus: "APPROVING"
    },
    page: 1,
    limit: 10
  },
  postponeApprove: {
    //展期审批-默认初始数据
    formValue: {
      approvalStatus: "APPROVING"
    },
    page: 1,
    limit: 10
  },
  feeWaiver: {
    //息费减免审批-默认初始数据
    formValue: {
      approvalStatus: "APPROVING"
    },
    page: 1,
    limit: 10
  },
  blackList: {
    //黑名单审批-默认初始数据
    formValue: {
      approvalStatus: "APPROVING"
    },
    page: 1,
    limit: 10
  }
};
export default (state = stateInit, action) => {
  //授信审批-页面数据修改
  if (action.type === constants.CREDIT_APPROVAL) {
    return Object.assign({}, state, {
      creditApproval: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //支用审批-页面数据修改
  if (action.type === constants.TEAMS_APPROVAL) {
    return Object.assign({}, state, {
      teamsApproval: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //线下还款登记审批-页面数据修改
  if (action.type === constants.OFFLINE_REPAY) {
    return Object.assign({}, state, {
      offlineRepay: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //展期审批-页面数据修改
  if (action.type === constants.POSTPONE_APPROVE) {
    return Object.assign({}, state, {
      postponeApprove: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //息费减免审批-页面数据修改
  if (action.type === constants.FEE_WAIVER) {
    return Object.assign({}, state, {
      feeWaiver: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }
  //黑名单审批-页面数据修改
  if (action.type === constants.BLACK_LIST) {
    return Object.assign({}, state, {
      blackList: {
        formValue: action.value.formValue,
        page: action.value.page,
        limit: action.value.limit
      }
    });
  }

  if (action.type === constants.APPROVAL_INITIALIZE) {
    if (action.path == "/approvalManage/credit") {
      //授信审批-初始化
      return Object.assign({}, state, {
        creditApproval: {
          formValue: {
            approvalStatus: "APPROVING"
          },
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/approvalManage/loan") {
      //支用审批-初始化
      return Object.assign({}, state, {
        teamsApproval: {
          formValue: {
            approvalStatus: "APPROVING"
          },
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/approvalManage/offlineRepay") {
      //线下还款登记审批-初始化
      return Object.assign({}, state, {
        offlineRepay: {
          formValue: {
            approvalStatus: "APPROVING"
          },
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/approvalManage/postponeApprove") {
      //展期审批-初始化
      return Object.assign({}, state, {
        postponeApprove: {
          formValue: {
            approvalStatus: "APPROVING"
          },
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/approvalManage/feeWaiver") {
      //息费减免审批-初始化
      return Object.assign({}, state, {
        feeWaiver: {
          formValue: {
            approvalStatus: "APPROVING"
          },
          page: 1,
          limit: 10
        }
      });
    }
    if (action.path == "/approvalManage/blacklist") {
      //黑名单审批-初始化
      return Object.assign({}, state, {
        blackList: {
          formValue: {
            approvalStatus: "APPROVING"
          },
          page: 1,
          limit: 10
        }
      });
    }
  }
  return state;
};
