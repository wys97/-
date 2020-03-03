import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid} from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;

export default class LoanDue extends Component {

  static displayName = 'LoanDue';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {

  };

  componentDidMount = () => {

  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>借据信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="借据号:">
                    <p>{this.props.loanDueDetailInfo.dueNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="借据状态:">
                    <p>{this.props.loanDueDetailInfo.dueStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    <p>{this.props.loanDueDetailInfo.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    <p>{this.props.loanDueDetailInfo.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款项目编号:">
                    <p>{this.props.loanDueDetailInfo.projectNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款项目名称:">
                    <p>{this.props.loanDueDetailInfo.projectName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品编号:">
                    <p>{this.props.loanDueDetailInfo.productNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品名称:">
                    <p>{this.props.loanDueDetailInfo.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户编号:">
                    <p>{this.props.loanDueDetailInfo.customerId}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户名称:">
                    <p>{this.props.loanDueDetailInfo.customerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.props.loanDueDetailInfo.identityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号:">
                    <p>{this.props.loanDueDetailInfo.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="手机号:">
                    <p>{this.props.loanDueDetailInfo.phone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款金额:">
                    <p>{this.props.loanDueDetailInfo.loanAmount ? this.props.loanDueDetailInfo.loanAmount : '--'}<span>元</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款期限:">
                    <p>{this.props.loanDueDetailInfo.loanTerm ? this.props.loanDueDetailInfo.loanTerm : '--'}<span>月</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款方式:">
                    <p>{this.props.loanDueDetailInfo.repayMethodText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="月利率:">
                    <p>{this.props.loanDueDetailInfo.interestRate ? this.props.loanDueDetailInfo.interestRate : '--'}<span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款日:">
                    <p>{this.props.loanDueDetailInfo.repayDay}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="放款时间:">
                    <p>{this.props.loanDueDetailInfo.payEndTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="起始时间:">
                    <p>{this.props.loanDueDetailInfo.valueDate}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="到期时间:">
                    <p>{this.props.loanDueDetailInfo.dueDate}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
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
