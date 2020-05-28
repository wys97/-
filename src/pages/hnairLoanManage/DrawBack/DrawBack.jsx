import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import DrawBackApi from '../../../api/HnairCreditManage/DrawBack'
import {Message} from '@alifd/next';
import IceContainer from "@icedesign/container";
import store from "../../../store";
import { overdueRepayFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

function inject_unount(target) {
  // 改装componentWillUnmount，销毁的时候记录一下
  let next = target.prototype.componentWillUnmount;
  target.prototype.componentWillUnmount = function() {
    if (next) next.call(this, ...arguments);
    this.unmount = true;
  };
  // 对setState的改装，setState查看目前是否已经销毁
  let setState = target.prototype.setState;
  target.prototype.setState = function() {
    if (this.unmount) return;
    setState.call(this, ...arguments);
  };
}
@inject_unount
export default class DrawBack extends Component {

  static displayName = 'DrawBack';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.overdueRepayDetail.formValue,
      page: store.getState().loanTransaction.overdueRepayDetail.page,
      limit: store.getState().loanTransaction.overdueRepayDetail.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '退票流水号', key: 'refundSerial', type: ''},
        {label: '借据号', key: 'dueId', type: ''},
        {label: '商户订单号', key: 'contractNo', type: ''},
        {label: '机票订单号', key: 'ticketNo', type: ''},
        {label: '客户名称', key: 'customerName', type: ''},
        {label: '手机号', key: 'phone', type: ''},
        {label: '证件号', key: 'identityNo', type: ''},
        {
          label: '退票类型', key: 'refundTicketType', type: 'select', list:
            [
              {key: '全部', value: ''},
            ],
        },
        {
          label: '退款处理类型', key: 'repayType', type: 'select', list:
            [
              {key: '全部', value: ''},
            ],
        },
        {label: '退票退款日期', key: 'loanDate', type: 'range'},
      ],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.overdueRepayDetail.formValue,
        page: store.getState().loanTransaction.overdueRepayDetail.page,
        limit: store.getState().loanTransaction.overdueRepayDetail.limit
      });
    });
  }

  table = [
    {title: '退款编号', key: 'repayRecordId', width: 100},
    {title: '商户订单号', key: 'contractNo', width: 140},
    {title: '机票订单号', key: 'ticketNo', width: 160},
    {title: '退票流水号', key: 'refundSerial', width: 240},
    {title: '借据号', key: 'dueId', width: 100},
    {title: '产品名称', key: 'productName', width: 80},
    {title: '客户名称', key: 'customerName', width: 80},
    {title: '手机号', key: 'phone', width: 100},
    {title: '证件号', key: 'identityNo', width: 120},
    {title: '还款总额(元)', key: 'refundAmount', width: 110, align: 'right'},
    {title: '还款本金(元)', key: 'repayPrincipal', width: 110, align: 'right'},
    {title: '还款利息(元)', key: 'repayInterest', width: 110, align: 'right'},
    {title: '还款罚息(元)', key: 'repayFine', width: 110, align: 'right'},
    {title: '还款违约金(元)', key: 'repayDamage', width: 120, align: 'right'},
    {title: '溢缴款金额(元)', key: 'overpayAmount', width: 120, align: 'right'},
    {title: '溢缴款退款状态', key: 'refundStatus', width: 120, align: 'center'},
    {title: '退款金额(元)', key: 'repayAmount', width: 110, align: 'right'},
    {title: '退票类型', key: 'refundTicketType', width: 80},
    {title: '退款处理类型', key: 'repayType', width: 80},
    {title: '退票退款时间', key: 'repayEndTime', width: 140},
  ];

  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "loanbusiness:refund:refund:menu"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    }
  };


  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount = () => {
    this.getData();
  };

  initDropList = () => {
    DrawBackApi.refundTicketType()         //退票类型查询
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'refundTicketType') {
              this.state.form[index].list = selectList;
              let forms = this.state.form;
              this.setState({
                form: forms,
              });
            }
          });
        } else {
          Message.error(res.data.message);
        }
      });

    DrawBackApi.refundType()         //退款处理类型查询
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'repayType') {
              this.state.form[index].list = selectList;
              let forms = this.state.form;
              this.setState({
                form: forms,
              });
            }
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };
  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(overdueRepayFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(overdueRepayFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    DrawBackApi.refundDetailList(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
            loading: false,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(overdueRepayFormValue(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    DrawBackApi.exportExcel(params)
      .then((res) => {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
        let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);

        let link = document.createElement('a');
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
      });
  };

  render() {
    return (
      <div>
        <SearchForm form={this.state.form} title='退款退票明细' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <IceContainer>
          <div className='contain-con'>
            <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
          </div>
        </IceContainer>
      </div>
    );
  }
}
