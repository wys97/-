import React, {Component} from "react";
import {Message} from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import creditApprovalApi from "../../../api/WorkBench/CreditApproval";
import store from "../../../store";
import { creditApproval } from "../../../store/ScreeningWarehouse/approvalManagement/actions";

function inject_unount(target) {
  // 改装componentWillUnmount，销毁的时候记录一下
  let next = target.prototype.componentWillUnmount;
  target.prototype.componentWillUnmount = function() {
    if (next) next.call(this, ...arguments);
    this.unmount = true;
  };
  // 对setState的改装，setState查看目前是否已经销毁
  let setState = target.prototype.setState;
  target.prototype.setState = function() {
    if (this.unmount) return;
    setState.call(this, ...arguments);
  };
}
@inject_unount
export default class CreditApprovalManage extends Component {
  static displayName = "CreditApprovalManage";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().approvalManagement.creditApproval.formValue,
      page: store.getState().approvalManagement.creditApproval.page,
      limit: store.getState().approvalManagement.creditApproval.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().approvalManagement.creditApproval.formValue,
        page: store.getState().approvalManagement.creditApproval.page,
        limit: store.getState().approvalManagement.creditApproval.limit
      });
    });
  }

  form = [
    {
      label: "客户号",
      key: "customerId",
      type: ""
    },
    {
      label: "客户名称",
      key: "customerName",
      type: ""
    },
    {
      label: "手机号",
      key: "phone",
      type: ""
    },
    {
      label: "证件号",
      key: "identityNo",
      type: ""
    },
    {
      label: "产品名称",
      key: "productName",
      type: ""
    },
    {
      label: "风控评分",
      keys: ["creditScoreStart", "creditScoreEnd"],
      type: "section"
    },
    {
      label: "授信类型",
      key: "creditType",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    },
    {
      label: "风控结果",
      key: "riskResult",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    },
    {
      label: "审批节点",
      key: "currentLevel",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    },
    {
      label: "审批状态",
      key: "approvalStatus",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    }
  ];

  table = [
    {
      title: "审批编号",
      key: "approvalId",
      width: 100,
      cell: true,
      path: "/approvalManage/creditDetail"
    },
    {
      title: "授信申请编号",
      key: "approvalOrderId",
      width: 100
    },
    {
      title: "申请时间",
      key: "applyTime",
      width: 100
    },
    {
      title: "客户姓名",
      key: "customerName",
      width: 120
    },
    {
      title: "手机号",
      key: "phone",
      width: 130
    },
    {
      title: "证件号",
      key: "identityNo",
      width: 150
    },
    {
      title: "产品名称",
      key: "productName",
      width: 160
    },
    {
      title: "授信类型",
      key: "creditType",
      width: 110,
      align: "center"
    },
    {
      title: "风控评分",
      key: "creditScore",
      width: 110,
      align: "right"
    },
    {
      title: "风控结果",
      key: "riskResult",
      width: 110,
      align: "right"
    },
    {
      title: "风控额度（元）",
      key: "riskLimit",
      width: 110,
      align: "right"
    },
    {
      title: "审批节点",
      key: "currentLevelText",
      width: 110,
      align: "right"
    },
    {
      title: "授信额度（元）",
      key: "creditLimit",
      width: 110,
      align: "right"
    },
    {
      title: "审批状态",
      key: "approvalStatusText",
      width: 100
    },
    {
      title: "操作",
      key: "operate",
      width: 100,
      cell: true
    }
  ];

  componentWillMount() {
    this.getListCreditTypeEnum();
    this.getListRiskResultEnum();
    this.getApprovalStatus();
    this.getListCurrentLevelEnum();
  }

  componentDidMount() {
    this.getData();
  }

  getListCreditTypeEnum = () => {  //授信类型 - 下拉框
    creditApprovalApi.listCreditTypeEnum().then(res => {
      if (res.data.code === "200") {
        let creditType = res.data.data;
        if (creditType !== null && creditType !== undefined) {
          let amap = new Map(Object.entries(creditType));
          for (let [k, v] of amap) {
            this.form[6].list.push({
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

  getListRiskResultEnum = () => {   //风控结果 - 下拉框
    creditApprovalApi.listRiskResultEnum().then(res => {
      if (res.data.code === "200") {
        let creditType = res.data.data;
        if (creditType !== null && creditType !== undefined) {
          let amap = new Map(Object.entries(creditType));
          for (let [k, v] of amap) {
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

  getApprovalStatus = () => {   //审批状态 - 下拉框
    creditApprovalApi.approvalStatus().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
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

  getListCurrentLevelEnum = () => {   //审批节点 - 下拉框
    creditApprovalApi.listCurrentLevelEnum().then(res => {
      if (res.data.code === "200") {
        let currentLevel = res.data.data;
        if (currentLevel !== null && currentLevel !== undefined) {
          let amap = new Map(Object.entries(currentLevel));
          for (let [k, v] of amap) {
            this.form[8].list.push({
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
  }

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(creditApproval(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(creditApproval(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    creditApprovalApi.creditApprovalList(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
          loading: false,
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  lineBtn = [
    {
      name: "审批",
      type: "approval",
      key: "approvalStatus",
      value: "APPROVING",
      permission: "workbench:approval:credit-apply:approval"
    }
  ];

  lineBtnFn = {
    approval: (val, index, row) => {
      this.props.history.push({
        pathname: "/approvalManage/creditApproval",
        state: { 
          name: row.approvalId,
          approvalOrderId: row.approvalOrderId,
          currentLevel:row.currentLevel,
         }
      });
    }
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(creditApproval(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  render() {
    return (
      <div>
        <SearchForm
          form={this.form}
          title="授信审批"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
        <DataTable
          col={this.table}
          toolBtn={this.toolBtn}
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
