/* 综合贷后 -> 贷后管理 -> 息费减免[列表] */
import React from 'react';
import {Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import offlineRegisterApi from '../../../api/PostLendingManage/OfflineRegister';

export default class OfflineRegister extends React.Component {

  static displayName = 'OfflineRegister';
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
      refresh: 0,
    };
  }

  form = [{
    label: '还款流水号',
    key: 'repayRecordId',
    type: '',
  },
    {
      label: '借据号',
      key: 'dueId',
      type: '',
    },
    {
      label: '客户名称',
      key: 'customerName',
      type: '',
    },
    {
      label: '证件号',
      key: 'identityNo',
      type: '',
    },
    {
      label: '手机号',
      key: 'phone',
      type: '',
    },
    {
      label: '合作机构名称',
      key: 'partnerName',
      type: '',
    },
    {
      label: '产品名称',
      key: 'productName',
      type: '',
    },
    {
      label: '状态',
      key: 'approvalStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: '申请日期',
      key: 'applyDate',
      type: 'range',
    },
  ];

  table = [{
    title: '还款流水号',
    key: 'repayRecordId',
    width: 100,
    cell: true,
    path: '/businessChange/offlineRegisterDetail',
  },
    {
      title: '借据号',
      key: 'dueId',
      width: 100,
    },
    {
      title: '客户名称',
      key: 'customerName',
      width: 100,
    },
    {
      title: '证件号',
      key: 'identityNo',
      width: 150,
    },
    {
      title: '手机号',
      key: 'phone',
      width: 130,
    },
    {
      title: '合作机构名称',
      key: 'partnerName',
      width: 200,
    },
    {
      title: '项目名称',
      key: 'projectName',
      width: 160,
    },
    {
      title: '产品名称',
      key: 'productName',
      width: 160,
    },
    {
      title: '总还款金额 (元) ',
      key: 'repayAmount',
      align: 'right',
      width: 130,
    },
    {
      title: '还款类型',
      key: 'repayType',
      width: 100,
    },
    {
      title: '还款时间',
      key: 'repayBeginTime',
      width: 140,
    },
    {
      title: '还款状态',
      key: 'repayStatus',
      width: 100,
    },
    {
      title: '状态',
      key: 'approvalStatus',
      width: 100,
    },
  ];

  componentWillMount() {
    this.getStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getStatus = () => { //产品管理-产品状态-下拉框
    offlineRegisterApi.status()
      .then((res) => {
        if (res.data.code === '200') {
          let approvalStatus = res.data.data;
          if (approvalStatus !== null && approvalStatus !== undefined) {
            let amap = new Map(Object.entries(approvalStatus));
            for (let [k, v] of amap) {
              // state中form[7]里面list的key是中文, value是英文
              this.form[7].list.push({
                key: v,
                value: k,
              });
            }
            this.setState({
              refresh: this.state.refresh + 1,
            });
          }
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
    offlineRegisterApi.list(params)
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

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='线下还款登记' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }

}
