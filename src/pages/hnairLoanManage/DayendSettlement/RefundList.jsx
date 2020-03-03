import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import DataTable from '../../dataTable';
import DayendSettlementApi from '../../../api/HnairCreditManage/DayendSettlement'
import { Message } from '@alifd/next';

export default class RefundList extends Component {

  static displayName = 'RefundList';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      settleDate: props.settleDate,
      id: props.id,
      page: 1,
      limit: 10,
      loading: false,
      data: []
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = (page) => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  getData = () => {
    // let params = {...this.state.formValue};
    let params = {};
    params.settleDate = this.state.settleDate;
    params.id = this.state.id;
    params.page = this.state.page;
    params.limit = this.state.limit;
    DayendSettlementApi.finaceSettleListRefund(params).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data: res.data.data.list,
          data: res.data.data.list,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
          loading: false,
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  toolBtn = [
    {
      name: '导出',
      type: 'export',
      icon: 'export',
      permission: 'finance:day-settle:day-settle:export'
    },
  ];

  toolBtnFn = {
    export: () => {
      this.exportFn();
    },
  };

  exportFn = () => {
    let params = {};
    params.id = this.state.id;
    params.settleDate = this.state.settleDate;  
    // DayendSettlementApi.downRefundRecord(params)
    //   .then((res) => {
    //     let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
    //     let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);

    //     let link = document.createElement('a');
    //     link.download = fileName;
    //     link.href = URL.createObjectURL(blob);
    //     link.click();
    //   });
    window.location.href = '/admin-api-hnair/finace-settle/downRefundRecord?id=' + params.id + '&settleDate=' + params.settleDate + ''
  }

  table = [
    { title: '退款编号', key: 'id', width: 100 },
    { title: '借据号', key: 'dueId', width: 100 },
    { title: '合同号', key: 'contractNo', width: 100 },
    { title: '产品名称', key: 'productName', width: 160 },
    { title: '退票流水号', key: 'refundSerial', width: 100 },
    { title: '订单号', key: 'partnerApplyNo', width: 100 },
    { title: '客户名称', key: 'customerName', width: 160 },
    { title: '手机号码', key: 'phone', width: 130 },
    { title: '证件号', key: 'identityNo', width: 150 },
    { title: '退款金额(元)', key: 'refundAmount', width: 110 },
    { title: '退票类型', key: 'refundTicketType', width: 160 },
    { title: '退款处理类型', key: 'repayType', width: 100 },
    { title: '退票退款时间', key: 'rePayEndTime', width: 140 },
  ];

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            {/* <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>筛查规则设置</p> */}
            <h3>退款列表</h3>
            <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
              page={true}
              pageSize={this.state.limit} current={this.state.page} total={this.state.total}
              pageChange={(current) => this.pageChange(current)}
              limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
              data={this.state.data} />
          </div>
        </IceContainer>
      </div>
    )
  }
}