import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import {Message} from "@alifd/next";
// import offlineRegisterApi from '../../../api/PostLendingManage/OfflineRegister';
import HnairOfflineRegisterApi from '../../../api/PostLendingManage/HnairOfflineRegister'

const col = [
  {label: '登记流水号：', require: false, key: 'repayRecordId', unit: '[自动生成]'},
  {label: '', require: true, key: ''},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '', require: true, key: ''},
  {label: '合同号：', require: false, key: 'contractNo'},
  {label: '', require: true, key: ''},
  {label: '产品名称：', require: false, key: 'productName'},
  {label: '', require: true, key: ''},
  {label: '客户名称：', require: false, key: 'customerName'},
  {label: '手机号：', require: false, key: 'phone'},
  {label: '证件号码：', require: false, key: 'identityNo'},
  {label: '', require: true, key: ''},
  {label: '放款金额：', require: false, key: 'loanAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '剩余应还总额：', require: false, key: 'unpaidAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '实际还款日：', require: true, key: 'paidDate'},
  {label: '', require: true, key: ''},
  {label: '还款类型：', require: true, key: 'repayTypeText'},
  {label: '', require: true, key: ''},
  {label: '逾期应还总额：', require: false, key: 'overdueAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '当期应还总额：', require: false, key: 'currentAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '提前应还总额：', require: false, key: 'prepayAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还款金额：', require: true, key: 'repayAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '备注：', require: false, key: 'remark'},
  {label: '', require: true, key: ''},
  {label: '审批状态：', require: false, key: 'approvalStatus'},
  {label: '', require: true, key: ''},
  {label: '操作员：', require: false, key: 'operator'},
  {label: '', require: true, key: ''}, 
  {label: '更新日期：', require: false, key: 'modifyTime'},
];

export default class HnairOfflineRegisterDetail extends Component {

  static displayName = 'HnairOfflineRegisterDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (this.props.location.state && this.props.location.state.name) {
      this.state = {
        formValue: {},
        id: this.props.location.state.name,
        title: '线下还款登记详情'
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
    HnairOfflineRegisterApi.detail(this.state.id).then((res) => {
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
