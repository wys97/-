import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import taskExecuteMonitorApi from '../../../api/SystemSetting/TaskExecuteMonitor';
import {Message} from '@alifd/next';

export default class TaskExecuteMonitor extends Component {

  static displayName = 'TaskExecuteMonitor';
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
        {label: '任务执行编号', key: 'batchId', type: ''},
        {label: '任务编号', key: 'taskCode', type: ''},
        {label: '执行日期', key: 'date', type: 'range'},
        {
          label: '执行状态', key: 'taskStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
              {key: '初始', value: '0'},
              {key: '进行中', value: '1'},
              {key: '成功', value: '2'},
              {key: '失败', value: '3'}
            ]
        }
      ]
    };
  }

  table = [
    {title: '任务执行编号', key: 'batchId', width: 100, cell: true, path: '/dispatchPlatform/taskDetail'},
    {title: '执行日期', key: 'batchDate', width: 100},
    {title: '任务编号', key: 'taskCode', width: 120},
    {title: '任务名称', key: 'taskName', width: 120},
    {title: '开始时间', key: 'beginTime', width: 140},
    {title: '结束时间', key: 'endTime', width: 140},
    {title: '执行状态', key: 'taskStatus', width: 80}
  ];

  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount = () => {
    this.getData();
  };

  initDropList = () => {
    taskExecuteMonitorApi.executeStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'taskStatus') {
              this.state.form[index].list = selectList;
              let forms = this.state.form;
              this.setState({
                form: forms,
              });
            }
          });
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
    taskExecuteMonitorApi.queryTask(params)
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
        <SearchForm form={this.state.form} title='任务执行监控' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
