import React, { Component } from "react";
import customerManageNewApi from "../../../api/OperationManage/CustomerManageNew";
import { Message, Table, Form } from "@alifd/next";

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};
const FormItem = Form.Item;

export default class CustomerContractInfo extends Component {
  static displayName = "CustomerContractInfo";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 100,
      total: 0,
      loading: false,
      data: [],
      id: this.props.id
    };
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { customerId: this.state.id };
    params.page = this.state.page;
    params.limit = this.state.limit;
    customerManageNewApi.contractInfo(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    return (
      <div>
        <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
          <Table dataSource={this.state.data} emptyContent="暂无数据">
            <Table.Column title='合同编号' dataIndex='contractNo' width='200'/>
            <Table.Column title='合同名称' dataIndex='contractName' width='300' />
            <Table.Column title='产品名称' dataIndex='productName' width='300'/>
            <Table.Column title='客户名称' dataIndex='customerName' width='300'/>
            <Table.Column title='状态' dataIndex='contractStatus' width='300'/>
            <Table.Column title='操作' width='300' cell={(value, index, record) => {
              return <a href={record.url} target='_blank'>下载</a>
            }}/>
          </Table>
        </Form>
      </div>
    );
  }
}
