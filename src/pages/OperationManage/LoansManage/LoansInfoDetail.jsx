import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Form, Grid, Input, Message, Button } from '@alifd/next';
import loansManageApi from '../../../api/OperationManage/LoansManage';
import '../OperationManage'

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const FormItem = Form.Item;

export default class LoansInfoDetail extends Component {
  static displayName = 'LoansInfoDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.state = {
        id: this.props.location && this.props.location.state && this.props.location.state.name,
        formInput: {
        }
      }
    } else {
      this.props.history.push('/myWorkspace/home');
    }

  }

  componentDidMount = () => {
    this.getProjectDetail()
  };

  getProjectDetail = () => {       //项目-详情
    loansManageApi.projectDetail(this.state.id).then((res) => {
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

  render(array) {
    return (
      <div>
        <IceContainer>
          <div className="CustomerTabTitle" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>项目信息详情</h3>
            <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
          </div>
          <div className='contain-con'>
            <p style={{ borderBottom: '1px solid #DDD', paddingBottom: '10px' }}>基本信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{ marginTop: '30px' }}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="项目编号:">
                    <p>{this.state.formInput.projectNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="项目状态:">
                    <p>{this.state.formInput.projectStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构编号:">
                    <p>{this.state.formInput.partnerNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构名称:">
                    <p>{this.state.formInput.partnerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="项目名称:">
                    <p>{this.state.formInput.projectName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="项目规模:">
                    <p>{this.state.formInput.projectFund}<span>元</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="项目期限:">
                    <p>{this.state.formInput.projectTerm}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="期限单位:">
                    <p>{this.state.formInput.projectTermUnitText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="主合同编号:">
                    <p>{this.state.formInput.projectContactNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="专户账号:">
                    <p>{this.state.formInput.specialAccountNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="项目成立日期:" style={styles.formItem} required>
                    <p>{this.state.formInput.setupDate}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="项目生效日期:" style={styles.formItem} required>
                    <p>{this.state.formInput.effectiveDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="预计发行开始日期:" style={styles.formItem} required>
                    <p>{this.state.formInput.expectedIssueBeginDate}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="预计发行结束日期:" style={styles.formItem} required>
                    <p>{this.state.formInput.expectedIssueEndDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="预计项目结束日期:" style={styles.formItem} required>
                    <p>{this.state.formInput.expectedEndDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="期限说明:" help="">
                    <Input.TextArea style={{ width: '500px' }} readOnly={true}
                      value={this.state.formInput.projectTermDescription} placeholder="" name="remark" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="贷款项目说明:" help="">
                    <Input.TextArea style={{ width: '500px' }} readOnly={true}
                      value={this.state.formInput.projectDescription} placeholder="" name="remark" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='contain-con'>
            <p style={{ borderBottom: '1px solid #DDD', paddingBottom: '10px' }}>配置信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{ marginTop: '30px' }}>
              <Row>
                <Col span="12">
                  <FormItem label="是否支持逾期代偿:" style={styles.formItem} required>
                    <p>{this.state.formInput.isCompensate ? '是' : '否'}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="触发代偿逾期天数:" required>
                    <p>{this.state.formInput.compensateDays}<span>天</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="触发未执行代偿预警天数:" required>
                    <p>{this.state.formInput.compensateWarnDays}<span>逾期超过N天</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="是否支持到期回购:" style={styles.formItem} required>
                    <p>{this.state.formInput.isBuyback ? '是' : '否'}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="到期回购日期:" style={styles.formItem} required>
                    <p>{this.state.formInput.buybackDate}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="触发未执行回购预警天数:" required>
                    <p>{this.state.formInput.buybackWarnDays}<span>提前N天预警</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="备注:" help="">
                    <Input.TextArea style={{ width: '500px' }} readOnly={true}
                      value={this.state.formInput.remark} placeholder="" name="remark" />
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
                    <p>{this.state.formInput.creatorTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.state.formInput.modifyName}</p>
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
