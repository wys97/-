import React, {Component} from 'react';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import contractInfoApi from '../../../api/AssetManagement/ContractInfo';
import {Message} from '@alifd/next';

export default class contractInfo extends Component {

  static displayName = 'contractInfo';
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
      refresh: 0, // 用于刷新表格
      form: [
        {label: '合同号', key: 'contractNo', type: ''},
        {label: '客户名称', key: 'customerName', type: ''},
        {label: '证件号', key: 'identityNo', type: ''},
        {label: '手机号', key: 'phone', type: ''},
        {label: '合作机构名称', key: 'partnerName', type: ''},
        {label: '项目名称', key: 'projectName', type: ''},
        {label: '产品名称', key: 'productName', type: ''},
      ],
    };
  }

  table = [
    {title: '合同号', key: 'contractNo', width: 100},
    {title: '合同类型', key: 'contractType', width: 100},
    {title: '客户名称', key: 'customerName', width: 100},
    {title: '证件号', key: 'identityNo', width: 150},
    {title: '手机号', key: 'phone', width: 130},
    {title: '合作机构名称', key: 'partnerName', width: 160},
    {title: '项目名称', key: 'projectName', width: 160},
    {title: '产品名称', key: 'productName', width: 160},
    {title: '合同金额(元)', key: 'loanAmount', align: 'right', width: 110},
    {title: '贷款期限(月)', key: 'loanTerm', width: 100},
    {title: '月利率(%)', key: 'loanInterest', width: 100},
    {title: '操作', key: 'operate', width: 100, cell: true},
  ];

  componentWillMount = () => {
  };

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
    contractInfoApi.queryContractInfo(params)
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

  lineBtn = [
    {
      name: '下载',
      type: 'download',
      key: 'wuyu',
      value: '5',
      permission: 'asset:asset:contract:download'
    },
  ];

  lineBtnFn = {
    download: (val, index, row) => {
      window.location.href = row.downloadContractUrl;
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
        <SearchForm form={this.state.form} title='合同信息' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
