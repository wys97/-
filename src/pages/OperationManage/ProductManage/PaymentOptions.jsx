import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Message, Icon } from "@alifd/next";
import DataTable from "../../dataTable";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";

export default class PaymentOptions extends Component {
  static displayName = "PaymentOptions";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        productNo: props.id
      },
      visible: false,
      type: "add",
      refresh: 0, // 用于刷新表格
      page: 1,
      limit: 10,
      loading: false,
      data: []
    };
  }
  table = [
    { title: "还款方式", key: "repayMethod", width: 100 },
    { title: "不足月首期还款日", key: "firstInterestMethod", width: 150 },
    { title: "不足月计息", key: "firstRepayDay", width: 100 },
    { title: "整数化方案", key: "roundMethod", width: 100 },
    { title: "1期", key: "isTerm1", width: 100, align: "center" },
    { title: "3期", key: "isTerm3", width: 100, align: "center" },
    { title: "6期", key: "isTerm6", width: 100, align: "center" },
    { title: "9期", key: "isTerm9", width: 100, align: "center" },
    { title: "12期", key: "isTerm12", width: 100, align: "center" },
    { title: "24期", key: "isTerm24", width: 100, align: "center" },
    { title: "36期", key: "isTerm36", width: 100, align: "center" }
  ];
  tables = [
    { title: "信用分下限", key: "minCreditScore", width: 100 },
    { title: "信用分上限", key: "maxCreditScore", width: 150 },
    { title: "金额下限(元)", key: "loanMinAmount", width: 100 },
    { title: "金额上限(元)", key: "loanMaxAmount", width: 100 },
    {
      title: '月利率', key: 'rateMap',
      columns: [
        { title: "1期月利率", key: "interestRate1Str", width: 100, align: "center" },
        { title: "3期月利率", key: "interestRate3Str", width: 100, align: "center" },
        { title: "6期月利率", key: "interestRate6Str", width: 100, align: "center" },
        { title: "9期月利率", key: "interestRate9Str", width: 100, align: "center" },
        { title: "12期月利率", key: "interestRate12Str", width: 100, align: "center" },
        { title: "24期月利率", key: "interestRate24Str", width: 100, align: "center" },
        { title: "36期月利率", key: "interestRate36Str", width: 100, align: "center" },
      ]
    },
    
  ];

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
    productManageApi.productRepayMethodList(params).then(res => {
      if (res.data.code === "200") {
        let obj = res.data.data.map((item, index, arry) => {
          let data = {};
          if (item.isTerm1 == false) {
            (data = item), (data.isTerm1 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm1 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          if (item.isTerm3 == false) {
            (data = item), (data.isTerm3 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm3 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          if (item.isTerm6 == false) {
            (data = item), (data.isTerm6 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm6 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          if (item.isTerm9 == false) {
            (data = item), (data.isTerm9 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm9 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          if (item.isTerm12 == false) {
            (data = item), (data.isTerm12 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm12 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          if (item.isTerm24 == false) {
            (data = item), (data.isTerm24 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm24 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          if (item.isTerm36 == false) {
            (data = item), (data.isTerm36 = <Icon type="close" size="xs" />);
          } else {
            (data = item), (data.isTerm36 = <Icon type="select" size="xs" style={{ color: '#1DC11D'}} />);
          }
          return data;
        });
        this.setState({
          data: obj,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
    productManageApi
      .rateSettingList(this.state.formValue.productNo)
      .then(res => {
        if (res.data.code === "200") {
          let loan = res.data.data.map((item, index, arry) => {
            let data = {};
            if (item.interestRate1Str === null) {
              (data = item),
                (data.interestRate1Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate3Str === null) {
              (data = item),
                (data.interestRate3Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate6Str === null) {
              (data = item),
                (data.interestRate6Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate9Str === null) {
              (data = item),
                (data.interestRate9Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate12Str === null) {
              (data = item),
                (data.interestRate12Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate24Str === null) {
              (data = item),
                (data.interestRate24Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate36Str === null) {
              (data = item),
                (data.interestRate36Str = <Icon type="close" size="xs" />);
            }
            return data;
          });
          this.setState({
            rate: loan,
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
              还款方式配置
            </p>
            <DataTable
              col={this.table}
              toolBtn={this.toolBtn}
              toolBtnFn={this.toolBtnFn}
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
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              贷款利率配置
            </p>
            <DataTable
              col={this.tables}
              toolBtn={this.toolBtns}
              toolBtnFn={this.toolBtnFns}
              lineBtn={this.lineBtns}
              lineBtnFn={this.lineBtnFns}
              loadTable={this.state.loading}
              data={this.state.rate}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}
