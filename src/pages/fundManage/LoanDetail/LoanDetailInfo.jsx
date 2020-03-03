import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import loanDetailApi from '../../../api/FundManage/LoanDetail';
import {Message} from "@alifd/next";

const col = [
  {label: '放款流水号：', require: true, key: 'loanPayNo'},
  {label: '', require: false, key: ''},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '放款状态：', require: true, key: 'status'},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件类型：', require: true, key: 'identityType'},
  {label: '证件号：', require: true, key: 'identityNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '贷款项目名称：', require: true, key: 'projectName'},
  {label: '产品名称：', require: true, key: 'productName'},
  {label: '', require: false, key: ''},
  {label: '放款金额：', require: true, key: 'amount'},
  {label: '', require: false, key: ''},
  {label: '放款时间：', require: true, key: 'endTime'}
];

export default class LoanDetail extends Component {
  static displayName = 'LoanDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      loanPayNo: this.props.location && this.props.location.state && this.props.location.state.name,
      title: '放款明细详情'
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
    loanDetailApi.queryLoanDetail(this.state.loanPayNo).then((res) => {
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
