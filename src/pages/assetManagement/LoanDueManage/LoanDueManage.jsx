import React, { Component } from "react";
import { Message } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import loanDueManageApi from "../../../api/AssetManagement/LoanDueManage";
import store from "../../../store";
import { iouFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

function inject_unount(target) {
  // 改装componentWillUnmount，销毁的时候记录一下
  let next = target.prototype.componentWillUnmount;
  target.prototype.componentWillUnmount = function () {
    if (next) next.call(this, ...arguments);
    this.unmount = true;
  };
  // 对setState的改装，setState查看目前是否已经销毁
  let setState = target.prototype.setState;
  target.prototype.setState = function () {
    if (this.unmount) return;
    setState.call(this, ...arguments);
  };
}
@inject_unount
export default class LoanDueManage extends Component {
  static displayName = "LoanDueManage";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.iouManage.formValue,
      page: store.getState().loanTransaction.iouManage.page,
      limit: store.getState().loanTransaction.iouManage.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.iouManage.formValue,
        page: store.getState().loanTransaction.iouManage.page,
        limit: store.getState().loanTransaction.iouManage.limit
      });
    });
  }

  form = [
    { label: "借据号", key: "dueId", type: "" },
    {
      label: "合同号",
      key: "contractNo",
      type: ""
    },
    {
      label: "客户名称",
      key: "customerName",
      type: ""
    },
    {
      label: "证件号",
      key: "identityNo",
      type: ""
    },
    { label: "手机号", key: "phone", type: "" },
    {
      label: "合作机构名称",
      key: "partnerName",
      type: ""
    },
    {
      label: "产品名称",
      key: "productName",
      type: ""
    },
    {
      label: "借据状态",
      key: "dueStatus",
      type: "select",
      list: [{ key: "全部", value: "" }]
    },
    {
      label: "结束日期",
      key: "endedDate",
      type: "range"
    },
    {
      label: "支用渠道",
      key: "tradeType",
      type: "select",
      list: [{ key: "全部", value: "" }]
    },
    {
      label: '集团内部员工', key: 'isInternalEmployee', type: 'select', list:
        [
          { key: '全部', value: '' },
          { key: '是', value: true },
          { key: '否', value: false },
        ],
    },
    { label: '代扣渠道', key: 'payChannelName', type: '' },
    {
      label: '展期状态', key: 'rolloverStatus', type: 'select',
      list: [{ key: "全部", value: "" }]
    },
  ];

  table = [
    {
      title: "借据号",
      key: "dueId",
      width: 100,
      cell: true,
      path: "/assetManage/IOUDetail"
    },
    {
      title: "合同号",
      key: "contractNo",
      width: 140
    },
    {
      title: "客户名称",
      key: "customerName",
      width: 80
    },
    {
      title: "证件号",
      key: "identityNo",
      width: 120
    },
    {
      title: "手机号",
      key: "phone",
      width: 100
    },
    {
      title: "合作机构名称",
      key: "partnerName",
      width: 180
    },
    {
      title: "项目名称",
      key: "projectName",
      width: 140
    },
    {
      title: "产品名称",
      key: "productName",
      width: 80
    },
    {
      title: "支用渠道",
      key: "tradeTypeStr",
      width: 120
    },
    {
      title: "贷款金额 (元) ",
      key: "loanAmount",
      align: "right",
      width: 110
    },
    {
      title: "贷款余额 (元) ",
      key: "loanBal",
      align: "right",
      width: 110
    },
    {
      title: "未还总额 (元) ",
      key: "unpaidAmount",
      align: "right",
      width: 110
    },
    {
      title: "借据状态",
      key: "dueStatus",
      width: 80
    },
    {
      title: "借款期限(月)",
      key: "loanTerm",
      align: "center",
      width: 110
    },
    {
      title: "贷款年利率 (%)",
      key: "yearInterestRate",
      align: "center",
      width: 120
    },
    {
      title: "还款方式",
      key: "repayMethodText",
      align: "center",
      width: 120
    },
    {
      title: "银行卡号",
      key: "bankCardNo",
      align: "center",
      width: 120
    },
    {
      title: "代付渠道",
      key: "payChannelName",
      align: "center",
      width: 120
    },
    {
      title: "集团内部员工",
      key: "isInternalEmployeeText",
      align: "center",
      width: 120
    },
    { 
      title: "展期状态",
      key: "dueRolloverStatusText",
      align: "center",
      width: 120
    },
    {
      title: "起始时间",
      key: "valueDate",
      width: 100
    },
    {
      title: "结束时间",
      key: "dueDate",
      width: 100
    }
  ];
  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "asset:asset:loan-due:menu"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    }
  };

  componentWillMount() {
    this.getDueStatus();
    this.getDeferStatus();
    this.getTradeTypeEnum();
  }

  componentDidMount() {
    this.getData();
  }

  getDueStatus = () => {
    //产品管理-产品状态-下拉框
    loanDueManageApi.dueStatus().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[7]里面list的key是中文, value是英文
            this.form[7].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          });
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };
  getDeferStatus = () => {
    //展期状态-下拉框
    loanDueManageApi.deferStatus().then(res => {
      if (res.data.code === "200") {
        let defer = res.data.data;
        if (defer !== null && defer !== undefined) {
          let amap = new Map(Object.entries(defer));
          for (let [k, v] of amap) {
            // state中form[12]里面list的key是中文, value是英文
            this.form[12].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          });
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };


  getTradeTypeEnum = () => {
    loanDueManageApi.tradeTypeEnum().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[7]里面list的key是中文, value是英文
            this.form[9].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          });
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(iouFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(iouFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };
  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    loanDueManageApi.dueList(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(iouFormValue(params));
    this.setState(
      { loading: true },
      () => this.getData()
    );
  }

  exportExcel = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    loanDueManageApi.exportExcel(params).then(res => {
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      let fileName = decodeURI(
        res.headers["content-disposition"].split("=")[1]
      );

      let link = document.createElement("a");
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  };


  render() {
    return (
      <div>
        <SearchForm
          form={this.form}
          title="借据管理"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
        <DataTable
          col={this.table}
          toolBtn={this.toolBtn}
          toolBtnFn={this.toolBtnFn}
          lineBtn={this.lineBtn}
          lineBtnFn={this.lineBtnFn}
          page={true}
          pageSize={this.state.limit}
          current={this.state.page}
          total={this.state.total}
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />
      </div>
    );
  }
}
