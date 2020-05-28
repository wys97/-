import React, { Component } from "react";
import { Message } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import loanApplyManageApi from "../../../api/AssetManagement/LoanApplyManage";
import store from "../../../store";
import Tables from "../../tables";

import { disburseFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class LoanApplyManage extends Component {
  static displayName = "LoanApplyManage";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.loanApplyManage.formValue,
      page: store.getState().loanTransaction.loanApplyManage.page,
      limit: store.getState().loanTransaction.loanApplyManage.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      selectedKeys: [],
      records: [],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.loanApplyManage.formValue,
        page: store.getState().loanTransaction.loanApplyManage.page,
        limit: store.getState().loanTransaction.loanApplyManage.limit
      });
    });
  }

  form = [
    { label: "贷款申请编号", key: "applyId", type: "" },
    { label: "合同号", key: "contractNo", type: "" },
    { label: "客户名称", key: "customerName", type: "" },
    { label: "证件号", key: "identityNo", type: "" },
    { label: "手机号", key: "phone", type: "" },
    { label: "合作机构名称", key: "partnerName", type: "" },
    { label: "产品名称", key: "productName", type: "" },
    {
      label: "支用渠道",
      key: "tradeType",
      type: "select",
      list: [{ key: "全部", value: "" }]
    },
    {
      label: "申请状态",
      key: "applyStatus",
      type: "select",
      list: [{ key: "全部", value: "" }]
    },
    { label: "申请日期", key: "applyDate", type: "range" }
  ];

  table = [
    {
      title: "贷款申请编号",
      key: "applyId",
      width: 100,
      cell: true,
      path: "/assetManage/loanApplyDetail"
    },
    {
      title: "合同号",
      key: "contractNo",
      width: 140
    },
    {
      title: "客户姓名",
      key: "customerName",
      width: 80
    },
    {
      title: "证件号",
      key: "identityNo",
      width: 120
    },
    {
      title: "手机号",
      key: "phone",
      width: 100
    },
    {
      title: "合作机构名称",
      key: "partnerName",
      width: 180
    },
    {
      title: "项目名称",
      key: "projectName",
      width: 140
    },
    {
      title: "产品名称",
      key: "productName",
      width: 100
    },
    {
      title: "支用渠道",
      key: "tradeTypeText",
      width: 130
    },
    {
      title: "贷款金额 (元) ",
      key: "loanAmount",
      align: "right",
      width: 110
    },
    {
      title: "贷款期限 (月) ",
      key: "loanTerm",
      width: 120
    },
    {
      title: "贷款月利率 (%) ",
      key: "loanInterest",
      width: 100
    },
    {
      title: "申请状态",
      key: "applyStatusText",
      width: 100
    },
    {
      title: "申请时间",
      key: "applyTime",
      width: 140
    }
  ];
  toolBtn = [
    {
      name: "重新发起风控",
      type: "toRequest",
      icon: "export",
      permission: "loanbusiness:sign:sign-record:menu"
    },
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "loanbusiness:use:menu"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    },
    toRequest: () => {
      this.afreshRequest();
    }
  };

  componentWillMount() {
    this.getApplyStatus();
    this.getTradeType();
  }

  componentDidMount() {
    this.getData();
  }


  getTradeType = () => {
    //产品管理-支用渠道-下拉框
    loanApplyManageApi.tradeType().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[7]里面list的key是中文, value是英文
            this.form[7].list.push({
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

  getApplyStatus = () => {
    //产品管理-产品状态-下拉框
    loanApplyManageApi.applyStatus().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[7]里面list的key是中文, value是英文
            this.form[8].list.push({
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
    store.dispatch(disburseFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(disburseFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    loanApplyManageApi.applyList(params).then(res => {
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
    store.dispatch(disburseFormValue(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  exportExcel = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    loanApplyManageApi.exportExcel(params).then(res => {
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


  selectedKey = selectedKeys => {
    this.setState({
      selectedKeys
    });
  };
  record = records => {
    this.setState({
      records
    });
  };


  afreshRequest = () => {
    const { records } = this.state;
    if (records.length > 0) {
      //返回勾选的数据中为风控不通过的数据
      let checked = records.filter((item) => {
        if (item.applyStatus == 'RISK_FAILED') {
          return item
        }
      })
      if (checked.length > 0) {
        this.setState({
          loading: true
        })
        let idArr = [];
        checked.map(item => {
          return idArr.push(JSON.stringify(item.applyId))
        })
        loanApplyManageApi.toRequest(idArr).then(res => {
          if (res.data.code == '200') {
            this.setState(
              {
                loading: true,
                selectedKeys: [],
                records:[],
              },
              () => this.getData()

            );
            
            Message.success(res.data.message);
          } else {
            this.setState({
              loading: false
            })
            Message.error(res.data.message);
          }

        })

      } else {
        Message.warning('选中的数据中没有风控不通过的数据')
      }


    } else {
      Message.error('请选择要处理数据')
    }

  }


  render() {
    return (
      <div>
        <SearchForm
          form={this.form}
          title="支用管理"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
     
        <Tables
          col={this.table}
          toolBtn={this.toolBtn}
          toolBtnFn={this.toolBtnFn}
          lineBtn={this.lineBtn}
          lineBtnFn={this.lineBtnFn}
          page={true}
          pageSize={this.state.limit}
          current={this.state.page}
          total={this.state.total}
          creditId={this.table[0].key}
          selectedKey={selectedKeys => this.selectedKey(selectedKeys)}
          record={records => this.record(records)}
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />
      </div>
    );
  }
}
