import React, { Component } from "react";
import { Dialog, Message } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import loansManageApi from "../../../api/OperationManage/LoansManage";
import store from "../../../store";
import { operationsManage } from "../../../store/ScreeningWarehouse/productRunManage/actions";

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
export default class LoansManage extends Component {
  static displayName = "LoansManage";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().productRunManage.operationsManage.formValue,
      page: store.getState().productRunManage.operationsManage.page,
      limit: store.getState().productRunManage.operationsManage.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().productRunManage.operationsManage.formValue,
        page: store.getState().productRunManage.operationsManage.page,
        limit: store.getState().productRunManage.operationsManage.limit
      });
    });
  }

  componentWillMount() {
    this.getprojectStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getprojectStatus = () => {
    //贷款项目管理-项目状态-下拉
    loansManageApi.projectStatus().then(res => {
      if (res.data.code === "200") {
        let projectStatus = res.data.data;
        if (projectStatus !== null && projectStatus !== undefined) {
          let amap = new Map(Object.entries(projectStatus));
          for (let [k, v] of amap) {
            // state中form[3]里面list的key是中文, value是英文
            this.form[3].list.push({
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
    store.dispatch(operationsManage(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(operationsManage(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    loansManageApi.loansManage(params).then(res => {
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

  form = [
    { label: "项目编号", key: "projectNo", type: "" },
    { label: "合作机构名称", key: "partnerName", type: "" },
    { label: "项目名称", key: "projectName", type: "" },
    {
      label: "项目状态",
      key: "projectStatus",
      type: "select",
      list: [{ key: "全部", value: "" }]
    }
  ];

  table = [
    {
      title: "项目编号",
      key: "projectNo",
      width: 100,
      cell: true,
      path: "/baseinfo/LoansInfoDetail"
    },
    { title: "合作机构名称", key: "partnerName", width: 180 },
    { title: "项目名称", key: "projectName", width: 140 },
    { title: "项目规模(元)", key: "projectFund", width: 110, align: "right" },
    { title: "成立日期", key: "setupDate", width: 100 },
    { title: "预计结束日期", key: "expectedEndDate", width: 100 },
    { title: "项目状态", key: "projectStatusText", width: 100 },
    { title: "操作", key: "operate", width: 180, cell: true }
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      // path: '/baseinfo/loansAdd',
      permission: "operation:basic:project:add"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: "/baseinfo/loansAdd"
      });
    }
  };

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      key: "projectStatus",
      value: "DISABLED",
      permission: "operation:basic:project:modify"
    },
    {
      name: "冻结",
      type: "freeze",
      key: "projectStatus",
      value: "ENABLED",
      permission: "operation:basic:project:freeze"
    },
    {
      name: "结束",
      type: "end",
      key: "projectStatus",
      value: "ENABLED",
      permission: "operation:basic:project:end"
    },
    {
      name: "删除",
      type: "del",
      key: "allowDelection",
      value: "true",
      permission: "operation:basic:project:delete"
    }
  ];

  lineBtnFn = {
    edit: (val, index, row) => {
      // 跳转修改页面
      this.props.history.push({
        pathname: "/baseinfo/loansUpdate",
        state: { id: row.projectNo }
      });
    },
    freeze: (val, index, row) => {
      Dialog.show({
        title: "项目冻结",
        content: "确认冻结该项目吗？",
        onOk: () => this.projectFreeze(row.projectNo)
      });
    },
    end: (val, index, row) => {
      Dialog.show({
        title: "项目结束",
        content: "确认结束该项目吗？",
        onOk: () => this.projectEnd(row.projectNo)
      });
    },
    del: (value, index, record) => {
      Dialog.show({
        title: "删除贷款项目",
        content: "确认删除该贷款项目吗？",
        onOk: () => this.projectDelete(record.projectNo)
      });
    }
  };

  projectFreeze = projectNo => {
    //贷款项目管理-冻结
    loansManageApi.projectDisabled(projectNo).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  projectEnd = projectNo => {
    //贷款项目管理-结束
    loansManageApi.projectEnd(projectNo).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  projectDelete = projectNo => {
    //贷款项目管理-删除
    loansManageApi.projectDelete(projectNo).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
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
    store.dispatch(operationsManage(params));
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
          title="贷款项目管理"
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
