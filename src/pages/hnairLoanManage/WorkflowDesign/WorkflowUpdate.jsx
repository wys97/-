import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Field, Form, Grid, Input, Message, Radio, Select} from '@alifd/next';
import workflowDesignApi from "../../../api/HnairCreditManage/WorkflowDesign";

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class WorkflowUpdate extends Component {
  field = new Field(this);
  static displayName = 'WorkflowUpdate';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: window.location.hash.split('/')[window.location.hash.split('/').length - 1] !== 'add' ?
        window.location.hash.split('/')[window.location.hash.split('/').length - 1] : '',
      type: window.location.hash.split('/')[window.location.hash.split('/').length - 1] === 'add' ?
        'add' :
        window.location.hash.split('/')[window.location.hash.split('/').length - 2],
      levelRole: {},
      product: {},
      approvalType: {},
      approvalLevel: {},
      approvalLevelNum: "1",
      formValue: {}
    };
  }

  componentWillMount = () => {
    this.getApprovalType();
    this.getApprovalLevel();
    this.getLevelRole();
    this.getProduct();
    if (this.state.type === 'edit') {
      // 修改, 加载详情数据
      this.getDetail();
    } else {
      // 新增
    }
  };

  componentDidMount = () => {

  };

  getApprovalType = () => {
    workflowDesignApi.getApprovalType()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            approvalType: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getProduct = () => {
    workflowDesignApi.getProductList()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            product: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getLevelRole = () => {
    workflowDesignApi.getRole()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            levelRole: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getApprovalLevel = () => {
    workflowDesignApi.getApprovalLevel()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            approvalLevel: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getDetail = () => {
    workflowDesignApi.workflowOperateDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
          this.setState({
            formValue: res.data.data,
            approvalLevelNum: res.data.data.approvalLevel + ''
          })
        } else {
          Message.error(res.data.message);
        }
      });
  };

  decreaseOperate = (v, e) => {
    if (e !== null) {
      return;
    }
    if (this.state.type === 'add') {
      // 新增
      workflowDesignApi.addWorkflowOperate(v)
        .then((res) => {
          if (res.data.code === '200') {
            Message.success(res.data.message);
            this.goBack();
          } else {
            Message.error(res.data.message);
          }
        });
    } else {
      // 修改
      workflowDesignApi.editWorkflowOperate(v)
        .then((res) => {
          if (res.data.code === '200') {
            Message.success(res.data.message);
          } else {
            Message.error(res.data.message);
          }
        });
    }
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  render() {
    const {approvalLevelNum} = this.state;

    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'} {...formItemLayout} field={this.field}>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3 style={{marginTop: '-4px'}}>{this.state.type === 'add' ? '新增工作流' : '修改工作流'}</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="流程编号:">
                      <p>{this.state.formValue.id}<span> [自动生成] </span></p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写流程名称" label="流程名称:">
                      {this.state.type === 'add' ? <Input name='approvalName' style={styles.formInputBorder}/> :
                        <p>{this.state.formValue.approvalName}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请选择产品名称" label="产品名称:">
                      {this.state.type === 'add' ?
                        <Select followTrigger name="productNo" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.product)
                              .map(key => {
                                return <Option key={key} value={key}>{this.state.product[key]}</Option>;
                              })
                          }
                        </Select> : <p>{this.state.formValue.productName}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请选择类型" label="类型:">
                      <Select followTrigger name="approvalType" style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.approvalType)
                            .map(key => {
                              return <Option key={key} value={key}>{this.state.approvalType[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请选择级数" label="多级工作流:">
                      <Radio.Group name="approvalLevel" onChange={(value) => {
                        this.setState({approvalLevelNum: value});
                        this.field.setValues('approvalLevel', value)
                      }} value={this.state.approvalLevelNum}>
                        {
                          Object.keys(this.state.approvalLevel)
                            .map((key, index) => {
                              return <Radio key={index} value={key}>{this.state.approvalLevel[key]}</Radio>;
                            })
                        }
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请选择角色" label="一审角色:">
                      <Select followTrigger name="level1RoleId" style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.levelRole)
                            .map(key => {
                              return <Option key={key} value={key}>{this.state.levelRole[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                {approvalLevelNum === "1" ? null :
                  (<Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required requiredMessage="请选择角色" label="二审角色:">
                        <Select followTrigger name="level2RoleId" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.levelRole)
                              .map(key => {
                                return <Option key={key} value={key}>{this.state.levelRole[key]}</Option>;
                              })
                          }
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>)
                }
                {approvalLevelNum === "3" ?
                  (<Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required requiredMessage="请选择角色" label="三审角色:">
                        <Select followTrigger name="level3RoleId" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.levelRole)
                              .map(key => {
                                return <Option key={key} value={key}>{this.state.levelRole[key]}</Option>;
                              })
                          }
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>) : null}
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} required label="审批分配规则:">
                      <p>按角色剩余审批数最少优先分配</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="备注:">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      <p>{this.state.formValue.creatorName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      <p>{this.state.formValue.createTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      <p>{this.state.formValue.modifierName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      <p>{this.state.formValue.updateTime}</p>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <Form.Submit validate type="primary" style={styles.saveButton}
                         onClick={this.decreaseOperate}>保存</Form.Submit>
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
