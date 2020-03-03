import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message, Step, Tab} from '@alifd/next';
import loanApplyManageApi from '../../../../api/WorkBench/LoanApprovalManage';
import Detail from './Detail';
import RuleDetail from './RuleDetail';
import RiskDetail from './RiskDetail';
import LoanApproval from './LoanApproval';
import LoanDue from './LoanDue';

export default class LoanApplyDetail extends Component {

  static displayName = 'LoanApplyDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      // 申请id
      id: props.id,
      // 头部
      headInfo: [],

      // 详情
      detailInfo: {
        /*apply: {},	// 进件信息
        product: {}, // 产品信息
        customer: {}, // 客户信息
        accounts: [], // 账户信息
        contracts: [], // 合同信息
        orders: [], // 订单信息*/
      },

      // 筛查规则
      ruleDetailInfo: {
        /*checkStage: '',
        checkStageText: '',
        rules: [],*/
      },

      // 风控结果
      riskDetailInfo: {
        /*outerRatingNo: '',
        ratingTime: '',
        ratingScore: '',
        ratingResult: '',
        ratingResultText: '',
        riskRules: [],*/
      },

      // 人工审批
      approvalInfo: [],

      // 借据信息
      loanDueDetailInfo: {},

    };
  }

  componentWillMount() {
    this.getHeadInfo(); // 头部
    this.getDetailInfo(); // 页面进来, 加载第一个详情选项卡
  }

  getHeadInfo = () => {
    loanApplyManageApi.headInfo(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          res.data.data.map((item) => {
            let finalStatus = '';
            if (item.status === null || item.status === '') {
              finalStatus = 'wait';
            }
            if (item.status === 'PASSED') {
              finalStatus = 'finish';
            }
            if (item.status === 'FAILED') {
              finalStatus = 'process';
            }
            if (item.status === 'NONE') {
              finalStatus = 'wait';
            }
            item.status = finalStatus;
          });
          this.setState({
            headInfo: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getDetailInfo = () => {
    loanApplyManageApi.detail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            detailInfo: res.data.data,
          });
        }
      });
  };

  getRuleDetailInfo = () => {
    loanApplyManageApi.ruleDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            ruleDetailInfo: res.data.data,
          });
        }
      });
  };

  getRiskDetailInfo = () => {
    loanApplyManageApi.riskDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            riskDetailInfo: res.data.data,
          });
        }
      });
  };

  getApprovalInfo = () => {
    loanApplyManageApi.loanApproval(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            approvalInfo: res.data.data,
          });
        }
      });
  };

  getLoanDueDetailInfo = () => {
    loanApplyManageApi.loanDue(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loanDueDetailInfo: res.data.data,
          });
        }
      });
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = (key) => {
    if (key === 'detail') {
      this.getDetailInfo();
    }
    if (key === 'ruleDetail') {
      this.getRuleDetailInfo();
    }
    if (key === 'riskDetail') {
      this.getRiskDetailInfo();
    }
    if (key === 'loanApproval') {
      this.getApprovalInfo();
    }
    if (key === 'loanDue') {
      this.getLoanDueDetailInfo();
    }
  };

  render() {
    const tipMessage = <div>
      <div className='contain-con'>
        <div style={{width: '100%', lineHeight: '450px', textAlign: 'center'}}>
          <span style={{color: '#A0A2AD'}}>暂无数据</span>
        </div>
      </div>
    </div>;
    return (
      <div>
        <IceContainer>
          <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>支用管理详情</h3>
          </div>

          <div className="contain-con" style={{marginBottom: '40px'}}>
            <Step shape="circle" readOnly style={{height: '60px'}}>
              {
                this.state.headInfo.map((item, index) => <Step.Item key={index} title={item.name}
                                                                    status={item.status}/>)
              }
            </Step>
          </div>

          <div className="fusion-demo">
            <div className="fusion-demo-item">
              <Tab shape='wrapped' onChange={this.tabClick} lazyLoad={true}>
                <Tab.Item title='进件资料' key='detail'>
                  {Object.keys(this.state.detailInfo).length === 0 ? tipMessage :
                    <Detail detailInfo={this.state.detailInfo}/>}
                </Tab.Item>
                <Tab.Item title='筛查结果' key='ruleDetail'>
                  {Object.keys(this.state.ruleDetailInfo).length === 0 ? tipMessage :
                    <RuleDetail ruleDetailInfo={this.state.ruleDetailInfo}/>}
                </Tab.Item>
                <Tab.Item title='风控结果' key='riskDetail'>
                  {Object.keys(this.state.riskDetailInfo).length === 0 ? tipMessage :
                    <RiskDetail riskDetailInfo={this.state.riskDetailInfo}/>}
                </Tab.Item>
                <Tab.Item title='人工审批' key='loanApproval'>
                  {this.state.approvalInfo.length === 0 ? tipMessage :
                    <LoanApproval approvalInfo={this.state.approvalInfo}/>}
                </Tab.Item>
                <Tab.Item title='借据信息' key='loanDue'>
                  {Object.keys(this.state.loanDueDetailInfo).length === 0 ? tipMessage :
                    <LoanDue loanDueDetailInfo={this.state.loanDueDetailInfo}/>}
                </Tab.Item>
              </Tab>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}
