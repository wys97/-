import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Form, Grid, Table } from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const FormItem = Form.Item;

export default class RuleDetail extends Component {
  static displayName = "RuleDetail";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {};

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              筛查结果
            </p>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
            >
              <Row>
                <Col span="12"></Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="筛查结果:">
                    {this.props.ruleDetailInfo.checkStageText === "通过" ? (
                      <p style={{ background: "green", color: "#fff" }}>
                        {this.props.ruleDetailInfo.checkStageText}
                      </p>
                    ) : (
                      <p style={{ background: "red", color: "#fff" }}>
                        {this.props.ruleDetailInfo.checkStageText}
                      </p>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Table
                dataSource={this.props.ruleDetailInfo.rules}
                emptyContent="暂无数据"
              >
                <Table.Column title="要素" dataIndex="ruleName" width="200" />
                <Table.Column
                  title="结果"
                  dataIndex="resultDescription"
                  width="300"
                />
                <Table.Column
                  title="标识"
                  dataIndex="ruleResultText"
                  width="300"
                />
              </Table>
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
  formContent: {
    width: "0px",
    border: "none"
  },
  formTextArea: {
    width: "500px"
  }
};
