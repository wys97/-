import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import HnairRepayDetailApi from '../../../api/FundManage/HnairRepayDetail'
import {Message, Balloon, Icon} from '@alifd/next';
import IceContainer from "@icedesign/container";
import store from "../../../store";
import { debtFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";
import 'moment/locale/zh-cn.js';
import moment from 'moment';
const Tooltip = Balloon.Tooltip;
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
export default class HnairRepayment extends Component {

  static displayName = 'HnairRepayment';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.debtDetail.formValue,
      page: store.getState().loanTransaction.debtDetail.page,
      limit: store.getState().loanTransaction.debtDetail.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '交易流水号', key: 'repayRecordId', type: ''},
        {label: '借据号', key: 'dueId', type: ''},
        {label: '客户名称', key: 'customerName', type: ''},
        {label: '证件号', key: 'identityNo', type: ''},
        {label: '手机号', key: 'phone', type: ''},
        {
          label: '扣款方式', key: 'debitMethod', type: 'select', list:
            [
              {key: '全部', value: ''},
              // { key: '主动还款', value: 'INTENDED' },
              // { key: '被动代扣', value: 'PASSIVE' },
              // { key: '线下还款', value: 'OFFLINE' },
              // { key: '退款还款', value: 'REFUND' },
            ],
        },
        {
          label: '还款类型', key: 'repayType', type: 'select', list:
            [
              {key: '全部', value: ''},
              // { key: '按期还款', value: 'REPAY' },
              // { key: '提前还款', value: 'PREPAY' },
              // { key: '逾期还款', value: 'OVERDUE' },
              // { key: '代偿还款', value: 'COMPENSATE' },
              // { key: '回购还款', value: 'BUYBACK' },
              // { key: '借据取消', value: 'BACKOUT' },
            ],
        },
        {
          label: '还款状态', key: 'repayStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
              // { key: '还款中', value: 'DOING' },
              // { key: '还款成功', value: 'SUCCESS' },
              // { key: '还款失败', value: 'FAILED' },
            ],
        },
        {label: '还款日期', key: 'repayTime', type: 'range'},
        {
          label: '集团内部员工', key: 'isInternalEmployee', type: 'select', list:
            [
              {key: '全部', value: ''},
              { key: '是', value: true },
              { key: '否', value: false },
            ],
        },
        {label: '代扣渠道', key: 'payChannelName', type: ''},
        {label: '登记时间', key: 'registrationTime', type: 'range'},

      ],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.debtDetail.formValue,
        page: store.getState().loanTransaction.debtDetail.page,
        limit: store.getState().loanTransaction.debtDetail.limit
      });
    });
  }

  table = [
    {title: '交易流水号', key: 'repayRecordId', width: 100},
    {title: '借据编号', key: 'dueId', width: 100},
    {title: '客户名称', key: 'customerName', width: 100},
    {title: '证件号', key: 'identityNo', width: 120},
    {title: '手机号', key: 'phone', width: 100},
    {title: '还款总额(元)', key: 'repayAmount', width: 110, align: 'right'},
    {title: '还本金(元)', key: 'repayPrincipal', width: 110, align: 'right'},
    {title: '还利息(元)', key: 'repayInterest', width: 100, align: 'right'},
    {title: '还罚息(元)', key: 'repayFine', width: 100, align: 'right'},
    {title: '还违约金(元)', key: 'repayDamage', width: 100, align: 'right'},
    {title: '扣款方式', key: 'debitMethodText', width: 100},
    {title: '还款类型', key: 'repayTypeText', width: 100},
    {title: '还款状态', key: 'repayStatusText', width: 200},
    {title: '银行卡号', key: 'accountNo', width: 160},
    {title: '还款方式', key: 'repayMethodText', width: 100},
    {title: '代扣渠道', key: 'payChannelName', width: 100},
    {title: '集团内部员工', key: 'isInternalEmployeeText', width: 100},
    {title: '登记时间', key: 'registrationTime', width: 140},
    {title: '还款时间', key: 'repayTime', width: 140},
  ];

  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "loanbusiness:repay:repay:menu"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    }
  };

  componentWillMount = () => {
    this.initDropList();
    this.getRecentMonths()

  };

  componentDidMount = () => {
    this.getData()
  };

  getRecentMonths = () =>{
    HnairRepayDetailApi.recentMonths().then(res=>{
      if (res.data.code === '200') {
          let arr = [];
          arr.push(moment(res.data.data.beginDate),moment(res.data.data.endDate));
          this.state.form.map((item, index) => {
            if (item.key === 'repayTime') {
            let params = {};
            params.formValue = this.state.formValue;
            params.repayTime = arr;
            params.page = this.state.page;
            params.limit = this.state.limit;
           
           this.setState({formValue:params, loading: true }, () => this.getData());
            }
          });
      }
    })

  }

  initDropList = () => {
    HnairRepayDetailApi.loanPayRepayStatus()       //还款状态
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'repayStatus') {
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

    HnairRepayDetailApi.loanPayDebitMethod()       //还款方式
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'debitMethod') {
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


    HnairRepayDetailApi.loanPayRepayType()       //还款类型
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
    store.dispatch(debtFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(debtFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };
  
  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    HnairRepayDetailApi.getDateList(params)
      .then((res) => {
        if (res.data.code === '200') {
          Object.keys(res.data.data.list).map(item => {
            const topRight = <span id="topRight" className="btrigger">{res.data.data.list[item].repayStatus}<Icon type='prompt' style={{ color: '#FF3333', marginLeft: '3px', display: 'inline-block' }} size="xs" /></span>;
            if(res.data.data.list[item].repayStatus === "还款失败"){
              res.data.data.list[item].repayStatus = (
              <Tooltip trigger={topRight} triggerType="click" followTrigger={true} align="r">{res.data.data.list[item].repayFailedReason}</Tooltip>
            )}
          });
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
    store.dispatch(debtFormValue(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    HnairRepayDetailApi.exportExcelList(params)
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
        <SearchForm form={this.state.form} title='还款借据明细' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <IceContainer>
          <div className='contain-con'>
            <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={true}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data} useVirtual='auto'/>
          </div>
        </IceContainer>
      </div>
    );
  }
}
