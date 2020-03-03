import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import DataTable from "../../dataTable";
import {Form, Grid, Input, Message} from '@alifd/next';
import feeWaiverApi from '../../../api/WorkBench/FeeWaiver'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

export default class Detail extends Component {
  static displayName = 'Detail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {},
      data: [],
    }
  }

  table = [
    { title: "期次", key: "periodNo", width: 100, align: "center" },
    { title: "还款日期", key: "dueDate", width: 100, align: "center" },
    {
      title: "未还本金（元）",
      key: "unpaidPrincipal",
      width: 100,
      align: "center"
    },
    {
      title: "未还利息（元）",
      key: "unpaidInterest",
      width: 100,
      align: "center"
    },
    { title: "未还罚息（元）", key: "unpaidFine", width: 100, align: "center" },
    {
      title: "调整本金（元）",
      key: "decreasePrincipal",
      width: 100,
      align: "center"
    },
    {
      title: "调整利息（元）",
      key: "decreaseInterest",
      width: 100,
      align: "center"
    },
    {
      title: "调整罚息（元）",
      key: "decreaseFine",
      width: 100,
      align: "center"
    },
    {
      title: "调整总额（元）",
      key: "decreaseAmount",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还本金（元）",
      key: "unpaidPrincipalLeft",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还利息（元）",
      key: "unpaidInterestLeft",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还罚息（元）",
      key: "unpaidFineLeft",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还总额（元）",
      key: "unpaidAmountLeft",
      width: 100,
      align: "center"
    }
  ];

  componentWillMount() {
    this.getApprovalDetail();
  }

  componentDidMount() {

  }

  getApprovalDetail = () => {
    feeWaiverApi.approvalDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    });
    feeWaiverApi.decreaseDetailList(this.state.id).then(res => {
      if (res.data.code === "200") {
        let data = res.data.data;
        let total = {
          unpaidPrincipal: 0,
          unpaidInterest: 0,
          unpaidFine: 0,
          decreasePrincipal: 0,
          decreaseInterest: 0,
          decreaseFine: 0,
          decreaseAmount: 0,
          unpaidInterestLeft: 0,
          unpaidFineLeft: 0,
          unpaidPrincipalLeft: 0,
          unpaidAmountLeft: 0
        };
        data.map((item, index) => {
          total.unpaidPrincipal += Number(item.unpaidPrincipal);
          total.unpaidInterest += Number(item.unpaidInterest);
          total.unpaidFine += Number(item.unpaidFine);
          total.decreasePrincipal += Number(item.decreasePrincipal);
          total.decreaseInterest += Number(item.decreaseInterest);
          total.decreaseFine += Number(item.decreaseFine);
          total.decreaseAmount += Number(item.decreaseAmount);
          total.unpaidInterestLeft += Number(item.unpaidInterestLeft);
          total.unpaidFineLeft += Number(item.unpaidFineLeft);
          total.unpaidPrincipalLeft += Number(item.unpaidPrincipalLeft);
          total.unpaidAmountLeft += Number(item.unpaidAmountLeft);
        });
        total.periodNo = "合计：";
        data.push(total);
        this.setState({
          data: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>息费调整详情</h3>
          </div>
          <div className='contain-con'>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="调整编号:">
                    <p>{this.state.formInput.decreaseInterestId}<span>[自动生成]</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="状态:">
                    <p>{this.state.formInput.approvalStatus}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="借据编号:">
                    <p>{this.state.formInput.dueId}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户姓名:">
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
                  <FormItem style={styles.formItem} required label="产品名称:">
                    <p>{this.state.formInput.productName}</p>
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
                  <FormItem style={styles.formItem} required label="贷款金额:">
                    <p>{this.state.formInput.loanAmount ? this.state.formInput.loanAmount : '--'}<span>元</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="调整方式:">
                  <p>{this.state.formInput.rectifyType}</p>
                  </FormItem>
                </Col>
              </Row>
              <DataTable
                col={this.table}
                loadTable={this.state.loading}
                data={this.state.data}
              />
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="调整原因:">
                  <span>{this.state.formInput.decreaseReason}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    <p>{this.state.formInput.creatorName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    <p>{this.state.formInput.createTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.state.formInput.modifierName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    <p>{this.state.formInput.modifyTime}</p>
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
