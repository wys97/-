import React, { Component } from 'react';
import {Dialog, Message } from '@alifd/next';
import store from "../../../store";
import { iouFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import versionManagementApi from '../../../api/AppManage/versionManagement';

export default class VersionList extends Component {
  static displayName = 'VersionList';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().productRunManage.productManage.formValue,
      page: store.getState().productRunManage.productManage.page,
      limit: store.getState().productRunManage.productManage.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().productRunManage.productManage.formValue,
        page: store.getState().productRunManage.productManage.page,
        limit: store.getState().productRunManage.productManage.limit
      });
    });
  }

  form = [{
      label: '版本号',
      key: 'versionNo',
      type: '',
    },
    {
      label: '推送平台',
      key: 'platform',
      type: 'select',
      list: [{
        key: '不限',
        value: '',
      }],
    },
    {
      label: '状态',
      key: 'status',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: "结束日期",
      key: "endedDate",
      type: "range"
    }
  ];

  table = [
    {
      title: "序列号",
      key: "id",
      width: 100,
    },
    {
      title: "版本号",
      key: "versionNo",
      width: 100,
    },
    {
      title: "时间",
      key: "createTime",
      width: 120,
    },
    {
      title: "平台",
      key: "platformText",
      width: 80,
    },
    {
      title: "内容",
      key: "content",
      width: 200,
    },
    {
      title: "状态",
      key: "statusText",
      width: 80,
      align: "right"
    },
    {
      title: '操作',
      key: 'operate',
      width: 100,
      cell: true,
    },
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      permission: "app:maintain:version:menu:add"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.props.history.push({ pathname: '/appManage/versionUpdate/add' });
    }
  };

  lineBtn = [{
    name: "修改",
    type: "edit",
    permission: "app:maintain:version:menu:update"
  },
  {
    name: '启用',
    type: 'turnOn',
    key: 'statusText',
    value: '停用',
    permission: 'app:maintain:version:menu:enable'
  },
  {
    name: '停用',
    type: 'turnOff',
    key: 'statusText',
    value: '启用',
    permission: 'app:maintain:version:menu:disable'
  }];

  lineBtnFn = {
    turnOn: (val, index, row) => {
      Dialog.show({
        title: '启用',
        content: '确认启用该版本吗？',
        onOk: () => this.turnOnFn(row.id),
      });
    },
    turnOff: (val, index, row) => {
      Dialog.show({
        title: '停用',
        content: '确认停用该版本吗？',
        onOk: () => this.turnOffFn(row.id),
      });
    },
    edit: (val, index, row) => {
      this.props.history.push({ 
        pathname: '/appManage/versionUpdate/edit/' + row.id });
    }
  };

  turnOnFn = (id) => {
    versionManagementApi.versionEnabled(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  turnOffFn = (id) => {
    versionManagementApi.versionDisabled(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };



  getPlatform = () => {
    versionManagementApi.platform().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[1].list.push({
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

  getVersionStatus = () => {
    versionManagementApi.versionStatus().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[2].list.push({
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
    versionManagementApi.versionList(params).then(res => {
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

  onSubmit(formValue) {
    this.setState(
      {
        formValue: formValue,
        page: 1,
        limit: 10,
        loading: true
      },
      () => this.getData()
    );
  }

  componentWillMount() {
    this.getVersionStatus();
    this.getPlatform();
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };
  
  render() {
    return (
      <div>
        <SearchForm
          form={this.form}
          title="版本管理"
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
