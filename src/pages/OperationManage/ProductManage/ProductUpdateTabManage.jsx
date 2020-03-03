import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Button, Tab } from "@alifd/next";
import ProductUpdateDetail from "./ProductUpdateDetail";
import ProductUpdateScreening from "./ProductUpdateScreening";
import PrepaymentConfiguration from "./PrepaymentConfiguration";
import RefundProjectDeploy from "./RefundProjextDeploy";
import PaymentSetting from "./PaymentSetting";
import AutomaticApprovalSettings from "./AutomaticApprovalSettings"
export default class ProductUpdateTabManage extends Component {
  static displayName = "ProductUpdateTabManage";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.name,
      productName:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.pname
    };
  }

  goBack = () => {
    this.props.history.push({ pathname: "/baseinfo/product" });
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = () => {};

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (
      this.props.location.state === null ||
      this.props.location.state === undefined
    ) {
      this.props.history.push({ pathname: "/" });
      return <div />;
    } else {
      const tabs = [
        { tab: "产品信息",key: "productInfo",content: <ProductUpdateDetail id={this.state.id} />},
        {tab: "还款方案配置",key: "refundProjectDeploy",content: (<RefundProjectDeploy id={this.state.id} name={this.state.productName}/>)},
        {tab: '提前还款配置', key: 'prepaymentConfiguration', content: <PrepaymentConfiguration id={this.state.id}/>},
        {tab: '逾期罚息配置', key: 'paymentSetting', content: <PaymentSetting id={this.state.id}/>},
        {tab: '自动审批配置', key: 'automaticApprovalSettings', content: <AutomaticApprovalSettings id={this.state.id} />},
        {tab: "筛查规则",key: "doc",content: <ProductUpdateScreening id={this.state.id} />}
      ];
      return (
        <div>
          <IceContainer>
            <div
              className="CustomerTabTitle"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>修改产品信息</h3>
              <Button
                type="normal"
                style={{ borderRadius: "5px" }}
                onClick={this.goBack}
              >
                返回
              </Button>
            </div>
            <div className="fusion-demo">
              <div className="fusion-demo-item">
                <Tab shape="wrapped" onChange={this.tabClick}>
                  {tabs.map(tab => (
                    <Tab.Item title={tab.tab} key={tab.key}>
                      {tab.content}
                    </Tab.Item>
                  ))}
                </Tab>
              </div>
            </div>
          </IceContainer>
        </div>
      );
    }
  }
}
