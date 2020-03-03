import React, { Component } from "react";
import DataTable from "../../dataTable";
import SearchForm from "../../components/SearchForm";
import CollectionDetails from "../../../api/CollectionManage/CollectionDetails";
import { Message } from "@alifd/next";
import store from "../../../store";
import { collectionUsersList } from "../../../store/ScreeningWarehouse/collectionManage/actions";

function inject_unount(target) {
  // 改装componentWillUnmount，销毁的时候记录一下
  let next = target.prototype.componentWillUnmount;
  target.prototype.componentWillUnmount = function() {
    if (next) next.call(this, ...arguments);
    this.unmount = true;
  };
  // 对setState的改装，setState查看目前是否已经销毁
  let setState = target.prototype.setState;
  target.prototype.setState = function() {
    if (this.unmount) return;
    setState.call(this, ...arguments);
  };
}
@inject_unount
export default class CollectionUsersList extends Component {
  static displayName = "CollectionUsersList";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().collectionManage.collectionUsersList
        .formValue,
      page: store.getState().collectionManage.collectionUsersList.page,
      limit: store.getState().collectionManage.collectionUsersList.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        {
          label: "客户名称",
          key: "customerName",
          type: ""
        },
        {
          label: "手机号",
          key: "customerPhone",
          type: ""
        },
        {
          label: "证件号",
          key: "customerIdentifyNo",
          type: ""
        },
        {
          label: "产品名称",
          key: "productName",
          type: ""
        },
        {
          label: "入催日期",
          key: "startTime",
          type: "range"
        },
        {
          label: "逾期最大天数",
          keys: ["overdueDayBegin", "overdueDayEnd"],
          type: "section"
        },
        {
          label: "逾期总额",
          keys: ["overdueTotalAmountBegin", "overdueTotalAmountEnd"],
          type: "section"
        },
        {
          label: "催收员名称",
          key: "currentOperatorName",
          type: ""
        },
        {
          label: "催收状态",
          key: "collectionStatus",
          type: "select",
          list: [{ key: "全部", value: "" }]
        }
      ]
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().collectionManage.collectionUsersList.formValue,
        page: store.getState().collectionManage.collectionUsersList.page,
        limit: store.getState().collectionManage.collectionUsersList.limit
      });
    });
  }

  table = [
    { title: "客户编号", key: "customerId", width: 100, align: "center" },
    { title: "客户名称", key: "customerName", width: 80, align: "center" },
    { title: "手机号码", key: "customerPhone", width: 110, align: "center" },
    { title: "证件号", key: "customerIdentifyNo", width: 150, align: "center" },
    { title: "逾期未还借据数", key: "overduePeriod", width: 100, align: "center" },
    { title: "产品名称", key: "productName", width: 80, align: "center" },
    { title: "入催日期", key: "startTime", width: 120, align: "center" },
    { title: "逾期最大天数", key: "maxOverdueDay", width: 80, align: "center" },
    { title: "逾期未还本金(元)", key: "overduePrincipal", width: 100, align: "center" },
    { title: "逾期未还利息(元)", key: "overdueInterest", width: 100, align: "center" },
    { title: "逾期未还罚息(元)", key: "overdueFine", width: 100, align: "center" },
    { title: "逾期未还总额(元)", key: "totalOverdueAmount", width: 100, align: "center" },
    { title: "贷款余额(元)", key: "totalOverdueUnpaidAmount", width: 100, align: "center" },
    { title: "催收状态", key: "collectionStatusText", width: 100, align: "center" },
    { title: "结清日期", key: "endTime", width: 120, align: "center" },
    { title: "催收员用户名", key: "currentOperatorLoginName", width: 100, align: "center" },
    { title: "催收员名称", key: "currentOperatorName", width: 100, align: "center" },
    { title: "操作", key: "operate", width: 80, cell: true, align: "center" }
  ];

  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount() {
    this.getData();
  }

  initDropList = () => {
    CollectionDetails.listCollectionStatusEnum() //催收状态下拉
      .then(res => {
        if (res.data.code === "200") {
          let collectionStatus = res.data.data;
          if (collectionStatus !== null && collectionStatus !== undefined) {
            let amap = new Map(Object.entries(collectionStatus));
            for (let [k, v] of amap) {
              this.state.form[8].list.push({
                key: v,
                value: k
              });
            }
            this.setState({
              refresh: this.state.refresh + 1
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });
  };

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(collectionUsersList(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(collectionUsersList(params));
    this.setState({ loading: true }, () => this.getData());
  };

  lineBtn = [
    {
      name: "查看",
      type: "look",
      permission: "collection:detail:user:menu:detail"
    }
  ];

  lineBtnFn = {
    look: (val, index, row) => {
      this.props.history.push({
        pathname: "/CollectionManage/CollectionInfoTab",
        state: { name:row.id, customerId: row.customerId },
        history:this.props.history
      });
    }
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    CollectionDetails.userList(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(collectionUsersList(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="催收用户记录"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
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
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />
      </div>
    );
  }
}
