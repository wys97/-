import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Message} from '@alifd/next';
import customerManageNewApi from '../../../api/OperationManage/CustomerManageNew';
import '../OperationManage'
import '../OperationManage.scss'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};
const FormItem = Form.Item;

export default class CustomerMemberInfo extends Component {
  static displayName = 'CustomerMemberInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {
        chineseFirstName: '',
        chineseLastName: '',
        customerName: '',
        englishFirstName: '',
        englishLastName: '',
        identityNo: '',
        partnerCustomerNo: '',
        passport: ''
      }
    }
  }

  componentDidMount() {
    this.getCustomerBaseInfo()
  }

  getCustomerBaseInfo = () => {
    customerManageNewApi.memberInfo(this.state.id).then((res) => {
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
          <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="金鹏卡号:">
                  <p>{this.state.formInput.partnerCustomerNo}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required label="会员姓名:">
                  <p>{this.state.formInput.customerName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="会员中文姓:">
                  <p>{this.state.formInput.chineseFirstName}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required label="会员中文名:">
                  <p>{this.state.formInput.chineseLastName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="会员英文姓:">
                  <p>{this.state.formInput.englishFirstName}</p>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} required label="会员英文名:">
                  <p>{this.state.formInput.englishLastName}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} required label="会员身份证:">
                  <p>{this.state.formInput.identityNo}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="会员护照:">
                  <p>{this.state.formInput.passport}</p>
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
