import React, {Component} from 'react';
import {Dialog, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import productManageApi from "../../../api/OperationManage/ProductManage";

export default class ProductManage extends Component {
  static displayName = 'ProductManage';
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
      form: [{
        label: '借据号',
        key: 'productNo',
        type: '',
      },
        {
          label: '客户名称',
          key: 'partnerName',
          type: '',
        },
        {
          label: '手机号',
          key: 'productName',
          type: '',
        },
        {
          label: '证件号',
          key: 'productName',
          type: '',
        },
        {
          label: '还款类型',
          key: 'productType',
          type: 'select',
          list: [{
            key: '全部',
            value: '',
          }],
        },
        {
          label: '审批状态',
          key: 'productStatus',
          type: 'select',
          list: [{
            key: '全部',
            value: '',
          }],
        },
      ],
      refresh: 0,
    };
  }

  table = [{
    title: '交易流水号',
    key: 'productNo',
    width: 100,
    cell: true,
    path: '/baseinfo/ProductInfoTabManage',
  },
    {
      title: '借据号',
      key: 'partnerName',
      width: 200,
    },
    {
      title: '产品名称',
      key: 'productName',
      width: 200,
    },
    {
      title: '客户名称',
      key: 'productTypeText',
      width: 120,
    },
    {
      title: '手机号',
      key: 'productStatusText',
      width: 120,
    },
    {
      title: '证件号',
      key: 'productStatusText',
      width: 120,
    },
    {
      title: '还款类型',
      key: 'productStatusText',
      width: 120,
    },
    {
      title: '还款金额(元)',
      key: 'productStatusText',
      width: 120,
    },
    {
      title: '审批状态',
      key: 'productStatusText',
      width: 120,
    },
    {
      title: '操作',
      key: 'operate',
      width: 250,
      cell: true,
    },
  ];

  componentWillMount() {
    this.getproductType();
    this.getproductStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getproductType = () => { //产品管理-产品类型-下拉框
    productManageApi.productType()
      .then((res) => {
        if (res.data.code === '200') {
          let productType = res.data.data;
          if (productType !== null && productType !== undefined && productType instanceof Array) {
            productType.forEach((v) => {
              this.state.form[3].list.push({
                key: v,
                value: v,
              });
            });
            this.setState({
              refresh: this.state.refresh + 1,
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getproductStatus = () => { //产品管理-产品状态-下拉框
    productManageApi.productStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let productStatus = res.data.data;
          if (productStatus !== null && productStatus !== undefined) {
            let amap = new Map(Object.entries(productStatus));
            for (let [k, v] of amap) {
              // state中form[4]里面list的key是中文, value是英文
              this.state.form[4].list.push({
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
    productManageApi.productList(params)
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

  toolBtn = [{
    name: '新增',
    type: 'add',
    icon: 'add',
    // path: '/baseinfo/productAdd',
    permission: 'operation:basic:product:add'
  }];

  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: '/baseinfo/productAdd'
      });
    }
  };

  lineBtn = [{
    name: '修改',
    type: 'edit',
    key: 'productStatus',
    value: 'DISABLED',
    permission: 'operation:basic:product:modify'
  },
    {
      name: '启用',
      type: 'turnOn',
      key: 'productStatus',
      value: 'DISABLED',
      permission: 'operation:basic:product:enable'
    },
    {
      name: '禁用',
      type: 'turnOff',
      key: 'productStatus',
      value: 'ENABLED',
      permission: 'operation:basic:product:disable'
    },
    {
      name: '删除',
      type: 'delete',
      key: 'allowDelection',
      value: 'true',
      permission: 'operation:basic:product:delete'
    },
  ];

  lineBtnFn = {
    turnOn: (val, index, row) => {
      Dialog.show({
        title: '项目启用',
        content: '确认启用该产品吗？',
        onOk: () => this.turnOnFn(row.productNo),
      });
    },
    turnOff: (val, index, row) => {
      Dialog.show({
        title: '项目停止',
        content: '确认停止该产品吗？',
        onOk: () => this.turnOffFn(row.productNo),
      });
    },
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: '/baseinfo/ProductUpdateTabManage',
        state: {name: row.productNo, pname: row.productName}
      });
    },
    delete: (val, index, row) => {
      Dialog.show({
        title: '项目删除',
        content: '确认删除该产品吗？',
        onOk: () => this.deleteFn(row.productNo),
      });
    },
  };

  turnOnFn = (productNo) => {
    productManageApi.productEnabled(productNo)
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

  turnOffFn = (productNo) => {
    productManageApi.productDisabled(productNo)
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

  deleteFn = (productNo) => {
    productManageApi.productDelete(productNo)
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
        <SearchForm form={this.state.form} title='产品管理' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn}
                   lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}
