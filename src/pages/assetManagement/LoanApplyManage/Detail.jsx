import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Table} from '@alifd/next';
import CustomerContractInfo from "../../OperationManage/customerManageNew/customerContractInfo";

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;

export default class Detail extends Component {

  static displayName = 'Detail';
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
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>进件信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款申请编号:">
                    <p>{this.props.detailInfo.apply.applyId}<span>[自动生成]</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请状态:">
                    <p>{this.props.detailInfo.apply.applyStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    <p>{this.props.detailInfo.apply.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    <p>{this.props.detailInfo.apply.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款项目编号:">
                    <p>{this.props.detailInfo.apply.projectNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款项目名称:">
                    <p>{this.props.detailInfo.apply.projectName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品编号:">
                    <p>{this.props.detailInfo.apply.productNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品名称:">
                    <p>{this.props.detailInfo.apply.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户编号:">
                    <p>{this.props.detailInfo.apply.customerId}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户名称:">
                    <p>{this.props.detailInfo.apply.customerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.props.detailInfo.apply.identityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号:">
                    <p>{this.props.detailInfo.apply.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="手机号:">
                    <p>{this.props.detailInfo.apply.phone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款金额:">
                    <p>{this.props.detailInfo.apply.loanAmount ? this.props.detailInfo.apply.loanAmount : '--'}<span>元</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款期限:">
                    <p>{this.props.detailInfo.apply.loanTerm ? this.props.detailInfo.apply.loanTerm : '--'}<span>月</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款方式:">
                    <p>{this.props.detailInfo.apply.repayMethodText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="月利率:">
                    <p>{this.props.detailInfo.apply.interestRate ? this.props.detailInfo.apply.interestRate : '--'}<span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款日:">
                    <p>{this.props.detailInfo.apply.repayDay}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请地点:">
                    <p>{this.props.detailInfo.apply.applyAreaName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请用途:">
                    <p>{this.props.detailInfo.apply.applyUsage}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请时间:">
                    <p>{this.props.detailInfo.apply.applyTime}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>产品信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品类型:">
                    <p>{this.props.detailInfo.product.productTypeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="核算类型:">
                    <p>{this.props.detailInfo.product.accountingTypeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="整数化方法:">
                    <p>{this.props.detailInfo.product.roundMethodText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="反悔期:">
                    <p>{this.props.detailInfo.product.backoutDay ? this.props.detailInfo.product.backoutDay : '--'}<span>天</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="扣款顺序:">
                    <p>{this.props.detailInfo.product.repaySequenceText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="是否支持提前还款:">
                    <p>{this.props.detailInfo.product.isPrepay ? '是' : '否'}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="是否收取提还违约金:">
                    <p>{this.props.detailInfo.product.isPrepayDamage ? '是' : '否'}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还违约金公式:">
                    <p>{this.props.detailInfo.product.prepayDamageFormulaText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还费率:">
                    <p>{this.props.detailInfo.product.prepayDamageRate ? this.props.detailInfo.product.prepayDamageRate : '--'}<span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还计划更新方式:">
                    <p>{this.props.detailInfo.product.prepayChangePlanText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="扣失最大天数:">
                    <p>{this.props.detailInfo.product.debitFailDay ? this.props.detailInfo.product.debitFailDay : '--'}<span>天</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="逾期宽限期:">
                    <p>{this.props.detailInfo.product.overdueGraceDay ? this.props.detailInfo.product.overdueGraceDay : '--'}<span>天</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="逾期罚息公式:">
                    <p>{this.props.detailInfo.product.overdueFineFormulaText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="逾期日利率:">
                    <p>{this.props.detailInfo.product.overdueRate ? this.props.detailInfo.product.overdueRate : '--'}<span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>客户信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户编号:">
                    <p>{this.props.detailInfo.customer.customerId}<span>[自动生成]</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    <p>{this.props.detailInfo.customer.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    <p>{this.props.detailInfo.customer.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户名称:">
                    <p>{this.props.detailInfo.customer.customerName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="性别:">
                    <p>{this.props.detailInfo.customer.genderText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="出生日期:">
                    <p>{this.props.detailInfo.customer.birthDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.props.detailInfo.customer.identityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号码:">
                    <p>{this.props.detailInfo.customer.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="手机号:">
                    <p>{this.props.detailInfo.customer.phone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="户籍归属编号:">
                    <p>{this.props.detailInfo.customer.areaNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="户籍归属名称:">
                    <p>{this.props.detailInfo.customer.areaName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="最高学历:">
                    <p>{this.props.detailInfo.customer.educationText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="最高学位:">
                    <p>{this.props.detailInfo.customer.degreeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="E-MAIL:">
                    <p>{this.props.detailInfo.customer.email}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="住宅电话:">
                    <p>{this.props.detailInfo.customer.residencePhone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="住宅邮编:">
                    <p>{this.props.detailInfo.customer.residencePostcode}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="住宅地址:">
                    <p>{this.props.detailInfo.customer.residenceAddress}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="通讯地址:">
                    <p>{this.props.detailInfo.customer.contactAddress}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="婚姻状况:">
                    <p>{this.props.detailInfo.customer.maritalStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶名称:">
                    <p>{this.props.detailInfo.customer.spouseName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶电话号码:">
                    <p>{this.props.detailInfo.customer.spousePhone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶证件类型:">
                    <p>{this.props.detailInfo.customer.spouseIdentityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶证件号码:">
                    <p>{this.props.detailInfo.customer.spouseIdentityNo}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>

          {this.props.detailInfo.apply.productName === "机票分期" ? null : (<div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>账户信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.detailInfo.accounts} emptyContent="暂无数据">
                <Table.Column title='账户号码' dataIndex='accountNo' width='200'/>
                <Table.Column title='账户姓名' dataIndex='accountName' width='300'/>
                <Table.Column title='开户银行名称' dataIndex='bankName' width='300'/>
                <Table.Column title='账户用途' dataIndex='accountUsageText' width='300'/>
              </Table>
            </Form>
          </div>)}

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>合同信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.contractInfo} emptyContent="暂无数据">
              <Table.Column title='合同编号' dataIndex='contractNo' width='200'/>
              <Table.Column title='合同名称' dataIndex='contractName' width='300' />
              <Table.Column title='产品名称' dataIndex='productName' width='300'/>
              <Table.Column title='客户名称' dataIndex='customerName' width='300'/>
              <Table.Column title='状态' dataIndex='contractStatus' width='300'/>
                <Table.Column title='操作' width='300' cell={(value, index, contractInfo) => {
              return <a href={contractInfo.url} target='_blank'>下载</a>
            }}/>
              </Table>
            </Form>
          </div>

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>订单信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.detailInfo.orders} emptyContent="暂无数据">
                <Table.Column title='订单号' dataIndex='orderId' width='200'/>
                <Table.Column title='类型' dataIndex='orderType' width='100'/>
                <Table.Column title='金额 (元) ' dataIndex='orderAmount' width='200'/>
                <Table.Column title='简述' dataIndex='briefText' width='300'/>
                <Table.Column title='相关人员' dataIndex='people' width='300'/>
                <Table.Column title='备注' dataIndex='remark' width='300'/>
                <Table.Column title='时间' dataIndex='orderTime' width='300'/>
              </Table>
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
