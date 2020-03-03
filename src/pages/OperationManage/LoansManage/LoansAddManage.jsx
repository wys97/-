import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, DatePicker, Form, Grid, Input, Message, Radio, Select} from '@alifd/next';
import loansManageApi from '../../../api/OperationManage/LoansManage';
import '../OperationManage';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;
const Option = Select.Option;


export default class LoansAddManage extends Component {

  static displayName = 'LoansAddManage';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      projectStatus: {},		// 项目状态-下拉框
      defaultProjectStatus: '',
      projectTermUnit: {},		// 期限单位-下拉框
      selectPartnerInfo: [],  // 合作机构 - 下拉搜索框
    };
  }

  componentWillMount() {
    this.getprojectStatus();
    this.getprojectTerm();
    this.getprojectPartnerInfo();
  }

  componentDidMount() {

  }

  getprojectStatus = () => {    //项目状态-下拉
    loansManageApi.projectStatus()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            projectStatus: res.data.data,
            defaultProjectStatus: 'DISABLED',
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getprojectTerm = () => {    //期限单位-下拉
    loansManageApi.projectTermUnit()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            projectTermUnit: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getprojectPartnerInfo = () => {      //合作机构 - 下拉搜索
    loansManageApi.projectPartnerInfo()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectPartnerInfo: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  projectAdd = (v, e) => {	// 项目添加
    if (e !== null) {
      return;
    }
    loansManageApi.projectAdd(v)
      .then((res) => {
        if (res.data.code === '200') {
          Message.success(res.data.message);
          this.props.history.push({
            pathname: '/baseinfo/loansUpdate',
            state: {id: v.projectNo},
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  goBack = () => {     //返回
    this.props.history.go(-1);
  };

  render() {
    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'}  {...formItemLayout}>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3 style={{marginTop: '-4px'}}>新增贷款项目</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写项目编号" label="项目编号:">
                      <Input style={styles.formInputBorder} name="projectNo" placeholder=""/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="项目状态:" required
                              requiredMessage="请选择项目状态">
                      <Select followTrigger name="projectStatus" style={styles.formInputBorder} readOnly
                              value={this.state.defaultProjectStatus}>
                        {
                          Object.keys(this.state.projectStatus)
                            .map((key, index) => {
                              return <Option key={index} value={key}>{this.state.projectStatus[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="请选择合作机构"
                              label="合作机构:">
                      <Select followTrigger name="partnerNo" style={styles.formInputBorder} showSearch hasClear>
                        {
                          this.state.selectPartnerInfo.map((item, index) => {
                            return <Option key={index} value={item.partnerNo}>{item.partnerName}</Option>;
                          })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="请填写项目名称"
                              label="项目名称:">
                      <Input style={styles.formInputBorder} name="projectName" placeholder=""/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="项目规模:" required
                              requiredMessage="请填写项目规模" format="number" formatMessage="请输入数字">
                      <Input style={styles.formInputBorder} name="projectFund" placeholder=""/> 元
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="项目期限:" required
                              requiredMessage="请填写项目期限" format="number" formatMessage="请输入数字">
                      <Input style={styles.formInputBorder} name="projectTerm" placeholder=""/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="期限单位:" required
                              requiredMessage="请选择项目期限单位">
                      <Select followTrigger name="projectTermUnit" style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.projectTermUnit)
                            .map((key, index) => {
                              return <Option key={index} value={key}>{this.state.projectTermUnit[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="主合同编号:">
                      <Input style={styles.formInputBorder} name="projectContactNo" placeholder=""/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="专户账号:">
                      <Input style={styles.formInputBorder} name="specialAccountNo" placeholder=""/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem
                      label="项目成立日期:"
                      style={styles.formItem}
                      required
                      requiredMessage="请填写项目成立日期">
                      <DatePicker followTrigger style={styles.formInputBorder} name="setupDate"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem
                      label="项目生效日期:"
                      style={styles.formItem}
                      required
                      requiredMessage="请填写项目生效日期">
                      <DatePicker followTrigger style={styles.formInputBorder} name="effectiveDate"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem
                      label="预计发行开始日期:"
                      style={styles.formItem}
                      required
                      requiredMessage="请填写预计发行开始日期">
                      <DatePicker followTrigger style={styles.formInputBorder} name="expectedIssueBeginDate"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem
                      label="预计发行结束日期:"
                      style={styles.formItem}
                      required
                      requiredMessage="请填写预计发行结束日期">
                      <DatePicker followTrigger style={styles.formInputBorder} name="expectedIssueEndDate"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      label="预计项目结束日期:"
                      style={styles.formItem}
                      required
                      requiredMessage="请填写预计项目结束日期">
                      <DatePicker followTrigger style={styles.formInputBorder} name="expectedEndDate"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="期限说明:" help="">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="projectTermDescription"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="贷款项目说明:" help="">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="projectDescription"/>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>配置信息</p>
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="24">
                    <FormItem
                      label="是否支持逾期代偿:" required requiredMessage="请选择是否支持逾期代偿" style={styles.formItem}>
                      <Radio.Group name="isCompensate">
                        <Radio value="true">是</Radio>
                        <Radio value="false">否</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写触发代偿逾期天数" format="number"
                              formatMessage="请输入数字" label="触发代偿逾期天数:">
                      <Input style={styles.formInputBorder} name="compensateDays" placeholder=""/> 天
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写触发未执行代偿预警天数" format="number"
                              formatMessage="请输入数字" label="触发未执行代偿预警天数:">
                      <Input style={styles.formInputBorder} name="compensateWarnDays" placeholder=""/> 逾期超过N天
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      label="是否支持到期回购:" required requiredMessage="请选择是否支持到期回购" style={styles.formItem}>
                      <Radio.Group name="isBuyback">
                        <Radio value="true">是</Radio>
                        <Radio value="false">否</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem
                      label="到期回购日期:"
                      style={styles.formItem}
                      required
                      requiredMessage="请填写到期回购日期">
                      <DatePicker followTrigger style={styles.formInputBorder} name="buybackDate"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写触发未执行回购预警天数" format="number"
                              formatMessage="请输入数字" label="触发未执行回购预警天数:">
                      <Input style={styles.formInputBorder} name="buybackWarnDays" placeholder=""/> 提前N天预警
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="备注:" help="">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      <Input style={styles.formInput} placeholder="" readOnly/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      <Input style={styles.formInput} placeholder="" readOnly/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      <Input style={styles.formInput} placeholder="" readOnly/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      <Input style={styles.formInput} placeholder="" readOnly/>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <Form.Submit validate type="primary" style={styles.saveButton} onClick={this.projectAdd}>保存</Form.Submit>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
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
    // width: '200px'
  },
  formInputBorder: {
    width: '240px',
  },
  formTextArea: {
    width: '500px',
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
  },
};
