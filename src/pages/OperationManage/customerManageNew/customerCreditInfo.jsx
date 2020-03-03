import React, {Component} from 'react';
import DataTable from '../../dataTable';
import customerManageNewApi from '../../../api/OperationManage/CustomerManageNew';
import {Dialog, Message, Table} from '@alifd/next';

export default class CustomerCreditInfo extends Component {

  static displayName = 'CustomerCreditInfo';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      id: props.id,
      loading: false,
      visible: false,
      data: [],
      data1: [],
      rules: [],
      table: [
        {title: '总授信额度（元）', key: 'totalLimit', width: 110},
        {title: '提现额度(元)', key: 'cashLimit', width: 110, align: 'right'},
        {title: '已用提现额度(元)', key: 'cashUsedLimit', width: 110, align: 'right'},
        {title: '剩余提现额度(元)', key: 'availableCashLimit', width: 110, align: 'right'},
        {title: '购票额度(元)', key: 'creditLimit', width: 110, align: 'right'},
        {title: '已用购票额度(元)', key: 'usedLimit', width: 110, align: 'right'},
        {title: '剩余购票额度(元)', key: 'availableLimit', width: 110, align: 'right'},
        {title: '嗨贷总额度(元)', key: 'hiTotalLimit', width: 110, align: 'right'},
        {title: '已用嗨贷额度(元)', key: 'hiUsedLimit', width: 110, align: 'right'},
        {title: '剩余嗨贷额度(元)', key: 'hiAvailableCashLimit', width: 110, align: 'right'},
        {title: '授信有效期', key: 'dueDate', width: 100},
        {title: '状态', key: 'limitStatus', width: 100}
      ]
    }
  }

  table1 = [
    {title: '授信申请编号', key: 'creditId', width: 140, cell: true, path: "/hnairLoanManage/creditManageDetail" },
    {title: '申请时间', key: 'applyTime', width: 180},
    {title: '客户名称', key: 'customerName', width: 100},
    {title: '手机号', key: 'phone', width: 110},
    {title: '证件号', key: 'identityNo', width: 180},
    {title: '产品名称', key: 'productName', width: 140},
    {title: '授信类型', key: 'creditType', width: 120},
    {title: '风控评分', key: 'creditScore', width: 100},
    {title: '风控结果', key: 'riskResult', width: 80},
    {title: '风控额度（元）', key: 'riskLimit', width: 100},
    {title: '审批员', key: 'operatorName', width: 110, align: 'right'},
    {title: '最终授信额度(元)', key: 'creditLimit', width: 110, align: 'right'},
    {title: '授信有效期', key: 'dueDate', width: 100},
    {title: '状态', key: 'creditResult', width: 100},
    {title: '操作', key: 'operate', width: 100}
  ];

  lineBtn = [
    {
      name: '启用',
      type: 'enable',
      key: 'limitStatus',
      value: '禁用',
      permission: ':'
    }, {
      name: '冻结',
      type: 'frozen',
      key: 'limitStatus',
      value: '启用',
      permission: ':'
    }
  ];

  lineBtnFn = {
    enable: () => {
      Dialog.show({title: '授信启用', content: '确认启用该授信信息吗？', onOk: () => this.enableCredit()});
    },
    frozen: () => {
      Dialog.show({title: '授信冻结', content: '确认冻结该授信信息吗？', onOk: () => this.frozenCredit()});
    }
  };

  lineBtn1 = [
    {
      name: '规则详情',
      type: 'rule',
      /*key: 'limitStatus',
      value: 'DISABLED',*/
      permission: ':'
    }
  ];

  lineBtnFn1 = {
    rule: (val, index, row) => {
      this.setState({
        rules: row.rules ? row.rules : [],
        visible: true
      })
      /* customerManageNewApi.ruleDetail(row.customerCreditId).then((res) => {

      }) */
    }
  };

  enableCredit = () => {
    customerManageNewApi.enableOrFrozen({
      limitStatus: 'ENABLED',
      customerId: this.state.id
    }).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  frozenCredit = () => {
    customerManageNewApi.enableOrFrozen({
      limitStatus: 'DISABLED',
      customerId: this.state.id
    }).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  componentWillMount() {
    this.loadTable();
  }

  componentDidMount() {
    this.getData();
  }

  loadTable = () => {
    if (this.props.type !== 'edit') {
      return;
    }
    let table = [];
    this.state.table.map((item) => {
      table.push(item);
    });
    table.push({title: '操作', key: 'operate', width: 100});
    this.setState({table});
  };

  pageChange = (page) => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    customerManageNewApi.creditInfo(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          const data = [{...res.data.data.customerInfoDetailCreditSituation}];
          const data1 = res.data.data.customerInfoDetailCreditLogList;
          this.setState({
            data,
            data1,
            loading: false
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  onSubmit(formValue) {
    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true,
    }, () => this.getData());
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2 style={{ marginLeft: "20px" }}>授信状况</h2>
          <DataTable col={this.state.table} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={false}
                   loadTable={this.state.loading} data={this.state.data}/>
        </div>
        <div>
          <div style={{ margin: "0 20px", paddingTop: "20px", borderTop: "1px solid #DDD" }}>
            <h2>授信记录</h2>
          </div>
          <DataTable col={this.table1} lineBtn={this.lineBtn1} lineBtnFn={this.lineBtnFn1} page={false}
                    loadTable={this.state.loading} data={this.state.data1}/>
        </div>
        
        <Dialog
          style={{width: '60%', height: '600px', borderRadius: '8px'}}
          title="规则详情"
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}>
          <Table dataSource={this.state.rules} emptyContent="未命中任何拒绝规则！">
            <Table.Column title="风险等级" dataIndex="riskType" width='120px'/>
            <Table.Column title="扫描结果" dataIndex="result" width='140px'/>
            <Table.Column title="证据链信息" dataIndex="output" width='280px'/>
          </Table>
        </Dialog>
      </div>
    );
  }
}
