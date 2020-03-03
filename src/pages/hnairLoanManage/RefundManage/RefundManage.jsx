import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import refundManageApi from '../../../api/HnairCreditManage/RefundManage'
import {Button, Dialog, Message} from '@alifd/next';
import PermissionA from "../../components/PermissionA";
import IceContainer from "@icedesign/container";
import store from "../../../store";
import { overpaymentFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class RefundManage extends Component {

  static displayName = 'RefundManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      visible: false,
      refundVisible: false,
      approvalPass: '',
      refundPass: '',
      formValue: store.getState().loanTransaction.overpaymentDetail.formValue,
      page: store.getState().loanTransaction.overpaymentDetail.page,
      limit: store.getState().loanTransaction.overpaymentDetail.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '退票流水号', key: 'refundSerial', type: ''},
        {label: '借据号', key: 'dueId', type: ''},
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
          label: '审批状态', key: 'approvalStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
            ],
        },
        {
          label: '退款状态', key: 'refundStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
            ],
        },
        {label: '开始日期', key: 'beginDate', type: 'date'},
        {label: '结束日期', key: 'endDate', type: 'date'},
      ],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.overpaymentDetail.formValue,
        page: store.getState().loanTransaction.overpaymentDetail.page,
        limit: store.getState().loanTransaction.overpaymentDetail.limit
      });
    });
  }

  table = [
    {title: '退款编号', key: 'repayRecordId', width: 100},
    {title: '退票流水号', key: 'refundSerial', width: 190},
    {title: '借据号', key: 'dueId', width: 100},
    {title: '产品名称', key: 'productName', width: 80},
    {title: '客户名称', key: 'customerName', width: 80},
    {title: '手机号', key: 'phone', width: 100},
    {title: '证件号', key: 'identityNo', width: 120},
    {title: '退款金额(元)', key: 'repayAmount', width: 100, align: 'right'},
    {title: '还款金额(元)', key: 'refundAmount', width: 100, align: 'right'},
    {title: '溢缴款金额(元)', key: 'overpayAmount', width: 100, align: 'right'},
    {title: '退票类型', key: 'refundTicketType', width: 80},
    {title: '退票退款时间', key: 'repayBeginTime', width: 140},
    {title: '退溢缴款时间', key: 'overpayTime', width: 140},
    {title: '审核状态', key: 'approvalStatus', width: 80},
    {title: '退款状态', key: 'refundStatus', width: 80},
    {title: '操作', key: 'operate', width: 140, cell: true},
  ];

  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "finance:day-settle:day-settle:export"
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
    refundManageApi.overpayRefundTicketType()         //退票类型
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

    refundManageApi.overpayApprovalStatus()         //审批状态
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'approvalStatus') {
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

    refundManageApi.overpayRefundStatus()         //退款状态
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'refundStatus') {
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


  lineBtn = [
    {
      name: '审批',
      type: 'approve',
      key: 'approvalStatus',
      value: '待审批' + ',' + '审批拒绝',
      permission: 'loanbusiness:refund:overdue-repayment:approval'
    },
    {
      name: '确认退款',
      type: 'confirmRefund',
      key: 'status',
      value: 'true',
      permission: 'loanbusiness:refund:overdue-repayment:confirm'
    }
  ];

  lineBtnFn = {
    approve: (value, index, row) => {
      let params = {};
      params.repayRecordId = row.repayRecordId;
      const dialog = Dialog.show({
        title: '审批',
        content: '请选择是否通过',
        footer: (
          <span>
            <Button type="primary" onClick={() => this.approveFn(params, 'PASS', dialog)}>
              通过
            </Button>
            <span> </span>
            < Button type="normal" onClick={() => this.approveFn(params, 'FAILED', dialog)}>
              不通过
            </Button>
          </span>
        )
      });
    },
    confirmRefund: (value, index, row) => {
      Dialog.show({title: '确认退款', content: '确认退款吗？', onOk: () => this.confirmRefundFn(row.repayRecordId)});
    }
  };

  approveFn = (params, flag, dialog) => {
    params.approvalStatus = flag;
    refundManageApi.overpayApproval(params)
      .then((res) => {
        if (res.data.code === '200') {
          dialog.hide();
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  confirmRefundFn = (id) => {
    refundManageApi.overpayRefund(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
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
    store.dispatch(overpaymentFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(overpaymentFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    refundManageApi.overpayListOverpayDetail(params)
      .then((res) => {
        if (res.data.code === '200') {
          let subData = res.data.data.list.map((item) => {
            if ((item.approvalStatus === '通过' && item.refundStatus === '待退款') ||
              (item.approvalStatus === '通过' && item.refundStatus === '退款失败')) {
              item.status = 'true'
            } else {
              item.status = 'false'
            }
            return item
          });
          this.setState({
            data: subData,
            total: res.data.data.total,
            loading: false,
          });
          //判断确认退款操作

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
    store.dispatch(overpaymentFormValue(params));
    this.setState({
      loading: true,
    }, () => this.getData());
  }

  exportExcel = () => {
    let params = {...this.state.formValue};
    refundManageApi.exportExcel(params)
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
        <SearchForm form={this.state.form} title='溢缴款明细' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
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


