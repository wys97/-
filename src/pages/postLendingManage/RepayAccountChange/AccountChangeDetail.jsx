import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import repayAccountChangeApi from '../../../api/PostLendingManage/RepayAccountChange';
import {Message} from "@alifd/next";

const col = [
  {label: '变更编号：', require: true, key: 'changeId'},
  {label: '', require: false, key: ''},
  {label: '客户编号：', require: true, key: 'customerId'},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '账户变更类型：', require: true, key: 'changeAccountType'},
  {label: '', require: false, key: ''},
  {label: '账户号码：', require: true, key: 'accountNo'},
  {label: '账户状态：', require: true, key: 'accountStatus'},
  {label: '账户名称：', require: true, key: 'accountName'},
  {label: '账户用途：', require: true, key: 'accountUsage'},
  {label: '账户类型：', require: true, key: 'accountType'},
  {label: '', require: false, key: ''},
  {label: '开户银行名称：', require: true, key: 'bankName'},
  {label: '开户银行代码：', require: true, key: 'bankCode'},
  {label: '开户银行网点：', require: false, key: 'bankBranch'},
  {label: '', require: false, key: ''},
  {label: '开户银行所在省：', require: false, key: 'bankProvinceNo'},
  {label: '开户银行所在市：', require: false, key: 'bankCityNo'},
  {label: '提交时间：', require: false, key: 'createTime'}
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
        title: '还款账户变更详情'
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
    repayAccountChangeApi.queryAccountDetail(this.state.changeId).then((res) => {
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
