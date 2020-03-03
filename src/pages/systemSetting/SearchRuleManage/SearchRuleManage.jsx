import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import searchRuleManageApi from '../../../api/SystemSetting/SearchRuleManage';
import DataTable from '../../dataTable';
import {Message} from "@alifd/next";

export default class SearchRuleManage extends Component {

  static displayName = 'SearchRuleManage';
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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({refresh: true});
  }

  componentDidUpdate() {
    if (this.state.refresh) {
      this.getData();
    }
  }

  table = [
    {title: '规则编号', key: 'ruleNo', width: 200},
    {title: '规则描述', key: 'ruleName', width: 300},
    {title: '风险级别', key: 'ruleLevelText', width: 300}
  ];

  getData = () => {
    searchRuleManageApi.searchRuleList()
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
        <IceContainer title="筛查规则管理">
          <div>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={false}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
          </div>
          {/* <Table dataSource={this.state.data} emptyContent="暂无数据" hasBorder={false}>
            <Table.Column title='规则编号' dataIndex='ruleNo' width='200'/>
            <Table.Column title='规则描述' dataIndex='ruleName' width='300'/>
            <Table.Column title='风险级别' dataIndex='ruleLevelText' width='300'/>
          </Table> */}
        </IceContainer>
      </div>
    );
  }

}
