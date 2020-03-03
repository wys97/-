import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Input, Message, Radio} from '@alifd/next';
import blackListApi from '../../../api/WorkBench/BlackListApproval'
import Detail from './Detail'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

export default class BlackListApprovalApp extends Component {

  static displayName = 'BlackListApprovalApp';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formInput: {},
    }
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.getApprovalDetail();
    }
  }

  componentDidMount() {

  }

  getApprovalDetail = () => {
    blackListApi.detail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };

  approval = (v, e) => {
    if (e != null) {
      return;
    }
    v.approvalId = this.state.id;
    blackListApi.approval(v).then((res) => {
      if (res.data.code === '200') {
        this.goBack();
        Message.success(res.data.message)
      } else {
        Message.error(res.data.message)
      }
    })
  };

  goBack = () => {
    this.props.history.go(-1)
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>黑名单审批</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请选择审批结果" label="审批结果:">
                      <Radio.Group name="approvalStatus">
                        <Radio value="PASS">通过</Radio>
                        <Radio value="FAILED">拒绝</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="申请时间:">
                      <p>{this.state.formInput.applyTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} required requiredMessage="请填写审批意见" label="审批意见:">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="approvalOpinion"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批人员:">
                      <p/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批时间:">
                      <p/>
                    </FormItem>
                  </Col>
                </Row>
                <Form.Submit type="primary" style={styles.saveButton} validate onClick={this.approval}>保存</Form.Submit>
              </Form>
            </div>
          </IceContainer>
          <Detail id={this.state.id}/>
        </div>
      );
    }
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
    width: '80px'
  }
};
