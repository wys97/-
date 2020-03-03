import React, { Component } from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import deductChangeApprovalApi from '../../../api/ApprovalManage/DeductChangeApproval';
import { Message } from '@alifd/next';
import commonApi from '../../../api/common';

export default class DeductChangeApproval extends Component {

  static displayName = 'DeductChangeApproval';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '审批编号', key: 'approvalId', type: ''},
        {label: '变更编号', key: 'changeId', type: ''},
        {label: '借据号', key: 'dueId', type: ''},
        {label: '客户名称', key: 'customerName', type: ''},
        {label: '证件号', key: 'identityNo', type: ''},
        {label: '手机号', key: 'phone', type: ''},
        {label: '合作机构名称', key: 'partnerName', type: ''},
        {label: '产品名称', key: 'productName', type: ''},
        {label: '审批状态', key: 'approvalStatus', type: 'select', list:  [{key: '全部', value: '',}]}
      ]
    };
  }

  table = [
    {title: '审批编号', key: 'approvalId', width: 100, cell: true, path: '/approvalManage/deductChangeInfo'},
    {title: '变更编号', key: 'changeId', width: 100},
    {title: '借据号', key: 'dueId', width: 100},
    {title: '客户名称', key: 'customerName', width: 120},
    {title: '证件号', key: 'identityNo', width: 150},
    {title: '手机号', key: 'phone', width: 130},
    {title: '合作机构名称', key: 'partnerName', width: 240},
    {title: '项目名称', key: 'projectName', width: 160},
    {title: '产品名称', key: 'productName', width: 160},
    {title: '原扣款日', key: 'oldRepayDay', width: 80},
    {title: '新扣款日', key: 'newRepayDay', width: 80},
    {title: '审批状态', key: 'approvalStatusText', width: 100},
    {title: '提交时间', key: 'createTime', width: 140},
    {title: '操作', key: 'operate', width: 100, cell: true}
  ];

  componentWillMount = () => {
    this.getApprovalStatus();
  };

  componentDidMount = () => {
    this.getData();
  };

  getApprovalStatus = () => {
    commonApi.approvalStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              this.state.form[8].list.push({
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

  pageChange = (page) => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    deductChangeApprovalApi.queryApprovalList(params).then((res) => {
      if (res.data.code === '200') {
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
    })
  };

  lineBtn = [
    {
      name: '审批',
      type: 'approval',
      key: 'approvalStatus',
      value: 'APPROVING',
      permission: 'workbench:approval:repay-day:approval'
    }
  ];

  lineBtnFn = {
    approval: (value, index, record) => {
      this.props.history.push({
        pathname: '/approvalManage/deductChangeInfo',
        state: {name: record.approvalId, type: 'approval', row: record}
      });
    }
  };

  onSubmit(formValue) {
    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true,
    }, () => this.getData());
  }

  render() {
    return (
      <div>
        <SearchForm form={this.state.form} title='扣款日变更审批' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
