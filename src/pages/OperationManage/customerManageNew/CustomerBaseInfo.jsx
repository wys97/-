import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Message} from '@alifd/next';
import customerManageNewApi from '../../../api/OperationManage/CustomerManageNew';
import '../OperationManage'
import '../OperationManage.scss'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {xxs: 8, s: 6, l: 4, span: 12, fixedSpan: 10},
  wrapperCol: {s: 6, l: 6, span: 14}
};

export default class CustomerBaseInfo extends Component {
  static displayName = 'CustomerBaseInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {
        areaName: '',
        areaNo: '',
        birthDate: '',
        contactAddress: '',
        createTime: '',
        customerId: '',
        customerName: '',
        degree: '',
        education: '',
        email: '',
        gender: '',
        identityNo: '',
        identityType: '',
        maritalStatus: '',
        partnerName: '',
        phone: '',
        residenceAddress: '',
        residencePhone: '',
        residencePostcode: '',
        spouseIdentityNo: '',
        spouseIdentityType: '',
        spouseName: '',
        spousePhone: '',
        updateTime: ''
      }
    }
  }

  componentDidMount() {
    this.getCustomerBaseInfo()
  }

  getCustomerBaseInfo = () => {
    customerManageNewApi.baseInfo(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    return (
      <div className="contain-con">
        <IceContainer>
          <Form labelTextAlign={'right'} {...formItemLayout} style={{marginTop: '30px'}}>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="客户号:">
                  <p>{this.state.formInput.customerId}[系统自动生成]</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="客户名称:">
                  <p>{this.state.formInput.customerName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构名称:">
                  <p>{this.state.formInput.partnerName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="证件类型:">
                  <p>{this.state.formInput.identityType}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="证件号:">
                  <p>{this.state.formInput.identityNo}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="性别:">
                  <p>{this.state.formInput.gender}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="婚姻状况:">
                  <p>{this.state.formInput.maritalStatus}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="最高学历:">
                  <p>{this.state.formInput.degree}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="最高学位:">
                  <p>{this.state.formInput.education}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="手机号:">
                  <p>{this.state.formInput.phone}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="住宅电话:">
                  <p>{this.state.formInput.residencePhone}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="户籍归属编号:">
                  <p>{this.state.formInput.areaNo}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="户籍归属名称:">
                  <p>{this.state.formInput.areaName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="E-MAIL:">
                  <p>{this.state.formInput.email}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="住宅邮编:">
                  <p>{this.state.formInput.residencePostcode}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required label="出生日期:">
                  <p>{this.state.formInput.birthDate}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} label="通讯地址:">
                  <p>{this.state.formInput.contactAddress}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} label="住宅地址:">
                  <p>{this.state.formInput.residenceAddress}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} label="配偶名称:">
                  <p>{this.state.formInput.spouseName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} label="配偶联系电话:">
                  <p>{this.state.formInput.spousePhone}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="配偶证件类型:">
                  <p>{this.state.formInput.spouseIdentityTypeText}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="配偶证件号:">
                  <p>{this.state.formInput.spouseIdentityNo}</p>
                </FormItem>
              </Col>
            </Row>
            <Row wrap>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="登记日期:">
                  <p>{this.state.formInput.createTime}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="更新日期:">
                  <p>{this.state.formInput.updateTime}</p>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </IceContainer>
      </div>
    )
  }
}

const styles = {
  formItem: {
    display: 'flex',
    height: '28px',
    lineHeight: '28px',
    marginBottom: '10px'
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
