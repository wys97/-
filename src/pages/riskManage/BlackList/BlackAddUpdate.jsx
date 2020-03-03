import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Field, Form, Grid, Input, Message, Select} from '@alifd/next';
import blackListApi from '../../../api/RiskManage/BlackList';
import commonApi from '../../../api/common';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class BlackAddUpdate extends Component {

  field = new Field(this);
  static displayName = 'BlackAddUpdate';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      type: this.props.location
        && this.props.location.pathname
        && this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length),
      identityType: {},
    };
  }

  componentWillMount = () => {
    this.getIdentityType();
    if (this.state.type === 'update') {
      // 修改, 加载详情数据
      this.getDetail();
    } else {
      // 新增
    }
  };

  componentDidMount = () => {

  };

  getIdentityType = () => {
    commonApi.identityType()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            identityType: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getDetail = () => {
    blackListApi.detail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
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
      blackListApi.add(v)
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
      blackListApi.update(v)
        .then((res) => {
          if (res.data.code === '200') {
            Message.success(res.data.message);
            this.getDetail();           
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
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.state.type !== 'add' && this.state.type !== 'update') {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>
            <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
              <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h3 style={{marginTop: '-4px'}}>{this.state.type === 'add' ? '新增黑名单' : '修改黑名单'}</h3>
                <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
              </div>
              <div className='contain-con'>
                <div style={{marginTop: '30px'}}>
                  <Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="黑名单编号:">
                        <p>{this.field.getValue('blackId')}<span> [自动生成] </span></p>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="生效标志:">
                        <p>{this.field.getValue('validStatusText')}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required requiredMessage="请填写客户名称" label="客户名称:">
                        <Input name='customerName' stlye={styles.formInputBorder}/>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required requiredMessage="请选择证件类型" label="证件类型:">
                        <Select followTrigger name="identityType" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.identityType)
                              .map(key => {
                                return <Option key={key} value={key}>{this.state.identityType[key]}</Option>;
                              })
                          }
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem style={styles.formItem} required requiredMessage="请填写证件号" label="证件号:">
                        <Input name='identityNo' stlye={styles.formInputBorder}/>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="数据来源:">
                        <p>{this.field.getValue('blackSourceText')}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="创建人员:">
                        <p>{this.field.getValue('creatorName')}</p>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="创建时间:">
                        <p>{this.field.getValue('createTime')}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="修改人员:">
                        <p>{this.field.getValue('modifierName')}</p>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="修改时间:">
                        <p>{this.field.getValue('modifyTime')}</p>
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
