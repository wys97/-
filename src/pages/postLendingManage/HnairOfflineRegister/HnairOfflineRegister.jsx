/* 综合贷后 -> 贷后管理 -> 息费减免[列表] */
import React from 'react';
import {Dialog, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import HnairOfflineRegisterApi from '../../../api/PostLendingManage/HnairOfflineRegister'
import store from "../../../store";
import { offlinePayment } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class HnairOfflineRegister extends React.Component {

  static displayName = 'HnairOfflineRegister';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.offlinePayment.formValue,
      page: store.getState().loanTransaction.offlinePayment.page,
      limit: store.getState().loanTransaction.offlinePayment.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.offlinePayment.formValue,
        page: store.getState().loanTransaction.offlinePayment.page,
        limit: store.getState().loanTransaction.offlinePayment.limit
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
      label: '还款类型',
      key: 'repayType',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: '实际还款日期',
      key: 'paidDate',
      type: 'range',
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
      label: '还款状态',
      key: 'repayStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    }

  ];


  table = [{
    title: '登记流水号',
    key: 'repayRecordId',
    width: 100,
    align: 'center',
    cell: true,
    path: '/businessChange/HnairofflineRegisterDetail',
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
      title: '还款类型',
      key: 'repayType',
      width: 80,
    },
    {
      title: '还款金额 (元) ',
      key: 'repayAmount',
      align: 'right',
      width: 100,
    },
    {
        title: '实际还款日期',
        key: 'paidDate',
        width: 140,
    },
    {
      title: '状态',
      key: 'status',
      width: 80,
    },
    {
      title: '还款状态',
      key: 'repayStatus',
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
        pathname: '/businessChange/HnairOfflineRegisterAdd/add'
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
      key: 'status',
      value: '待确认',
      permission: 'postloan:postloan:offline-repay:confirm'
    },
    {
      name: '修改',
      type: 'edit',
      key: 'status',
      value: '待确认',
      permission: 'postloan:postloan:offline-repay:modify'
    },
    {
      name: '删除',
      type: 'delete',
      key: 'status',
      value: '待确认',
      permission: 'postloan:postloan:offline-repay:delete'
    },
  ];

  lineBtnFn = {
    confirm: (val, index, row) => {
      Dialog.show({title: '确认', content: '确定执行确认操作吗？', onOk: () => this.confirmFn(row.repayRecordId)});
    },
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: '/businessChange/HnairOfflineRegisterAdd/update',
        state: {name: row.repayRecordId}
      });
    },
    delete: (val, index, row) => {
      Dialog.show({title: '删除', content: '确认执行删除操作吗？', onOk: () => this.deleteFn(row.repayRecordId)});
    },
  };


  confirmFn = (id) => {
    HnairOfflineRegisterApi.offlineConfirm(id)
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

    HnairOfflineRegisterApi.repayStatus()         //还款状态-下拉
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

    HnairOfflineRegisterApi.repayType()         //还款类型-下拉
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
    store.dispatch(offlinePayment(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(offlinePayment(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    HnairOfflineRegisterApi.list(params)
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
    store.dispatch(offlinePayment(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    HnairOfflineRegisterApi.exportExcel(params).then(res => {
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
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
        <SearchForm form={this.form} title='线下还款登记' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
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
