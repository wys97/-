import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Message} from '@alifd/next';
import customerManageApi from '../../../api/OperationManage/CustomerManage';
import '../OperationManage'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};
const FormItem = Form.Item;

export default class CustomerInfoDetail extends Component {
  static displayName = 'CustomerInfoDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {}
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getCustomerInfoDetail()
  }

  getCustomerInfoDetail = () => {
    customerManageApi.customerInfoDetail(this.state.id).then((res) => {
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
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="客户编号:">
                  <p>{this.state.formInput.customerId}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="合作机构编号:">
                  <p>{this.state.formInput.partnerNo}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required label="合作机构名称:">
                  <p>{this.state.formInput.partnerName}</p>
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
                <FormItem style={styles.formItem} required label="性别:">
                  <p>{this.state.formInput.gender}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="出生日期:">
                  <p>{this.state.formInput.birthDate}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="证件类型:" help="">
                  <p>{this.state.formInput.identityType}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required label="证件号:" help="">
                  <p>{this.state.formInput.identityNo}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} required label="手机号:">
                  <p>{this.state.formInput.phone}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="户籍归属编号:" help="">
                  <p>{this.state.formInput.areaNo}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="户籍归属名称:" help="">
                  <p>{this.state.formInput.areaName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="最高学历:" help="">
                  <p>{this.state.formInput.education}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="最高学位:" help="">
                  <p>{this.state.formInput.degree}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="E-MAIL:">
                  <p>{this.state.formInput.email}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="住宅电话:">
                  <p>{this.state.formInput.residencePhone}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="住宅邮编:">
                  <p>{this.state.formInput.residencePostcode}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="住宅地址:">
                  <p>{this.state.formInput.residenceAddress}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="通讯地址:">
                  <p>{this.state.formInput.contactAddress}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="婚姻状况:">
                  <p>{this.state.formInput.maritalStatus}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="配偶名称:">
                  <p>{this.state.formInput.spouseName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="配偶联系电话:">
                  <p>{this.state.formInput.spousePhone}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="配偶证件类型:">
                  <p>{this.state.formInput.spouseIdentityType}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="配偶证件号:">
                  <p>{this.state.formInput.spouseIdentityNo}</p>
                </FormItem>
              </Col>
            </Row>
            <Col span="24">
              <FormItem style={styles.formItem} label="创建时间:">
                <p>{this.state.formInput.createTime}</p>
              </FormItem>
            </Col>
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
