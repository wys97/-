import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Tab} from '@alifd/next';
import DueDetail from './DueDetail';
import Detail from './Detail';
import RepayPlan from './RepayPlan';
import RepayDetail from './RepayDetail';
import OverdueDetail from './OverdueDetail';
import loanDueManageApi from '../../../api/AssetManagement/LoanDueManage';

export default class LoanDueDetail extends Component {

  static displayName = 'LoanDueDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      row: this.props.location && this.props.location.state && this.props.location.state.row,

      // 借据信息
      dueDetail: {},

      // 进件资料
      detail: {},

      // 还款计划
      repayPlan: [],

      // 还款明细
      repayDetail: [],

      // 逾期明细
      overdueDetail: [],
    };
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.getDueDetail(); // 页面进来, 加载第一个详情选项卡
    }
  }

  componentDidMount() {
  }

  getDueDetail = () => {
    loanDueManageApi.dueDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            dueDetail: res.data.data,
          });
        }
      });
  };

  getDetail = () => {
    loanDueManageApi.applyDetail(this.state.row.applyId)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            detail: res.data.data,
          });
        }
      });
  };

  getRepayPlan = () => {
    loanDueManageApi.repayPlan(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            repayPlan: res.data.data,
          });
        }
      });
  };

  getRepayDetail = () => {
    loanDueManageApi.repayDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            repayDetail: res.data.data,
          });
        }
      });
  };

  getOverdueDetail = () => {
    loanDueManageApi.overdueDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            overdueDetail: res.data.data,
          });
        }
      });
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = (key) => {
    if (key === 'dueDetail') {
      this.getDueDetail();
    }
    if (key === 'detail') {
      this.getDetail();
    }
    if (key === 'repayPlan') {
      this.getRepayPlan();
    }
    if (key === 'repayDetail') {
      this.getRepayDetail();
    }
    if (key === 'overdueDetail') {
      this.getOverdueDetail();
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

    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>借据详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>

            <div className="fusion-demo">
              <div className="fusion-demo-item">
                <Tab shape='wrapped' onChange={this.tabClick} lazyLoad={true}>
                  <Tab.Item title='借据信息' key='dueDetail'>
                    {Object.keys(this.state.dueDetail).length === 0 ? tipMessage :
                      <DueDetail dueDetail={this.state.dueDetail}/>}
                  </Tab.Item>
                  <Tab.Item title='进件资料' key='detail'>
                    {Object.keys(this.state.detail).length === 0 ? tipMessage : <Detail detail={this.state.detail}/>}
                  </Tab.Item>
                  <Tab.Item title='还款计划' key='repayPlan'>
                    {this.state.repayPlan === 0 ? tipMessage : <RepayPlan repayPlan={this.state.repayPlan}/>}
                  </Tab.Item>
                  <Tab.Item title='还款明细' key='repayDetail'>
                    {this.state.repayDetail.length === 0 ? tipMessage :
                      <RepayDetail repayDetail={this.state.repayDetail}/>}
                  </Tab.Item>
                  <Tab.Item title='逾期明细' key='overdueDetail'>
                    {this.state.overdueDetail.length === 0 ? tipMessage :
                      <OverdueDetail overdueDetail={this.state.overdueDetail}/>}
                  </Tab.Item>
                </Tab>
              </div>
            </div>
          </IceContainer>
        </div>
      );
    }
  }
}
