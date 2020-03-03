import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import sysOperateLogApi from '../../../api/OperationManage/SysOperateLog';
import {Message} from '@alifd/next';

export default class SysOperateLog extends Component {

  static displayName = 'SysOperateLog';
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
        {label: '日志编号', key: 'logId', type: ''},
        {label: '用户名', key: 'loginName', type: ''},
        {label: '操作类型', key: 'actionType', type: ''},
        {label: '开始时间', key: 'startTime', type: 'date'}
      ],
    };
  }

  table = [
    {title: '日志编号', key: 'logId', width: 100, cell: true, path: '/log/sysLogDetail'},
    {title: '用户名', key: 'loginName', width: 100},
    {title: '姓名', key: 'operatorName', width: 100},
    {title: '操作类型', key: 'actionType', width: 120},
    {title: '客户端IP', key: 'clientIp', width: 140},
    {title: '开始时间', key: 'startTime', width: 140},
    {title: '结束时间', key: 'endTime', width: 140}
  ];

  componentDidMount = () => {
    this.getData();
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
    sysOperateLogApi.querySysLog(params)
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
        <SearchForm form={this.state.form} title='系统日志查询' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
