import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {CascaderSelect, Checkbox, Field, Form, Grid, Input, Message, Button, Select} from '@alifd/next';
import aviationIousManage from '../../../api/AirTicketInstallment/AviationIousManage'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class AviationIousUpdate extends Component {

  field = new Field(this);
  static displayName = 'AviationIousUpdate';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      selectStatus: {}, //状态-下拉框
      id: this.props.location && this.props.location.state && this.props.location.state.name, // 配置编号
    };
  }

  componentWillMount() {
    this.getStatus()
  }

  componentDidMount() {
    this.aviationIousDetailInfo();
  }


  aviationIousDetailInfo = () => {       //产品管理-详情
    aviationIousManage.whiteStripListDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getStatus = () => {      //状态-下拉框
    aviationIousManage.commonEnableDisable()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectStatus: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getAviationIousUpdate = (v, e) => {
    if (e != null) {
      return;
    }
    aviationIousManage.whiteStripListUpdate(v)
      .then((res) => {
        if (res.data.code === '200') {
          this.aviationIousDetailInfo();
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  render() {
    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>修改航空白条配置入口</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              {/* <p style={{ borderBottom: '1px solid #DDD', paddingBottom: '10px' }}>修改航空白条配置入口</p> */}
              {/* <h3 style={{ marginTop: '-4px' }}>修改航空白条配置入口</h3>
                            <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button> */}
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写产品编号" label="配置编号:">
                      <p>{this.field.getValue('id')}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="状态:" required
                              requiredMessage="请选择状态">
                      <Select followTrigger name="status" style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.selectStatus)
                            .map((key, idx) => {
                              return <Option key={idx} value={key}>{this.state.selectStatus[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} required label="配置名称:">
                      <p>{this.field.getValue('settingName')}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} required
                              label="每日放款限额:">
                      <Input style={styles.formInputBorder} name="quota" placeholder=""/>
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
            <Form.Submit type="primary" style={styles.saveButton} validate
                         onClick={this.getAviationIousUpdate}>保存</Form.Submit>
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
