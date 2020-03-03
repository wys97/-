import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import DataTable from "../../dataTable";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import { Message } from "@alifd/next";

export default class ProductInfoScreening extends Component {
  static displayName = "ProductInfoScreening";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        productNo: props.id
      },
      page: 1,
      limit: 10,
      loading: false,
      data: []
    };
  }

  componentWillMount() {}

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
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    productManageApi.productRuleInfo(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  table = [
    { title: "规则编号", key: "ruleNo", width: 100 },
    { title: "规则描述", key: "ruleName", width: 300 },
    {title: '应用场景', key: 'ruleSceneText', width: 100},
    { title: "风险级别", key: "ruleLevelText", width: 100 },
    { title: "规则状态", key: "statusText", width: 100 }
  ];

  render() {
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              筛查规则设置
            </p>
            <DataTable
              col={this.table}
              toolBtn={this.toolBtn}
              lineBtn={this.lineBtn}
              lineBtnFn={this.lineBtnFn}
              page={false}
              pageSize={this.state.limit}
              current={this.state.page}
              total={this.state.total}
              pageChange={current => this.pageChange(current)}
              limitChange={pageSize => this.limitChange(pageSize)}
              loadTable={this.state.loading}
              data={this.state.data}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}
