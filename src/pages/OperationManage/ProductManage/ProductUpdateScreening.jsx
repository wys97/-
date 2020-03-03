import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Dialog, Message} from '@alifd/next';
import DataTable from '../../dataTable';
import productManageApi from '../../../api/OperationManage/ProductManage'
import '../OperationManage'

export default class ProductUpdateScreening extends Component {

  static displayName = 'ProductUpdateScreening';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      refresh: 0, // 用于刷新表格
      formValue: {
        productNo: props.id
      },
      page: 1,
      limit: 10,
      loading: false,
      data: [],
    };
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
    productManageApi.productRuleInfo(params).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data: res.data.data,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  table = [
    {title: '规则编号', key: 'ruleNo', width: 100},
    {title: '规则描述', key: 'ruleName', width: 300},
    {title: '应用场景', key: 'ruleSceneText', width: 100},
    {title: '风险级别', key: 'ruleLevelText', width: 100},
    {title: '规则状态', key: 'statusText', width: 100},
    {title: '操作', key: 'operate', width: 100, cell: true}
  ];

  lineBtn = [
    {
      name: '启用',
      type: 'turnOn',
      key: 'status',
      value: 'DISABLED',
      permission: ':'
    },
    {
      name: '禁用',
      type: 'turnOff',
      key: 'status',
      value: 'ENABLED',
      permission: ':'
    }
  ];

  lineBtnFn = {
    turnOn: (val, index, row) => {
      Dialog.show({title: '规则启用', content: '确认启用该规则吗？', onOk: () => this.turnOnFn(row.id)});
    },
    turnOff: (val, index, row) => {
      Dialog.show({title: '规则停用', content: '确认停用该规则吗？', onOk: () => this.turnOffFn(row.id)});
    }
  };

  turnOnFn = (id) => {
    productManageApi.productRuleEnabled(id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          loading: true
        }, () => this.getData());
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  turnOffFn = (id) => {
    productManageApi.productRuleDisabled(id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          loading: true
        }, () => this.getData());
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>筛查规则设置</p>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={false}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
          </div>
        </IceContainer>
      </div>
    )
  }
}
