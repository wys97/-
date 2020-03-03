import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {DatePicker, Dialog, Field, Form, Grid, Input, Message, Select} from '@alifd/next';
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

export default class ShareholderWin extends Component {
  field = new Field(this);

  static displayName = 'ShareholderWin';

  static propTypes = {};

  static defaultProps = {};

  flag = true;

  constructor(props) {
    super(props);
    this.state = {
      stockholderType: [],
      currency: [],
      controllerFlag: [],
      shareholderInfo: this.props.data
    }
    // this.goBack = this.goBack.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.show !== this.props.show) {
      this.field.setValues(nextProps.data);
      this.setState({
        shareholderInfo: nextProps.data
      });
    }
    return true;
  }

  componentWillMount() {
    this.loadSelect();
  }

  loadSelect = () => {
    partnerManageApi.queryStockholderType().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          stockholderType: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    partnerManageApi.queryCurrency().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          currency: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    partnerManageApi.queryControllerFlag().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          controllerFlag: res.data.data
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
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="" label="股东信息ID：">
                  {this.state.shareholderInfo ? this.state.shareholderInfo.shareholderId : ''}[自动生成]
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构编号:">
                  {this.state.shareholderInfo ? this.state.shareholderInfo.partnerNo : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构名称:">
                  {this.state.shareholderInfo ? this.state.shareholderInfo.partnerName : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="股东名称:" required
                          requiredMessage="股东名称是必填字段">
                  <Input name="shareholderName"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="股东类型:" required
                          requiredMessage="股东类型是必选字段">
                  <Select followTrigger name="shareholderType">
                    {this.state.stockholderType.map((key, index) => {
                      return <Option key={index} value={key}>{key}</Option>
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
                <FormItem labelTextAlign='right' style={styles.formItem} label="股权证编号:">
                  <Input name="shareCertificateNo"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="持股比例:" required requiredMessage="持股比例是必填字段">
                  <Input name="shareRatio" addonTextAfter="%"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="入股总金额:">
                  <Input name="shareAmount" addonTextAfter="元"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="币种:">
                  <Select followTrigger name="shareCurrency">
                    {this.state.currency.map((key, index) => {
                      return <Option key={index} value={key}>{key}</Option>
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="入股日期:" required requiredMessage="入股日期是必选字段">
                  <DatePicker followTrigger name="shareDate"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="实际控制人标志:" required requiredMessage="实际控制人标志是必选字段">
                  <Select followTrigger name="controllerFlag">
                    {this.state.controllerFlag.map((key, index) => {
                      return <Option key={index} value={key}>{key}</Option>
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="通讯地址:">
                  <Input.TextArea style={{width: '500px'}} name="address"/>
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
                  {this.state.shareholderInfo ? this.state.shareholderInfo.creatorName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="创建时间:">
                  {this.state.shareholderInfo ? this.state.shareholderInfo.createTime : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改人员:">
                  {this.state.shareholderInfo ? this.state.shareholderInfo.modifierName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改时间:">
                  {this.state.shareholderInfo ? this.state.shareholderInfo.modifyTime : ''}
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
};
