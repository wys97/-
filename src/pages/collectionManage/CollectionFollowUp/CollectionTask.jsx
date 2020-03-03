import React, { Component } from "react";
import DataTable from "../../dataTable";
import SearchForm from "../../components/SearchForm";
import collectionFollowUp from "../../../api/CollectionManage/CollectionFollowUp";
import { Message } from "@alifd/next";
import store from "../../../store";
import { collectionTask } from "../../../store/ScreeningWarehouse/collectionManage/actions";

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
export default class CollectionFollowUp extends Component {
  static displayName = "CollectionFollowUp";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().collectionManage.collectionTask.formValue,
      page: store.getState().collectionManage.collectionTask.page,
      limit: store.getState().collectionManage.collectionTask.limit,
      loading: false,
      total: 0,
      data: [],
      form: [
        { label: "客户名称", key: "customerName", type: "" },
        { label: "手机号", key: "customerPhone", type: "" },
        { label: "证件号", key: "customerIdentifyNo", type: "" },
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
        formValue: store.getState().collectionManage.collectionTask.formValue,
        page: store.getState().collectionManage.collectionTask.page,
        limit: store.getState().collectionManage.collectionTask.limit
      });
    });
  }

  table = [
    { title: "客户编号", key: "customerId", width: 100, align: "center" },
    { title: "客户名称", key: "customerName", width: 80, align: "center" },
    { title: "手机号码", key: "customerPhone", width: 110, align: "center" },
    { title: "证件号", key: "customerIdentifyNo", width: 150, align: "center" },
    {
      title: "入催日期",
      key: "startTime",
      width: 120,
      align: "center"
    },
    { title: "逾期借据数", key: "overduePeriod", width: 100, align: "center" },
    { title: "逾期最大天数", key: "maxOverdueDay", width: 80, align: "center" },
    {
      title: "逾期本金(元)",
      key: "overduePrincipal",
      width: 110,
      align: "center"
    },
    {
      title: "逾期利息(元)",
      key: "overdueInterest",
      width: 110,
      align: "center"
    },
    { title: "逾期罚息(元)", key: "overdueFine", width: 110, align: "center" },
    {
      title: "逾期总额(元)",
      key: "totalOverdueAmount",
      width: 110,
      align: "center"
    },
    {
      title: "催收状态",
      key: "collectionStatusText",
      width: 100,
      align: "center"
    },
    { title: "结清日期", key: "endTime", width: 120, align: "center" },
    { title: "操作", key: "operate", width: 80, cell: true, align: "center" }
  ];

  componentWillMount = () => {
    this.initDropList();
  };

  componentDidMount() {
    this.getData();
  }

  initDropList = () => {
    collectionFollowUp
      .listCollectionStatusEnum() //催收状态下拉
      .then(res => {
        if (res.data.code === "200") {
          let collectionStatus = res.data.data;
          if (collectionStatus !== null && collectionStatus !== undefined) {
            let amap = new Map(Object.entries(collectionStatus));
            for (let [k, v] of amap) {
              this.state.form[3].list.push({
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
    store.dispatch(collectionTask(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(collectionTask(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    collectionFollowUp.taskList(params).then(res => {
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

  lineBtn = [
    {
      name: "查看",
      type: "look",
      permission: "collection:follow:task:menu:detail"
    }
  ];

  lineBtnFn = {
    look: (val, index, row) => {
      this.props.history.push({
        pathname: "/CollectionManage/CollectionInfoTabs",
        state: { name: row.id, customerId: row.customerId }
      });
    }
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(collectionTask(params));
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
          title="我的催收任务"
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

/*const styles = {
  formItem: {
    display: 'flex',
    lineHeight: '28px',
  },
  formItemError: {
    marginLeft: '10px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
  },
  formInputBorder: {
    width: '240px',
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent',
  },
  cancelButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#ddd',
    color: '#000',
    borderColor: 'transparent',
  },
};*/
