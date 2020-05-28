import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Button, Message, Step, Tab } from "@alifd/next";
import loanApplyManageApi from "../../api/AssetManagement/LoanApplyManage";
import ApplyDetail from "./detailModules/applyDetail";
import LoanApproval from "./detailModules/loanApproval";
import ResultDetail from "./detailModules/resultDetail";
import axios from '../../api/postponeManage/postponeManage'


export default class PostponeDetail extends Component {
  static displayName = "PostponeDetail";
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
      page: 1,
      limit: 10,
      customerId: '',
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

      contractInfo: [],

      // 筛查状态
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

      //展期结果
      resultDetailInfo: []
    };
  }

  componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.name
    ) {
      this.getHeadInfo(); // 头部
      this.getDetailInfo(); // 页面进来, 加载第一个详情选项卡
    }
  }

  componentDidMount() { }

  getHeadInfo = () => {
    axios.headInfo(this.state.id).then(res => {
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
    axios.getDetail(this.state.id).then(res => {
      if (res.data.code === "200") {
        let data = JSON.parse(JSON.stringify(res.data.data));
        data.rolloverId = this.state.id;
        this.setState({
          detailInfo: data,
          customerId: this.state.id,
        });
      }
    });
    // loanApplyManageApi.contract(this.state.id).then(res => {
    //   if (res.data.code === "200") {
    //     this.setState({
    //       contractInfo: [res.data.data],
    //     });
    //   }
    // });
  };

  getRuleDetailInfo = () => {
    loanApplyManageApi.ruleDetail(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          ruleDetailInfo: res.data.data
        });
      }
    });
  };

  getRiskDetailInfo = () => {
    loanApplyManageApi.riskDetail(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          riskDetailInfo: res.data.data
        });
      }
    });
  };

  getApprovalInfo = () => {
    loanApplyManageApi.loanApproval(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          approvalInfo: res.data.data
        });
      }
    });
  };

  getLoanDueDetailInfo = () => {
    loanApplyManageApi.loanDue(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          loanDueDetailInfo: res.data.data
        });
      }
    });
  };




  getDrawDetailInfo = () => {
    axios.loanApproval(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          drawDetailInfo: res.data.data
        });
      }
    });
  };
  getResultDetailInfo = () => {
    axios.rolloverResult(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          resultDetailInfo: res.data.data
        });
      }
    });
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  // the parameter key is Tab.Item's key attribute
  tabClick = key => {
    if (key === "detail") {
      this.getDetailInfo();
    }
    if (key === "ruleDetail") {
      this.getRuleDetailInfo();
    }
    if (key === "riskDetail") {
      this.getRiskDetailInfo();
    }
    if (key === "loanApproval") {
      this.getApprovalInfo();
    }
    if (key === "loanDue") {
      this.getLoanDueDetailInfo();
    }
    if (key === "drawDetail") {
      this.getDrawDetailInfo();
    }
    if (key === "resultDetail") {
      this.getResultDetailInfo();
      // this.getDrawDetailInfo();
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
              <h3>展期管理详情</h3>
              <Button
                type="normal"
                style={{ borderRadius: "5px" }}
                onClick={this.goBack}
              >
                返回
              </Button>
            </div>

            <div className="contain-con" style={{ marginBottom: "40px" }}>
              <Step shape="circle" readOnly style={{ height: "60px" }}>
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
                  <Tab.Item title="展期申请" key="detail">
                    {Object.keys(this.state.detailInfo).length == 0 ? (
                      tipMessage
                    ) : (
                        <ApplyDetail detailInfo={this.state.detailInfo} contractInfo={this.state.contractInfo} />
                      )}
                  </Tab.Item>
                  <Tab.Item title="人工审核" key="drawDetail">
                    {this.state.drawDetailInfo == null || Object.keys(this.state.drawDetailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                        <LoanApproval drawDetailInfo={this.state.drawDetailInfo} />
                      )}
                  </Tab.Item>
                  <Tab.Item title="展期结果" key="resultDetail">
                    {this.state.resultDetailInfo == null || Object.keys(this.state.resultDetailInfo).length === 0 ? (
                      tipMessage
                    ) : (
                        <ResultDetail resultDetailInfo={this.state.resultDetailInfo} />
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
