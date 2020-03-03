import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import deductionDateChangeApi from '../../../api/PostLendingManage/DeductionDateChange';
import {Message} from "@alifd/next";

const col = [
  {label: '变更编号：', require: true, key: 'changeId'},
  {label: '生效标志：', require: true, key: 'changeStatus'},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '', require: false, key: ''},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件类型：', require: true, key: 'identityType'},
  {label: '证件号：', require: true, key: 'identityNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '贷款项目名称：', require: true, key: 'projectName'},
  {label: '产品名称：', require: true, key: 'productName'},
  {label: '', require: false, key: ''},
  {label: '原扣款日：', require: true, key: 'oldRepayDay'},
  {label: '新扣款日：', require: true, key: 'newRepayDay'},
  {label: '提交时间：', require: true, key: 'createTime'}
];

export default class DateChangeDetail extends Component {
  static displayName = 'DateChangeDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    if (this.props.location.state && this.props.location.state.name) {
      this.state = {
        formValue: {},
        changeId: this.props.location.state.name,
        title: '扣款日变更详情'
      }
    } else {
      this.props.history.push('/myWorkspace/home');
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
    deductionDateChangeApi.queryDateDetail(this.state.changeId).then((res) => {
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
