import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Input, Message} from '@alifd/next';
import DetailForm from '../../components/DetailForm';
import offlineRepayApprovalManageApi from '../../../api/WorkBench/OfflineRepayApprovalManage'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};


/*const col1 = [
  {label: '审批结果：', require: true, key: 'approvalStatus'},
  {label: '审批时间：', require: true, key: 'applyTime'},
  {label: '审批意见：', require: true, key: 'approvalOpinion'},
  {label: '', require: true, key: ''},
  {label: '审批人员：', require: true, key: 'approverName'},
  {label: '审批时间：', require: true, key: 'approvalTime'}
];*/

const col2 = [
  {label: '还款流水号：', require: true, key: 'repayRecordId', unit: '[自动生成]'},
  {label: '', require: true, key: ''},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '还款状态', require: true, key: 'repayStatus'},
  {label: '客户名称：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件类型：', require: true, key: 'identityType'},
  {label: '证件号：', require: true, key: 'identityNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '贷款项目名称：', require: true, key: 'projectName'},
  {label: '产品名称：', require: true, key: 'productName'},
  {label: '', require: true, key: ''},
  {label: '还款类型：', require: true, key: 'repayType'},
  {label: '扣款方式：', require: true, key: 'debitMethod'},
  {label: '还款总额：', require: true, key: 'repayAmount', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还本金：', require: true, key: 'repayPrincipal', unit: '元'},
  {label: '还利息：', require: true, key: 'repayInterest', unit: '元'},
  {label: '还罚息：', require: true, key: 'repayFine', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还违约金：', require: true, key: 'repayDamage', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '还款时间：', require: true, key: 'repayBeginTime'},
];

export default class OfflineRepayApprovalDetail extends Component {

  static displayName = 'OfflineRepayApprovalDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formInput: {
        repayRecordId: '',
        approvalStatus: '',
        applyTime: '',
        approverName: '',
        approvalTime: '',
        approvalOpinion: '',
        detail: {}
      }
    }
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.getApprovalDetail();
      this.props.history.location.pathname = '/approvalManage/offlineRepay';

    }
  }

  getApprovalDetail = () => {
    offlineRepayApprovalManageApi.detail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };

  goBack = () => {
    this.props.history.push({pathname: '/approvalManage/offlineRepay'});
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
              <h3>线下还款登记审批</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="审批结果:">
                      <p>{this.state.formInput.approvalStatus}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="申请时间:">
                      <p>{this.state.formInput.applyTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="审批意见:">
                      <Input.TextArea style={styles.formContent} value={this.state.formInput.approvalOpinion}
                                      placeholder="" name="remark"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批人员:">
                      <p>{this.state.formInput.approverName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批时间:">
                      <p>{this.state.formInput.approvalTime}</p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </IceContainer>
          <DetailForm col={col2} data={this.state.formInput.detail} title='线下还款明细' hideBack={true}/>
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
  }
};
