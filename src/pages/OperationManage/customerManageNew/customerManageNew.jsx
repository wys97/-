import React, { Component } from "react";
import DataTable from "../../dataTable";
import SearchForm from "../../components/SearchForm";
import customerManageNewApi from "../../../api/OperationManage/CustomerManageNew";
import { Message } from "@alifd/next";
import store from "../../../store";
import { clientFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class CustomerManageNew extends Component {
  static displayName = "CustomerManageNew";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.clientManage.formValue,
      page: store.getState().loanTransaction.clientManage.page,
      limit: store.getState().loanTransaction.clientManage.limit,
      total: 0,
      loading: false,
      data: [],
      form: [
        { label: "客户号", key: "customerId", type: "id" },
        { label: "客户名称", key: "customerName", type: "" },
        { label: "手机号", key: "phone", type: "" },
        { label: "证件号", key: "identityNo", type: "" },
        {
          label: "授信状态",
          key: "creditStatus",
          type: "select",
          list: [{ key: "全部", value: "" }]
        }
      ]
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.clientManage.formValue,
        page: store.getState().loanTransaction.clientManage.page,
        limit: store.getState().loanTransaction.clientManage.limit
      });
    });
  }

  table = [
    {
      title: "客户编号",
      key: "customerId",
      width: 100,
      cell: true,
      path: "/baseinfo/customerInfoNew",
      align: "center"
    },
    { title: "客户名称", key: "customerName", width: 100, align: "center" },
    { title: "手机号码", key: "phone", width: 110, align: "center" },
    { title: "证件号", key: "identityNo", width: 160, align: "center" },
    {
      title: "总授信额度(元)",
      key: "creditLimit",
      width: 130,
      align: "center"
    },
    {
      title: "剩余嗨贷额度(元)",
      key: "hiAvailableCashLimit",
      width: 130,
      align: "center"
    },
    {
      title: "剩余提现额度(元)",
      key: "availableCashLimit",
      width: 130,
      align: "center"
    },
    {
      title: "剩余购票额度(元)",
      key: "availableLimit",
      width: 130,
      align: "center"
    },
    { title: "授信状态", key: "limitStatus", width: 100 },
    { title: "操作", key: "operate", width: 100, align: "center" }
  ];
  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "finance:day-settle:day-settle:export"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    }
  };

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      permission: "loanbusiness:customer:customer:modify"
    }
  ];

  lineBtnFn = {
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: "/baseinfo/customerInfoNew",
        state: {
          name: row.customerId,
          type: "edit"
        }
      });
    }
  };

  componentWillMount() {
    this.initDropList();
  }

  componentDidMount() {
    this.getData();
  }

  initDropList = () => {
    customerManageNewApi.creditStatusList().then(res => {
      if (res.data.code === "200") {
        let creditStatus = res.data.data;
        if (creditStatus !== null && creditStatus !== undefined) {
          let amap = new Map(Object.entries(creditStatus));
          for (let [k, v] of amap) {
            // state中form[4]里面list的key是中文, value是英文
            this.state.form[4].list.push({
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
    store.dispatch(clientFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(clientFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    customerManageNewApi.customerManage(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          loading: false
        });
      } else {
        Message.error(res.data.message);
        this.setState({
          loading: false
        })
      }
    });
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(clientFormValue(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  exportExcel = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    customerManageNewApi.exportExcel(params).then(res => {
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
          form={this.state.form}
          title="客户信息管理"
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
