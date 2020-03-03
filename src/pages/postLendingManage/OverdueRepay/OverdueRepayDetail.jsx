import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Message, Table} from '@alifd/next';
import overdueRepayApi from '../../../api/PostLendingManage/OverdueRepay';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;

export default class OverdueRepay extends Component {

  static displayName = 'OverdueRepay';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formInput: {
        dueId: '',						// 借据号
        customerName: '',			// 客户名称
        identityType: '',			// 证件类型
        identityNo: '',				// 证件号
        phone: '',						// 手机号
        partnerName: '',			// 合作机构名称
        projectName: '',			// 项目名称
        productName: '',			// 产品名称
        overduePeriod: '',		// 逾期期数
        maxOverdueDay: '',		// 逾期最大天数
        totalOverdueAmount: '',					// 逾期应还总金额
        totalOverdueUnpaidAmount: '',		// 逾期未还总金额
        isClear: '',					// 结清标识
        isClearText: '',			// 结清标识中文
        overList: [],					// 逾期列表
      }
    }
  }

  componentDidMount = () => {
    this.getDetail()
  };

  getDetail = () => {
    overdueRepayApi.overdueRepayDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };

  goBack = () => {
    this.props.history.go(-1)
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
              <h3>逾期明细详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="借据号:">
                      <p>{this.state.formInput.dueId}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="结清标志:">
                      <p>{this.state.formInput.isClearText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="客户名称:">
                      <p>{this.state.formInput.customerName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="手机号:">
                      <p>{this.state.formInput.phone}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件类型:">
                      <p>{this.state.formInput.identityType}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件号:">
                      <p>{this.state.formInput.identityNo}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="合作机构名称:">
                      <p>{this.state.formInput.partnerName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="贷款项目名称:">
                      <p>{this.state.formInput.projectName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="产品名称:">
                      <p>{this.state.formInput.productName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="逾期期数:">
                      <p>{this.state.formInput.overduePeriod}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="逾期最大天数:">
                      <p>{this.state.formInput.maxOverdueDay}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="逾期应还总金额:">
                      <p>{this.state.formInput.totalOverdueAmount ? this.state.formInput.totalOverdueAmount : '--'}<span>元</span>
                      </p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="逾期未还总额:">
                      <p>{this.state.formInput.totalOverdueUnpaidAmount ? this.state.formInput.totalOverdueUnpaidAmount : '--'}<span>元</span>
                      </p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}/>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Table dataSource={this.state.formInput.overList} emptyContent="暂无数据">
                  <Table.Column title='借据号' dataIndex='dueId' width='200'/>
                  <Table.Column title='逾期期次' dataIndex='period' width='300'/>
                  <Table.Column title='应还日期' dataIndex='dueDate' width='300'/>
                  <Table.Column title='转逾日期' dataIndex='turnOverdueDate' width='300'/>
                  <Table.Column title='逾期天数' dataIndex='overdueDay' width='300'/>
                  <Table.Column title='逾期应还本金 (元) ' dataIndex='principal' width='300'/>
                  <Table.Column title='逾期应还利息 (元) ' dataIndex='interest' width='300'/>
                  <Table.Column title='逾期应还罚息 (元) ' dataIndex='fine' width='300'/>
                  <Table.Column title='已还本金 (元) ' dataIndex='repayPrincipal' width='300'/>
                  <Table.Column title='已还利息 (元) ' dataIndex='repayInterest' width='300'/>
                  <Table.Column title='已还罚息 (元) ' dataIndex='repayFine' width='300'/>
                  <Table.Column title='调整本金 (元) ' dataIndex='decreasePrincipal' width='300'/>
                  <Table.Column title='调整利息 (元) ' dataIndex='decreaseInterest' width='300'/>
                  <Table.Column title='调整罚息 (元) ' dataIndex='decreaseFine' width='300'/>
                  <Table.Column title='未还总额 (元) ' dataIndex='totalOverdueUnpaidAmount' width='300'/>
                  <Table.Column title='结清标志' dataIndex='isClearText' width='300'/>
                  <Table.Column title='结清日期' dataIndex='clearTime' width='300'/>
                </Table>
              </Form>
            </div>
          </IceContainer>
        </div>
      )
    }
  }
}

const styles = {
  formItem: {
    display: 'flex'
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
    padding: 10
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px'
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe'
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
    width: '240px'
  },
  formContent: {
    width: '0px',
    border: 'none'
  },
  formTextArea: {
    width: '500px'
  }

};
