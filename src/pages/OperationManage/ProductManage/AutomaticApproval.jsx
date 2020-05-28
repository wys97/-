import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import { Message } from "@alifd/next/lib/index";
import { Form, Grid, Field, Radio } from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class AutomaticApproval extends Component {
  field = new Field(this);
  static displayName = "AutomaticApproval";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      productNo: props.id,
      riskControl: {}, //产品管理-风控结果-下拉框
      loanRiskText: [],
      increaseCreditRiskText: [],
      normalCreditRiskText: [],
      renewCreditRiskText: [],
      loanRepayMethodText: []
    };
  }

  componentWillMount() {}
  componentDidMount() {
    this.loadDetailInfo();
  }

  loadDetailInfo = () => {
    productManageApi.autoApprovalDetail(this.state.productNo).then(res => {
      if (res.data.code === "200") {
        let data = res.data.data;
        if (data.loanHistoryOverdue == 0) {
          data.loanHistoryOverdue = "人工审批";
        } else {
          data.loanHistoryOverdue = "自动审批";
        }
        this.field.setValues(data);
        this.setState({
          loanRiskText: data.loanRiskText,
          increaseCreditRiskText: data.increaseCreditRiskText,
          normalCreditRiskText: data.normalCreditRiskText,
          renewCreditRiskText: data.renewCreditRiskText,
          loanRepayMethodText: data.loanRepayMethodText
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
              field={this.field}
            >
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  授信自动审批配置 - 普通授信 （客户初次授信及到期后重新授信）
                </p>
                <Row>
                  <Col span="24">
                    <FormItem
                      style={styles.formItem}
                      required
                      label="授信风控结果:"
                    >
                      {Object.keys(this.state.normalCreditRiskText).map(
                        (key, index) => {
                          return (
                            <span
                              style={{
                                marginRight: "20px",
                                lineHeight: "28px"
                              }}
                            >
                              {this.state.normalCreditRiskText[index]}
                            </span>
                          );
                        }
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控额度低于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("normalCreditMinLimit")}
                      </span>
                      元
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控信用分高于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("normalCreditMaxScore")}
                      </span>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  授信自动审批配置 - 提额授信
                </p>
                <Row>
                  <Col span="24">
                    <FormItem
                      style={styles.formItem}
                      required
                      label="授信风控结果:"
                    >
                      {Object.keys(this.state.increaseCreditRiskText).map(
                        (key, index) => {
                          return (
                            <span
                              style={{
                                marginRight: "20px",
                                lineHeight: "28px"
                              }}
                            >
                              {this.state.increaseCreditRiskText[index]}
                            </span>
                          );
                        }
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控额度低于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("increaseCreditMinLimit")}
                      </span>
                      元
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控信用分高于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("increaseCreditMaxScore")}
                      </span>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  授信自动审批配置 - 授信重估 （运营后台发起的授信重估）
                </p>
                <Row>
                  <Col span="24">
                    <FormItem
                      style={styles.formItem}
                      required
                      label="授信风控结果:"
                    >
                      {Object.keys(this.state.renewCreditRiskText).map(
                        (key, index) => {
                          return (
                            <span
                              style={{
                                marginRight: "20px",
                                lineHeight: "28px"
                              }}
                            >
                              {this.state.renewCreditRiskText[index]}
                            </span>
                          );
                        }
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控额度低于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("renewCreditMinLimit")}
                      </span>
                      元
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控信用分高于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("renewCreditMaxScore")}
                      </span>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div className="contain-con">
                <p
                  style={{
                    borderBottom: "1px solid #DDD",
                    paddingBottom: "10px"
                  }}
                >
                  支用自动审批配置
                </p>
                <Row>
                  <Col span="24">
                    <FormItem
                      style={styles.formItem}
                      required
                      label="支用金额低于:"
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("loanMinAmount")}
                      </span>
                      元
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="支用期限低于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("loanMinTerm")}
                      </span>
                      期
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="自动审批还款方式:"
                      required
                    >
                      {Object.keys(this.state.loanRepayMethodText).map(
                        (key, index) => {
                          return (
                            <span
                              style={{
                                marginRight: "20px",
                                lineHeight: "28px"
                              }}
                            >
                              {this.state.loanRepayMethodText[index]}
                            </span>
                          );
                        }
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="风控信用分高于:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("loanMaxScore")}
                      </span>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="支用风控结果:"
                      required
                    >
                      {Object.keys(this.state.loanRiskText).map(
                        (key, index) => {
                          return (
                            <span
                              style={{
                                marginRight: "20px",
                                lineHeight: "28px"
                              }}
                            >
                              {this.state.loanRiskText[index]}
                            </span>
                          );
                        }
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="存在历史逾期行为:"
                      required
                    >
                      <span style={{ lineHeight: "28px" }}>
                        {this.field.getValue("loanHistoryOverdue")}
                      </span>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: "flex"
  },
  formItemLabel: {},
  formItemError: {
    marginLeft: "10px"
  },
  formCol: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  }
};
