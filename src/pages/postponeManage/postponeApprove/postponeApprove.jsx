import React, { Component } from "react";
import { Message } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import offlineRegisterApi from '../../../api/PostLendingManage/OfflineRegister';
import axios from '../../../api/postponeManage/postponeManage'
import commonApi from "../../../api/common";
import store from "../../../store";
import { postponeApprove } from "../../../store/ScreeningWarehouse/approvalManagement/actions";

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
export default class PostpneApprove extends Component {
  static displayName = "PostpneApprove";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().approvalManagement.postponeApprove.formValue,
      page: store.getState().approvalManagement.postponeApprove.page,
      limit: store.getState().approvalManagement.postponeApprove.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().approvalManagement.postponeApprove.formValue,
        page: store.getState().approvalManagement.postponeApprove.page,
        limit: store.getState().approvalManagement.postponeApprove.limit
      });
    });
  }

  form = [
    {
      label: "审批编号",
      key: "approvalId",
      type: ""
    },
    {
      label: "展期编号",
      key: "rolloverId",
      type: ""
    },
    {
      label: "借据号",
      key: "dueId",
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
    {
      label: "手机号",
      key: "phone",
      type: ""
    },
  
    {
      label: "产品名称",
      key: "productNo",
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
      path: "/approvalManage/approveDetail"
    },
    {
      title: "展期编号",
      key: "rolloverId",
      width: 100
    },
    {
      title: "借据号",
      key: "dueId",
      width: 100
    },
    {
      title: "客户名称",
      key: "customerName",
      width: 100
    },
    {
      title: "手机号",
      key: "phone",
      width: 100
    },
    {
      title: "证件号码",
      key: "identityNo",
      width: 120
    },
   
    {
      title: "产品名称",
      key: "productName",
      width: 80
    },
    {
      title: "剩余未还本金(元) ",
      key: "unpaidPrincipal",
      width: 110,
      align: "right"
    },

    {
      title: "申请时间",
      key: "applyDate",
      width: 140
    },

    {
      title: "审批状态",
      key: "approvalStatusText",
      width: 80
    },
    {
      title: "操作",
      key: "operate",
      width: 80,
      cell: true
    }
  ];

  componentWillMount() {
    this.getApprovalStatus();
    this.getProduct();
  }

  componentDidMount() {
    this.getData();
  }

  getProduct = () => {
    //产品名称-下拉框
    commonApi.approvalStatus().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[6]里面list的key是中文, value是英文
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

  getApprovalStatus = () => {
    //审批状态-下拉框
    commonApi.approvalStatus().then(res => {
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

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(postponeApprove(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(postponeApprove(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    axios.postponeApproveList(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
          loading: false
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
      permission: "workbench:approval:offline-repay:approval"
    }
  ];

  lineBtnFn = {
    approval: (val, index, row) => {
      this.props.history.push({
        pathname: "/approvalManage/approve",
        state: { name: row.approvalId }
      });
    }
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(postponeApprove(params));
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
          title="展期审批"
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
