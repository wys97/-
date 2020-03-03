import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import productManageApi from '../../../api/OperationManage/ProductManage'
import '../OperationManage'
import {Message} from "@alifd/next/lib/index";
import {Form, Grid } from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;

export default class SettleAccounts extends Component {
  static displayName = 'SettleAccounts';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {}
    }
  }

  componentDidMount() {
    this.getDate();
  }

  getDate = () => {
    productManageApi.productAccountInfo(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    return(
        <div>
            <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>结算账户</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
            <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="付款账户名:">
                    <p>{this.state.formInput.payerAccountName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' required style={styles.formItem} label="付款账号:" required>
                    <p>{this.state.formInput.payerAccountNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="付款银行名称:">
                    <p>{this.state.formInput.payerBankName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' required style={styles.formItem} label="付款预留手机号:" required>
                    <p>{this.state.formInput.payerBankPhone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="收款账户名:">
                    <p>{this.state.formInput.payeeAccountName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' required style={styles.formItem} label="收款账号:" required>
                    <p>{this.state.formInput.payeeAccountNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="收款银行名称:">
                    <p>{this.state.formInput.payeeBankName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' required style={styles.formItem} label="收款预留手机号:" required>
                    <p>{this.state.formInput.payeeBankPhone}</p>
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
  };