import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Input, Message} from '@alifd/next';
import DayendSettlementApi from '../../../api/HnairCreditManage/DayendSettlement'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;


export default class BillingInformation extends Component {
  static displayName = 'BillingInformation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {

      }
    }
  }

  componentDidMount = () => {
    this.getBillingDetail()
  };

  getBillingDetail = () => {       //结算信息-详情
    let params = this.state.id
    DayendSettlementApi.finaceSettleRead(params).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            {/* <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p> */}
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
            <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="结算编号:">
                    <p>{this.state.formInput.id}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="结算日期:">
                    <p>{this.state.formInput.settleDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品编号:">
                    <p>{this.state.formInput.productNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品名称:">
                    <p>{this.state.formInput.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="放款金额:">
                    <p>{this.state.formInput.loanAmount}元</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="退款金额:">
                    <p>{this.state.formInput.refundAmount}元</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="前天轧差:">
                    <p>{this.state.formInput.lastDiffAmount}元</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="当天轧差:">
                    <p>{this.state.formInput.diffAmount}元</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="当天结算金额:">
                    <p>{this.state.formInput.settleAmount}元</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="发送状态:">
                    <p>{this.state.formInput.sendStatus}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="结算状态:">
                    <p>{this.state.formInput.settleStatus}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="结算时间:">
                    <p>{this.state.formInput.settleEndTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="记录生成时间:">
                    <p>{this.state.formInput.createTime}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>    
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  formItem: {
    display: 'flex'
  },
  formItemLabel: {},
  formItemError: {
    marginLeft: '10px',
  }
};
