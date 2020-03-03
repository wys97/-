/* 综合贷后 -> 贷后管理 -> 息费减免[列表] */
import React from 'react';
import {Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import overdueRepayApi from '../../../api/PostLendingManage/OverdueRepay';

export default class OverdueRepay extends React.Component {

  static displayName = 'OverdueRepay';
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
    };
  }

  form = [{
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
      label: '结清标志',
      key: 'isClear',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      },
        {
          key: '已结清',
          value: true,
        },
        {
          key: '未结清',
          value: false,
        }],
    },
  ];

  table = [{
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
      title: '逾期期数',
      key: 'overduePeriod',
      width: 80,
    },
    {
      title: '逾期最大天数',
      key: 'maxOverdueDay',
      width: 80,
    },
    {
      title: '逾期应还总额 (元) ',
      key: 'totalOverdueAmount',
      align: 'right',
      width: 130,
    },
    {
      title: '逾期未还总额 (元) ',
      key: 'totalOverdueUnpaidAmount',
      align: 'right',
      width: 130,
    },
    {
      title: '结清标志',
      key: 'isClearText',
      width: 80,
    },
    {
      title: '操作',
      key: 'operate',
      width: 100,
      cell: true,
    },
  ];

  componentWillMount() {
  }

  componentDidMount() {
    this.getData();
  }

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
    overdueRepayApi.overdueRepayList(params)
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

  lineBtn = [{
    name: '查看',
    type: 'look',
    permission: 'postloan:postloan:overdue:view'
  }];

  lineBtnFn = {
    look: (val, index, row) => {
      this.props.history.push({pathname: '/businessChange/overdueRepayDetail', state: {name: row.dueId}});
    },
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
        <SearchForm form={this.form} title='逾期明细' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }

}
