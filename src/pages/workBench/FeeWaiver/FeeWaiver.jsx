import React, {Component} from 'react';
import {Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import feeWaiverApi from '../../../api/WorkBench/FeeWaiver';
import commonApi from '../../../api/common';
import store from "../../../store";
import { feeWaiver } from "../../../store/ScreeningWarehouse/approvalManagement/actions";

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
export default class FeeWaiver extends Component {

  static displayName = 'FeeWaiver';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().approvalManagement.feeWaiver.formValue,
      page: store.getState().approvalManagement.feeWaiver.page,
      limit: store.getState().approvalManagement.feeWaiver.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().approvalManagement.feeWaiver.formValue,
        page: store.getState().approvalManagement.feeWaiver.page,
        limit: store.getState().approvalManagement.feeWaiver.limit
      });
    });
  }

  form = [
    {
      label: '审批编号',
      key: 'approvalId',
      type: '',
    },
    {
      label: '调整编号',
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
      label: '产品名称',
      key: 'productName',
      type: '',
    },
    {
      label: '审批状态',
      key: 'approvalStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    }
  ];

  table = [
    {
      title: '审批编号',
      key: 'approvalId',
      width: 100,
      cell: true,
      path: '/approvalManage/feeWaiverDetail',
    },
    {
      title: '调整编号',
      key: 'decreaseInterestId',
      width: 100,
    },
    {
      title: '借据号',
      key: 'dueId',
      width: 100,
    },
    {
      title: '客户名称',
      key: 'customerName',
      width: 100,
    },
    {
      title: '手机号',
      key: 'phone',
      width: 110,
    },
    {
      title: '证件号',
      key: 'identityNo',
      width: 120,
    },
    {
      title: '产品名称',
      key: 'productName',
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
      title: '审批状态',
      key: 'approvalStatusText',
      width: 100,
    },
    {
      title: '提交时间',
      key: 'createTime',
      width: 140,
    },
    {
      title: '操作',
      key: 'operate',
      width: 100,
      cell: true,
    }
  ];

  componentWillMount() {
    this.getApprovalStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getApprovalStatus = () => { //产品管理-产品状态-下拉框
    commonApi.approvalStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              // state中form[7]里面list的key是中文, value是英文
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
    feeWaiverApi.approvalList(params)
      .then((res) => {
        if (res.data.code === '200') {
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

  lineBtn = [{
    name: '审批',
    type: 'approval',
    key: 'approvalStatus',
    value: 'APPROVING',
    permission: 'workbench:approval:decrease-interest:approval'
  }];

  lineBtnFn = {
    approval: (val, index, row) => {
      this.props.history.push({pathname: '/approvalManage/feeWaiverApp', state: {name: row.approvalId}});
    },
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

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='息费调整审批' formValue={this.state.formValue}
                    onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
