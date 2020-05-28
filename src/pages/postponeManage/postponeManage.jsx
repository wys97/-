/* 贷款业务 -> 展期管理 -> 展期[列表] */
import React from 'react';
import {Dialog, Message} from '@alifd/next';
import SearchForm from '../components/SearchForm';
import DataTable from '../dataTable';
import store from "../../store";
import HnairOfflineRegisterApi from '../../api/PostLendingManage/HnairOfflineRegister'
import axios from '../../api/postponeManage/postponeManage'

import { postpone } from "../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class PostponeManage extends React.Component {

  static displayName = 'PostponeManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.postpone.formValue,
      page: store.getState().loanTransaction.postpone.page,
      limit: store.getState().loanTransaction.postpone.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.postpone.formValue,
        page: store.getState().loanTransaction.postpone.page,
        limit: store.getState().loanTransaction.postpone.limit
      });
    });
  }

  form = [
    {
      label: '借据号',
      key: 'dueId',
      type: '',
    },
    {
      label: '客户名称',
      key: 'customerName',
      type: '',
    },
    {
      label: '手机号',
      key: 'phone',
      type: '',
    },
    {
      label: '证件号',
      key: 'identityNo',
      type: '',
    },
    {
      label: '还款方式',
      key: 'repayMethod',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: '申请时间',
      key: 'applyDate',
      type: 'date',
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
      label: '展期状态',
      key: 'rolloverStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    }

  ];


  table = [{
    title: '展期编号',
    key: 'rolloverId',
    width: 100,
    align: 'center',
    cell: true,
    path: '/businessChange/postponeDetail',
  },
    {
      title: '借据号',
      key: 'dueId',
      align: 'center',
      width: 100,
    },
    {
      title: '客户名称',
      key: 'customerName',
      width: 80,
    },
    {
      title: '手机号',
      key: 'phone',
      align: 'center',
      width: 100,
    },
    {
      title: '证件号',
      key: 'identityNo',
      align: 'center',
      width: 120,
    },
    {
      title: '产品名称',
      key: 'productName',
      width: 80,
    },
    {
      title: '还款方式',
      key: 'repayMethodText',
      width: 80,
    },
    {
      title: '剩余未还本金（元） ',
      key: 'unpaidPrincipal',
      align: 'right',
      width: 100,
    },
    {
        title: '申请时间',
        key: 'applyDate',
        width: 140,
    },
    {
      title: '状态',
      key: 'statusText',
      width: 80,
    },
    {
      title: '展期状态',
      key: 'rolloverStatusText',
      width: 80,
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      cell: true,
      width: 160
    }
  ];

  toolBtn = [{
    name: '新增',
    type: 'add',
    icon: 'add',
    permission: 'postloan:postloan:offline-repay:add'
  }, {
    name: "导出",
    type: "export",
    icon: "export",
    permission: ":"
  }];

  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: '/businessChange/postponeAdd/add'
      });
    },
    export: () => {
      this.exportExcel();
    }
  };

  lineBtn = [
    {
      name: '确认',
      type: 'confirm',
      key: 'statusText',
      value: '待确认',
      permission: 'postloan:postloan:offline-repay:confirm'
    },
    {
      name: '修改',
      type: 'edit',
      key: 'statusText',
      value: '待确认',
      permission: 'postloan:postloan:offline-repay:modify'
    },
    {
      name: '删除',
      type: 'delete',
      key: 'statusText',
      value: '待确认',
      permission: 'postloan:postloan:offline-repay:delete'
    },
  ];

  lineBtnFn = {
    confirm: (val, index, row) => {
      Dialog.show({title: '确认', content: '确定执行确认操作吗？', onOk: () => this.confirmFn(row.rolloverId)});
    },
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: '/businessChange/postponeAdd/update',
        state: {name: row.rolloverId}
      });
    },
    delete: (val, index, row) => {
      Dialog.show({title: '删除', content: '确认执行删除操作吗？', onOk: () => this.deleteFn(row.rolloverId)});
    },
  };


  confirmFn = (id) => {
    axios.offlineConfirm(id)
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

  deleteFn = (id) => {
    HnairOfflineRegisterApi.offlineDelete(id)
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


  componentWillMount() {
    this.getStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getStatus = () => {
    HnairOfflineRegisterApi.status()       //状态-下拉
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              this.form[6].list.push({
                key: v,
                value: k,
              });
            }
            this.setState({
              refresh: this.state.refresh + 1,
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });

    axios.rolloverStatus()         //展期状态-下拉
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              this.form[7].list.push({
                key: v,
                value: k,
              });
            }
            this.setState({
              refresh: this.state.refresh + 1,
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });

    HnairOfflineRegisterApi.repayType()         //还款方式-下拉
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              this.form[4].list.push({
                key: v,
                value: k,
              });
            }
            this.setState({
              refresh: this.state.refresh + 1,
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });
  };

  onRowClick = () => {

  };

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(postpone(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(postpone(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    axios.getListData(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
            loading: false,
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
    store.dispatch(postpone(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    axios.exportExcel(params).then(res => {
      if(res.status==200){
        let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
        let fileName = decodeURI(
          res.headers["content-disposition"].split("=")[1]
        );
        let link = document.createElement("a");
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
      }
     
    });
  };

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='展期管理' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn}
                   lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }

}
