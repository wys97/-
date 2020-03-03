import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import { Message } from "@alifd/next/lib/index";
import { Form, Field, Grid, Input, Radio } from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class PaymentSetting extends Component {
  field = new Field(this);
  static displayName = "PaymentSetting";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      productNo: props.id,
      selectOverdueFineFormula: {} //产品管理-逾期罚息公式-下拉框
    };
  }

  componentWillMount() {
    this.getproductOverdueFineFormula();
  }

  componentDidMount() {
    this.loadDetailInfo();
  }

  loadDetailInfo = () => {
    productManageApi.overdueConfigDetail(this.state.productNo).then(res => {
      if (res.data.code === "200") {
        this.field.setValues(res.data.data);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getproductOverdueFineFormula = () => {
    //产品管理-逾期罚息公式-下拉框
    productManageApi.productOverdueFineFormula().then(res => {
      if (res.data.code === "200") {
        const selectOverdueFineFormula = res.data.data;
        this.setState({
          selectOverdueFineFormula
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  configUpdate = (parmas) => {
    productManageApi.overdueConfigUpdate(parmas).then(res => {
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
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              逾期还款配置
            </p>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
              field={this.field}
            >
              <Row>
                <Col span="24">
                  <FormItem
                    style={styles.formItem}
                    required
                    requiredMessage="请输入逾期宽限期"
                    format="number"
                    formatMessage="请输入数字"
                    label="逾期宽限期:"
                  >
                    <Input
                      style={styles.formInputBorder}
                      name="overdueGraceDay"
                      placeholder=""
                    />{" "}
                    天
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="逾期罚息公式:"
                    required
                    requiredMessage="请选择逾期罚息公式"
                  >
                    <Radio.Group name="overdueFineFormula" itemDirection="ver">
                      {Object.keys(this.state.selectOverdueFineFormula).map(
                        (key, index) => {
                          return (
                            <Radio key={index} value={key}>
                              {this.state.selectOverdueFineFormula[key]}
                            </Radio>
                          );
                        }
                      )}
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    style={styles.formItem}
                    required
                    label="逾期日利率:"
                    requiredMessage="请输入逾期日利率"
                    format="number"
                    formatMessage="请输入数字"
                  >
                    <Input
                      style={styles.formInputBorder}
                      name="overdueRate"
                      placeholder=""
                    />{" "}
                    %
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    <p>{this.field.getValue("creatorName")}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    <p>{this.field.getValue("createTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.field.getValue("modifierName")}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    <p>{this.field.getValue("modifyTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Form.Submit
                type="primary"
                style={styles.saveButton}
                validate
                onClick={this.configUpdate}
              >
                保存
              </Form.Submit>
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
    width: '240px',
  },

};
