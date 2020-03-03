import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import { Message } from "@alifd/next/lib/index";
import { Form, Grid, Input, Field, Radio, Checkbox } from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class AutomaticApprovalSettings extends Component {
  field = new Field(this);
  static displayName = "AutomaticApprovalSettings";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      productNo: props.id,
      productRepayMethod: {}, //产品管理-支持的还款方式-下拉框
      riskControl: {}, //产品管理-风控结果-下拉框
      loanRisk: [],
      increaseCreditRisk: [],
      normalCreditRisk: [],
      renewCreditRisk: [],
      loanRepayMethod: []
    };
  }
  componentWillMount() {
    this.getproductRepayMethod();
    this.getcustomerCreditCreditResult();
  }

  componentDidMount() {
    this.loadDetailInfo();
  }

  getproductRepayMethod = () => {
    //产品管理-支持的还款方式-下拉框
    productManageApi.productRepayMethod().then(res => {
      if (res.data.code === "200") {
        this.setState({
          productRepayMethod: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getcustomerCreditCreditResult = () => {
    //产品管理-风控结果-下拉框
    productManageApi.customerCreditCreditResult().then(res => {
      if (res.data.code === "200") {
        let data = res.data.data;
        for (let k in data) {
          if (k == "UNKNOWN") {
            delete data[k];
          }
          if (k == "FAILED") {
            data[k] = "拒绝";
          }
        }
        this.setState({
          riskControl: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  loadDetailInfo = () => {
    productManageApi.autoApprovalDetail(this.state.productNo).then(res => {
      if (res.data.code === "200") {
        this.field.setValues(res.data.data);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  changeLoanRisk = arr => {
    arr = _.compact(arr);
    this.setState({
      loanRisk: arr
    });
  };
  changeIncreaseCreditRisk = arr => {
    arr = _.compact(arr);
    this.setState({
      increaseCreditRisk: arr
    });
  };
  changeNormalCreditRisk = arr => {
    arr = _.compact(arr);
    this.setState({
      normalCreditRisk: arr
    });
  };
  changeRenewCreditRisk = arr => {
    arr = _.compact(arr);
    this.setState({
      renewCreditRisk: arr
    });
  };
  changeLoanRepayMethod = arr => {
    arr = _.compact(arr);
    this.setState({
      loanRepayMethod: arr
    });
  };

  onSave = params => {
    //自动审批配置-修改保存
    params.productNo = this.state.productNo;
    productManageApi.autoApprovalUpdate(params).then(res => {
      if (res.data.code === "200") {
        this.loadDetailInfo();
        Message.success(res.data.message);
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
                      <Checkbox.Group
                        name="normalCreditRisk"
                        onChange={this.changeNormalCreditRisk}
                      >
                        {Object.keys(this.state.riskControl).map(
                          (key, index) => {
                            return (
                              <Checkbox key={index} value={key}>
                                {this.state.riskControl[key]}
                              </Checkbox>
                            );
                          }
                        )}
                      </Checkbox.Group>
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
                      <Input
                        style={styles.formInputBorder}
                        name="normalCreditMinLimit"
                        placeholder=""
                      />{" "}
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
                      <Input
                        style={styles.formInputBorder}
                        name="normalCreditMaxScore"
                        placeholder=""
                      />
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
                      <Checkbox.Group
                        name="increaseCreditRisk"
                        onChange={this.changeIncreaseCreditRisk}
                      >
                        {Object.keys(this.state.riskControl).map(
                          (key, index) => {
                            return (
                              <Checkbox key={index} value={key}>
                                {this.state.riskControl[key]}
                              </Checkbox>
                            );
                          }
                        )}
                      </Checkbox.Group>
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
                      <Input
                        style={styles.formInputBorder}
                        name="increaseCreditMinLimit"
                        placeholder=""
                      />{" "}
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
                      <Input
                        style={styles.formInputBorder}
                        name="increaseCreditMaxScore"
                        placeholder=""
                      />
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
                      <Checkbox.Group
                        name="renewCreditRisk"
                        onChange={this.changeRenewCreditRisk}
                      >
                        {Object.keys(this.state.riskControl).map(
                          (key, index) => {
                            return (
                              <Checkbox key={index} value={key}>
                                {this.state.riskControl[key]}
                              </Checkbox>
                            );
                          }
                        )}
                      </Checkbox.Group>
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
                      <Input
                        style={styles.formInputBorder}
                        name="renewCreditMinLimit"
                        placeholder=""
                      />{" "}
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
                      <Input
                        style={styles.formInputBorder}
                        name="renewCreditMaxScore"
                        placeholder=""
                      />
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
                      <Input
                        style={styles.formInputBorder}
                        name="loanMinAmount"
                        placeholder=""
                      />{" "}
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
                      <Input
                        style={styles.formInputBorder}
                        name="loanMinTerm"
                        placeholder=""
                      />{" "}
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
                      <Checkbox.Group
                        name="loanRepayMethod"
                        onChange={this.changeLoanRepayMethod}
                      >
                        {Object.keys(this.state.productRepayMethod).map(
                          (key, index) => {
                            return (
                              <Checkbox key={index} value={key}>
                                {this.state.productRepayMethod[key]}
                              </Checkbox>
                            );
                          }
                        )}
                      </Checkbox.Group>
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
                      <Input
                        style={styles.formInputBorder}
                        name="loanMaxScore"
                        placeholder=""
                      />
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
                      <Checkbox.Group
                        name="loanRisk"
                        onChange={this.changeLoanRisk}
                      >
                        {Object.keys(this.state.riskControl).map(
                          (key, index) => {
                            return (
                              <Checkbox key={index} value={key}>
                                {this.state.riskControl[key]}
                              </Checkbox>
                            );
                          }
                        )}
                      </Checkbox.Group>
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
                      <Radio.Group name="loanHistoryOverdue">
                        <Radio value={1}>自动审批</Radio>
                        <Radio value={0}>人工审批</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <FormItem label="" style={{ textAlign: "center" }} />
                  <Form.Submit
                    validate
                    type="primary"
                    style={styles.saveButton}
                    onClick={this.onSave}
                  >
                    保存
                  </Form.Submit>
                </Col>
              </Row>
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
  },
  formInputBorder: {
    width: "240px"
  }
};
