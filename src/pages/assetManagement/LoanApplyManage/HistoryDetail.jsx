import React, { Component } from "react";
import { Form, Grid, Table } from "@alifd/next";

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export default class Detail extends Component {
  static displayName = "Detail";
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
      <div className="contain-con">
        <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
          历史授信
        </p>
        <Form
          labelTextAlign={"right"}
          {...formItemLayout}
          style={{ marginTop: "30px" }}
        >
          <Table
            dataSource={this.props.historyDetailInfo}
            emptyContent="暂无数据"
          >
            <Table.Column title="授信申请编号" dataIndex="creditId" width="200" />
            <Table.Column
              title="申请时间"
              dataIndex="beginTime"
              width="300"
            />
            <Table.Column
              title="产品名称"
              dataIndex="productName"
              width="300"
            />
            <Table.Column
              title="授信类型"
              dataIndex="creditType"
              width="300"
            />
            <Table.Column
              title="授信结果"
              dataIndex="creditResult"
              width="300"
            />
            <Table.Column
              title="授信金额"
              dataIndex="creditLimit"
              width="300"
            />
            <Table.Column
              title="授信有效期"
              dataIndex="dueDate"
              width="300"
            />
          </Table>
        </Form>
      </div>
    );
  }
}
