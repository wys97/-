import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import DataTable from '../../dataTable';
import timingTaskManageApi from '../../../api/SystemSetting/TimingTaskManage';

export default class TimingTaskManage extends Component {

  static displayName = 'TimingTaskManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refresh: true,
    };
    this.getData();
  }

  table = [
    {title: '任务编号', key: 'taskCode', width: 150},
    {title: '任务名称', key: 'taskName', width: 120},
    {title: '执行时间类型', key: 'taskFrequency', width: 120},
    {title: '执行出错时处理机制', key: 'errorHandle', width: 140},
    {title: '备注', key: 'remark', width: 140},
    {title: '启用标志', key: 'status', width: 100}
  ];

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({refresh: true});
  }

  componentDidUpdate() {
    if (this.state.refresh) {
      this.getData();
    }
  }

  getData = () => {
    timingTaskManageApi.queryTimingTask()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data,
            refresh: false,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  render() {
    return (
      <div>
        <IceContainer title="定时任务管理">
          <div>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={false}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
          </div>
          {/* <Table dataSource={this.state.data} emptyContent="暂无数据" hasBorder={false}>
            <Table.Column title='任务编号' dataIndex='taskCode' width='150'/>
            <Table.Column title='任务名称' dataIndex='taskName' width='150'/>
            <Table.Column title='执行时间类型' dataIndex='taskFrequency' width='150'/>
            <Table.Column title='执行出错时处理机制' dataIndex='errorHandle' width='200'/>
            <Table.Column title='备注' dataIndex='remark' width='300'/>
            <Table.Column title='启用标志' dataIndex='status' width='100'/>
          </Table> */}
        </IceContainer>
      </div>
    );
  }

}
