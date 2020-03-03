import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Field, Form, Grid, Input, Message, Radio, Select } from '@alifd/next';
import versionManagementApi from '../../../api/AppManage/versionManagement';

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class VersionUpdate extends React.Component {
  field = new Field(this);
  static displayName = 'versionUpdate';
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
      platform: {},
      versionStatus: {},
      formValue: {}
    };
  }

  componentWillMount = () => {
    this.getVersionStatus();
    this.getPlatform();
    if (this.state.type === 'edit') {
      this.getDetail();
    } else {
    }
  };

  componentDidMount = () => {

  };

  getPlatform = () => {
    versionManagementApi.platform()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            platform: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getVersionStatus = () => {
    versionManagementApi.versionStatus()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            versionStatus: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getDetail = () => {
    versionManagementApi.versionDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
          this.setState({
            formValue: res.data.data,
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
      versionManagementApi.versionInsert(v)
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
      versionManagementApi.versionUpdate(v)
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
    
    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'} {...formItemLayout} field={this.field}>
            <div className="CustomerTabTitle" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ marginTop: '-4px' }}>{this.state.type === 'add' ? '新增版本信息' : '修改版本信息'}</h3>
              <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <div style={{ marginTop: '30px' }}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="序列号:">
                      <p>{this.state.formValue.id}<span> [自动生成] </span></p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请选择平台" label="平台:">
                    {this.state.type === 'add' ?
                        <Select followTrigger name="platform" style={styles.formInputBorder}>
                          {
                            Object.keys(this.state.platform)
                              .map(key => {
                                return <Option key={key} value={key}>{this.state.platform[key]}</Option>;
                              })
                          }
                        </Select> : <p>{this.state.formValue.platform}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写版本号" label="版本号:">
                    {this.state.type === 'add' ? <Input name='versionNo' style={styles.formInputBorder} /> :
                        <p>{this.state.formValue.versionNo}</p>}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写发布地址" label="发布地址:">
                      <Input name='url' style={styles.formInputBorder} />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} required requiredMessage="请填写发布内容" label="发布内容:">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="content" />
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

