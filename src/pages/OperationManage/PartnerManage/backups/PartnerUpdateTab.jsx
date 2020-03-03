import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Tab} from '@alifd/next/lib/index';
import OrganUpdate from './OrganUpdate'
import IntelligenceUpdate from './IntelligenceUpdate'
import FinanceUpdate from './FinanceUpdate'
import ShareholderUpdate from './ShareholderUpdate'
import LinkUpdate from './LinkUpdate'
import InterfaceUpdate from './InterfaceUpdate'

const tabs = [
  {tab: '机构信息', key: 'organ', content: <OrganUpdate/>},
  {tab: '资质信息', key: 'intelligence', content: <IntelligenceUpdate/>},
  {tab: '财务信息', key: 'finance', content: <FinanceUpdate/>},
  {tab: '股东信息', key: 'shareholder', content: <ShareholderUpdate/>},
  {tab: '联系人信息', key: 'link', content: <LinkUpdate/>},
  {tab: '接口配置', key: 'interface', content: <InterfaceUpdate/>}
];

const shapes = ['wrapped'];

function onChange(key) {
  console.log(key);
}

export default class PartnerUpdateTab extends Component {
  static displayName = 'PartnerUpdateTab';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this)
  }

  goBack = () => {
    this.props.history.go(-1)
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3 style={{marginTop: '-4px'}}>修改合作机构信息</h3>
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
