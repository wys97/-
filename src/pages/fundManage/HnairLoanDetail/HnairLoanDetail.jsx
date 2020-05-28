import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import hnairLoanDetailApi from '../../../api/FundManage/HnairLoanDetail'
import {Message} from '@alifd/next';
import PermissionA from "../../components/PermissionA";
import IceContainer from "@icedesign/container";
import store from "../../../store";
import { loanFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class HnairLoanDetail extends Component {

  static displayName = 'HnairLoanDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.loanDetail.formValue,
      page: store.getState().loanTransaction.loanDetail.page,
      limit: store.getState().loanTransaction.loanDetail.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '借据号', key: 'dueId', type: ''},
        {label: '产品名称', key: 'productName', type: ''},
        {label: '客户名称', key: 'customerName', type: ''},
        {label: '手机号', key: 'phone', type: ''},
        {label: '证件号', key: 'identityNo', type: ''},
        {label: '放款时间', key: 'loanDate', type: 'range'},
        {label: '结算时间', key: 'settleDate', type: 'range'},
        {
          label: '放款状态', key: 'loanPayStatus', type: 'select', list:
            [
              {key: '全部', value: ''}
            ],
        },
        {
          label: '结算状态', key: 'settleStatus', type: 'select', list:
            [
              {key: '全部', value: ''}
            ],
        },
        {label: '商户订单号', key: 'contractNo', type: ''},
        {label: '机票订单号', key: 'partnerApplyNo', type: ''},
      ],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.loanDetail.formValue,
        page: store.getState().loanTransaction.loanDetail.page,
        limit: store.getState().loanTransaction.loanDetail.limit
      });
    });
  }

  table = [
    {title: '借据号', key: 'dueId', width: 100},
    {title: '产品名称', key: 'productName', width: 80},
    {title: '客户名称', key: 'customerName', width: 80},
    {title: '手机号', key: 'phone', width: 110},
    {title: '证件号', key: 'identityNo', width: 120},
    {title: '商户订单号', key: 'contractNo', width: 140},
    {title: '机票订单号', key: 'partnerApplyNo', width: 160},
    {title: '放款金额(元)', key: 'loanPayAmount', width: 110, align: 'right'},
    {title: '放款时间', key: 'payEndTime', width: 140},
    {title: '结算时间', key: 'settleEndTime', width: 140},
    {title: '放款状态', key: 'loanPayStatus', width: 100},
    {title: '结算状态', key: 'settleStatus', width: 100},
  ];

  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "loanbusiness:loan:loan:menu"
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
    hnairLoanDetailApi.loanRepayStatus()         //放款状态
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'loanPayStatus') {
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

    hnairLoanDetailApi.loanRepaySettleStatus()         //结算状态
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'settleStatus') {
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
    store.dispatch(loanFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(loanFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    hnairLoanDetailApi.loanRepayList(params)
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
    store.dispatch(loanFormValue(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    hnairLoanDetailApi.exportExcel(params)
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
        <SearchForm form={this.state.form} title='放款明细' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <IceContainer>
          <div className='contain-con'>
            <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={true}
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
