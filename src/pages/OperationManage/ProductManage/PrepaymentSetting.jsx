import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import DataTable from "../../dataTable";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import { Form, Grid, Message, Input } from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class PrepaymentSetting extends Component {
  static displayName = "prepaymentSetting";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      loading: false,
      formInput: {
        isPrepay: "",
        isPrepayDamage: "",
        prepayChangePlan: "",
        prepayDamageFormula: "",
        prepayDamageRate: "",
        prepayDescription: "",
        data: []
      }
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    //提前还款配置 - 详情
    productManageApi.prepayConfigDetail(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          formInput: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
    productManageApi.damageRatioList(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  table = [
    { title: "支用期数", key: "loanTerm", width: 130 },
    { title: "还款期次下限", key: "minPeriod", width: 130 },
    { title: "还款期次上限", key: "maxPeriod", width: 130 },
    { title: "违约金倍数", key: "damageRatio", width: 130 }
  ];

  render() {
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              提前还款配置
            </p>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
            >
              <Row>
                <Col span="12">
                  <FormItem
                    label="是否支持提前还款:"
                    required
                    style={styles.formItem}
                  >
                    <p>{this.state.formInput.isPrepay ? "是" : "否"}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="提还计划更新方式:"
                    required
                  >
                    <p>{this.state.formInput.prepayChangePlanText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    label="是否收取提还违约金:"
                    required
                    style={styles.formItem}
                  >
                    <p>{this.state.formInput.isPrepayDamage ? "是" : "否"}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="提还违约金公式:"
                    required
                  >
                    <p>{this.state.formInput.prepayDamageFormulaText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="提还费率:">
                    <p>
                      {this.state.formInput.prepayDamageRate}
                      <span>%</span>
                    </p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={{whiteSpace: "nowrap",display: "flex"}}
                    label="提还违约金倍数配置:"
                    required
                  >
                    <DataTable
                      col={this.table}
                      toolBtn={this.toolBtn}
                      lineBtn={this.lineBtn}
                      lineBtnFn={this.lineBtnFn}
                      loadTable={this.state.loading}
                      data={this.state.data}
                      style = {{width: "90%"}}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="提前还款说明:"
                    help=""
                  >
                    <Input.TextArea
                      style={{ width: "500px" }}
                      readOnly={true}
                      value={this.state.formInput.prepayDescription}
                      placeholder=""
                      name="prepayDescription"
                    />
                  </FormItem>
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
  formCol: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  formItemInput: {
    width: "120px",
    borderRadius: "4px",
    border: "none"
  }
};
