import React, {Component} from 'react';
import DataTable from '../../dataTable';
import customerManageNewApi from '../../../api/OperationManage/CustomerManageNew';
import {Dialog, Message} from '@alifd/next';
import DetailForm from "../../components/DetailForm";

const col = [
  {label: '客户号码：', require: false, key: 'customerId'},
  {label: '', require: false, key: ''},
  {label: '账户号码：', require: false, key: 'accountNo'},
  {label: '账户名：', require: false, key: 'accountName'},
  {label: '账户类型：', require: false, key: 'accountType'},
  {label: '账户状态：', require: false, key: 'accountStatus'},
  {label: '开户银行编码：', require: false, key: 'bankCode'},
  {label: '开户银行名称：', require: false, key: 'bankName'},
  {label: '开户银行所在省：', require: false, key: 'bankProvinceName'},
  {label: '开户银行所在市：', require: false, key: 'bankCityName'},
  {label: '手机号：', require: false, key: 'bankPhone'}
];

export default class CustomerAccountInfo extends Component {

  static displayName = 'CustomerAccountInfo';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      total: 0,
      loading: false,
      visible: false,
      detailData: {},
      data: [],
      id: this.props.id
    }
  }

  table = [
    {title: '账号', key: 'accountNo', width: 150, cell: true, window: 'detail'},
    {title: '客户号码', key: 'customerId', width: 120},
    {title: '账户名称', key: 'accountName', width: 120},
    {title: '账户类型', key: 'accountType', width: 120},
    {title: '开户银行名称', key: 'bankName', width: 160},
    {title: '手机号', key: 'bankPhone', width: 110},
    {title: '账户状态', key: 'accountStatus', width: 120}
  ];

  componentDidMount() {
    this.getData();
  }

  lineBtn = [];

  lineBtnFn = {
    detail: (val, index, row) => {
      this.getDetail(row.accountId);
    }
  };

  getDetail = (id) => {
    customerManageNewApi.accountDetailInfo(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            visible: true,
            detailData: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  onClose = () => {   //关闭弹窗
    this.setState({
      visible: false,
    });
  };

  pageChange = (page) => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    customerManageNewApi.accountInfo(this.state.id)
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
    return (
      <div>
        <DataTable col={this.table} page={false} lineBtnFn={this.lineBtnFn} loadTable={this.state.loading}
                   data={this.state.data}/>
        <Dialog
          style={{width: '60%', height: '600px', borderRadius: '8px'}}
          title="账户信息详情"
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}>
          <DetailForm col={col} data={this.state.detailData} hideBack={true}/>
        </Dialog>
      </div>
    );
  }
}
