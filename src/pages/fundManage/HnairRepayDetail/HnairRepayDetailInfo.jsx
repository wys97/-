import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import HnairRepayDetailApi from '../../../api/FundManage/HnairRepayDetail'
import {Message} from "@alifd/next";
import DataTable from '../../dataTable';

const col = [
  {label: '交易流水号：', require: true, key: 'repayRecordId'},
  {label: '还款状态：', require: true, key: 'repayStatus'},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件类型：', require: true, key: 'identityType'},
  {label: '证件号：', require: true, key: 'identityNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '', require: false, key: ''},
  {label: '还款方式：', require: true, key: 'debitMethod'},
  {label: '还款类型：', require: true, key: 'repayType'},
  {label: '总还款总额：', require: true, key: 'repayAmount', unit: '元'},
  {label: '', require: false, key: ''},
  {label: '总还本金：', require: true, key: 'repayPrincipal', unit: '元'},
  {label: '总还利息：', require: true, key: 'repayInterest', unit: '元'},
  {label: '总还罚息：', require: true, key: 'repayFine', unit: '元'},
  {label: '', require: false, key: ''},
  {label: '总还违约金：', require: true, key: 'repayDamage', unit: '元'},
  {label: '', require: false, key: ''},
  {label: '还款时间：', require: true, key: 'repayBeginTime'},
  {label: '', require: false, key: ''},
];

export default class HnairRepayDetailInfo extends Component {
  static displayName = 'HnairRepayDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      data: {},
      repayRecordId: this.props.location && this.props.location.state && this.props.location.state.name,
      title: '还款明细详情'
    }
  }

  table = [
    {title: '借据号', key: 'dueId', width: 100},
    {title: '合作机构名称', key: 'partnerName', width: 160},
    {title: '项目名称', key: 'projectName', width: 140},
    {title: '产品名称', key: 'productName', width: 100},
    {title: '还款总额(元)', key: 'repayAmount', width: 110, align: 'right'},
    {title: '还本金(元)', key: 'repayPrincipal', width: 100, align: 'right'},
    {title: '还利息(元)', key: 'repayInterest', width: 100, align: 'right'},
    {title: '还罚息(元)', key: 'repayFine', width: 100, align: 'right'},
    {title: '还违约金(元)', key: 'repayDamage', width: 100, align: 'right'}
  ];

  componentWillMount() {
    this.loadDetailInfo();
    this.getData();
  }

  componentDidMount = () => {

  };


  loadDetailInfo = () => {
    HnairRepayDetailApi.loanPayRepayDetail(this.state.repayRecordId).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formValue: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getData = () => {
    HnairRepayDetailApi.repayDetailDueList(this.state.repayRecordId)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data,
            loading: false
          });
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
        <DataTable col={this.table} page={false} loadTable={this.state.loading}
                   data={this.state.data} useVirtual='auto'/>
      </div>
    );
  }
}
