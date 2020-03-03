import React, { Component } from "react";
import { Form, Table } from "@alifd/next";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

export default class ManualApproval extends Component {
  static displayName = "ManualApproval";
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
        <Form
          labelTextAlign={"right"}
          {...formItemLayout}
          style={{ marginTop: "30px" }}
        >
          <div className="contain-con">
            <p
              style={{
                borderBottom: "1px solid #DDD",
                paddingBottom: "10px"
              }}
            >
              触发人工审批项
            </p>
            <Table
              dataSource={this.props.manualApprovalInfo}
              emptyContent="暂无数据"
            >
              <Table.Column title="配置项名称" dataIndex="ruleName" width="200" />
              <Table.Column title="配置值" dataIndex="ruleValue" width="300" />
              <Table.Column title="实际值" dataIndex="actualValue" width="300" />
            </Table>
          </div>
          <div className="contain-con">
            <p
              style={{
                borderBottom: "1px solid #DDD",
                paddingBottom: "10px"
              }}
            >
              人工审批记录
            </p>
            <Table
              dataSource={this.props.manualApproval}
              emptyContent="暂无数据"
            >
              <Table.Column title="审批ID" dataIndex="approvalId" width="200" />
              <Table.Column title="审批节点" dataIndex="currentLeverText" width="300"/>
              <Table.Column title="审批人员" dataIndex="approverName" width="300" />
              <Table.Column title="审批结果" dataIndex="approvalStatusText" width="200" />
              <Table.Column title="审批意见" dataIndex="approvalOpinion" width="300" />
              <Table.Column title="授信额度" dataIndex="extraOpinion" width="300" />
              <Table.Column title="审批时间" dataIndex="approvalTime" width="300" />
            </Table>
          </div>
        </Form>
      </div>
    );
  }
}
