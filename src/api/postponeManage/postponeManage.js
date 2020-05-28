// 展期的所有接口
import axios from "../axios";

//展期管理列表
export async function getListData(data) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/list',
        method: 'post',
        data
    })
}

//展期管理-新增-借据号列表查询
export async function getLoneDueByPaidDate(dueId,paidDate) {
    const params = {
      dueId,
      paidDate
    };
    return axiosService({
      url: '/admin-api-hnair/rollover-apply/list-loan-due',
      method: 'post',
      data: params
    });
  }



//展期管理-展期借据号选择
export async function getLoanInfo(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/get-loan-due?dueId=' + id,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

//展期管理-展期列表-展期状态下拉
export async function rolloverStatus() {
    return axios({
        url: '/admin-api-hnair/rollover-apply/rollover-status-list',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
//展期管理-展期申请-头部信息条
export async function headInfo(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/head-info?rolloverId='+id,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
//展期管理-展期申请-人工审批信息
export async function loanApproval(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/loan-approval?rolloverId='+id,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}
//展期管理-展期申请-展期结果
export async function rolloverResult(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/rollover-result?rolloverId='+id,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}


//展期管理-新增-展期期数下拉
export async function repayType(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/periods-list?dueId=' + id,
        method: 'post',

    })
}
//展期管理-新增-保存
export async function offlineAddSave(data) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/save',
        method: 'post',
        data,
    })
}
//展期管理-获取信息详情
export async function getDetail(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/rollover-info?rolloverId=' + id,
        method: 'post',
    })
}
//展期管理-修改-保存
export async function offlineUpdateSave(data) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/update',
        method: 'post',
        data,
    })
}

//展期管理-列表-数据操作-确定按钮
export async function offlineConfirm(id) {
    return axios({
        url: '/admin-api-hnair/rollover-apply/rollover-confirm?rolloverId=' + id,
        method: 'post',
    })
}

//展期管理-列表-导出
export async function exportExcel({ dueId, customerName, phone, identityNo, repayMethod, applyDate, status, rolloverStatus, page, limit }) {
    let beginDate = '';
    let endDate = '';
    if (applyDate && applyDate.length > 0) {
        applyDate.map((item, index) => {
            if (index) {
                endDate = new Date(item).Format('yyyy-MM-dd');
            } else {
                beginDate = new Date(item).Format('yyyy-MM-dd');
            }
        })
    }
    const params = {
        dueId,
        customerName,
        phone,
        identityNo,
        repayMethod,
        applyDate,
        status,
        rolloverStatus,
        page,
        limit
    };
    return axios({
        url: "/admin-api-hnair/finace-settle/export/rollover-apply",
        method: "post",
        data: params,
        responseType: "blob"
    });
}



//------展期审批 -----


//展期审批列表
export async function postponeApproveList(data){
    return axios({
        url:'/admin-api/rollover-apply-approval/list',
        method:'post',
        data
    })
}
//展期审批信息详情-- 头部
export async function postponeApproveDetail(id){
    return axios({
        url:'/admin-api/rollover-apply-approval/approval-detail?approvalId='+id,
        method:'post',

    })
}
//展期审批-展期申请明细
export async function rolloverDetail(id){
    return axios({
        url:'/admin-api/rollover-apply-approval/rollover-detail?rolloverId='+id,
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
//展期审批-展期保存审批
export async function approval(data){
    return axios({
        url:'/admin-api/rollover-apply-approval/approval',
        method:'post',

        data
    })
}

export default {
    getListData,
    rolloverStatus,
    getLoneDueByPaidDate,
    getLoanInfo,
    headInfo,
    loanApproval,
    rolloverResult,
    repayType,
    offlineAddSave,
    offlineConfirm,
    getDetail,
    offlineUpdateSave,
    exportExcel,
    postponeApproveList,
    postponeApproveDetail,
    rolloverDetail,
    approval
}