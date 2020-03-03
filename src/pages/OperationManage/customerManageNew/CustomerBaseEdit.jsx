import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import DataTable from "../../dataTable";
import {Form, Grid, Message, Input, Select, CascaderSelect, DatePicker, Field} from '@alifd/next';
import customerManageNewApi from '../../../api/OperationManage/CustomerManageNew';
import '../OperationManage'
import '../OperationManage.scss'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {xxs: 8, s: 6, l: 4, span: 12, fixedSpan: 10},
  wrapperCol: {s: 6, l: 6, span: 14}
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class CustomerBaseInfo extends Component {
  static displayName = 'CustomerBaseInfo';

  static propTypes = {};

  static defaultProps = {};

  field = new Field(this);

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      cardType: {},
      gender: {},
      marryStatus: {},
      eduList: {},
      degree: {},
      areaInfo: [],
      page: 1,
      limit: 10,
      data: [],
      formInput: {
        areaName: '',
        areaNo: '',
        birthDate: '',
        companyAddress: '',
        companyAreaName: '',
        companyAreaNo: '',
        companyIndustry: '',
        companyName: '',
        companyPhone: '',
        companyScale: '',
        contactAddress: '',
        createTime: '',
        customerId: '',
        customerName: '',
        degree: '',
        degreeText: '',
        education: '',
        educationText: '',
        email: '',
        gender: '',
        genderText: '',
        graduateYear: '',
        houseAddress: '',
        houseAreaName: '',
        houseAreaNo: '',
        houseType: '',
        identityNo: '',
        identityType: '',
        identityTypeText: '',
        maritalStatus: '',
        maritalStatusText: '',
        partnerName: '',
        phone: '',
        residenceAddress: '',
        residencePhone: '',
        residencePostcode: '',
        salaryRange: '',
        schoolAreaName: '',
        schoolAreaNo: '',
        schoolName: '',
        spouseIdentityNo: '',
        spouseIdentityType: '',
        spouseIdentityTypeText: '',
        spouseName: '',
        spousePhone: '',
        shoolProvinceName: '',
        shoolCityName: '',
        updateTime: '',
        workDuty: '',
      }
    }
  }

  table = [
    { title: "关系", key: "contactRelation", width: 100 },
    { title: "姓名", key: "contactName", width: 150 },
    { title: "手机号", key: "contactPhone", width: 100 },
    { title: "二要素认证结果", key: "authStatus", width: 100 },
    { title: "更新时间", key: "updateTime", width: 100, },
  ];

  componentWillMount() {
    this.loadDropList();
  }

  componentDidMount() {
    this.getCustomerBaseInfo()
  }

  loadDropList = () => {
    customerManageNewApi.cardType().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          cardType: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    customerManageNewApi.genderList().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          gender: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    customerManageNewApi.maritalStatusList().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          marryStatus: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    customerManageNewApi.educationList().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          eduList: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    customerManageNewApi.degreeList().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          degree: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    customerManageNewApi.areaInfo().then((res) => {  // 地区列表 下拉
      if (res.data.code === '200') {
        let areaInfo = res.data.data;
        this.setState({
          areaInfo,
        })
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getCustomerBaseInfo = () => {
    customerManageNewApi.baseInfo(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data,
        });
        this.field.setValues(res.data.data);
      } else {
        Message.error(res.data.message);
      }
    })
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    params.customerId = this.state.id;
    customerManageNewApi.listCustomerContact(params).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data: res.data.data.list
        });
      }else {
        Message.error(res.data.message);
      }
    })
  };

  onSave = (value, errors) => {
    let param = value;
    if (errors) {
      return;
    }
    customerManageNewApi.editBaseInfo(param).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    return (
      <div className="contain-con">
        <IceContainer>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}} field={this.field}>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  基本信息
                </p>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="客户编号:">
                      <p>{this.state.formInput.customerId}[自动生成]</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                <Col span="12">
                    <FormItem style={styles.formItem} label="合作机构编号:">
                      <p>{this.state.formInput.partnerNo}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="合作机构名称:">
                      <p>{this.state.formInput.partnerName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="客户名称:" requiredMessage="客户名称是必填信息">
                      {this.props.type === 'edit' ?
                        <Input name="customerName" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.customerName}</p>}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="性别:" requiredMessage="性别是必选信息">
                      {this.props.type === 'edit' ?
                        <Select followTrigger name="gender" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.gender)
                              .map((key, idx) => {
                                return <Option key={idx} value={key}>{this.state.gender[key]}</Option>;
                              })
                          }
                        </Select> :
                        <p>{this.state.formInput.genderText}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="出生日期:" requiredMessage="出生日期是必填信息">
                      {this.props.type === 'edit' ?
                        <DatePicker followTrigger name="birthDate" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.birthDate}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件类型:" requiredMessage="证件类型是必选信息">
                      {this.props.type === 'edit' ?
                        <Select followTrigger name="identityType" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.cardType)
                              .map((key, idx) => {
                                return <Option key={idx} value={key}>{this.state.cardType[key]}</Option>;
                              })
                          }
                        </Select> :
                        <p>{this.state.formInput.identityTypeText}</p>}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件号:" requiredMessage="证件号是必填信息">
                      {this.props.type === 'edit' ?
                        <Input name="identityNo" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.identityNo}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="手机号:" requiredMessage="手机号是必填信息">
                      {this.props.type === 'edit' ?
                        <Input name="phone" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.phone}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="邮箱:" format="email">
                      {this.props.type === 'edit' ?
                        <Input name="email" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.email}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="通讯所在地区:">
                      {this.props.type === 'edit' ?
                        <CascaderSelect followTrigger name="houseAreaNo" dataSource={this.state.areaInfo}
                                        style={styles.formInputBorder} onChange={this.selectHouseArea}
                                        listStyle={{width: '240px', height: '256px'}}/> :
                        <p>{this.state.formInput.houseProvinceName}{this.state.formInput.houseCityName}{this.state.formInput.houseAreaName}</p>
                      }
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="通讯地址邮编:">
                      {this.props.type === 'edit' ?
                        <Input name="residencePostcode" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.residencePostcode}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                  <FormItem style={styles.formItem} label="通讯详细地址:">
                      {this.props.type === 'edit' ?
                        <Input.TextArea style={styles.formTextArea} placeholder="" name="houseAddress"/> :
                        <p>{this.state.formInput.houseAddress}</p>
                      }
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="婚姻状况:">
                      {this.props.type === 'edit' ?
                        <Select followTrigger name="maritalStatus" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.marryStatus)
                              .map((key, idx) => {
                                return <Option key={idx} value={key}>{this.state.marryStatus[key]}</Option>;
                              })
                          }
                        </Select> :
                        <p>{this.state.formInput.maritalStatusText}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="配偶名称:">
                      {this.props.type === 'edit' ?
                        <Input style={styles.formInputBorder} name="spouseName"/> :
                        <p>{this.state.formInput.spouseName}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="配偶联系电话:">
                      {this.props.type === 'edit' ?
                        <Input style={styles.formInputBorder} name="spousePhone"/> :
                        <p>{this.state.formInput.spousePhone}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="配偶证件类型:">
                      {this.props.type === 'edit' ?
                        <Select followTrigger name="spouseIdentityType" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.cardType)
                              .map((key, idx) => {
                                return <Option key={idx} value={key}>{this.state.cardType[key]}</Option>;
                              })
                          }
                        </Select> :
                        <p>{this.state.formInput.spouseIdentityTypeText}</p>}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="配偶证件号:">
                      {this.props.type === 'edit' ?
                        <Input name="spouseIdentityNo" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.spouseIdentityNo}</p>}
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  学历信息
                </p>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="最高学历:">
                      {this.props.type === 'edit' ?
                        <Select followTrigger name="education" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.eduList)
                              .map((key, idx) => {
                                return <Option key={idx} value={key}>{this.state.eduList[key]}</Option>;
                              })
                          }
                        </Select> :
                        <p>{this.state.formInput.educationText}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="学校名称:">
                      {this.props.type === 'edit' ?
                        <Input name="schoolName" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.schoolName}</p>}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="毕业年份:">
                      {this.props.type === 'edit' ?
                        <Input name="graduateYear" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.graduateYear}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="学校所在地区:">
                      {this.props.type === 'edit' ?
                        <CascaderSelect followTrigger name="schoolAreaNo" dataSource={this.state.areaInfo}
                                        style={styles.formInputBorder} onChange={this.selectSchoolArea}
                                        listStyle={{width: '240px', height: '256px'}}/> :
                        <p>{this.state.formInput.schoolProvinceName}{this.state.formInput.schoolCityName}{this.state.formInput.schoolAreaName}</p>
                      }
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  住址信息
                </p>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="住房类型:">
                      {this.props.type === 'edit' ?
                        <Input name="houseType" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.houseType}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="住宅所在地区:">
                      {this.props.type === 'edit' ?
                        <CascaderSelect followTrigger name="houseAreaNo" dataSource={this.state.areaInfo}
                                        style={styles.formInputBorder} onChange={this.selectHouseArea}
                                        listStyle={{width: '240px', height: '256px'}}/> :
                          <p>{this.state.formInput.houseProvinceName} {this.state.formInput.houseCityName} {this.state.formInput.houseAreaName}</p>
                      }
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="住宅地址邮编:">
                      {this.props.type === 'edit' ?
                        <Input name="residencePostcode" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.residencePostcode}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="住宅详细地址:">
                    {this.props.type === 'edit' ?
                        <Input.TextArea style={styles.formTextArea} placeholder="" name="houseAddress"/> :
                        <p>{this.state.formInput.houseAddress}</p>
                      }
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="住宅电话:">
                      {this.props.type === 'edit' ?
                        <Input name="spouseIdentityNo" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.spouseIdentityNo}</p>}
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  工作信息
                </p>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司名称:">
                      {this.props.type === 'edit' ?
                        <Input name="companyName" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.companyName}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="行业类别:">
                      {this.props.type === 'edit' ?
                        <Input name="companyIndustry" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.companyIndustry}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司电话:">
                      {this.props.type === 'edit' ?
                        <Input name="companyPhone" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.companyPhone}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司规模:">
                      {this.props.type === 'edit' ?
                        <Input name="companyScale" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.companyScale}人</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="工作职务:">
                      {this.props.type === 'edit' ?
                        <Input name="workDuty" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.workDuty}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="月薪范围:">
                      {this.props.type === 'edit' ?
                        <Input name="salaryRange" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.salaryRange}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司所在地区:">
                      {this.props.type === 'edit' ?
                        <CascaderSelect followTrigger name="companyAreaNo" dataSource={this.state.areaInfo}
                                        style={styles.formInputBorder} onChange={this.selectCompanyArea}
                                        listStyle={{width: '240px', height: '256px'}}/> :
                        <p>{this.state.formInput.companyProvinceName}{this.state.formInput.companyCityName}{this.state.formInput.companyAreaName}</p>
                      }
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="公司详细地址:">
                      {this.props.type === 'edit' ?
                        <Input name="companyAddress" style={styles.formInputBorder}/> :
                        <p>{this.state.formInput.companyAddress}</p>}
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  联系人信息
                </p>
                <Row>
                  <Col span="24">
                    <DataTable
                      col={this.table}
                      loadTable={this.state.loading}
                      data={this.state.data}
                    />
                  </Col>
                </Row>
              </div>
              {this.props.type === 'edit' ?
                <Form.Submit type="primary" style={styles.saveButton} validate onClick={this.onSave}>保存</Form.Submit> :
                null
              }
            </Form>
        </IceContainer>
      </div>
    )
  };
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
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
  }
};
