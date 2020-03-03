import React from "react";
import { Dialog, Message, Form, Input, Button, Grid, Select, Switch, Table } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import creditUserListApi from "../../../api/HnairCreditManage/CreditUserList";
import customerManageNewApi from "../../../api/OperationManage/CustomerManageNew";
import store from "../../../store";
import { creditUserList } from "../../../store/ScreeningWarehouse/loanTransaction/actions";
const FormItem = Form.Item;
const Option = Select.Option;
const { Row, Col } = Grid;

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
export default class CreditUserList extends React.Component {
  static displayName = "CreditUserList";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.creditUserList.formValue,
      page: store.getState().loanTransaction.creditUserList.page,
      limit: store.getState().loanTransaction.creditUserList.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      form: [
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
          label: "总授信额度",
          keys: ["creditLimitStart", "creditLimitEnd"],
          type: "section"
        },
        {
          label: "总提现额度",
          keys: ["cashCreditCimitStart", "cashCreditCimitEnd"],
          type: "section"
        },
        {
          label: "授信状态",
          key: "limitStatus",
          type: "select",
          list: [
            {
              key: "全部",
              value: ""
            }
          ]
        }
      ],
      visibles: false, //显示弹框
      partnerInfoList: [], //合作机构下拉列表
      selectValue: '', //合作机构下拉选中的值
      checked: false, // 逾期是否自动调整额度开关
      adjustAmount: false, //调整额度弹框
      limitList: [], //调整额度数据
      customerId: '', //要修改的额度的用户
      partnerNo:'',
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.creditUserList.formValue,
        page: store.getState().loanTransaction.creditUserList.page,
        limit: store.getState().loanTransaction.creditUserList.limit
      });
    });
  }

  table = [
    {
      title: "客户编号",
      key: "customerId",
      width: 100,
      align: "center",
      cell: true,
      path: "/baseinfo/customerInfoLog",
    },
    {
      title: "客户名称",
      key: "customerName",
      width: 80,
      align: "center"
    },
    {
      title: "手机号码",
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
      title: "总授信额度(元)",
      key: "totalLimit",
      width: 100,
      align: "center"
    },
    {
      title: "提现额度(元)",
      key: "cashCreditLimit",
      width: 100,
      align: "center"
    },
    {
      title: "已用提现额度(元)",
      key: "cashUsedLimit",
      width: 120,
      align: "center"
    },
    {
      title: "剩余提现额度(元)",
      key: "availableCashLimit",
      width: 110,
      align: "center"
    },
    {
      title: "购票额度(元)",
      key: "creditLimit",
      width: 100,
      align: "center"
    },
    {
      title: "已用购票额度(元)",
      key: "usedLimit",
      width: 100,
      align: "center"
    },
    {
      title: "剩余购票额度(元) ",
      key: "availableLimit",
      width: 100,
      align: "center"
    },
    {
      title: "嗨贷总额度(元) ",
      key: "hiTotalLimit",
      width: 100,
      align: "center"
    },
    {
      title: "已用嗨贷额度(元) ",
      key: "hiUsedLimit",
      width: 100,
      align: "center"
    },
    {
      title: "剩余嗨贷额度(元) ",
      key: "hiAvailableCashLimit",
      width: 100,
      align: "center"
    },
    {
      title: "授信有效期",
      key: "dueDate",
      align: "right",
      width: 100
    },
    {
      title: "授信状态",
      key: "limitStatus",
      width: 100,
      align: "center"
    },
    {
      title: '操作',
      key: 'operate',
      width: 240,
      cell: true,
      align: "center"
    },
  ];

  toolBtn = [
    {
      name: "额度调整开关",
      type: "switch",
      permission: "loanbusiness:sign:sign-user-list:overdue-auto-limit-change"
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
    switch: () => {
      this.switchBtn();
    }
  };

  lineBtn = [{
    name: "启用",
    type: "enable",
    key: 'limitStatus',
    value: '禁用',
    permission: ":"
  }, {
    name: "冻结",
    type: "frozen",
    key: 'limitStatus',
    value: '启用',
    permission: ":"
  }, {
    name: "授信重估",
    type: "creditReCalc",
    key: 'limitStatus',
    value: '启用',
    permission: ":"
  },
  {
    name: "调整额度",
    type: "adjustAmount",
    key: 'isAbleChangeLimit',
    value: 'true',
    permission: "loanbusiness:sign:sign-user-list:manual-limit-change"
  },
  ];

  lineBtnFn = {
    enable: (val, index, row) => {
      Dialog.show({ title: '授信启用', content: '确认启用该授信信息吗？', onOk: () => this.enableCredit(row.customerId) });
    },
    frozen: (val, index, row) => {
      Dialog.show({ title: '授信冻结', content: '确认冻结该授信信息吗？', onOk: () => this.frozenCredit(row.customerId) });
    },
    creditReCalc: (val, index, row) => {
      Dialog.show({ title: '授信重估', content: '确认授信重估？', onOk: () => this.ReCalcCredit(row.customerId) });
    },
    adjustAmount: (val, index, row) => {
      this.setState({
        adjustAmount: true,
        customerId: row.customerId,
      }, () => this.customerCreditLimit(row.customerId)
      )
    }
  };


  customerCreditLimit = (value) => {
    creditUserListApi.customerCreditLimit(value).then(res => {
      if (res.data.code == '200') {
        this.setState({
          limitList: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  }

  enableCredit = (id) => {
    customerManageNewApi.enableOrFrozen({
      limitStatus: 'ENABLED',
      customerId: id
    }).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  frozenCredit = (id) => {
    customerManageNewApi.enableOrFrozen({
      limitStatus: 'DISABLED',
      customerId: id
    }).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  ReCalcCredit = (id) => {
    customerManageNewApi.creditRefresh(id).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  }

  componentWillMount() {
    // this.form[6].list[2].selected = 'selected'
    this.getLimitStatus();
    this.getPartnerInfo();
  }

  componentDidMount() {
    this.getData();


  }

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(creditUserList(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(creditUserList(params));
    this.setState({ loading: true }, () => this.getData());
  };
  getLimitStatus = () => {
    //产品管理-产品状态-下拉框
    creditUserListApi.getLimitStatus().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[6]里面list的key是中文, value是英文
            this.state.form[6].list.push({
              key: v,
              value: k
            });
          }
          let form = [...this.state.form];
          let formValue = { ...this.state.formValue };
          this.state.form[6].list.map(item => {
            if (item.key === "否") {
              formValue["limitStatus"] = item.value;
            }
          });
          this.setState(
            {
              refresh: this.state.refresh + 1,
              formValue,
              form
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
    creditUserListApi.creditUserList(params).then(res => {
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
    store.dispatch(creditUserList(params));
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
    creditUserListApi.exportExcel(params).then(res => {
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




  //调整额度开关 弹窗
  switchBtn = () => {
    this.setState({
      visibles: true
    })
    this.getSwitchBtnState(this.state.partnerNo)
  }

  //调整额度- 合作下拉列表
  getPartnerInfo = () => {
    creditUserListApi.partnerInfo().then(res => {
      if (res.data.code == '200') {
        this.setState({
          partnerInfoList: res.data.data,
          partnerNo: res.data.data[0].partnerNo,
        })
      } else {
        Message.error(res.data.message);
      }
    }
    )
  }

  //调整额度 - 额度自动调整开关
  onChange = () => {
    if (this.state.checked) {
      this.setState({
        checked: false
      })
    } else {
      this.setState({
        checked: true
      })
    }
  }
  //调整额度 - 合作下拉列表- 选中的值
  getSelectValue = (value) => {
    if (value) {
      this.setState({
        selectValue: value
      })
      this.getSwitchBtnState(value);
    }
  }
  //调整额度 - 获取逾期自动调整额度 开关的状态
  getSwitchBtnState = (value) => {
    creditUserListApi.switchBtnState(value).then(res => {
      if (res.data.code == '200') {
        let data = res.data.data;
        let v = Object.values(data);
        this.setState({
          checked: v[0],
        })
      } else {
        Message.error(res.data.message);
      }
    })
  }


  //调整额度 - 确认按钮
  caseConfirm = () => {
    let { checked, selectValue,  partnerNo } = this.state;
      let valueNo = selectValue? selectValue : partnerNo;
    if (valueNo == '') {
      Message.error('合作机构不能为空');
      return
    }
    creditUserListApi.preserveState(valueNo, checked).then(res => {
      if (res.data.code == '200') {
        Message.success(res.data.message)
      } else {
        Message.error(res.data.message);

      }
      this.setState({
        visibles: false,
        checked: false
      })
    })


  }

  //调整额度 - 取消按钮
  onClose = () => {
    this.setState({
      visibles: false,
      // checked: false,
      adjustAmount: false
    })
  }




  renderOper = (value, index, record) => {

    return <Input onChange={this.setValue.bind(this, index, record)} />
  }

  setValue = (index, record, e) => {
    this.setState({
      record
    })
    this.state.limitList[index].newLimit = e;
  }
  caseConfirm2 = () => {
    let { customerId, limitList } = this.state;

    creditUserListApi.saveModifiedAmount(customerId, limitList).then(res => {
      if (res.data.code == '200') {
        Message.success(res.data.message);
        this.setState({
          adjustAmount: false
        })
      } else {
        Message.error(res.data.message)
      }
    })
  }

  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="授信用户记录"
          onSubmit={formValue => this.onSubmit(formValue)}
          formValue={this.state.formValue}
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

        <Dialog //逾期调整额度开关弹窗
          style={{ width: "400px", height: "150px", borderRadius: "4px" }}
          title=""
          footer={false}
          visible={this.state.visibles}
          onClose={this.onClose}
        >
          <div className="contain-specon" style={{ marginTop: '20px' }}>
            <Form
              labelTextAlign={"right"}
            >
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="left"
                    label="合作机构:"
                    required
                    style={styles.formItem}
                  >
                    <Select
                      followTrigger
                      name="roleId"
                      onChange={this.getSelectValue}
                      style={{ width: '200px' }}
                      defaultValue={this.state.partnerNo}
                    >
                      {this.state.partnerInfoList.map((item, idx) => {
                        return (
                          <Option key={idx} value={item.partnerNo} style={{ width: '200px' }}>
                            {item.partnerName}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                  <FormItem
                    labelTextAlign="left"
                    label="逾期自动调整额度:"
                    required
                    style={styles.formItem}
                  >
                    <Switch checkedChildren="开" checked={this.state.checked} onChange={this.onChange} unCheckedChildren="关" />
                  </FormItem>
                </Col>
              </Row>

              <Row style={{ marginTop: "30px" }}>
                <Col span="12">
                  <FormItem label="" style={{ textAlign: "center" }}>
                    <Form.Submit
                      style={styles.saveButton}
                      validate
                      onClick={this.caseConfirm}
                    >
                      确认
                      </Form.Submit>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="" style={{ textAlign: "center" }}>
                    <Form.Submit
                      validate
                      style={styles.cancelButton}
                      onClick={this.onClose}
                    >
                      取消
                      </Form.Submit>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>

        </Dialog>


        <Dialog //调整额度
          style={{ width: "900px", height: "150px", borderRadius: "4px" }}
          title=""
          footer={false}
          visible={this.state.adjustAmount}
          onClose={this.onClose}
        >

          <div className="contain-specon" style={{ marginTop: '20px' }}>
            <Table dataSource={this.state.limitList}>
              <Table.Column title="产品编号" dataIndex="productNo" width={200} lock={this.state.lock} />
              <Table.Column title="产品名称" dataIndex="productName" width={200} />
              <Table.Column title="授信额度" dataIndex="creditLimit" width={200} />
              <Table.Column title="变更后额度" cell={this.renderOper} width={200} />
            </Table>
            <Row style={{ marginTop: "30px" }}>
              <Col span="12">
                <FormItem label="" style={{ textAlign: "center" }}>
                  <Button
                    style={styles.saveButton}
                    onClick={this.caseConfirm2}
                  >
                    确认
                   </Button>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="" style={{ textAlign: "center" }}>
                  <Button

                    style={styles.cancelButton}
                    onClick={this.onClose}
                  >
                    取消
                      </Button>
                </FormItem>
              </Col>
            </Row>

          </div>
        </Dialog>


      </div>
    );

  }
};
const styles = {
  formItem: {
    display: "flex",
    alignItem: 'center',
    lineHeight: "28px",

  },
  saveButton: {
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#3080fe",
    color: "#fff",
    borderColor: "transparent"
  },
  cancelButton: {
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#ddd",
    color: "#000",
    borderColor: "transparent"
  },
  adjustAmount: {
    display: 'flex',
    alignItem: 'center'
  }

}
