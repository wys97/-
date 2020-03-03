import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import CollectionDetail from "./CollectionDetail";
import NotYetReturned from "./NotYetReturned";
import PaymentHistory from "./PaymentHistory";
import CollectionOfDetail from "../CollectionFollowUp/CollectionOfDetail";
import { Tab, Button } from "@alifd/next";

export default class CollectionInfoTab extends Component {
  static displayName = "CollectionInfoTab";

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
      customerId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.customerId
    };
  }

  goBack = () => {
    this.props.history.push({
      pathname: "/collectionManage/CollectionTask"
    });  
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = key => {
    // console.log(key)
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (
      this.props.location.state === null ||
      this.props.location.state === undefined
    ) {
      // this.props.history.push({ pathname: '/'});
      return <div />;
    } else {
      return (
        <div>
          <IceContainer>
            <div className="fusion-demo">
              <div className="fusion-demo-item">
                <Tab shape="wrapped" onChange={this.tabClick} lazyLoad={true}>
                  <Tab.Item title="催收详情" key="collectionDetail">
                    <CollectionOfDetail
                      id={this.state.id}
                      customerId={this.state.customerId}
                      history={this.props.history}
                    />
                  </Tab.Item>
                  <Tab.Item title="未还借据" key="notYetReturned">
                    <NotYetReturned id={this.state.customerId} />
                  </Tab.Item>
                  <Tab.Item title="还款记录" key="paymentHistory">
                    <PaymentHistory id={this.state.customerId} />
                  </Tab.Item>
                </Tab>
              </div>
              <div
                className="CustomerTabTitle"
                style={{ position: "absolute", top: "30px", right: "40px" }}
              >
                {/* <h3>产品详情</h3> */}
                <Button
                  type="normal"
                  style={{ borderRadius: "5px" }}
                  onClick={this.goBack}
                >
                  返回列表
                </Button>
              </div>
            </div>
          </IceContainer>
        </div>
      );
    }
  }
}
