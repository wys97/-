import React, { Component } from "react";
import DetailForm from "../../components/DetailForm";
import { Message, Form, Grid } from "@alifd/next";
import DataTable from "../../dataTable";
import IceContainer from "@icedesign/container";
import feeWaiverManageApi from "../../../api/PostLendingManage/FeeWaiverManage";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const col = [
  { label: "调整编号：", require: true, key: "decreaseInterestId" },
  { label: "状态：", require: true, key: "decreaseStatus" },
  { label: "借据号：", require: true, key: "dueId" },
  { label: "", require: true, key: "" },
  { label: "客户名称：", require: true, key: "customerName" },
  { label: "手机号：", require: true, key: "phone" },
  { label: "证件类型：", require: true, key: "identityType" },
  { label: "证件号：", require: true, key: "identityNo" },
  { label: "产品名称：", require: true, key: "productName" },
  { label: "", require: true, key: "" },
  { label: "贷款金额：", require: true, key: "loanAmount", unit: "元" },
  { label: "", require: true, key: "" },
  { label: "调整方式：", require: true, key: "rectifyType" }
];

export default class FeeWaiverManageDetail extends Component {
  static displayName = "FeeWaiverManageDetail";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    if (this.props.location.state && this.props.location.state.name) {
      this.state = {
        formValue: {},
        data: [],
        id: this.props.location.state.name,
        title: "息费减免详情"
      };
    } else {
      this.props.history.push("/myWorkspace/home");
    }
  }

  table = [
    { title: "期次", key: "periodNo", width: 100, align: "center" },
    { title: "还款日期", key: "dueDate", width: 100, align: "center" },
    {
      title: "未还本金（元）",
      key: "unpaidPrincipal",
      width: 100,
      align: "center"
    },
    {
      title: "未还利息（元）",
      key: "unpaidInterest",
      width: 100,
      align: "center"
    },
    { title: "未还罚息（元）", key: "unpaidFine", width: 100, align: "center" },
    {
      title: "调整本金（元）",
      key: "decreasePrincipal",
      width: 100,
      align: "center"
    },
    {
      title: "调整利息（元）",
      key: "decreaseInterest",
      width: 100,
      align: "center"
    },
    {
      title: "调整罚息（元）",
      key: "decreaseFine",
      width: 100,
      align: "center"
    },
    {
      title: "调整总额（元）",
      key: "decreaseAmount",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还本金（元）",
      key: "unpaidPrincipalLeft",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还利息（元）",
      key: "unpaidInterestLeft",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还罚息（元）",
      key: "unpaidFineLeft",
      width: 100,
      align: "center"
    },
    {
      title: "调整后未还总额（元）",
      key: "unpaidAmountLeft",
      width: 100,
      align: "center"
    }
  ];

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.name) {
      this.loadDetailInfo();
    } else {
      this.props.history.push("/myWorkspace/home");
    }
  }

  loadDetailInfo = () => {
    feeWaiverManageApi.decreaseDetail(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          formValue: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
    feeWaiverManageApi.decreaseDetailList(this.state.id).then(res => {
      if (res.data.code === "200") {
        let data = res.data.data;
        let total = {
          unpaidPrincipal: 0,
          unpaidInterest: 0,
          unpaidFine: 0,
          decreasePrincipal: 0,
          decreaseInterest: 0,
          decreaseFine: 0,
          decreaseAmount: 0,
          unpaidInterestLeft: 0,
          unpaidFineLeft: 0,
          unpaidPrincipalLeft: 0,
          unpaidAmountLeft: 0
        };
        data.map((item, index) => {
          total.unpaidPrincipal += Number(item.unpaidPrincipal);
          total.unpaidInterest += Number(item.unpaidInterest);
          total.unpaidFine += Number(item.unpaidFine);
          total.decreasePrincipal += Number(item.decreasePrincipal);
          total.decreaseInterest += Number(item.decreaseInterest);
          total.decreaseFine += Number(item.decreaseFine);
          total.decreaseAmount += Number(item.decreaseAmount);
          total.unpaidInterestLeft += Number(item.unpaidInterestLeft);
          total.unpaidFineLeft += Number(item.unpaidFineLeft);
          total.unpaidPrincipalLeft += Number(item.unpaidPrincipalLeft);
          total.unpaidAmountLeft += Number(item.unpaidAmountLeft);
        });
        total={
          unpaidPrincipal : Math.floor(total.unpaidPrincipal* 100)/100,
          unpaidInterest : Math.floor(total.unpaidInterest* 100)/100,
          unpaidFine : Math.floor(total.unpaidFine* 100)/100,
          decreasePrincipal : Math.floor(total.decreasePrincipal* 100)/100,
          decreaseInterest : Math.floor(total.decreaseInterest* 100)/100,
          decreaseFine : Math.floor(total.decreaseFine* 100)/100,
          decreaseAmount : Math.floor(total.decreaseAmount* 100)/100,
          unpaidInterestLeft : Math.floor(total.unpaidInterestLeft* 100)/100,
          unpaidFineLeft : Math.floor(total.unpaidFineLeft* 100)/100,
          unpaidPrincipalLeft : Math.floor(total.unpaidPrincipalLeft* 100)/100,
          unpaidAmountLeft : Math.floor(total.unpaidAmountLeft* 100)/100,
        }
        total.periodNo = "合计：";
        data.push(total);
        this.setState({
          data: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
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
      return (
        <div>
          <IceContainer>
            <DetailForm
              col={col}
              data={this.state.formValue}
              title={this.state && this.state.title}
              history={this.props.history}
            />
            <DataTable
              col={this.table}
              loadTable={this.state.loading}
              data={this.state.data}
            />
            <Row>
              <Col span="24">
                <FormItem
                  label={"调整原因："}
                  requiredMessage=""
                  labelTextAlign="right"
                  style={styles.formItem}
                >
                  <span>{this.state.formValue.decreaseReason}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem
                  label={"创建人员："}
                  requiredMessage=""
                  labelTextAlign="right"
                  style={styles.formItem}
                >
                  <span>{this.state.formValue.creatorName}</span>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  label={"创建时间："}
                  requiredMessage=""
                  labelTextAlign="right"
                  style={styles.formItem}
                >
                  <span>{this.state.formValue.createTime}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem
                  label={"修改人员："}
                  requiredMessage=""
                  labelTextAlign="right"
                  style={styles.formItem}
                >
                  <span>{this.state.formValue.modifyTime}</span>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  label={"修改时间："}
                  requiredMessage=""
                  labelTextAlign="right"
                  style={styles.formItem}
                >
                  <span>{this.state.formValue.modifyTime}</span>
                </FormItem>
              </Col>
            </Row>
          </IceContainer>
        </div>
      );
    }
  }
}

const styles = {
  formItem: {
    display: "flex",
    height: "28px",
    lineHeight: "28px",
    marginBottom: "10px"
  }
};
