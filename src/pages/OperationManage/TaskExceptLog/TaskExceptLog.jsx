import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import taskExceptLogApi from '../../../api/OperationManage/TaskExceptLog';
import {Message} from '@alifd/next';
import store from "../../../store";
import { exceptLog } from "../../../store/ScreeningWarehouse/productRunManage/actions";

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
export default class TaskExceptLog extends Component {

  static displayName = 'TaskExceptLog';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().productRunManage.exceptLog.formValue,
      page: store.getState().productRunManage.exceptLog.page,
      limit: store.getState().productRunManage.exceptLog.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '日志编号', key: 'logId', type: ''},
        {label: '任务编号', key: 'taskCode', type: ''},
        {label: '任务名称', key: 'taskName', type: ''},
        {label: '关联编号', key: 'orderId', type: ''},
        {label: '执行日期', key: 'batchDate', type: 'date'}
      ],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().productRunManage.exceptLog.formValue,
        page: store.getState().productRunManage.exceptLog.page,
        limit: store.getState().productRunManage.exceptLog.limit
      });
    });
  }

  table = [
    {title: '日志编号', key: 'logId', width: 100, cell: true, path: '/log/exceptDetail'},
    {title: '执行日期', key: 'batchDate', width: 100},
    {title: '任务编号', key: 'taskCode', width: 120},
    {title: '任务名称', key: 'taskName', width: 160},
    {title: '关联编号', key: 'orderId', width: 100},
    {title: '创建时间', key: 'createTime', width: 140}
  ];

  componentDidMount = () => {
    this.getData();
  };

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(exceptLog(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(exceptLog(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    taskExceptLogApi.queryExceptLog(params)
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
    store.dispatch(exceptLog(params));
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
        <SearchForm form={this.state.form} title='批量日志查询' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
