import React, {Component} from 'react';
import DataTable from '../../dataTable';
import {Dialog, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import repayDetailApi from '../../../api/FundDefund/RepayDetail';

export default class RepayDetail extends Component {

  static displayName = 'LoanDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: [],
      form: [ 
        {label: '对账编号', key: 'checkId', type: ''},
        {label: '对账日期', key: 'checkDate', type: 'range'},
        {
          label: '对账渠道', key: 'payProviderCode', type: 'select', list:
            [
              {key: '全部', value: ''},
              {key: '中金支付通道', value: 'INTERNAL'},
              {key: '支付中心通道', value: 'PAYMENT_CENTER'},
            ],
        },
        {
          label: '对账状态', key: 'checkStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
              {key: '异常', value: 'EXCEPTION'},
              {key: '不通过', value: 'NO_PASS'},
              {key: '通过', value: 'PASS'},
              {key: '处理中', value: 'PROCESSING'},
            ],
        },
      ],
    };
  }

  table = [
    {title: '对账编号', key: 'checkId', align: 'center', width: 100},
    {title: '对账日期', key: 'checkDate', width: 100},
    {title: '对账渠道', key: 'payProviderCodeText', width: 140},
    {title: '平台交易总额（元）', key: 'amount', align: 'center', width: 110},
    {title: '平台交易记录', key: 'count', align: 'center', width: 110},
    {title: '上游对账总额（元）', key: 'checkAmount', align: 'center', width: 110},
    {title: '上游对账记录', key: 'checkCount', align: 'center', width: 110},
    {title: '不匹配记录', key: 'diffCount', align: 'center', width: 100},
    {title: '对账状态', key: 'checkStatusText', width: 80},
    {title: '操作', key: 'operate', width: 180, align: 'center', cell: true}
  ];


  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount = () => {
    this.getData();
  };

  initDropList = () => {
    repayDetailApi.checkStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'status') {
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

  pageChange = (page) => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    repayDetailApi.checkRepayList(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
            page: res.data.data.pageNum,
            limit: res.data.data.pageSize,
            loading: false,
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


  toolBtnFn = {};

  lineBtn = [{
    name: '重新发起',
    type: 'reissue',
    key: 'checkStatus',
    value: 'NO_PASS' + ',' + 'EXCEPTION' + ',' + 'PROCESSING',
    permission: 'fund:check:repay:restart'
  },
    {
      name: '勾兑',
      type: 'blend',
      key: 'checkStatus',
      value: 'NO_PASS',
      permission: 'fund:check:repay:blend'
    },
    {
      name: '下载',
      type: 'download',
      key: 'checkStatus',
      value: 'PASS' + ',' + 'NO_PASS',
      permission: 'fund:check:repay:download'
    },
  ];

  lineBtnFn = {
    reissue: (val, index, row) => {
      Dialog.show({
        title: '重新发起',
        content: '确认重新发起吗？',
        onOk: () => this.reissueFn(row.checkId),
      });
    },

    blend: (val, index, row) => {
      this.props.history.push({pathname: '/fundDefend/repayDetailInfo', state: {name: row.checkId}});
    },

    download: (val, index, row) => {
      repayDetailApi.checkRepayDownload(row.checkId)
        .then((res) => {
          // debugger;
          let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
          let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);

          let link = document.createElement('a');
          link.download = fileName;
          link.href = URL.createObjectURL(blob);
          link.click();
        });
    },
  };

  reissueFn = (checkId) => {
    repayDetailApi.checkRepayAgain(checkId)
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


  render() {
    return (
      <div>
        <SearchForm form={this.state.form} title='还款对账' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
