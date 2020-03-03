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

export default class CertificateWin extends Component {
  field = new Field(this);

  static displayName = 'CertificateWin';

  static propTypes = {};

  static defaultProps = {};

  flag = true;

  constructor(props) {
    super(props);
    this.state = {
      certificateRank: [],
      certificateInfo: this.props.data
    }
    // this.goBack = this.goBack.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.show !== this.props.show) {
      this.field.setValues(nextProps.data);
      this.setState({
        certificateInfo: nextProps.data
      });
    }
    return true;
  }

  componentWillMount() {
    this.loadSelect();
  }

  loadSelect = () => {
    partnerManageApi.queryCertificateRank().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          certificateRank: res.data.data
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
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="" label="资质信息ID：">
                  {this.state.certificateInfo ? this.state.certificateInfo.certificateId : ''}[自动生成]
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构编号:">
                  {this.state.certificateInfo ? this.state.certificateInfo.partnerNo : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage=""
                          label="合作机构名称:">
                  {this.state.certificateInfo ? this.state.certificateInfo.partnerName : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem labelTextAlign='right' style={styles.formItem} label="资质证书编号:">
                  <Input name="certificateNo" style={styles.formInputBorder}/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="资质证书名称:" required
                          requiredMessage="资质证书名称是必填字段">
                  <Input name="certificateName" style={styles.formInputBorder}/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem labelTextAlign='right' style={styles.formItem} label="资质等级:" required
                          requiredMessage="资质等级是必选字段">
                  <Select followTrigger name="certificateLevel" style={styles.formInputBorder}>
                    {this.state.certificateRank.map((key, index) => {
                      return <Option key={index} value={key}>{key}</Option>
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="发证日期:">
                  <DatePicker followTrigger name="issueDate" style={styles.formInputBorder}/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="到期日期:">
                  <DatePicker followTrigger name="endDate" style={styles.formInputBorder}/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="发证机关:" required requiredMessage="发证机关是必填字段">
                  <Input name="issueOrgan" style={styles.formInputBorder}/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem style={styles.formItem} label="资质证书描述:">
                  <Input.TextArea style={{width: '500px'}} name="certificateDescription"/>
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
                  {this.state.certificateInfo ? this.state.certificateInfo.creatorName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="创建时间:">
                  {this.state.certificateInfo ? this.state.certificateInfo.createTime : ''}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改人员:">
                  {this.state.certificateInfo ? this.state.certificateInfo.modifierName : ''}
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem style={styles.formItem} label="修改时间:">
                  {this.state.certificateInfo ? this.state.certificateInfo.modifyTime : ''}
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
