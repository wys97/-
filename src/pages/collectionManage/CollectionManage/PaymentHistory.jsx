import React, { Component } from "react";
import IceContainer from "@icedesign/container";
// import {Message} from '@alifd/next';
import collectionManageApi from "../../../api/CollectionManage/CollectionManage";
import DataTable from "../../dataTable";

export default class PaymentHistory extends Component {
  static displayName = "PaymentHistory";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {},
      page: 1,
      limit: 10,
      loading: false,
      data: [],
      dataSub: []
    };
  }

  table = [
    { title: "交易流水号/登记流水号", key: "repayRecordId", width: 100 },
    { title: "借据号", key: "dueId", width: 100 },
    { title: "产品名称", key: "productName", width: 100 },
    { title: "还款总额(元)", key: "repayAmount", width: 80 },
    { title: "还本金额(元)", key: "repayPrincipal", width: 110 },
    { title: "还利息金额(元)", key: "repayInterest", width: 110 },
    { title: "还罚息金额(元)", key: "repayFine", width: 110 },
    { title: "提还违约金额(元)", key: "repayDamage", width: 110 },
    { title: "还款类型", key: "debitMethod", width: 110 },
    { title: "还款方式", key: "repayType", width: 80 },
    { title: "还款结果", key: "repayStatus", width: 100 },
    { title: "交易时间", key: "repayBeginTime", width: 120 }
  ];

  componentDidMount() {
    this.getData();
  }

  getData = () => {          //还款记录列表
    let data = {
      customerId : this.state.id,
      page : this.state.page,
      limit : this.state.limit,
    }
    collectionManageApi.repayDetailDue(data).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

   pageChange = page => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };


  render() {
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              还款记录
            </p>
            <DataTable
              col={this.table}
              page={true}
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
