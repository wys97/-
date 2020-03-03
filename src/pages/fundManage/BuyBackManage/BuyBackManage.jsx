import React, {Component} from 'react';
import {Dialog, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import buyBackManageApi from '../../../api/FundManage/BuyBackManage';

export default class BuyBackManage extends Component {

  static displayName = 'BuyBackManage';
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
    label: '回购编号',
    key: 'buybackNo',
    type: '',
  },
    {
      label: '合作机构名称',
      key: 'partnerName',
      type: '',
    },
    {
      label: '回购状态',
      key: 'status',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
  ];

  table = [{
    title: '回购编号',
    key: 'buybackNo',
    width: 100,
    cell: true,
    path: '/fundManage/buyBackDetail',
  },
    {
      title: '合作机构编号',
      key: 'partnerNo',
      width: 100,
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
      title: '贷款笔数',
      key: 'totalCount',
      width: 80,
    },
    {
      title: '回购总额 (元) ',
      key: 'totalAmount',
      width: 130,
      align: 'right'
    },
    {
      title: '回购发起日期',
      key: 'batchDate',
      width: 100,
    },
    {
      title: '代偿状态',
      key: 'statusText',
      width: 100,
    },
    {
      title: '完成时间',
      key: 'endTime',
      width: 140,
    },
    {
      title: '操作',
      key: 'operate',
      width: 100,
      cell: true,
    },
  ];

  componentWillMount() {
    this.getStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getStatus = () => {
    buyBackManageApi.buyBackStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let status = res.data.data;
          if (status !== null && status !== undefined) {
            let amap = new Map(Object.entries(status));
            for (let [k, v] of amap) {
              // state中form[2]里面list的key是中文, value是英文
              this.form[2].list.push({
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
    buyBackManageApi.buyBackList(params)
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
    name: '核销',
    type: 'verify',
    key: 'status',
    value: 'INIT' + ',' + 'FAILED',
    permission: 'fund:fund:buyback:writeoff'
  }];

  lineBtnFn = {
    verify: (val, index, row) => {
      // 核销按钮点击触发
      Dialog.show({
        title: '核销',
        content: '确定核销？',
        onOk: () => this.verify(row.buybackNo),
      });
    },
  };

  verify = (id) => {
    buyBackManageApi.verify(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message + ', 后台暂时还没有核销的代码, TODO!');
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
        <SearchForm form={this.form} title='回购管理' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
