import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Grid, Tab, Form, Message} from '@alifd/next';
import {publicInfo} from '../../../api/OperationManage/CustomerManageNew';
import CustomerAccountInfo from './CustomerAccountInfo';
import CustomerMemberInfo from "./customerMemberInfo";
import CustomerCreditInfo from "./customerCreditInfo";
import CustomerContractInfo from "./customerContractInfo";
import CustomerBaseEdit from "./CustomerBaseEdit";
import CustomerRemark from "./CustomerRemark";
import CustomerRemarkInfo from "./CustomerRemarkInfo";

const {Row, Col} = Grid;
const FormItem = Form.Item;
const shapes = ['wrapped'];

export default class CustomerInfoTab extends Component {
  static displayName = 'CustomerInfoTab';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      publicInfo: {
        customerId: '',
        customerName: '',
        identityNo: '',
        partnerCustomerNo: ''
      }
    }
  }

  componentWillMount() {
    publicInfo(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          publicInfo: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    })
  }

  goBack = () => {
    this.props.history.push("/baseinfo/customer")
  };

  render() {
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>客户信息详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <Row>
              <Col span="8">
                <FormItem style={styles.formItem} required label="客户号:">
                  <p>{this.state.publicInfo.customerId}</p>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem style={styles.formItem} required label="客户名称:">
                  <p>{this.state.publicInfo.customerName}</p>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem style={styles.formItem} required label="证件号码:">
                  <p>{this.state.publicInfo.identityNo}</p>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem style={styles.formItem} required label="金鹏卡号:">
                  <p>{this.state.publicInfo.partnerCustomerNo}</p>
                </FormItem>
              </Col>
            </Row>
            <div className="fusion-demo">
              {
                shapes.map(shape => (<div key={shape} className="fusion-demo-item">
                  <Tab shape={shape}>
                    <Tab.Item title="基本信息">
                      <CustomerBaseEdit id={this.state.id} type={this.props.location.state.type}/>
                    </Tab.Item>
                    {this.props.location.state.type === 'edit' ?
                      null :
                      <Tab.Item title="账户信息"><CustomerAccountInfo id={this.state.id}/></Tab.Item>}
                    {this.props.location.state.type === 'edit' ?
                      null :
                      <Tab.Item title="合同信息"><CustomerContractInfo id={this.state.id}/></Tab.Item>}
                    <Tab.Item title="金鹏会员信息">
                      <CustomerMemberInfo id={this.state.id}/>
                    </Tab.Item>
                    <Tab.Item title="授信信息">
                      <CustomerCreditInfo id={this.state.id} type={this.props.location.state.type}/>
                    </Tab.Item>
                    {this.props.location.state.type === 'edit' ?
                      <Tab.Item title="备注信息">
                      <CustomerRemarkInfo id={this.state.id} type={this.props.location.state.type}/>
                      </Tab.Item> :
                      <Tab.Item title="备注信息"><CustomerRemark id={this.state.id}/></Tab.Item>}
                  </Tab>
                </div>))
              }
            </div>
          </IceContainer>
        </div>
      );
    }
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
