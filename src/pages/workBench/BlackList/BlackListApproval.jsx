import React, {Component} from 'react';
import {Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import blackListApi from '../../../api/WorkBench/BlackListApproval';
import commonApi from '../../../api/common';
import store from "../../../store";
import { blackList } from "../../../store/ScreeningWarehouse/approvalManagement/actions";

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
export default class BlackListApproval extends Component {

  static displayName = 'BlackListApproval';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().approvalManagement.blackList.formValue,
      page: store.getState().approvalManagement.blackList.page,
      limit: store.getState().approvalManagement.blackList.limit,
      loading: false,
      data: [],
      total: 0,
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().approvalManagement.blackList.formValue,
        page: store.getState().approvalManagement.blackList.page,
        limit: store.getState().approvalManagement.blackList.limit
      });
    });
  }

  form = [{
    label: '审批编号',
    key: 'approvalId',
    type: '',
  },
    {
      label: '黑名单编号',
      key: 'blackId',
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
      label: '申请类型',
      key: 'applyType',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: '审批状态',
      key: 'approvalStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
  ];

  table = [{
    title: '审批编号',
    key: 'approvalId',
    width: 100,
    cell: true,
    path: '/approvalManage/blacklistdetail',
  },
    {
      title: '黑名单编号',
      key: 'blackId',
      width: 100,
    },
    {
      title: '客户名称',
      key: 'customerName',
      width: 80,
    },
    {
      title: '证件号',
      key: 'identityNo',
      width: 110,
    },
    {
      title: '申请类型',
      key: 'applyTypeText',
      width: 80,
    },
    {
      title: '申请原因',
      key: 'applyReason',
      width: 120,
    },
    {
      title: '申请时间',
      key: 'applyTime',
      width: 140,
    },
    {
      title: '审批状态',
      key: 'approvalStatusText',
      width: 80,
    },
    {
      title: '操作',
      key: 'operate',
      width: 80,
      cell: true,
    },
  ];

  componentWillMount() {
    this.getApprovalStatus();
    this.getApplyType();
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
              this.form[5].list.push({
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
  getApplyType = () => { //产品管理-产品状态-下拉框
    blackListApi.applyType()
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

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(blackList(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(blackList(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    blackListApi.list(params)
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
    permission: 'workbench:approval:blacklist:approval'
  }];

  lineBtnFn = {
    approval: (val, index, row) => {
      this.props.history.push({pathname: '/approvalManage/blacklistapp', state: {name: row.approvalId}});
    },
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(blackList(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='黑名单审批' formValue={this.state.formValue}
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
