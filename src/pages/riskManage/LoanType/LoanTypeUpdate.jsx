import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import {
  CascaderSelect,
  Checkbox,
  Field,
  Form,
  Grid,
  Input,
  Message,
  Button,
  Select
} from "@alifd/next";
import loanTypeApi from "../../../api/RiskManage/LoanType";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class AviationIousUpdate extends Component {
  field = new Field(this);
  static displayName = "AviationIousUpdate";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      selectStatus: {}, //状态-下拉框
      id:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.name // 配置编号
    };
  }

  componentWillMount() {
    this.getStatus();
  }

  componentDidMount() {
    this.LoanTypeDetailInfo();
  }

  LoanTypeDetailInfo = () => {
    //产品管理-详情
    loanTypeApi.detail(this.state.id).then(res => {
      if (res.data.code === "200") {
        if(res.data.data.manualEver === false) {
          res.data.data.manualEver = "否"
        } 
        if(res.data.data.manualEver === true) {
          res.data.data.manualEver = "是"
        }
        this.field.setValues(res.data.data);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getStatus = () => {
    //五级状态-下拉框
    loanTypeApi.loanCategoryStatus().then(res => {
      if (res.data.code === "200") {
        this.setState({
          selectStatus: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getAviationIousUpdate = (v, e) => {
    if (e != null) {
      return;
    }
    loanTypeApi.update(v).then(res => {
      if (res.data.code === "200") {
        this.goBack();
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  render() {
    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={"right"} {...formItemLayout} field={this.field}>
            <div className="contain-con">
              <div style={{ marginTop: "30px" }}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="借据号:">
                      <p>{this.field.getValue("dueId")}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="分类日期:">
                      <p>{this.field.getValue("createTime")}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="五级状态"
                      required
                      requiredMessage="请选择五级状态"
                    >
                      <Select
                        followTrigger
                        name="categoryType"
                        style={styles.formInputBorder}
                      >
                        {
                          Object.keys(this.state.selectStatus)
                            .map((key, idx) => {
                              return <Option key={idx} value={key}>{this.state.selectStatus[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="上期五级状态:">
                      <p>{this.field.getValue("categoryTypePreviousText")}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="逾期天数:">
                      <p>{this.field.getValue("maxOverdueDay")}天</p>
                    </FormItem>
                  </Col>
                </Row>                
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="生效标志:"
                    >
                      <p>{this.field.getValue("validStatusText")}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="是否人工调整:"
                    >
                      <p>{this.field.getValue("manualEver")}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="五级状态描述:"
                    >
                      <Input.TextArea
                        style={styles.formTextArea}
                        placeholder=""
                        name="categoryTypeDescribe"
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <Form.Submit
              type="primary"
              style={styles.saveButton}
              validate
              onClick={this.getAviationIousUpdate}
            >
              保存
            </Form.Submit>
            <Form.Submit
              type="normal"
              style={styles.saveButton}
              validate
              onClick={this.goBack}
            >
              返回
            </Form.Submit>
          </Form>
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
  preview: {
    border: "1px solid #eee",
    marginTop: 20,
    padding: 10
  },
  formItemInput: {
    width: "120px",
    borderRadius: "4px"
  },
  searchBtn: {
    float: "right",
    backgroundColor: "#fff",
    color: "#3080fe"
  },
  pagination: {
    marginTop: "20px",
    textAlign: "right"
  },
  formInput: {
    border: "none"
    // width: '200px'
  },
  formInputBorder: {
    width: "240px"
  },
  formTextArea: {
    width: "500px"
  },
  saveButton: {
    float: "left",
    borderRadius: "4px",
    marginLeft: "180px",
    width: "80px"
  }
};
