import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Form, Grid, Table } from '@alifd/next';

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormItem = Form.Item;

export default class ApplyDetail extends Component {

  static displayName = 'ApplyDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:props
    }
  }

  componentWillMount = () => {
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'}  {...formItemLayout} style={{ marginTop: '30px' }} field={this.field}>
            <div className="contain-con">
              <p
                style={{
                  borderBottom: "1px solid #DDD",
                  paddingBottom: "10px"
                }}
              >
                展期申请
                </p>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="展期编号:">
                    <p>{this.props.detailInfo.rolloverId} [自动生成]</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="借据号:">
                    <p>{this.props.detailInfo.dueId}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="合同号:">
                    <p>{this.props.detailInfo.contractNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="产品名称:">
                    <p>{this.props.detailInfo.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="客户名称:" requiredMessage="客户名称是必填信息">
                    <p>{this.props.detailInfo.customerName}</p>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="手机号:" >
                    <p>{this.props.detailInfo.phone}</p>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号码:">
                    <p>{this.props.detailInfo.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="放款金额:" >
                    <p>{this.props.detailInfo.loanAmount}</p>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="原期次:" >
                    <p>{this.props.detailInfo.originalPeriods}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款方式:" >
                    <p>{this.props.detailInfo.repayMethodText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="展期利率(月):" >
                    <p>{this.props.detailInfo.interestRate}<span>%</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="展期期次:" format="email">
                    <p>{this.props.detailInfo.rolloverPeriods}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="剩余未还本金:">
                    <p>{this.props.detailInfo.unpaidPrincipal}</p>
                  </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="待还利息:">
                    <p>{this.props.detailInfo.unpaidInterest}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="待还罚息:">
                    <p>{this.props.detailInfo.unpaidFine}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="状态:">
                    <p>{this.props.detailInfo.statusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="展期状态:">
                    <p>{this.props.detailInfo.rolloverStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    <p>{this.props.detailInfo.creatorName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="更新日期:">
                    <p>{this.props.detailInfo.updateTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.props.detailInfo.modifierName}</p>
                  </FormItem>
                </Col>
               
              </Row>

            </div>


          </Form>

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
  clientDetailInfo: {
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
  },
};