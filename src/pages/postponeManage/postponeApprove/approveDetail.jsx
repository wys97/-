import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Input, Message} from '@alifd/next';
import DetailForm from '../../components/DetailForm';
import offlineRepayApprovalManageApi from '../../../api/WorkBench/OfflineRepayApprovalManage'
import axios from '../../../api/postponeManage/postponeManage'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};



const col2 = [
  {label: '展期编号：', require: true, key: 'rolloverId', unit: '[自动生成]'},
  {label: '借据号：', require: true, key: 'dueId'},
  {label: '合同号：', require: true, key: 'contractNo'},
  {label: '产品名称：', require: true, key: 'productName'},
  {label: '客户姓名：', require: true, key: 'customerName'},
  {label: '手机号：', require: true, key: 'phone'},
  {label: '证件号码：', require: true, key: 'identityNo'},
  {label: '', require: true, key: ''},

  {label: '放款金额：', require: true, key: 'loanAmount'},
  {label: '还款方式：', require: true, key: 'repayMethodText'},
  {label: '原期次：', require: true, key: 'originalPeriods'},
  {label: '', require: true, key: ''},
  {label: '剩余未还本金：', require: true, key: 'unpaidPrincipal', unit: '元'},
  {label: '待还利息：', require: true, key: 'unpaidInterest' , unit: '元'},
  {label: '待还罚息：', require: true, key: 'unpaidFine', unit: '元'},
  {label: '', require: true, key: ''},
  {label: '展期利率(月)：', require: true, key: 'interestRate', unit: '%'},
  {label: '展期期数：', require: true, key: 'rolloverPeriods',},
  {label: '展期状态：', require: true, key: 'rolloverStatusText', },
  {label: '', require: true, key: ''},
  {label: '创建人员：', require: true, key: 'creatorName', },
  {label: '', require: true, key: ''},
  {label: '申请时间：', require: true, key: 'applyDate'},
];

export default class ApproveDetail extends Component {

  static displayName = 'ApproveDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formInput: {
        rolloverId: '',
        applyDate: '',
        approvalStatusText: '',
        approvalOpinion: '',
        approverName: '',
        approvalTime: '',
      },
      detail: {}
    }
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.getApprovalDetail();
      this.props.history.location.pathname = '/approvalManage/postponeApprove';

    }
  }

  getApprovalDetail = () => {
    axios.postponeApproveDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        },this.getRolloverDetail(res.data.data.rolloverId))
      } else {
        Message.error(res.data.message)
      }
    })
  };


  getRolloverDetail = (id) => {
    axios.rolloverDetail(id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          detail : res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };




  goBack = () => {
    this.props.history.push({pathname: '/approvalManage/postponeApprove'});
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
              <h3>展期审批</h3>
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
                      <Input.TextArea style={styles.formContent} value={this.state.formInput.approvalOpinion?this.state.formInput.approvalOpinion:''}
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
          <DetailForm col={col2} data={this.state.detail} title='展期申请明细' hideBack={true}/>
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
