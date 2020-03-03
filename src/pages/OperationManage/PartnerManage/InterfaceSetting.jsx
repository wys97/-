import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Field, Form, Grid, Input, Message} from '@alifd/next';
import '../OperationManage'
import partnerManageApi from "../../../api/OperationManage/PartnerManage";

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};
const FormItem = Form.Item;


export default class InterfaceSetting extends Component {
  field = new Field(this);

  static displayName = 'InterfaceSetting';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      partnerStatus: [],
      partnerBusiness: [],
      loanUser: [],
      partnerScale: [],
      areaList: [],
      formValue: {}
    }
  }

  componentWillMount() {
    this.initDropList();
    if (this.props && this.props.type) {
      this.loadDetail();
    }
  }

  initDropList = () => {
    partnerManageApi.queryPartnerStatus().then((res) => {
      if (res.data.code === '200') {
        let selectList = [
          {label: '', value: ''}
        ];
        for (let key in res.data.data) {
          selectList.push({label: res.data.data[key], value: key});
        }
        this.setState({
          partnerStatus: selectList
        })
      } else {
        Message.error(res.data.message);
      }
    });

    partnerManageApi.queryPartnerType().then((res) => {
      if (res.data.code === '200') {
        let selectList = [
          {label: '', value: ''}
        ];
        for (let key in res.data.data) {
          selectList.push({label: res.data.data[key], value: res.data.data[key]});
        }
        this.setState({
          partnerBusiness: selectList
        })
      } else {
        Message.error(res.data.message);
      }
    });

    partnerManageApi.queryLoanUser().then((res) => {
      if (res.data.code === '200') {
        let selectList = [
          {label: '', value: ''}
        ];
        for (let key in res.data.data) {
          selectList.push({label: res.data.data[key], value: res.data.data[key]});
        }
        this.setState({
          loanUser: selectList
        })
      } else {
        Message.error(res.data.message);
      }
    });

    partnerManageApi.queryCompanyType().then((res) => {
      if (res.data.code === '200') {
        let selectList = [
          {key: '', value: ''}
        ];
        for (let key in res.data.data) {
          selectList.push({key: res.data.data[key], value: res.data.data[key]});
        }
        this.setState({
          partnerScale: selectList
        })
      } else {
        Message.error(res.data.message);
      }
    });

    partnerManageApi.queryAreaList().then((res) => {
      if (res.data.code === '200') {
        let lists = this.areaCircle(res.data.data);
        this.setState({areaList: lists});
      } else {
        Message.error(res.data.message);
      }
    })
  };

  loadDetail = () => {
    partnerManageApi.interfaceDetail(this.props.name).then((res) => {
      if (res.data.code === '200') {
        this.field.setValues(res.data.data);
        this.setState({formValue: res.data.data});
      } else {
        Message.error(res.data.message);
      }
    })
  };

  areaCircle(params) {
    let data = [];
    for (let i = 0; i < params.length; i++) {
      data.push({
        value: params[i].areaNo,
        label: params[i].text,
        children: params[i].children.length === 0 ? [] : this.areaCircle(params[i].children)
      })
    }
    return data;
  }

  handleSubmit = (param, error) => {
    let params = this.field.getValues();
    if (JSON.stringify(error).indexOf('字段') !== -1 || JSON.stringify(error).indexOf('正确') !== -1) {
      return;
    }
    params.partnerNo = this.props.name;
    partnerManageApi.saveInterface(params).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  getKey = () => {
    partnerManageApi.getSysKey().then((res) => {
      if (res.data.code === '200') {
        this.field.setValue('systemPublicKey', res.data.data);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>接口安全配置</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}} field={this.field}>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="系统公钥:" required requiredMessage="系统公钥是必填字段">
                    <Input.TextArea style={{width: '500px'}} name="systemPublicKey" readOnly={true}/>
                    <p><a href="javascript:;" onClick={this.getKey}>重新生成密钥</a></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构公钥:" required
                            requiredMessage="合作机构公钥是必填字段">
                    <Input.TextArea style={{width: '500px'}} name="partnerPublicKey"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="回调通知地址:" required
                            requiredMessage="回调通知地址是必填字段">
                    <Input.TextArea style={{width: '500px'}} name="partnerNotifyUrl"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构IP白名单:">
                    <Input.TextArea style={{width: '500px'}} name="partnerIpWhitelist"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    {this.state.formValue.creatorName}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    {this.state.formValue.createTime}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    {this.state.formValue.modifierName}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    {this.state.formValue.modifyTime}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={{textAlign: "center"}}>
                    <Form.Submit style={styles.saveButton} validate onClick={this.handleSubmit}>保存</Form.Submit>
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
    display: 'flex',
    lineHeight: '28px'
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
    border: 'none'
  },
  formInputBorder: {
    width: '240px'
  },
  formTextArea: {
    width: '500px'
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent'
  },
};
