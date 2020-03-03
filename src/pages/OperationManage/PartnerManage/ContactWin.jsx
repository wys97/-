import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Dialog, Field, Form, Grid, Input, Message, Select} from '@alifd/next';
import partnerManageApi from "../../../api/OperationManage/PartnerManage";

const {Row, Col} = Grid;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

export default class ContactWin extends Component {
  field = new Field(this);

  static displayName = 'ContactWin';

  static propTypes = {};

  static defaultProps = {};

  flag = true;

  constructor(props) {
    super(props);
    this.state = {
      contactRole: [],
      contactDuty: [],
      identityType: [],
      contactInfo: this.props.data
    }
    // this.goBack = this.goBack.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.show !== this.props.show) {
      this.field.setValues(nextProps.data);
      this.setState({
        contactInfo: nextProps.data
      });
    }
    return true;
  }

  componentWillMount() {
    this.loadSelect();
  }

  loadSelect = () => {
    partnerManageApi.queryContactRole().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          contactRole: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    partnerManageApi.queryIdentityType().then((res) => {
      if (res.data.code === '200') {
        let arr = [];
        for (const key in res.data.data) {
          arr.push({key, value: res.data.data[key]})
        }
        this.setState({
          identityType: arr
        })
      } else {
        Message.error(res.data.message);
      }
    });
    partnerManageApi.queryContactDuty().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          contactDuty: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    })
  };

  onSave = (formInfo, errorInfo) => {
    if (JSON.stringify(errorInfo).indexOf('是') !== -1 || JSON.stringify(errorInfo).indexOf('正确') !== -1) {
      return;
    }
    const params = this.field.getValues();
    this.props.save(params);
  };

  onClose = () => {   //关闭弹窗
    this.props.close();
    this.flag = true;
  };

  render() {
    return <Dialog title={this.props.title}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <IceContainer>
        <div className='contain-con'>
          <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
            <Row>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="" label="联系人信息ID：">
                  {this.state.contactInfo ? this.state.contactInfo.contactId : ''}[自动生成]
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构编号:">
                  {this.state.contactInfo ? this.state.contactInfo.partnerNo : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构名称:">
                  {this.state.contactInfo ? this.state.contactInfo.partnerName : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="联系人名称:" required
                          requiredMessage="联系人名称是必填字段">
                  <Input name="contactName"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="联系人类型:" required
                          requiredMessage="联系人类型是必选字段">
                  <Select followTrigger name="contactRole" style={styles.selector}>
                    {this.state.contactRole.map((key, idx) => {
                      return <Option key={idx} value={key}>{key}</Option>
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="联系电话:" required
                          requiredMessage="联系电话是必填字段">
                  <Input name="phone"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="联系人证件类型:">
                  <Select followTrigger name="identityType" autoWidth={false} style={styles.selector}>
                    {this.state.identityType.map((item, idx) => {
                      return <Option key={idx} value={item.key}>{item.value}</Option>
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="联系人证件号码:">
                  <Input name="identityNo"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="职务:">
                  <Select followTrigger name="contactDuty" style={styles.selector}>
                    {this.state.contactDuty.map((key, index) => {
                      return <Option key={index} value={key}>{key}</Option>
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="联系邮箱:">
                  <Input name="contactEmail"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="传真:">
                  <Input name="contactTax"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="备注:">
                  <Input.TextArea style={{width: '500px'}} name="remark"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="创建人员:">
                  {this.state.contactInfo ? this.state.contactInfo.creatorName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="创建时间:">
                  {this.state.contactInfo ? this.state.contactInfo.createTime : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改人员:">
                  {this.state.contactInfo ? this.state.contactInfo.modifierName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改时间:">
                  {this.state.contactInfo ? this.state.contactInfo.modifyTime : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="" style={{textAlign: "center"}}>
                  <Form.Submit style={styles.saveButton} validate onClick={this.onSave}>保存</Form.Submit>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </IceContainer>
    </Dialog>
  }
}

const styles = {
  formItem: {
    display: 'flex',
    lineHeight: '28px'
  },
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
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent'
  },
  selector: {
    width: '162px'
  }
};
