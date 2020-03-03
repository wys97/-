import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Table } from "@alifd/next";
import collectionManageApi from "../../../api/CollectionManage/CollectionManage";
// import DataTable from "../../dataTable";

export default class NotYetReturned extends Component {
  static displayName = "NotYetReturned";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      loading: false,
      scrollToRow: 20,
      data: [],
      dataSub: []
    };
  }

  // table = [
  //   { title: "借据号", key: "dueId", width: 100 },
  //   { title: "产品名称", key: "productName", width: 160 },
  //   { title: "贷款金额(元)", key: "loanAmount", width: 110 },
  //   { title: "贷款余额(元)", key: "loanBalance", width: 110 },
  //   { title: "贷款期限", key: "loanTerm", width: 80 },
  //   { title: "还款方式", key: "repayMethodText", width: 100 },
  //   { title: "逾期天数", key: "overdueDays", width: 80 },
  //   { title: "逾期期数", key: "ruleName", width: 80 },
  //   { title: "逾期本金(元)", key: "overduePrincipal", width: 110 },
  //   { title: "逾期利息(元)", key: "overdueInterest", width: 110 },
  //   { title: "逾期罚息(元)", key: "overdueFine", width: 110 },
  //   { title: "逾期金额(元)", key: "overdueAmount", width: 110 }
  // ];

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    //未还借据列表
    collectionManageApi.unpaidLoanDue(this.state.id).then(res => {
      if (res.data.code === "200") {
        const data = res.data.data.list;
        delete res.data.data.list;
        let total = res.data.data;
        total.dueId = "合计：";
        data.push(total)
        this.setState({
          data: data,
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
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              未还借据
            </p>
            {/* <DataTable
              col={this.table}
              page={false}
              loadTable={this.state.loading}
              data={this.state.data}
            /> */}
            <Table
              dataSource={this.state.data}
              loading={this.state.loading}
              emptyContent="暂无数据"
              hasBorder={false}
              fixedHeader={true}
              maxBodyHeight={500}
            >
              <Table.Column title="借据号" dataIndex="dueId" width={100}/>
              <Table.Column title="产品名称" dataIndex="productName" width={160}/>
              <Table.Column title="贷款金额(元)" dataIndex="loanAmount" width={110}/>
              <Table.Column title="贷款余额(元)" dataIndex="loanBalance" width={110}/>
              <Table.Column title="贷款期限" dataIndex="loanTerm" width={80}/>
              <Table.Column title="还款方式" dataIndex="repayMethodText" width={100}/>
              <Table.Column title="逾期天数" dataIndex="overdueDays" width={80}/>
              <Table.Column title="逾期期数" dataIndex="" width={80}/>
              <Table.Column title="逾期本金(元)" dataIndex="overduePrincipal" width={110}/>
              <Table.Column title="逾期利息(元)" dataIndex="overdueInterest" width={110}/>
              <Table.Column title="逾期罚息(元)" dataIndex="overdueFine" width={110}/>
              <Table.Column title="逾期金额(元)" dataIndex="overdueAmount" width={110}/>
            </Table>
          </div>
        </IceContainer>
      </div>
    );
  }
}
