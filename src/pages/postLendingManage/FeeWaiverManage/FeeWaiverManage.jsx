/* 综合贷后 -> 贷后管理 -> 息费减免[列表] */
import React from 'react';
import {Dialog, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import feeWaiverManageApi from '../../../api/PostLendingManage/FeeWaiverManage';
import store from "../../../store";
import { feeWaiver } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class FeeWaiverManage extends React.Component {

  static displayName = 'FeeWaiverManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.feeWaiver.formValue,
      page: store.getState().loanTransaction.feeWaiver.page,
      limit: store.getState().loanTransaction.feeWaiver.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.feeWaiver.formValue,
        page: store.getState().loanTransaction.feeWaiver.page,
        limit: store.getState().loanTransaction.feeWaiver.limit
      });
    });
  }

  form = [{
    label: '减免编号',
    key: 'decreaseInterestId',
    type: '',
  },
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
      label: '证件号',
      key: 'identityNo',
      type: '',
    },
    {
      label: '合作机构名称',
      key: 'partnerName',
      type: '',
    },
    {
      label: '产品名称',
      key: 'productName',
      type: '',
    },
    {
      label: '审批状态',
      key: 'decreaseStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
  ];

  table = [
    {
    title: '调整编号',
    key: 'decreaseInterestId',
    width: 100,
    cell: true,
    path: '/businessChange/feeWaiverManageDetail',
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
      align: 'center',
      width: 100,
    },
    {
      title: '证件号',
      key: 'identityNo',
      align: 'center',
      width: 130,
    },
    {
      title: '合作机构名称',
      key: 'partnerName',
      align: 'center',
      width: 180,
    },
    {
      title: '产品名称',
      key: 'productName',
      align: 'center',
      width: 100,
    },
    {
      title: '调整类型',
      key: 'rectifyType',
      align: 'center',
      width: 100,
    },
    {
      title: '调整本金 (元) ',
      key: 'decreasePrincipal',
      align: 'center',
      width: 100,
    },
    {
      title: '调整利息 (元) ',
      key: 'decreaseInterest',
      align: 'center',
      width: 100,
    },
    {
      title: '调整罚息 (元) ',
      key: 'decreaseFine',
      align: 'center',
      width: 100,
    },
    {
      title: '调整总额 (元) ',
      key: 'decreaseAmount',
      align: 'center',
      width: 100,
    },
    {
      title: '创建时间',
      key: 'createTime',
      align: 'center',
      width: 140,
    },
    {
      title: '状态',
      key: 'decreaseStatusText',
      align: 'center',
      width: 80,
    },
    {
      title: '操作',
      key: 'operate',
      align: 'center',
      width: 150,
      cell: true,
    },
  ];

  componentWillMount() {
    this.getDecreaseStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getDecreaseStatus = () => { //产品管理-产品状态-下拉框
    feeWaiverManageApi.getDecreaseStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              // state中form[6]里面list的key是中文, value是英文
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
  };

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(feeWaiver(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(feeWaiver(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    feeWaiverManageApi.decreaseList(params)
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

  toolBtn = [{
    name: '新增',
    type: 'add',
    icon: 'add',
    permission: 'postloan:postloan:decrease-interest:add'
    // path: '/businessChange/feeWaiverAddUpdate/add',
  }, {
    name: "导出",
    type: "export",
    icon: "export",
    permission: ":"
  }];

  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: '/businessChange/feeWaiverAddUpdate/add'
      });
    },
    export: () => {
      this.exportExcel();
    }
  };

  lineBtn = [{
    name: '确认',
    type: 'confirm',
    key: 'decreaseStatus',
    value: 'INIT',
    permission: 'postloan:postloan:decrease-interest:confirm'
  },
    {
      name: '修改',
      type: 'update',
      key: 'decreaseStatus',
      value: 'INIT',
      permission: 'postloan:postloan:decrease-interest:modify'
    },
    {
      name: '删除',
      type: 'delete',
      key: 'decreaseStatus',
      value: 'INIT' + ',' + 'FAILED',
      permission: 'postloan:postloan:decrease-interest:delete'
    }];

  lineBtnFn = {
    confirm: (val, index, row) => {
      Dialog.show({
        title: '确认',
        content: '确定执行确认操作吗？',
        onOk: () => this.confirmFn(row.decreaseInterestId),
      });
    },
    update: (val, index, row) => {
      this.props.history.push({
        pathname: '/businessChange/feeWaiverAddUpdate/update',
        state: {name: row.decreaseInterestId},
      });
    },
    delete: (val, index, row) => {
      Dialog.show({
        title: '删除',
        content: '确定执行删除操作吗？',
        onOk: () => this.deleteFn(row.decreaseInterestId),
      });
    },
  };

  confirmFn = (id) => {	// 确认
    feeWaiverManageApi.decreaseConfirm(id)
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

  deleteFn = (id) => {	// 删除
    feeWaiverManageApi.decreaseDelete(id)
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

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(feeWaiver(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    feeWaiverManageApi.exportExcel(params).then(res => {
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
        <SearchForm form={this.form} title='息费调整' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
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
