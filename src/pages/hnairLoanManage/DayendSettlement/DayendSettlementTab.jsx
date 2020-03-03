import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Tab} from '@alifd/next';
import BillingInformation from './BillingInformation';
import LendingList from './LendingList';
import RefundList from './RefundList';

export default class DayendSettlementTab extends Component {

  static displayName = 'DayendSettlementTab';

  static propTypes = {};

  static defaultProps = {};
 
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      settleDate: this.props.location && this.props.location.state && this.props.location.state.row && this.props.location.state.row.settleDate
    }
  }

  goBack = () => {
    // console.log(this.props)
    this.props.history.push({pathname: '/hnairLoanManage/dayendSettlement'});
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = (key) => {
    console.log(key)
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      const tabs = [
        {tab: '结算信息', key: 'productInfo', content: <BillingInformation id={this.state.id}/>},
        {tab: '放款列表', key: 'doc', content: <LendingList id={this.state.id} settleDate={this.state.settleDate}/>},
        {tab: '退款列表', key: 'rateSetting', content: <RefundList id={this.state.id} settleDate={this.state.settleDate}/>}
      ];
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3></h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className="fusion-demo">
              <div className="fusion-demo-item">
                <Tab shape='wrapped' onChange={this.tabClick}>
                  {
                    tabs.map(tab => <Tab.Item title={tab.tab} key={tab.key}>{tab.content}</Tab.Item>)
                  }
                </Tab>
              </div>
            </div>
          </IceContainer>
        </div>
      );
    }
  }
}