import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, CascaderSelect, DatePicker, Field, Form, Grid, Input, Message, Select} from '@alifd/next';
import '../OperationManage';
import partnerManageApi from '../../../api/OperationManage/PartnerManage';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;


export default class PartnerAddManage extends Component {
  field = new Field(this);

  static displayName = 'PartnerAddManage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      partnerStatus: [],
      defaultPartnerStatus: '',
      partnerBusiness: [],
      loanUser: [],
      partnerScale: [],
      areaList: [],
      formValue: {},
    };

    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.initDropList();
    if (this.props && this.props.type) {
      this.loadDetail();
    }
  }

  initDropList = () => {
    partnerManageApi.queryPartnerStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [];
          for (let key in res.data.data) {
            selectList.push({label: res.data.data[key], value: key});
          }
          this.setState({
            partnerStatus: selectList,
            defaultPartnerStatus: 'DISABLED',
          });
        } else {
          Message.error(res.data.message);
        }
      });

    partnerManageApi.queryPartnerType()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            // {label: '', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({label: res.data.data[key], value: res.data.data[key]});
          }
          this.setState({
            partnerBusiness: selectList,
          });
        } else {
          Message.error(res.data.message);
        }
      });

    partnerManageApi.queryLoanUser()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            // {label: '', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({label: res.data.data[key], value: res.data.data[key]});
          }
          this.setState({
            loanUser: selectList,
          });
        } else {
          Message.error(res.data.message);
        }
      });

    partnerManageApi.queryCompanyType()
      .then((res) => {
        if (res.data.code === '200') {
          let selectList = [
            // {key: '', value: ''},
          ];
          for (let key in res.data.data) {
            selectList.push({label: res.data.data[key], value: res.data.data[key]});
          }
          this.setState({
            partnerScale: selectList,
          });
        } else {
          Message.error(res.data.message);
        }
      });

    partnerManageApi.queryAreaList()
      .then((res) => {
        if (res.data.code === '200') {
          let lists = this.areaCircle(res.data.data);
          this.setState({areaList: lists});
        } else {
          Message.error(res.data.message);
        }
      });
  };

  loadDetail = () => {
    partnerManageApi.partnerDetail(this.props.name)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
          this.setState({formValue: res.data.data});
        } else {
          Message.error(res.data.message);
        }
      });
  };

  areaCircle(params) {
    let data = [];
    for (let i = 0; i < params.length; i++) {
      data.push({
        value: params[i].areaNo,
        label: params[i].text,
        children: params[i].children.length === 0 ? [] : this.areaCircle(params[i].children),
      });
    }
    return data;
  }

  handleSubmit = (param, error) => {
    let params = this.field.getValues();
    if (JSON.stringify(error)
      .indexOf('字段') !== -1 || JSON.stringify(error)
      .indexOf('正确') !== -1) {
      return;
    }
    if (this.props && this.props.type) {
      partnerManageApi.editPartner(params)
        .then((res) => {
          if (res.data.code === '200') {
            Message.success(res.data.message);
          } else {
            Message.error(res.data.message);
          }
        });
      return;
    }
    partnerManageApi.addPartner(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.props.history.push({
            pathname: '/baseinfo/partnerInfoTab',
            state: {name: params.partnerNo, type: 'edit'},
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  goBack = () => { // 返回
    this.props.history.push({
      pathname: '/baseinfo/partners',
    });
  };

  render() {
    return (
      <div>
        <IceContainer>
          {this.props && this.props.type ? null :
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3 style={{marginTop: '-4px'}}>{this.props && this.props.type ? '修改' : '新增'}合作机构</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>}
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}} field={this.field}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="合作机构编号:" required requiredMessage="合作机构编号是必填字段">
                    {this.props && this.props.type ? this.state.formValue.partnerNo :
                      <Input name="partnerNo" style={styles.formInputBorder} placeholder=""/>}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构状态:" required
                            requiredMessage="合作机构状态是必选字段">
                    <Select followTrigger name="partnerStatus" style={styles.formInputBorder} readOnly
                            value={this.state.defaultPartnerStatus}
                            dataSource={this.state.partnerStatus}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="合作机构名称:" required requiredMessage="合作机构名称是必填字段">
                    <Input name="partnerName" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构类型:" required
                            requiredMessage="合作机构类型是必选字段">
                    <Select followTrigger name="partnerBusiness" style={styles.formInputBorder}
                            dataSource={this.state.partnerBusiness}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="联系邮箱:" required
                            requiredMessage="联系邮箱是必填字段" format="email" formatMessage="请填写正确的邮箱">
                    <Input name="contactEmail" style={styles.formInputBorder} placeholder=""/> [发邮件通知]
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    label="成立日期:"
                    style={styles.formItem}
                  >
                    <DatePicker followTrigger name="setupDate" style={styles.formInputBorder}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="行政区划:">
                    <CascaderSelect followTrigger name="areaNo" style={styles.formInputBorder}
                                    dataSource={this.state.areaList}
                                    listStyle={{width: '200px', height: '256px'}}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="营业执照号码:">
                    <Input name="licenseNo" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    label="营业执照注册日期:"
                    style={styles.formItem}
                  >
                    <DatePicker followTrigger name="licenseBeginDate" style={styles.formInputBorder}/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="营业执照到期日期:"
                    style={styles.formItem}
                  >
                    <DatePicker followTrigger name="licenseEndDate" style={styles.formInputBorder}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="营业执照注册地址:">
                    <Input.TextArea name="licenseAddress" style={styles.formTextArea} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="注册地行政区划:">
                    <CascaderSelect followTrigger name="licenseAreaNo" style={styles.formInputBorder}
                                    dataSource={this.state.areaList}
                                    listStyle={{width: '200px', height: '256px'}}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="国税登记证号码:">
                    <Input name="stateTaxNo" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="组织机构代码:">
                    <Input name="organizationNo" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="组织机构代码证有效期:"
                    style={styles.formItem}
                  >
                    <DatePicker followTrigger name="organizationEndDate" style={styles.formInputBorder}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="社会信用代码:">
                    <Input name="socialCreditNo" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="是否贷款运用方:">
                    <Select followTrigger name="isLoanUser" style={styles.formInputBorder}
                            dataSource={this.state.loanUser}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="企业总资产:">
                    <Input name="totalAsset" style={styles.formInputBorder} placeholder=""/> 元
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="企业总负债:">
                    <Input name="totalLiability" style={styles.formInputBorder} placeholder=""/> 元
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="注册资本:">
                    <Input name="registeredCapital" style={styles.formInputBorder} placeholder=""/> 元
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="实收资本:">
                    <Input name="paidCapital" style={styles.formInputBorder} placeholder=""/> 元
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="企业类型:">
                    <Select followTrigger name="partnerScale" style={styles.formInputBorder}
                            dataSource={this.state.partnerScale}/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="经营者情况:">
                    <Input.TextArea name="operatorDescription" style={styles.formTextArea} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="主营业务情况:">
                    <Input.TextArea name="businessDescription" style={styles.formTextArea} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="营业地址:">
                    <Input.TextArea name="businessAddress" style={styles.formTextArea} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="邮政编码:">
                    <Input name="postcode" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="实际控制人:">
                    <Input name="actualController" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构信用评级:">
                    <Input name="creditRating" style={styles.formInputBorder} placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="备注:">
                    <Input.TextArea name="remark" style={styles.formTextArea} placeholder=""/>
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
                  <FormItem style={{textAlign: 'center'}}>
                    <Form.Submit style={styles.saveButton} validate onClick={this.handleSubmit}>保存</Form.Submit>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    lineHeight: '28px',
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
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
  },
  formInputBorder: {
    width: '240px',
  },
  formTextArea: {
    width: '500px',
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent',
  },
};
