import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Tab} from '@alifd/next';
import CustomerInfoDetail from './CustomerInfoDetail'
import CustomerInfoAccount from './CustomerInfoAccount'
import CustomerInfoScoring from './CustomerInfoScoring'
import CustomerInfoContract from './CustomerInfoContract'

const shapes = ['wrapped'];

function onChange(key) {
  console.log(key);
}

export default class CustomerInfoTab extends Component {
  static displayName = 'CustomerInfoTab';

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
    this.props.history.go(-1)
  };

  render() {
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      const tabs = [
        {tab: '基本信息', key: 'home', content: <CustomerInfoDetail id={this.state.id}/>},
        {tab: '账户信息', key: 'account', content: <CustomerInfoAccount id={this.state.id}/>},
        {tab: '客户评分', key: 'scoring', content: <CustomerInfoScoring id={this.state.id}/>},
        {tab: '合同信息', key: 'contract', content: <CustomerInfoContract id={this.state.id}/>}
      ];
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>客户信息详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className="fusion-demo">
              {
                shapes.map(shape => (<div key={shape} className="fusion-demo-item">
                  <Tab shape={shape} onChange={onChange}>
                    {
                      tabs.map(tab => <Tab.Item title={tab.tab} key={tab.key}>{tab.content}</Tab.Item>)
                    }
                  </Tab>
                </div>))
              }
            </div>
          </IceContainer>
        </div>
      );
    }
  }
}
