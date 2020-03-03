import React, { Component } from "react";
import { Message, Field, Form, Dialog, Grid, Select } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import Tables from "../../tables";
import CreditDivisionApi from "../../../api/WorkBench/CreditDivision";
import CreditManageApi from "../../../api/HnairCreditManage/CreditManage";
import store from "../../../store";
import { creditDivision } from "../../../store/ScreeningWarehouse/loanTransaction/actions";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};
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
export default class CreditDivision extends Component {
  field = new Field(this);
  static displayName = "CreditDivision";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.creditDivision.formValue,
      page: store.getState().loanTransaction.creditDivision.page,
      limit: store.getState().loanTransaction.creditDivision.limit,
      visible: false,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      selectedKeys: [],
      records: [],
      list: [],
      selectStatus: {}
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.creditDivision.formValue,
        page: store.getState().loanTransaction.creditDivision.page,
        limit: store.getState().loanTransaction.creditDivision.limit
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
      type: "section"
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
      label: "审批节点",
      key: "currentLevel",
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
      key: "dueDate",
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
      width: 110,
      align: "center"
    },
    {
      title: "审批节点",
      key: "currentLevel",
      width: 80
    },
    {
      title: "审批员",
      key: "operatorName",
      width: 80
    }
  ];

  toolBtn = [
    {
      name: "审批分案",
      type: "division",
      permission: ":"
    }
  ];

  toolBtnFn = {
    division: () => {
      if (this.state.selectedKeys.length <= 0) {
        Message.warning("请选择要分案的客户");
      } else {
        let ary = this.state.records;
        let arry = [];
        ary.map((key, idx) => {
          return arry.push(key.currentLevel);
        });
        let arr = arry.slice(0);
        const result = arry.filter(arry => arry == arr[0]);
        if (arry.length != result.length) {
          return Message.warning("批量操作，请选择相同审批节点的客户！");
        } else {
          let list = [];
          this.state.selectedKeys.map((item, index) => {
            let query = {
              productNo: this.state.records[index].productNo,
              approvalLevel: this.state.records[index].currentLevel
            };

            let add = {
              creditId: item,
              currentLevel: this.state.records[index].currentLevel
            };

            if(add.currentLevel === "一级审批") {
              add.currentLevel = 1;
              query.approvalLevel = 1;
            }else if(add.currentLevel === "二级审批") {
              add.currentLevel = 2;
              query.approvalLevel = 2;
            }else {
              add.currentLevel = 3;
              query.approvalLevel = 3;
            }

            this.getListAdminOperator(query);

            list.push(add);
            return list;
          });
          this.setState({
            visible: true,
            list: list,
            type: "division"
          });
        }
      }
    }
  };

  componentWillMount() {
    // 下拉加载
    this.getListCreditTypeEnum();
    this.getListRiskResultEnum();
    this.getListCurrentLevelEnum();
  }

  componentDidMount() {
    this.getData();
  }

  getListCreditTypeEnum = () => {
    //授信类型-下拉框
    CreditManageApi.listCreditTypeEnum().then(res => {
      if (res.data.code === "200") {
        let creditType = res.data.data;
        if (creditType !== null && creditType !== undefined) {
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
        }
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

  getListCurrentLevelEnum = () => {
    //审批节点 - 下拉框
    CreditDivisionApi.listCurrentLevelEnum().then(res => {
      if (res.data.code === "200") {
        let currentLevel = res.data.data;
        if (currentLevel !== null && currentLevel !== undefined) {
          let amap = new Map(Object.entries(currentLevel));
          for (let [k, v] of amap) {
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

  getListAdminOperator = (params) => {
    //用户列表-下拉框
    CreditDivisionApi.listAdminOperator(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          selectStatus: res.data.data,
          refresh: this.state.refresh + 1
        });
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
    store.dispatch(creditDivision(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(creditDivision(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    CreditDivisionApi.listApprovalCredit(params).then(res => {
      if (res.data.code === "200") {
        let data = res.data.data.list
        data.map((item,index) => {
          if(item.currentLevel === 1) {
            item.currentLevel = "一级审批"
          }else if(item.currentLevel === 2) {
            item.currentLevel = "二级审批"
          }else {
            item.currentLevel = "三级审批"
          }
          return data
        })

        this.setState({
          data: data,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
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
    store.dispatch(creditDivision(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  record = records => {
    this.setState({
      records
    });
  };
  selectedKey = selectedKeys => {
    this.setState({
      selectedKeys
    });
  };

  onClose = flag => {
    //关闭弹窗
    this.setState({
      visible: false
    });
    flag && this.setState({ refresh: this.state.refresh + 1 });
  };

  onSave = (v, e) => {
    // 分案保存
    if (e != null) {
      return;
    }
    this.onClose(true);
    this.updateDivision(v);
  };

  updateDivision = v => {
    //分案修改
    let data = {};

    data = {
      operatorId: v.operatorId,
      list: this.state.list
    };
    CreditDivisionApi.updateDivision(data).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
      }else {
        Message.error(res.data.message);
      }
    });
  };

  // renderDetail = (value, index, record) => {
  //   return <Link to={{pathname: "/hnairLoanManage/creditManageDetail" + '/' + value, state: {name: value, row: record}}}>{value}</Link>;
  // };

  render() {
    return (
      <div>
        <SearchForm
          form={this.form}
          title="授信申请分案"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
        <Tables
          col={this.table}
          toolBtn={this.toolBtn}
          toolBtnFn={this.toolBtnFn}
          page={true}
          pageSize={this.state.limit}
          current={this.state.page}
          total={this.state.total}
          creditId={this.table[0].key}
          record={records => this.record(records)}
          selectedKey={selectedKeys => this.selectedKey(selectedKeys)}
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />
        <Dialog
          style={{ width: "400px", height: "230px", borderRadius: "8px" }}
          title="操作"
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <div className="contain-con">
            <Form
              labelTextAlign={"left"}
              {...formItemLayout}
              field={this.field}
            >
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="left"
                    style={{
                      display: "flex",
                      lineHeight: "28px",
                      paddingLeft: "20px"
                    }}
                    label="手动分案用户:"
                    requiredMessage="角色是必选字段"
                    required
                  >
                    <Select
                      followTrigger
                      name="operatorId"
                      style={styles.formInputBorder}
                    >
                      {Object.keys(this.state.selectStatus).map((key, idx) => {
                        return (
                          <Option key={idx} value={key}>
                            {this.state.selectStatus[key]}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="" style={{ textAlign: "center" }}>
                    <Form.Submit
                      style={styles.saveButton}
                      validate
                      onClick={this.onSave}
                    >
                      保存
                    </Form.Submit>
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label="" style={{ textAlign: "center" }}>
                    <Form.Submit
                      style={styles.saveButtons}
                      validate
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
      </div>
    );
  }
}

const styles = {
  headRow: {
    marginBottom: "10px",
    textAlign: "right"
  },
  lineBtn: {
    marginLeft: "10px"
  },
  formItem: {
    display: "flex",
    lineHeight: "28px"
  },
  saveButton: {
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#3080fe",
    color: "#fff",
    borderColor: "transparent"
  },
  saveButtons: {
    border: "1px solid #999",
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#fff"
  },
  formInputBorder: {
    width: "200px"
  }
};
