import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import {Message} from "@alifd/next";
import WorkflowDesign from "../../../api/HnairCreditManage/WorkflowDesign";
import * as _ from "lodash";

export default class WorkflowDetail extends Component {
  static displayName = 'WorkflowDetail';

  static propTypes = {};

  static defaultProps = {};

  col = [
    {label: '流程编号：', require: true, key: 'id'},
    {label: '', require: false, key: ''},
    {label: '流程名称：', require: true, key: 'approvalName'},
    {label: '', require: false, key: ''},
    {label: '产品名称：', require: true, key: 'productName'},
    {label: '', require: false, key: ''},
    {label: '类型：', require: true, key: 'approvalTypeText'},
    {label: '', require: false, key: ''},
    {label: '多级工作流：', require: true, key: 'approvalLevelText'},
    {label: '', require: false, key: ''},
    {label: '一审角色：', require: true, key: 'level1RoleName'},
    {label: '', require: false, key: ''},
    {label: '二审角色：', require: true, key: 'level2RoleName', name: 'level2RoleName'},
    {label: '', require: false, key: '', name: 'level2RoleName'},
    {label: '三审角色：', require: true, key: 'level3RoleName', name: 'level3RoleName'},
    {label: '', require: false, key: '', name: 'level3RoleName'},
    {label: '审批分配规则：', require: true, key: 'rule'},
    {label: '', require: false, key: ''},
    {label: '备注：', require: false, key: 'remark', row: 2, type: 'textarea'},
    {label: '创建人员：', require: false, key: 'creatorName'},
    {label: '创建时间：', require: false, key: 'createTime'},
    {label: '修改人员：', require: false, key: 'modifierName'},
    {label: '修改时间：', require: false, key: 'updateTime'}
  ];

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      id: window.location.hash.split('/')[window.location.hash.split('/').length - 1],
      title: '工作流详情',
      col: this.col
    }
  }

  componentWillMount() {
    this.loadDetailInfo();
  }

  loadDetailInfo = () => {
    WorkflowDesign.workflowOperateDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        const array = JSON.parse(JSON.stringify(this.col));
        if (res.data.data.approvalLevel === 2) {
          _.remove(array, function (n) {
            return n.name === 'level3RoleName';
          })
        } else if (res.data.data.approvalLevel === 1) {
          _.remove(array, function (n) {
            return n.name === 'level3RoleName' || n.name === 'level2RoleName';
          })
        }
        res.data.data.rule = '按角色剩余审批数最少优先分配';
        this.setState({
          formValue: res.data.data,
          col: array
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
        <DetailForm col={this.state.col} data={this.state.formValue} title={this.state && this.state.title}
                    history={this.props.history}/>
      </div>
    );
  }
}
