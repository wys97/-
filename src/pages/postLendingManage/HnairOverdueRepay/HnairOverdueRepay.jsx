import React from "react";
import { Message } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import hnairOverdueRepayApi from "../../../api/PostLendingManage/HnairOverdueRepay";
import store from "../../../store";
import { overdueFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

function inject_unount(target) {
  // 改装componentWillUnmount，销毁的时候记录一下
  let next = target.prototype.componentWillUnmount;
  target.prototype.componentWillUnmount = function () {
    if (next) next.call(this, ...arguments);
    this.unmount = true;
  };
  // 对setState的改装，setState查看目前是否已经销毁
  let setState = target.prototype.setState;
  target.prototype.setState = function () {
    if (this.unmount) return;
    setState.call(this, ...arguments);
  };
}
@inject_unount
export default class OverdueRepay extends React.Component {
  static displayName = "OverdueRepay";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.overdueDetail.formValue,
      page: store.getState().loanTransaction.overdueDetail.page,
      limit: store.getState().loanTransaction.overdueDetail.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      form: [
        {
          label: "借据号",
          key: "dueId",
          type: "",
        },
        {
          label: "客户名称",
          key: "customerName",
          type: "",
        },
        {
          label: "手机号",
          key: "phone",
          type: "",
        },
        {
          label: "证件号",
          key: "identityNo",
          type: "",
        },
        {
          label: "逾期最大天数",
          keys: ["overdueDayBegin", "overdueDayEnd"],
          type: "section",
        },
        {
          label: "逾期未还本金",
          keys: ["overdueAmountBegin", "overdueAmountEnd"],
          type: "section",
        },
        {
          label: "逾期未还总额",
          keys: ["overdueTotalAmountBegin", "overdueTotalAmountEnd"],
          type: "section",
        },
        {
          label: "产品名称",
          key: "productName",
          type: "select",
          list: [
            {
              key: "全部",
              value: "",
            },
          ],
        },
        {
          label: "是否结清逾期",
          key: "isClear",
          type: "select",
          list: [
            {
              key: "全部",
              value: "",
            },
          ],
        },
        {
          label: "恒生迁移标志",
          key: "isHsLoanDue",
          type: "select",
          list: [
            {
              key: "全部",
              value: "",
            },
            {
              key: "是",
              value: true,
            },
            {
              key: "否",
              value: false,
            },
          ],
        },
        {
          label: "是否集团内部员工",
          key: "isInternalEmployee",
          type: "select",
          list: [
            { key: "全部", value: "" },
            {
              key: "是",
              value: true,
            },
            {
              key: "否",
              value: false,
            },
          ],
        },
      ],
      totalData: {}, //逾期数据
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.overdueDetail.formValue,
        page: store.getState().loanTransaction.overdueDetail.page,
        limit: store.getState().loanTransaction.overdueDetail.limit,
      });
    });
  }

  table = [
    {
      title: "借据号",
      key: "dueId",
      width: 100,
    },
    {
      title: "产品名称",
      key: "productName",
      width: 80,
    },
    {
      title: "客户名称",
      key: "customerName",
      width: 80,
    },
    {
      title: "手机号",
      key: "phone",
      width: 110,
    },
    {
      title: "金鹏手机号",
      key: "jinpengPhone",
      width: 130,
    },
    {
      title: "证件号",
      key: "identityNo",
      width: 160,
    },
    {
      title: "贷款金额(元)",
      key: "loanAmount",
      width: 100,
      align: "right",
    },
    {
      title: "贷款余额(元)",
      key: "loanBalance",
      width: 100,
      align: "right",
    },
    {
      title: "贷款期限(月)",
      key: "loanTerm",
      width: 80,
    },
    {
      title: "还款方式",
      key: "repayMethodText",
      width: 80,
    },
    {
      title: "逾期最大天数",
      key: "overdueDays",
      width: 80,
    },
    {
      title: "借据当前逾期天数",
      key: "unClearOverdueDay",
      width: 100,
    },
    {
      title: "逾期未还本金(元)",
      key: "overduePrincipal",
      align: "right",
      width: 100,
    },
    {
      title: "逾期未还利息(元) ",
      key: "overdueInterest",
      align: "right",
      width: 100,
    },
    {
      title: "逾期未还罚息(元) ",
      key: "overdueFine",
      align: "right",
      width: 100,
    },
    {
      title: "逾期未还总额(元) ",
      key: "overdueAmount",
      align: "right",
      width: 100,
    },
    {
      title: "恒生迁移标志",
      key: "isHsLoanDueText",
      align: "center",
      width: 80,
    },
    {
      title: "是否结清逾期",
      key: "isClearText",
      width: 80,
    },
    {
      title: "是否集团内部员工",
      key: "isInternalEmployeeText",
      width: 80
    },
    // {
    //   title: '操作',
    //   key: 'operate',
    //   width: 100,
    //   cell: true,
    // },
  ];

  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "loanbusiness:overdue:overdue:menu" 
    },
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    },
  };
  componentWillMount() {
    // this.form[7].list[2].selected = 'selected'
    this.getDecreaseStatus();
    this.getProductName();
  }

  componentDidMount() {
    // this.form[7].list[2].selected = 'selected'
    this.getData();
    this.getStatisticsMoney();
  }

  pageChange = (page) => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(overdueFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = (limit) => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(overdueFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getProductName = () => {
    //产品管理-产品名称-下拉框
    hnairOverdueRepayApi.productName().then((res) => {
      if (res.data.code === "200") {
        let selectList = [{ key: "全部", value: "" }];
        for (let key in res.data.data) {
          selectList.push({ key: res.data.data[key], value: key });
        }
        this.state.form.map((item, index) => {
          if (item.key === "productName") {
            this.state.form[index].list = selectList;
            let forms = this.state.form;
            this.setState({
              form: forms,
            });
          }
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };
  getDecreaseStatus = () => {
    //产品管理-是否结清逾期-下拉框
    hnairOverdueRepayApi.commonYesOrNo().then((res) => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[6]里面list的key是中文, value是英文
            this.state.form[8].list.push({
              key: v,
              value: k,
            });
          }
          let form = [...this.state.form];
          let formValue = { ...this.state.formValue };
          this.state.form[8].list.map((item) => {
            if (item.key === "否") {
              formValue["isClear"] = item.value;
            }
          });
          this.setState(
            {
              refresh: this.state.refresh + 1,
              formValue,
              form,
            },
            () => this.getData()
          );
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    hnairOverdueRepayApi.overdueDetailList(params).then((res) => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          loading: false,
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  //获取逾期数据
  getStatisticsMoney = () => {
    hnairOverdueRepayApi.statisticsMoney(this.state.formValue).then((res) => {
      if (res.data.code === "200") {
        this.setState({
          totalData: res.data.data,
          loading: false,
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  //   lineBtn = [{
  //     name: '查看',
  //     type: 'look',
  //     permission: 'postloan:postloan:overdue:view'
  //   }];

  //   lineBtnFn = {
  //     look: (val, index, row) => {
  //       this.props.history.push({pathname: '/businessChange/overdueRepayDetail', state: {name: row.dueId}});
  //     },
  //   };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(overdueFormValue(params));
    this.setState(
      {
        loading: true,
      },
      () => this.getData()
    );
    this.getStatisticsMoney();
  }

  exportExcel = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    hnairOverdueRepayApi.exportExcel(params).then((res) => {
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      let fileName = decodeURI(
        res.headers["content-disposition"].split("=")[1]
      );

      let link = document.createElement("a");
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  };

  render() {
    const { totalData } = this.state;
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="逾期明细"
          onSubmit={(formValue) => this.onSubmit(formValue)}
          formValue={this.state.formValue}
        />
        <div style={styles.statisticData}>
          <div style={styles.abs}>
            <span>逾期总金额：{totalData.totalOverdueAmount} 元</span>
            <span>逾期总利息：{totalData.totalOverdueInterest} 元</span>
            <span>逾期总本金：{totalData.totalOverduePrincipal} 元</span>
            <span>逾期总罚息：{totalData.totalOverdueFine} 元</span>
          </div>
        </div>

        <DataTable
          col={this.table}
          toolBtn={this.toolBtn}
          toolBtnFn={this.toolBtnFn}
          lineBtn={this.lineBtn}
          lineBtnFn={this.lineBtnFn}
          page={true}
          pageSize={this.state.limit}
          current={this.state.page}
          total={this.state.total}
          pageChange={(current) => this.pageChange(current)}
          limitChange={(pageSize) => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />
      </div>
    );
  }
}


const styles = {
  statisticData: {
    width: '55%',
    position: 'relative',
    padding: '0 34px'
  },

  abs: {
    width: '100%',
    position: 'absolute',
    top: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: '100',
    fontSize: '14px'
  }

}
