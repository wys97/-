import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import taskExecuteMonitorApi from '../../../api/SystemSetting/TaskExecuteMonitor';
import {Message} from "@alifd/next";

const col = [
  {label: '任务执行编号：', require: false, key: 'batchId', unit: '[自动生成]'},
  {label: '执行状态', require: false, key: 'taskStatus'},
  {label: '任务编号：', require: false, key: 'taskCode'},
  {label: '', require: false, key: ''},
  {label: '任务名称：', require: false, key: 'taskName'},
  {label: '', require: false, key: ''},
  {label: '执行日期：', require: false, key: 'batchDate'},
  {label: '', require: false, key: ''},
  {label: '开始时间：', require: false, key: 'beginTime'},
  {label: '结束时间：', require: false, key: 'endTime'},
  {label: '备注：', require: false, key: 'remark', row: 2, line: true}
];

export default class TaskDetail extends Component {
  static displayName = 'TaskDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      batchId: this.props.location && this.props.location.state && this.props.location.state.name,
      title: '任务执行监控详情'
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.name) {
      this.loadDetailInfo();
    } else {
      this.props.history.push('/myWorkspace/home');
    }
  }

  loadDetailInfo = () => {
    taskExecuteMonitorApi.taskDetail(this.state.batchId).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formValue: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    }
    return (
      <div>
        <DetailForm col={col} data={this.state.formValue} title={this.state && this.state.title}
                    history={this.props.history}/>
      </div>
    );
  }
}
