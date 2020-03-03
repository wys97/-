import React, {Component} from 'react';
import DataTable from '../../dataTable';
import SearchForm from '../../components/SearchForm';
import partnerManageApi from '../../../api/OperationManage/PartnerManage';
import {Dialog, Message} from '@alifd/next';
import store from "../../../store";
import { partnersManage } from "../../../store/ScreeningWarehouse/productRunManage/actions";

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
export default class PartnerManage extends Component {

  static displayName = 'PartnerManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().productRunManage.partnersManage.formValue,
      page: store.getState().productRunManage.partnersManage.page,
      limit: store.getState().productRunManage.partnersManage.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {label: '合作机构号', key: 'partnerNo', type: ''},
        {label: '合作机构名称', key: 'partnerName', type: ''},
        {
          label: '机构类型', key: 'partnerBusiness', type: 'select', list:
            [
              {key: '全部', value: ''},
              {key: '小额贷款公司', value: '1'},
              {key: '消费金融公司', value: '2'},
              {key: '担保公司', value: '3'},
              {key: '典当公司', value: '4'},
              {key: '其他', value: '5'},
            ],
        },
        {
          label: '机构状态', key: 'partnerStatus', type: 'select', list:
            [
              {key: '全部', value: ''},
              {key: '启用', value: 'ENABLED'},
              {key: '禁用', value: 'DISABLED'},
            ],
        },
      ],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().productRunManage.partnersManage.formValue,
        page: store.getState().productRunManage.partnersManage.page,
        limit: store.getState().productRunManage.partnersManage.limit
      });
    });
  }

  table = [
    {title: '合作机构编号', key: 'partnerNo', width: 100, cell: true, path: '/baseinfo/partnerInfoTab'},
    {title: '合作机构名称', key: 'partnerName', width: 180},
    {title: '机构类型', key: 'partnerBusiness', width: 110},
    {title: '成立日期', key: 'setupDate', width: 100},
    {title: '企业总资产(元)', key: 'totalAsset', align: 'right', width: 130},
    {title: '企业总负债(元)', key: 'totalLiability', align: 'right', width: 130},
    {title: '状态', key: 'partnerStatusText', width: 80},
    {title: '操作', key: 'operate', width: 180, cell: true},
  ];


  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount() {
    this.getData();
  }

  initDropList = () => {
    partnerManageApi.queryPartnerStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: key});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'partnerStatus') {
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

    partnerManageApi.queryPartnerType()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({key: res.data.data[key], value: res.data.data[key]});
          }
          this.state.form.map((item, index) => {
            if (item.key === 'partnerBusiness') {
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

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(partnersManage(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(partnersManage(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    partnerManageApi.queryPartnerList(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
            loading: false,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  toolBtn = [
    {
      name: '新增',
      type: 'add',
      icon: 'add',
      permission: 'operation:basic:partner:add'
    },
  ];

  lineBtn = [
    {
      name: '修改',
      type: 'edit',
      key: 'partnerStatus',
      value: 'DISABLED',
      permission: 'operation:basic:partner:modify'
    },
    {
      name: '启用',
      type: 'turnOn',
      key: 'partnerStatus',
      value: 'DISABLED',
      permission: 'operation:basic:partner:enable'
    },
    {
      name: '停用',
      type: 'turnOff',
      key: 'partnerStatus',
      value: 'ENABLED',
      permission: 'operation:basic:partner:disable'
    },
    {
      name: '删除',
      type: 'del',
      key: 'allowDelection',
      value: 'true',
      permission: 'operation:basic:partner:delete'
    },
  ];

  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: '/baseinfo/partnerAdd'
      });
    },
  };

  lineBtnFn = {
    edit: (value, index, record) => {
      this.props.history.push({
        pathname: '/baseinfo/partnerInfoTab',
        state: {name: record.partnerNo, type: 'edit'},
      });
    },
    turnOn: (value, index, record) => {
      Dialog.show({title: '启用合作机构', content: '确认启用该合作机构吗？', onOk: () => this.turnOnPartnerFn(record.partnerNo)});
    },
    turnOff: (value, index, record) => {
      Dialog.show({title: '停用合作机构', content: '确认停用该合作机构吗？', onOk: () => this.turnOffPartnerFn(record.partnerNo)});
    },
    del: (value, index, record) => {
      Dialog.show({title: '删除合作机构', content: '确认删除该合作机构吗？', onOk: () => this.delPartnerFn(record.partnerNo)});
    },
  };

  turnOnPartnerFn = (id) => {
    partnerManageApi.enablePartner(id)
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

  turnOffPartnerFn = (id) => {
    partnerManageApi.disablePartner(id)
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

  delPartnerFn = (id) => {
    partnerManageApi.deletePartner(id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          loading: true,
        }, () => this.getData());
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(partnersManage(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  render() {
    return (
      <div>
        <SearchForm form={this.state.form} title='合作机构管理' formValue={this.state.formValue} onSubmit={(formValue) => this.onSubmit(formValue)}/>
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
