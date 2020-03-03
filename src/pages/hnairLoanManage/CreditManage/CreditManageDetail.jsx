import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Button, Message, Step, Tab } from "@alifd/next";
import creditManageApi from "../../../api/HnairCreditManage/CreditManage";
import Detail from "./Detail";
import ClientDetail from "./ClientDetail";
import HistoryDetail from "./HistoryDetail";
import DrawDetail from "./DrawDetail";
import RiskControlScore from "./RiskControlScore";
import ManualApproval from "./ManualApproval";
import RuleDetail from "../../assetManagement/LoanApplyManage/RuleDetail"

export default class CreditManageDetail extends Component {
  static displayName = "CreditManageDetail";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      // 申请id
      id:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.name,
      customerId: '',
      page: 1,
      limit: 10,
      // 头部
      headInfo: [],
      //详情
      detailInfo: {},
      contractInfo: [],
      //客户资料
      clientDetailInfo: {},
      //历史授信
      historyDetailInfo: {},
      //支用记录
      drawDetailInfo: {},
      //筛查结果
      ruleDetailInfo: {},
      //人工审批
      manualApprovalInfo: [],
      manualApproval:[],
      //风控结果
      riskControlScoreInfo: [],
    };
  }

  componentWillMount = () => {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.name
    ) {
      this.getHeadInfo(); // 头部
      this.getDetailInfo(); // 页面进来, 加载第一个详情选项卡
    }
  };

  componentDidMount = () => {};

  getHeadInfo = () => {
    creditManageApi.creditStatus(this.state.id).then(res => {
      if (res.data.code === "200") {
        res.data.data.map(item => {
          let finalStatus = "";
          if (item.status === null || item.status === "") {
            finalStatus = "wait";
          }
          if (item.status === "PASSED") {
            finalStatus = "finish";
          }
          if (item.status === "FAILED") {
            finalStatus = "process";
          }
          if (item.status === "NONE") {
            finalStatus = "wait";
          }
          item.status = finalStatus;
        });
        this.setState({
          headInfo: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };
  getDetailInfo = () => {
    creditManageApi.customerReadCredit(this.state.id).then (res => {
      if (res.data.code === "200") {
        this.setState({
          detailInfo: res.data.data,
          customerId: res.data.data.customerId,
        })
      }
    })
    creditManageApi.customerContract(this.state.id).then (res => {
      if (res.data.code === "200") {
        this.setState({
          contractInfo: [res.data.data],
        })
      }
    })
  }

  getClientDetailInfo = () => {
    creditManageApi.detailAccountList(this.state.customerId).then(res => {
      if (res.data.code === "200") {
        this.setState({
          clientDetailInfo: res.data.data
        });
      }
    });
  };

  getRuleDetailInfo = () => {
    creditManageApi.ruleDetail(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          ruleDetailInfo: res.data.data
        });
      }
    });
  };

  getHistoryDetailInfo = () => {
    creditManageApi.creditHistory(this.state.customerId).then(res => {
      if (res.data.code === "200") {
        this.setState({
          historyDetailInfo: res.data.data
        });
      }
    });
  };

  getDrawDetailInfo = () => {
    creditManageApi.loanApplyRecord(this.state.customerId).then(res => {
      if (res.data.code === "200") {
        this.setState({
          drawDetailInfo: res.data.data
        });
      }
    });
  };

  getManualApprovalInfo = () => {
    creditManageApi.creditApprovalRules(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          manualApprovalInfo: res.data.data
        });
      }
    });
    creditManageApi.approvalRecord(this.state.id).then(res => {
      if (res.data.code === "200") {

        this.setState({
          manualApproval: res.data.data
        });
      }
    })
  };

  getRiskControlScoreInfo = () => {
    creditManageApi.creditRules(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          riskControlScoreInfo: res.data.data
        });
      }
    });
  }

  goBack = () => {
    this.props.history.go(-1);
  };

  tabClick = key => {
    if (key === "detail") {
      this.getDetailInfo();
    }
    if (key === "clientDetail") {
      this.getClientDetailInfo();
    }
    if (key === "ruleDetail") {
      this.getRuleDetailInfo();
    }
    if (key === "historyDetail") {
      this.getHistoryDetailInfo();
    }
    if (key === "drawDetail") {
      this.getDrawDetailInfo();
    }
    if (key === "riskControlScore") {
      this.getRiskControlScoreInfo();
    }
    if (key === "manualApproval") {
      this.getManualApprovalInfo();
    }
  };

  render() {
    const tipMessage = (
      <div>
        <div className="contain-con">
          <div
            style={{ width: "100%", lineHeight: "450px", textAlign: "center" }}
          >
            <span style={{ color: "#A0A2AD" }}>暂无数据</span>
          </div>
        </div>
      </div>
    );
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (
      this.props.location.state === null ||
      this.props.location.state === undefined
    ) {
      this.props.history.push({ pathname: "/" });
      return <div />;
    } else {
      return (
        <div>
          <IceContainer>
            <div
              className="CustomerTabTitle"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>授信申请详情</h3>
              <Button
                type="normal"
                style={{ borderRadius: "5px" }}
                onClick={this.goBack}
              >
                返回
              </Button>
            </div>

            <div className="contain-con" style={{marginBottom: "40px"}}>
              <Step shape="circle" readOnly style={{height: "60px"}}>
                {this.state.headInfo.map((item, index) => (
                  <Step.Item
                    key={index}
                    title={item.name}
                    status={item.status}
                  />
                ))}
              </Step>
            </div>

            <div className="fusion-demo">
              <div className="fusion-demo-item">
                <Tab shape="wrapped" onChange={this.tabClick} lazyLoad={true}>
                  <Tab.Item title="授信资料" key="detail">
                    {Object.keys(this.state.detailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                      <Detail detailInfo={this.state.detailInfo} contractInfo={this.state.contractInfo} />
                    )}
                  </Tab.Item>
                  <Tab.Item title="客户资料" key="clientDetail">
                    {Object.keys(this.state.clientDetailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                      <ClientDetail
                        clientDetailInfo={this.state.clientDetailInfo}
                      />
                    )}
                  </Tab.Item>
                  <Tab.Item title="历史授信" key="historyDetail">
                    {Object.keys(this.state.historyDetailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                      <HistoryDetail
                        historyDetailInfo={this.state.historyDetailInfo}
                      />
                    )}
                  </Tab.Item>
                  <Tab.Item title="支用记录" key="drawDetail">
                    {Object.keys(this.state.drawDetailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                      <DrawDetail drawDetailInfo={this.state.drawDetailInfo} />
                    )}
                  </Tab.Item>
                  <Tab.Item title="筛查结果" key="ruleDetail">
                    {Object.keys(this.state.ruleDetailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                      <RuleDetail ruleDetailInfo={this.state.ruleDetailInfo} />
                    )}
                  </Tab.Item>
                  <Tab.Item title="风控评分" key="riskControlScore">
                    {Object.keys(this.state.detailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                      <RiskControlScore riskControlScoreInfo={this.state.riskControlScoreInfo} detailInfo={this.state.detailInfo} />
                    )}
                  </Tab.Item>
                  <Tab.Item title="人工审批" key="manualApproval">
                    {this.state.detailInfo.length === 0 ? (
                      tipMessage
                    ) : (
                      <ManualApproval manualApprovalInfo={this.state.manualApprovalInfo} manualApproval={this.state.manualApproval} />
                    )}
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
