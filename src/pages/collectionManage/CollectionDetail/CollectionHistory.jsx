import React, { Component } from "react";
import DataTable from "../../dataTable";
import SearchForm from "../../components/SearchForm";
import CollectionDetails from "../../../api/CollectionManage/CollectionDetails";
import { Message } from "@alifd/next";
import store from "../../../store";
import { collectionHistory } from "../../../store/ScreeningWarehouse/collectionManage/actions";

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
      formValue: store.getState().collectionManage.collectionHistory.formValue,
      page: store.getState().collectionManage.collectionHistory.page,
      limit: store.getState().collectionManage.collectionHistory.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        { label: "客户名称", key: "customerName", type: "" },
        { label: "手机号", key: "customerPhone", type: "" },
        { label: "证件号", key: "customerIdentifyNo", type: "" },
        { label: "催收日期", key: "startTime", type: "range" },
        { label: "催收员名称", key: "operatorName", type: "" },
        {
          label: "催收方式",
          key: "collectionType",
          type: "select",
          list: [{ key: "全部", value: "" }]
        }
      ]
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().collectionManage.collectionHistory.formValue,
        page: store.getState().collectionManage.collectionHistory.page,
        limit: store.getState().collectionManage.collectionHistory.limit
      });
    });
  }

  table = [
    { title: "催收编号", key: "collectionTaskId", width: 100 },
    { title: "催收时间", key: "createTime", width: 160 },
    { title: "客户编号", key: "customerId", width: 130 },
    { title: "客户名称", key: "customerName", width: 150 },
    { title: "手机号码", key: "customerPhone", width: 100 },
    { title: "证件号", key: "customerIdentifyNo", width: 160 },
    { title: "催收员用户名", key: "operatorLoginName", width: 140 },
    { title: "催收员名称", key: "operatorName", width: 80 },
    { title: "催收方式", key: "collectionTypeText", width: 110 },
    { title: "联系方式", key: "partnerBusiness", width: 110 },
    { title: "发送内容", key: "collectionContent", width: 200 },
    { title: "催收结果描述", key: "collectionRemark", width: 200 },
  ];

  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(collectionHistory(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(collectionHistory(params));
    this.setState({ loading: true }, () => this.getData());
  };

  // lineBtn = [
  //   {
  //     name: "查看",
  //     type: "look"
  //   }
  // ];

  // lineBtnFn = {
  //   look: (val, index, row) => {
  //     this.props.history.push({
  //       pathname: "/CollectionManage/CollectionInfoTab",
  //       state: { name: row.id, customerId: row.customerId },
  //       history:this.props.history
  //     });
  //   }
  // };

  initDropList = () => {
    CollectionDetails.listCollectionRecordTypeEnum() //催收方式下拉
      .then(res => {
        if (res.data.code === "200") {
          let collectionStatus = res.data.data;
          if (collectionStatus !== null && collectionStatus !== undefined) {
            let amap = new Map(Object.entries(collectionStatus));
            for (let [k, v] of amap) {
              this.state.form[5].list.push({
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

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    CollectionDetails.historyList(params).then(res => {
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
    store.dispatch(collectionHistory(params));
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
          title="历史催收记录"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
        <div className="contain-con collection">
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
      </div>
    );
  }
}
