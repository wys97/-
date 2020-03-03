import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import customerManageApi from '../../../api/OperationManage/CustomerManage';
import {Message} from '@alifd/next';


export default class CustomerManage extends Component {

  static displayName = 'CustomerManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: 1,
      limit: 10,
      total: 0,
      loading: false,
      data: [],
    };
  }

  form = [
    {label: '客户编号', key: 'customerId', type: ''},
    {label: '客户名称', key: 'customerName', type: ''},
    {label: '证件号', key: 'identityNo', type: ''},
    {label: '手机号', key: 'phone', type: ''},
  ];

  table = [
    {title: '客户编号', key: 'customerId', width: 100, cell: true, path: '/baseinfo/customerTab'},
    {title: '客户名称', key: 'customerName', width: 100},
    {title: '证件类型', key: 'identityType', width: 80},
    {title: '证件号', key: 'identityNo', width: 150},
    {title: '手机号', key: 'phone', width: 130},
    {title: '所属合作机构', key: 'partnerName', width: 160},
    {title: '评分', key: 'ratingScore', width: 60},
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
    customerManageApi.customerManage(params)
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
        <SearchForm form={this.form} title='客户信息管理' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
