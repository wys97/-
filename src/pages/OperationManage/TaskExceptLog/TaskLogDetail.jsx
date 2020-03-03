import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import taskExceptLogApi from '../../../api/OperationManage/TaskExceptLog';
import {Message} from "@alifd/next";

const col = [
  {label: '日志编号：', require: false, key: 'logId'},
  {label: '', require: false, key: ''},
  {label: '任务编号：', require: false, key: 'taskCode'},
  {label: '', require: false, key: ''},
  {label: '任务名称：', require: false, key: 'taskName'},
  {label: '', require: false, key: ''},
  {label: '执行日期：', require: false, key: 'batchDate'},
  {label: '', require: false, key: ''},
  {label: '关联编号：', require: false, key: 'orderId'},
  {label: '', require: false, key: ''},
  {label: '日志信息：', require: false, key: 'logMessage', row: 2, line: true},
  {label: '创建时间：', require: false, key: 'createTime'}
];

export default class TaskLogDetail extends Component {
  static displayName = 'TaskLogDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      logId: this.props.location && this.props.location.state && this.props.location.state.name,
      title: '批量日志查询详情'
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
    taskExceptLogApi.exceptLogDetail(this.state.logId).then((res) => {
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
