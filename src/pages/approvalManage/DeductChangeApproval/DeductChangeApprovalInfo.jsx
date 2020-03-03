import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import deductChangeApprovalApi from '../../../api/ApprovalManage/DeductChangeApproval';
import {Form, Input, Message, Radio, Grid, Field, Button} from "@alifd/next";
import IceContainer from '@icedesign/container';

const {Col, Row} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

const col = [
  {label: '变更编号：', require: true, key: 'changeId'},
  {label: '生效标志：', require: true, key: 'changeStatus'},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '', require: false, key: ''},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件类型：', require: true, key: 'identityType'},
  {label: '证件号：', require: true, key: 'identityNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '贷款项目名称：', require: true, key: 'projectName'},
  {label: '产品名称：', require: true, key: 'productName'},
  {label: '', require: false, key: ''},
  {label: '原扣款日：', require: true, key: 'oldRepayDay'},
  {label: '新扣款日：', require: true, key: 'newRepayDay'},
  {label: '', require: false, key: ''},
  {label: '提交时间：', require: true, key: 'createTime'}
];

export default class DeductChangeApprovalInfo extends Component {
  field = new Field(this);

  static displayName = 'DeductChangeApprovalInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      approvalInfo: {},
      approvalId: this.props.location && this.props.location.state && this.props.location.state.name,
      row: this.props.location && this.props.location.state && this.props.location.state.row,
      title: '扣款日变更'
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.name && this.props.location.state.row) {
      this.loadDetailInfo();
    } else {
      this.props.history.push('/myWorkspace/home');
    }
  }

  loadDetailInfo = () => {
    deductChangeApprovalApi.queryApprovalDetail(this.props.location.state.name).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          approvalInfo: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
    deductChangeApprovalApi.queryEditApproval(this.props.location.state.row.changeId).then((res) => {
      if (res.data.code === '200') {
        this.field.setValues(res.data.data);
        this.setState({
          formValue: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    })
  };

  goback = () => {
    this.props.history.go(-1)
  };

  onSave = () => {
    let param = this.field.getValues();
    param.approvalId = this.state.approvalId;
    if (!param.approvalStatus || !param.approvalOpinion) {
      return;
    }
    if (this.props.location.state.type) {
      this.approvalChange(param);
    }
  };

  approvalChange = (param) => {
    deductChangeApprovalApi.approvalDateChange(param).then((res) => {
      if (res.data.code === '200') {
        this.goback();
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    }

    const approvalResult = this.props.location.state.type ? <Radio.Group name="approvalStatus">
      <Radio value="PASS">通过</Radio>
      <Radio value="FAILED">拒绝</Radio>
    </Radio.Group> : this.state.approvalInfo.approvalStatus;

    const remark = this.props.location.state.type ? <Input.TextArea style={{width: '500px'}} name="approvalOpinion"/> :
      <span>{this.state.approvalInfo.approvalOpinion}</span>;

    const submit = this.props.location.state.type ? <Row>
      <Col>
        <FormItem style={{textAlign: "center"}}>
          <Form.Submit style={styles.saveButton} validate onClick={this.onSave}>保存</Form.Submit>
        </FormItem>
      </Col>
    </Row> : null;

    return (
      <div>
        <IceContainer>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3 style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '15px'
            }}>扣款日变更审批</h3>
            <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goback}>返回</Button>
          </div>
          <div className='contain-con'>
            <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="审批结果是必选字段"
                            label="审批结果:">
                    {approvalResult}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="申请时间:">
                    {this.state.approvalInfo.createTime}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="审批意见:" required
                            requiredMessage="审批意见是必填字段">
                    {remark}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="审批人员:">
                    {this.state.approvalInfo.approverName}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="审批时间:">
                    {this.state.approvalInfo.approvalTime}
                  </FormItem>
                </Col>
              </Row>
              {submit}
            </Form>
          </div>
        </IceContainer>
        <DetailForm col={col} data={this.state.formValue} title={this.state && this.state.title}
                    history={this.props.history} hideBack={true}/>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
    lineHeight: '28px'
  },
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
  },
  formInputBorder: {
    width: '240px'
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent'
  }
};
