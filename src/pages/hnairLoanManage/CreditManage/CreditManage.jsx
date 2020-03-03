import React, { Component } from "react";
import { Dialog, Message } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import Tables from "../../tables";
// import blackListApi from '../../../api/RiskManage/BlackList';
import CreditManageApi from "../../../api/HnairCreditManage/CreditManage";
import store from "../../../store";
import { creditManage } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

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
export default class CreditManage extends Component {
  static displayName = "CreditManage";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.creditManage.formValue,
      page: store.getState().loanTransaction.creditManage.page,
      limit: store.getState().loanTransaction.creditManage.limit,
      loading: false,
      total: 0,
      data: [],
      detailData: [],
      refresh: 0,
      visible: false,
      customerCreditId: "",
      applyType: "",
      detail: {},
      selectedKeys: [],
      records: [],
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.creditManage.formValue,
        page: store.getState().loanTransaction.creditManage.page,
        limit: store.getState().loanTransaction.creditManage.limit
      });
    });
  }

  form = [
    {
      label: "客户号",
      key: "customerId",
      type: ""
    },
    {
      label: "客户名称",
      key: "customerName",
      type: ""
    },
    {
      label: "手机号",
      key: "phone",
      type: ""
    },
    {
      label: "证件号",
      key: "identityNo",
      type: ""
    },
    {
      label: "产品名称",
      key: "productName",
      type: ""
    },
    {
      label: "风控评分",
      keys: ["creditScoreStart", "creditScoreEnd"],
      type: 'section',
    },
    {
      label: "授信类型",
      key: "creditType",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    },
    {
      label: "授信渠道",
      key: "tradeType",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        },
      ]
    },
    {
      label: "风控结果",
      key: "riskResult",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    },
    {
      label: "审批员",
      key: "operatorName",
      type: ""
    },
    {
      label: "状态",
      key: "creditStatus",
      type: "select",
      list: [
        {
          key: "全部",
          value: ""
        }
      ]
    }
  ];

  table = [
    {
      title: "授信申请编号",
      key: "creditId",
      width: 110,
      cell: true,
      path: "/hnairLoanManage/creditManageDetail"
    },
    {
      title: "申请时间",
      key: "applyTime",
      width: 140,
      align: "center"
    },
    {
      title: "客户名称",
      key: "customerName",
      width: 100,
      align: "center"
    },
    {
      title: "手机号",
      key: "phone",
      width: 110,
      align: "center"
    },
    {
      title: "证件号",
      key: "identityNo",
      width: 160,
      align: "center"
    },
    {
      title: "产品名称",
      key: "productName",
      width: 100,
      align: "center"
    },
    {
      title: "授信类型",
      key: "creditType",
      width: 100,
      align: "center"
    },
    {
      title: "授信渠道",
      key: "tradeTypeText",
      width: 130,
      align: "center"
    },

    {
      title: "风控评分",
      key: "creditScore",
      width: 80,
      align: "center"
    },
    {
      title: "风控结果",
      key: "riskResult",
      width: 80,
      align: "center"
    },
    {
      title: "风控额度(元)",
      key: "riskLimit",
      width: 100,
      align: "center"
    },
    {
      title: "审批员",
      key: "operatorName",
      width: 80
    },
    {
      title: "最终授信额度（元）",
      key: "creditLimit",
      width: 120,
      align: "center"
    },
    {
      title: "授信有效期",
      key: "dueDate",
      width: 100
    },
    {
      title: "状态",
      key: "creditResult",
      width: 140
    }
  ];

  detailTable = [
    {
      title: "风险等级",
      key: "riskType",
      width: 100
    },
    {
      title: "扫描结果",
      key: "result",
      width: 100
    },
    {
      title: "证据链信息",
      key: "output"
      // width: 100,
    }
  ];

  componentWillMount() {
    // 下拉加载
    this.getListCreditTypeEnum();
    this.getListRiskResultEnum();
    this.getListCreditResultEnum();
    this.getListCreditChannel();
  }

  componentDidMount() {
    this.getData();
  }

  getListCreditTypeEnum = () => {
    //授信类型-下拉框
    CreditManageApi.listCreditTypeEnum().then(res => {
      if (res.data.code === "200") {
        let creditType = res.data.data;
        let amap = new Map(Object.entries(creditType));
        for (let [k, v] of amap) {
          this.form[6].list.push({
            key: v,
            value: k
          });
        }
        this.setState({
          refresh: this.state.refresh + 1
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };
  getListCreditChannel = () => {
    //授信渠道-下拉框
    CreditManageApi.listCreditChannel().then(res => {
      if (res.data.code === "200") {
        let creditType = res.data.data;
        let amap = new Map(Object.entries(creditType));
        for (let [k, v] of amap) {
          this.form[7].list.push({
            key: v,
            value: k
          });
        }
        this.setState({
          refresh: this.state.refresh + 1
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getListRiskResultEnum = () => {
    //风控结果-下拉框
    CreditManageApi.listRiskResultEnum().then(res => {
      if (res.data.code === "200") {
        let riskResult = res.data.data;
        let amap = new Map(Object.entries(riskResult));
        for (let [k, v] of amap) {
          this.form[8].list.push({
            key: v,
            value: k
          });
        }
        this.setState({
          refresh: this.state.refresh + 1
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getListCreditResultEnum = () => {
    //授信管理-状态
    CreditManageApi.listCreditResultEnum().then(res => {
      if (res.data.code === "200") {
        let creditResult = res.data.data;
        let amap = new Map(Object.entries(creditResult));
        for (let [k, v] of amap) {
          this.form[10].list.push({
            key: v,
            value: k
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
    store.dispatch(creditManage(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(creditManage(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    CreditManageApi.customerCreditList(params).then(res => {
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
  }
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
      permission: "loanbusiness:sign:sign-record:menu"
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

  lineBtn = [
    {
      name: "customerId",
      type: "goout",
      // key: 'blackStatus',
      // value: 'IN_PASS' + ',' + 'IN_FAILED' + ',' + 'OUT_PASS',
      permission: "loanbusiness:sign:sign-record:rule-detail"
    }
  ];

  lineBtnFn = {
    // goout: (val, index, row) => {
    //   this.setState(
    //     {
    //       customerCreditId: row.customerCreditId,
    //       applyType: "goout"
    //     },
    //     () => this.getDetail()
    //   );
    // }
  };

  // getDetail = () => {
  //   CreditManageApi.creditRules(this.state.customerCreditId).then(res => {
  //     if (res.data.code === "200") {
  //       this.setState({
  //         detailData: res.data.data,
  //         visible: true
  //       });
  //     } else {
  //       Message.error(res.data.message);
  //     }
  //   });
  // };

  onClose = () => {
    //关闭新增弹窗
    this.setState({
      visible: false
    });
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(creditManage(params));
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
    CreditManageApi.exportExcel(params).then(res => {
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
        if (item.creditStatus == 'RISK_FAILED') {
          return item
        }
      })
      if (checked.length > 0) {
        this.setState({
          loading: true
        })
        let idArr = [];
        checked.map(item => {
          return idArr.push(JSON.stringify(item.creditId))
        })
        CreditManageApi.toRequest(idArr).then(res => {
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
          title="授信记录"
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
        <Dialog
          style={{ width: "60%", height: "80%", borderRadius: "8px" }}
          title="规则详情"
          isFullScreen={true}
          footer={<span />}
          visible={this.state.visible}
          onOk={this.onClose}
          onCancel={this.onClose}
          onClose={this.onClose}
        >
          <div>
            <DataTable
              col={this.detailTable}
              page={false}
              loadTable={this.state.loading}
              data={this.state.detailData}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
