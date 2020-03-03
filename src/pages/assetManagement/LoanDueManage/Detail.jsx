import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Table} from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
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
                    <p>{this.props.detail.apply.applyId}<span> [自动生成] </span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请状态:">
                    <p>{this.props.detail.apply.applyStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    <p>{this.props.detail.apply.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    <p>{this.props.detail.apply.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款项目编号:">
                    <p>{this.props.detail.apply.projectNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款项目名称:">
                    <p>{this.props.detail.apply.projectName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品编号:">
                    <p>{this.props.detail.apply.productNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品名称:">
                    <p>{this.props.detail.apply.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户编号:">
                    <p>{this.props.detail.apply.customerId}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户名称:">
                    <p>{this.props.detail.apply.customerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.props.detail.apply.identityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号:">
                    <p>{this.props.detail.apply.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="手机号:">
                    <p>{this.props.detail.apply.phone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款金额:">
                    <p>{this.props.detail.apply.loanAmount ? this.props.detail.apply.loanAmount : '--'}<span>元</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="贷款期限:">
                    <p>{this.props.detail.apply.loanTerm ? this.props.detail.apply.loanTerm : '--'}<span>月</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款方式:">
                    <p>{this.props.detail.apply.repayMethodText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="月利率:">
                    <p>{this.props.detail.apply.interestRate ? this.props.detail.apply.interestRate : '--'}<span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="还款日:">
                    <p>{this.props.detail.apply.repayDay}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请地点:">
                    <p>{this.props.detail.apply.applyAreaName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请用途:">
                    <p>{this.props.detail.apply.applyUsage}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请时间:">
                    <p>{this.props.detail.apply.applyTime}</p>
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
                    <p>{this.props.detail.product.productTypeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="核算类型:">
                    <p>{this.props.detail.product.accountingTypeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="整数化方法:">
                    <p>{this.props.detail.product.roundMethodText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="反悔期:">
                    <p>{this.props.detail.product.backoutDay ? this.props.detail.product.backoutDay : '--'}<span>天</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="扣款顺序:">
                    <p>{this.props.detail.product.repaySequenceText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="是否支持提前还款:">
                    <p>{this.props.detail.product.isPrepay ? '是' : '否'}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="是否收取提还违约金:">
                    <p>{this.props.detail.product.isPrepayDamage ? '是' : '否'}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还违约金公式:">
                    <p>{this.props.detail.product.prepayDamageFormulaText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还费率:">
                    <p>{this.props.detail.product.prepayDamageRate ? this.props.detail.product.prepayDamageRate : '--'}<span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还计划更新方式:">
                    <p>{this.props.detail.product.prepayChangePlanText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="扣失最大天数:">
                    <p>{this.props.detail.product.debitFailDay ? this.props.detail.product.debitFailDay : '--'}<span>天</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="逾期宽限期:">
                    <p>{this.props.detail.product.overdueGraceDay ? this.props.detail.product.overdueGraceDay : '--'}<span>天</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="逾期罚息公式:">
                    <p>{this.props.detail.product.overdueFineFormulaText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="逾期日利率:">
                    <p>{this.props.detail.product.overdueRate ? this.props.detail.product.overdueRate : '--'}<span>%</span>
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
                    <p>{this.props.detail.customer.customerId}<span>[自动生成]</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    <p>{this.props.detail.customer.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    <p>{this.props.detail.customer.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户名称:">
                    <p>{this.props.detail.customer.customerName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="性别:">
                    <p>{this.props.detail.customer.genderText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="出生日期:">
                    <p>{this.props.detail.customer.birthDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.props.detail.customer.identityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号码:">
                    <p>{this.props.detail.customer.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="手机号:">
                    <p>{this.props.detail.customer.phone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="户籍归属编号:">
                    <p>{this.props.detail.customer.areaNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="户籍归属名称:">
                    <p>{this.props.detail.customer.areaName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="最高学历:">
                    <p>{this.props.detail.customer.educationText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="最高学位:">
                    <p>{this.props.detail.customer.degreeText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="E-MAIL:">
                    <p>{this.props.detail.customer.email}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="住宅电话:">
                    <p>{this.props.detail.customer.residencePhone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="住宅邮编:">
                    <p>{this.props.detail.customer.residencePostcode}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="住宅地址:">
                    <p>{this.props.detail.customer.residenceAddress}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="通讯地址:">
                    <p>{this.props.detail.customer.contactAddress}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="婚姻状况:">
                    <p>{this.props.detail.customer.maritalStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶名称:">
                    <p>{this.props.detail.customer.spouseName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶电话号码:">
                    <p>{this.props.detail.customer.spousePhone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶证件类型:">
                    <p>{this.props.detail.customer.spouseIdentityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="配偶证件号码:">
                    <p>{this.props.detail.customer.spouseIdentityNo}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>

          {this.props.detail.apply.productName === "机票分期" ? '' : (
            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>账户信息</p>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Table dataSource={this.props.detail.accounts} emptyContent="暂无数据">
                  <Table.Column title='账户号码' dataIndex='accountNo' width='200'/>
                  <Table.Column title='账户姓名' dataIndex='accountName' width='300'/>
                  <Table.Column title='开户银行名称' dataIndex='bankName' width='300'/>
                  <Table.Column title='账户用途' dataIndex='accountUsageText' width='300'/>
                </Table>
              </Form>
            </div>
          ) }

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>合同信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.detail.contracts} emptyContent="暂无数据">
                <Table.Column title='合同编号' dataIndex='contractNo' width='200'/>
                <Table.Column title='客户姓名' dataIndex='customerName' width='300'/>
                <Table.Column title='合同类型' dataIndex='contractTypeText' width='300'/>
                <Table.Column title='合同金额 (元) ' dataIndex='loanAmount' width='300'/>
                <Table.Column title='贷款期限 (月) ' dataIndex='loanTerm' width='300'/>
                <Table.Column title='月利率 (%) ' dataIndex='interestRate' width='300'/>
                <Table.Column title='操作' width='300' cell={(value, index, record) => {
                  return <a href={record.downloadUrl} target='_blank'>下载</a>
                }}/>
              </Table>
            </Form>
          </div>

          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>订单信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.detail.orders} emptyContent="暂无数据">
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
