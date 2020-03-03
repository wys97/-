import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Table} from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;

export default class Detail extends Component {

  static displayName = 'Detail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.props = {};
  }

  componentWillMount = () => {
  };

  componentDidMount = () => {
  };

  render() {
    return (
      <div>
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
                      <p>{this.props.clientDetailInfo.basicInfo.customerId}[自动生成]</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                <Col span="12">
                    <FormItem style={styles.formItem} label="合作机构编号:">
                      <p>{this.props.clientDetailInfo.basicInfo.partnerNo}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="合作机构名称:">
                      <p>{this.props.clientDetailInfo.basicInfo.partnerName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="客户名称:" requiredMessage="客户名称是必填信息">
                      <p>{this.props.clientDetailInfo.basicInfo.customerName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="性别:" requiredMessage="性别是必选信息">
                      <p>{this.props.clientDetailInfo.basicInfo.genderText}</p>
                    </FormItem>
                  </Col> 
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="出生日期:" requiredMessage="出生日期是必填信息">
                      <p>{this.props.clientDetailInfo.basicInfo.birthDate}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件类型:" requiredMessage="证件类型是必选信息">
                      <p>{this.props.clientDetailInfo.basicInfo.identityTypeText}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件号:" requiredMessage="证件号是必填信息">
                      <p>{this.props.clientDetailInfo.basicInfo.identityNo}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="手机号:" requiredMessage="手机号是必填信息">
                      <p>{this.props.clientDetailInfo.basicInfo.phone}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="住宅电话:" requiredMessage="住宅电话是必填信息">
                      <p>{this.props.clientDetailInfo.basicInfo.residencePhone}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="邮箱:" format="email">
                      <p>{this.props.clientDetailInfo.basicInfo.email}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="通讯所在地区:">
                      <p>{this.props.clientDetailInfo.addressInfo.houseDistrict}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="通讯地址邮编:">
                      <p>{this.props.clientDetailInfo.basicInfo.residencePostcode}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                  <FormItem style={styles.formItem} label="通讯详细地址:">
                      <p>{this.props.clientDetailInfo.basicInfo.custactAddress}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="婚姻状况:">
                      <p>{this.props.clientDetailInfo.basicInfo.maritalStatusText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="配偶名称:">
                      <p>{this.props.clientDetailInfo.basicInfo.spouseName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="配偶联系电话:">
                      <p>{this.props.clientDetailInfo.basicInfo.spousePhone}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="配偶证件类型:">
                      <p>{this.props.clientDetailInfo.basicInfo.spouseIdentityTypeText}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="配偶证件号:">
                      <p>{this.props.clientDetailInfo.basicInfo.spouseIdentityNo}</p>
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
                      <p>{this.props.clientDetailInfo.degreeInfo.education}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="学校名称:">
                      <p>{this.props.clientDetailInfo.degreeInfo.schoolName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="毕业年份:">
                      <p>{this.props.clientDetailInfo.degreeInfo.graduateYear}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="学校所在地区:">
                      <p>{this.props.clientDetailInfo.degreeInfo.schoolDistrict}</p>
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
                      <p>{this.props.clientDetailInfo.addressInfo.houseType}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="住宅所在地区:">
                      <p>{this.props.clientDetailInfo.addressInfo.houseDistrict}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="住宅地址邮编:">
                      <p>{this.props.clientDetailInfo.addressInfo.residencePostcode}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="住宅详细地址:">
                      <p>{this.props.clientDetailInfo.addressInfo.houseAddress}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="住宅电话:">
                      <p>{this.props.clientDetailInfo.addressInfo.residencePhone}</p>
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
                        <p>{this.props.clientDetailInfo.jobInfo.companyName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="行业类别:">
                      <p>{this.props.clientDetailInfo.jobInfo.companyIndustry}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司电话:">
                      <p>{this.props.clientDetailInfo.jobInfo.companyPhone}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司规模:">
                      <p>{this.props.clientDetailInfo.jobInfo.companyScale}人</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="工作职务:">
                      <p>{this.props.clientDetailInfo.jobInfo.workDuty}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="月薪范围:">
                      <p>{this.props.clientDetailInfo.jobInfo.salaryRange}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="公司所在地区:">
                      <p>{this.props.clientDetailInfo.jobInfo.companyDistrict}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="公司详细地址:">
                      <p>{this.props.clientDetailInfo.jobInfo.companyAddress}</p>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Form>

      <div className='contain-con'>
      <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>联系人信息</p>
      <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
        <Table dataSource={this.props.clientDetailInfo.contacts} emptyContent="暂无数据">
          <Table.Column title='关系' dataIndex='contactRelation' width='200'/>
          <Table.Column title='姓名' dataIndex='contactName' width='300'/>
          <Table.Column title='手机号' dataIndex='contactPhone' width='300'/>
          <Table.Column title='二要素认证结果结果' dataIndex='authStatus' width='300'/>
          <Table.Column title='更新时间' dataIndex='updateTime' width='300'/>
        </Table>
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
  clientDetailInfo: {
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
};