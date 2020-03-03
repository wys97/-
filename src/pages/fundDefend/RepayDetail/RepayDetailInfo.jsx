import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Dialog, Form, Grid, Message} from '@alifd/next';
import repayDetailApi from '../../../api/FundDefund/RepayDetail';
import DataTable from '../../dataTable';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const FormItem = Form.Item;

export default class LoanDetailInfo extends Component {

  static displayName = 'LoanDetailInfo';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formInput: {
        approvalRecordList: [],  // 变更记录
      },
      formValue: {},
      loading: false,
      data: [],
    };
  }

  table = [
    {title: '还款流水号', key: 'tradeId', width: 100},
    {title: '交易金额(元)', key: 'amount', width: 130},
    {title: '交易时间', key: 'time', width: 140},
    {title: '放款状态', key: 'payStatusText', width: 100},
    {title: '支付通道', key: 'providerCodeText', width: 160},
    {title: '通道交易流水号', key: 'providerTradeId', width: 100},
    {title: '通道交易金额(元)', key: 'providerAmount', width: 130},
    {title: '通道交替时间', key: 'providerTime', width: 140},
    {title: '通道交易状态', key: 'providerStatus', width: 130},
    {title: '对账结果', key: 'checkResultText', width: 100},
    {title: '操作', key: 'operate', width: 280, cell: true}
  ];


  componentWillMount = () => {
  };

  componentDidMount = () => {
    if (this.props.location.state !== null && this.props.location.state !== undefined) {
      this.getDetail();
    }
  };

  getDetail = () => {
    repayDetailApi.checkRepayDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            formInput: res.data.data,
            data: res.data.data.list,
            loading: false,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  goBack = () => {
    this.props.history.go(-1);
  };


  lineBtn = [{
    name: '勾兑状态',
    type: 'blendStatus',
    key: 'checkResult',
    value: 'MISS_SYSTEM',
    permission: ':'
  },
    {
      name: '勾兑日期',
      type: 'blendDate',
      key: 'checkResult',
      value: 'MISS_UP',
      permission: ':'
    },
    // {
    //   name: '勾兑记录',
    //   type: 'blendNote',
    //   key: 'checkResult',
    //   value: 'HANDLED',
    //   permission: ':'
    // }
  ];


  lineBtnFn = {
    blendStatus: (val, index, row) => {
      Dialog.show({
        title: '勾兑状态',
        content: '确认勾兑状态吗？',
        onOk: () => this.blendStatusFn(row.id),
      });
    },
    blendDate: (val, index, row) => {
      Dialog.show({
        title: '勾兑日期',
        content: '确认勾兑日期吗？',
        onOk: () => this.blendDateFn(row.id),
      });
    },
  };


  blendStatusFn = (id) => {
    repayDetailApi.checkRepayBlendStatus(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getDetail());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  blendDateFn = (id) => {
    repayDetailApi.checkRepayBlendDate(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getDetail());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };


  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>

            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>还款对账详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>

            <div className='contain-con'>
              {/* <p style={{ borderBottom: '1px solid #DDD', paddingBottom: '10px' }}>基本信息</p> */}
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="对账编号:">
                      <p>{this.state.formInput.checkId}<span>[自动生成]</span></p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="对账状态:">
                      <p>{this.state.formInput.checkStatusText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="对账日期:">
                      <p>{this.state.formInput.checkDate}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="不匹配笔数:">
                      <p>{this.state.formInput.diffCount}</p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className='contain-con'>
              <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                         page={false}
                         pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                         loadTable={this.state.loading}
                         data={this.state.data}/>
            </div>

          </IceContainer>
        </div>
      );
    }
  }
}

const styles = {
  formItem: {
    display: 'flex',
  },
  formItemLabel: {},
  formItemError: {
    marginLeft: '10px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
    // width: '200px'
  },
  formInputBorder: {
    width: '240px',
  },
  formContent: {
    width: '0px',
    border: 'none',
  },
  formTextArea: {
    width: '500px',
  },

};
