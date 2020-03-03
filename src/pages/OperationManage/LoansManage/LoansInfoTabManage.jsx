import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Tab} from '@alifd/next';
import LoansInfoDetail from './LoansInfoDetail'
import LoansInfoDiscount from './LoansInfoDiscount'

/* const tabs = [
  {tab: '项目信息', key: 'home', content: <LoansInfoDetail/>},
  {tab: '代偿回购记录', key: 'doc', content: <LoansInfoDiscount/>}
];*/

export default class LoansInfoTabManage extends Component {
  static displayName = 'LoansInfoTabManage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name
    }
  }

  goBack = () => {
    this.props.history.push({pathname: '/baseinfo/loans'});
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = () => {

  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      const tabs = [
        {tab: '项目信息', key: 'projectInfo', content: <LoansInfoDetail id={this.state.id}/>},
        {tab: '代偿回购记录', key: 'repayRebuyRecord', content: <LoansInfoDiscount id={this.state.id}/>}
      ];
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>产品信息详情</h3>
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
