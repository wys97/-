import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Button, Tab } from "@alifd/next";
import ProductInfoDetail from "./ProductInfoDetail";
import ProductInfoScreening from "./ProductInfoScreening";
import PrepaymentSetting from "./PrepaymentSetting";
import OverdueInformation from "./OverdueInformation";
import PaymentOptions from "./PaymentOptions";
import AutomaticApproval from "./AutomaticApproval";
import SettleAccounts from "./SettleAccounts";

export default class ProductInfoTabManage extends Component {
  static displayName = "ProductInfoTabManage";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.name
    };
  }

  goBack = () => {
    this.props.history.push({ pathname: "/baseinfo/product" });
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = key => {
    console.log(key);
  };

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
        {
          tab: "产品信息",
          key: "productInfo",
          content: <ProductInfoDetail id={this.state.id} />
        },
        {
          tab: "还款方案配置",
          key: "paymentOptions",
          content: <PaymentOptions id={this.state.id} />
        },
        {
          tab: "提前还款配置",
          key: "prepaymentSetting",
          content: <PrepaymentSetting id={this.state.id} />
        },
        {
          tab: "逾期罚息配置",
          key: "overdueInformation",
          content: <OverdueInformation id={this.state.id} />
        },
        {
          tab: "自动审批配置",
          key: "automaticApproval",
          content: <AutomaticApproval id={this.state.id} />
        },
        {
          tab: "筛查规则",
          key: "doc",
          content: <ProductInfoScreening id={this.state.id} />
        },
        {
          tab: "结算账户",
          key: "settleAccounts",
          content: <SettleAccounts id={this.state.id} />
        }
      ];
      return (
        <div>
          <IceContainer>
            <div
              className="CustomerTabTitle"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>产品详情</h3>
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
