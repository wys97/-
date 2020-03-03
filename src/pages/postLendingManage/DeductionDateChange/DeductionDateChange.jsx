import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import deductionDateChangeApi from '../../../api/PostLendingManage/DeductionDateChange';
import {Message} from '@alifd/next';

export default class DeductionDateChange extends Component {

  static displayName = 'DeductionDateChange';
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
        {label: '借据号', key: 'dueId', type: ''},
        {label: '客户名称', key: 'customerName', type: ''},
        {label: '证件号', key: 'identityNo', type: ''},
        {label: '手机号', key: 'phone', type: ''},
        {label: '合作机构名称', key: 'partnerName', type: ''},
        {label: '产品名称', key: 'productName', type: ''},
        {
          label: '生效状态', key: 'changeStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
              {key: '处理中', value: 'DOING'},
              {key: '通过', value: 'SUCCESS'},
              {key: '否决', value: 'FAILED'},
            ],
        },
      ],
    };
  }

  table = [
    {title: '变更编号', key: 'changeId', width: 100, cell: true, path: '/businessChange/deductDateDetail'},
    {title: '借据号', key: 'dueId', width: 100},
    {title: '客户名称', key: 'customerName', width: 100},
    {title: '证件号', key: 'identityNo', width: 150},
    {title: '手机号', key: 'phone', width: 130},
    {title: '合作机构名称', key: 'partnerName', width: 160},
    {title: '项目名称', key: 'projectName', width: 160},
    {title: '产品名称', key: 'productName', width: 160},
    {title: '原扣款日', key: 'oldRepayDay', width: 80},
    {title: '新扣款日', key: 'newRepayDay', width: 80},
    {title: '提交时间', key: 'createTime', width: 140},
    {title: '状态', key: 'changeStatus', width: 100},
  ];

  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount = () => {
    this.getData();
  };

  initDropList = () => {
    deductionDateChangeApi.queryChangeStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'changeStatus') {
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
    deductionDateChangeApi.queryDateList(params)
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
        <SearchForm form={this.state.form} title='扣款日变更' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
