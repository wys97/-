import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import {Message} from "@alifd/next";
import offlineRegisterApi from '../../../api/PostLendingManage/OfflineRegister';

const col = [
  {label: '还款流水号：', require: true, key: 'repayRecordId', unit: '[自动生成]'},
  {label: '', require: true, key: ''},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '还款状态', require: true, key: 'repayStatus'},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件类型：', require: true, key: 'identityType'},
  {label: '证件号：', require: true, key: 'identityNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '贷款项目名称：', require: true, key: 'projectName'},
  {label: '产品名称：', require: true, key: 'productName'},
  {label: '', require: true, key: ''},
  {label: '还款类型：', require: true, key: 'repayType'},
  {label: '扣款方式：', require: true, key: 'debitMethod'},
  {label: '还款总额：', require: true, key: 'repayAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还本金：', require: true, key: 'repayPrincipal', unit: '元'},
  {label: '还利息：', require: true, key: 'repayInterest', unit: '元'},
  {label: '还罚息：', require: true, key: 'repayFine', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还违约金：', require: true, key: 'repayDamage', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还款时间：', require: true, key: 'repayBeginTime'},
];

export default class OfflineRegisterDetail extends Component {

  static displayName = 'OfflineRegisterDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (this.props.location.state && this.props.location.state.name) {
      this.state = {
        formValue: {},
        id: this.props.location.state.name,
        title: '线下还款明细'
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
    offlineRegisterApi.detail(this.state.id).then((res) => {
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
    } else {
      return (
        <div>
          <DetailForm col={col} data={this.state.formValue} title={this.state && this.state.title}
                      history={this.props.history}/>
        </div>
      );
    }
  }
}
