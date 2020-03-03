import React, { Component } from 'react';
import { Table, Select, Message } from '@alifd/next';
import request from '../../api/businessConfig/businessConfig'
import { getAuthority } from "../../utils/authority";
const Option = Select.Option;
export default class BusinessConfig extends Component {
  static displayName = 'BusinessConfig';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      channelList: {},
      id: '',
      provideCode: '',
      index: '',
      permission: 'business:router:business-router-config:update'
    }
  }


  componentWillMount() {
    this.getPage();
    this.getChannel()
  }

  getPage() {
    request.getPage().then(res => {

      if (res.data.code == '200') {
        this.setState({
          data: res.data.data
        })
      }
    })
  };
  getChannel() {
    request.channel().then(res => {
      if (res.data.code == '200') {
        this.setState({
          channelList: res.data.data
        })
      }
    })
  };
  //下拉
  dropDown = (value, index, record) => {
    let defaultValue = '';
    if (record.payProviderCode == 'PAYMENT_CENTER') {
      defaultValue = '支付中心通道'
    } else if (record.payProviderCode == 'INTERNAL') {
      defaultValue = '中金支付通道'
    } else {
      defaultValue = '请选择'
    }
    return (
      <Select style={{ width: '200px' }} defaultValue={defaultValue} onChange={this.selectvalue.bind(this, record, index)}>
        {
          Object.keys(this.state.channelList)
            .map(key => {
              return <Option key={key} value={key} >{this.state.channelList[key]}</Option>;
            })
        }
      </Select>

    );
  }

  preserve = (value, index, record) => {
    return (this.state.permission && getAuthority().indexOf(this.state.permission) !== -1 ? <div style={styles.btn} onClick={() => this.preserveBtn(index)}>保存</div> : null)
  }



  //下拉选中的数据
  selectvalue = (value, index, provideCode) => {


    this.setState({
      id: value.id,
      provideCode: provideCode,
      index: index
    })


  }

  //保存按钮
  preserveBtn = (i) => {
    let { index, provideCode, id } = this.state;
    if (i == index) {
      let data = {
        id,
        provideCode
      }
      request.preserveData(data).then(res => {
        if (res.data.code == '200') {
          this.getPage()
          Message.success('保存成功')
        } else {
          Message.error(res.data.message)
        }
      })
    } else {
      Message.error('未进行修改不能保存');
    }
  }


  render() {

    return (
      <div className=''>
        <Table dataSource={this.state.data} >
          <Table.Column title='业务路由编号' dataIndex='id' />
          <Table.Column title='业务类型' dataIndex='businessTypeText' />
          <Table.Column title='路由通道' cell={this.dropDown} width={200} />
          <Table.Column title='修改时间' dataIndex='updateTime' />
          <Table.Column title='修改人员' dataIndex='modifierName' />
          <Table.Column title='操作' cell={this.preserve} />
        </Table>
      </div>
    )
  }



}
const styles = {
  btn: {
    cursor: "pointer",
    width: '85px',
    height: '30px',
    background: '#5A9BFE',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '30px',
    borderRadius: '3px',
    fontSize: '16px',

  }



}