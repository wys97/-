import React, { Component } from "react";
import Tables from "../../tables";
import SearchForm from "../../components/SearchForm";
import IceContainer from "@icedesign/container";
import { Dialog, Form, Field, Grid, Message, Select, Switch } from "@alifd/next";
import CollectionManageApi from "../../../api/CollectionManage/CollectionManage";
import store from "../../../store";
import { collectionPoints } from "../../../store/ScreeningWarehouse/collectionManage/actions";

const FormItem = Form.Item;
const Option = Select.Option;
const { Row, Col } = Grid;
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
export default class CollectionManage extends Component {
  field = new Field(this);
  static displayName = "CollectionManage";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibles: false,
      roleList: "", //分案配置弹窗下拉
      userList: "", //手动分案弹窗下拉
      formValue: store.getState().collectionManage.collectionPoints.formValue,
      page: store.getState().collectionManage.collectionPoints.page,
      limit: store.getState().collectionManage.collectionPoints.limit,
      list: [],
      loading: false,
      total: 0,
      selectedKeys: [],
      checked: false,  //自动分案按钮值
      auto: false, //自动分案后台返回的按钮值, 
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
          type: "IntegerSection"
        },
        {
          label: "逾期总额",
          keys: ["overdueTotalAmountBegin", "overdueTotalAmountEnd"],
          type: "LongSection"
        },
        {
          label: "当前催收员",
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
        formValue: store.getState().collectionManage.collectionPoints.formValue,
        page: store.getState().collectionManage.collectionPoints.page,
        limit: store.getState().collectionManage.collectionPoints.limit
      });
    });
  }

  table = [
    { title: "任务编号", key: "id", width: 100, align: "center" },
    { title: "客户编号", key: "customerId", width: 100, align: "center" },
    { title: "客户名称", key: "customerName", width: 80, align: "center" },
    { title: "手机号码", key: "customerPhone", width: 110, align: "center" },
    { title: "证件号", key: "customerIdentifyNo", width: 150, align: "center" },
    {
      title: "逾期未还借据数",
      key: "overduePeriod",
      width: 100,
      align: "center"
    },
    { title: "产品名称", key: "productName", width: 100, align: "center" },
    { title: "入催日期", key: "startTime", width: 120, align: "center" },
    { title: "逾期最大天数", key: "maxOverdueDay", width: 80, align: "center" },
    {
      title: "逾期未还本金(元)",
      key: "overduePrincipal",
      width: 100,
      align: "center"
    },
    {
      title: "逾期未还利息(元)",
      key: "overdueInterest",
      width: 100,
      align: "center"
    },
    {
      title: "逾期未还罚息(元)",
      key: "overdueFine",
      width: 100,
      align: "center"
    },
    {
      title: "逾期未还总额(元)",
      key: "totalOverdueAmount",
      width: 100,
      align: "center"
    },
    {
      title: "贷款余额(元)",
      key: "totalOverdueUnpaidAmount",
      width: 100,
      align: "center"
    },
    {
      title: "上期催收员",
      key: "lastOperatorName",
      width: 100,
      align: "center"
    },
    {
      title: "催收状态",
      key: "collectionStatusText",
      width: 80,
      align: "center"
    },
    {
      title: "当前催收员",
      key: "currentOperatorName",
      width: 80,
      align: "center"
    },
    { title: "操作", key: "operate", width: 80, cell: true, align: "center" }
  ];

  componentWillMount = () => {
    this.initDropList();
    this.roleList();
  };

  componentDidMount() {
    this.getData();
  }

  initDropList = () => {
    CollectionManageApi.listCollectionStatusEnum() //催收状态下拉
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

  manualDivision = () => {
    CollectionManageApi.distributionUserList() //手动分案弹窗用户分案角色下拉
      .then(res => {
        if (res.data.code === "200") {
          this.setState({ userList: res.data.data, visible: true });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  roleList = () => {
    CollectionManageApi.roleList() //催收分案弹窗用户分案角色下拉
      .then(res => {
        if (res.data.code === "200") {
          this.setState({ roleList: res.data.data });
        } else {
          Message.error(res.data.message);
        }
      });
  };
  roleDefault = () => {
    CollectionManageApi.roleDefault() //催收分案-分案配置-加载默认权限
      .then(res => {
        if (res.data.code === "200") {
          let roleId = { roleId: res.data.data.operatorRoleId };
          this.setState({
            checked: res.data.data.auto,
            auto: res.data.data.auto,
          })
          this.field.setValues(roleId)
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
    store.dispatch(collectionPoints(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(collectionPoints(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    CollectionManageApi.distributionList(params).then(res => {
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

  //自动分案按钮 
  onChange = (checked) => {
    this.setState({
      checked: checked
    })
  }


  toolBtn = [
    {
      name: "分案配置",
      type: "caseAllocation",
      permission: "collection:division:setting:menu"
    },
    {
      name: "手动分案",
      type: "manualCase",
      permission: "collection:division:manual:menu"
    }
  ];

  lineBtn = [
    {
      name: "查看",
      type: "look",
      permission: "collection:follow:task:menu:detail"
    }
  ];

  toolBtnFn = {
    caseAllocation: () => {
      this.roleDefault();
      this.setState({
        visibles: true
      });
    },
    manualCase: () => {
      if (this.state.selectedKeys.length <= 0) {
        Message.warning("需选择用户才能进行分案");
      } else {
        this.manualDivision();
        let list = [];
        this.state.selectedKeys.map((item, index) => {
          let add = {
            taskId: item
          };
          list.push(add);
          return list;
        });
        this.setState({
          list: list
        });
      }
    }
  };

  lineBtnFn = {
    look: (val, index, row) => {
      this.props.history.push({
        pathname: "/CollectionManage/CollectionInfoTab",
        state: { name: row.id, customerId: row.customerId },
        history: this.props.history
      });
    }
  };

  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(collectionPoints(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }

  onClose = () => {
    //关闭弹窗
    this.setState({
      visible: false,
      visibles: false,
      checked: this.state.auto
    });
    // flag && this.setState({ refresh: this.state.refresh + 1 });
  };

  caseConfirm = (v, e) => {
    //分案配置确认
    if (e != null) {
      return;
    }
    this.setState({
      visible: false,
      visibles: false,
    })
    CollectionManageApi.roleSave(v.roleId, this.state.checked).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
      } else {
        Message.error(res.data.message);
      }
    });
  };

  userConfirm = (v, e) => {
    //手动分配用户确认
    if (e != null) {
      return;
    }
    this.onClose(true);
    let data = {};
    data = {
      operatorId: v.operatorId,
      list: this.state.list
    };
    CollectionManageApi.userSave(data).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
      } else {
        Message.error(res.data.message);
      }
    });
  };

  selectedKey = selectedKeys => {
    this.setState({
      selectedKeys
    });
  };

  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="催收分案"
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
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />

        <Dialog //分案配置弹窗
          style={{ width: "400px", height: "150px", borderRadius: "4px" }}
          title=""
          footer={false}
          visible={this.state.visibles}
          onClose={this.onClose}
        >
          <IceContainer>
            <div className="contain-specon" style={{ marginTop: '20px' }}>
              <Form
                labelTextAlign={"right"}
                {...formItemLayout}
                field={this.field}
              >
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="left"
                      style={styles.formItem}
                      label="分案角色:"
                      required
                    >
                      <Select
                        followTrigger
                        name="roleId"
                        style={styles.formInputBorder}
                      >
                        {Object.keys(this.state.roleList).map((key, idx) => {
                          return (
                            <Option key={idx} value={key}>
                              {this.state.roleList[key]}
                            </Option>
                          );
                        })}
                      </Select>
                    </FormItem>
                    <FormItem
                      labelTextAlign="left"
                      style={styles.formItem}
                      label="自动分案:"
                      required
                    >
                      <Switch checkedChildren="开" checked={this.state.checked} onChange={this.onChange} unCheckedChildren="关" />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="left"
                      style={styles.formItem}
                      label="自动分案规则:"
                    >
                      <span>每日02:00按剩余人数最少优先分配</span>
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
                        style={styles.cancelButton}
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
          </IceContainer>
        </Dialog>

        <Dialog //手动分案弹窗
          style={{ width: "400px", height: "150px", borderRadius: "4px" }}
          title=""
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <IceContainer>
            <div className="contain-specon" style={{ marginTop: '20px' }}>
              <Form
                labelTextAlign={"right"}
                {...formItemLayout}
                field={this.field}
              >
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="手动分案用户:"
                      required
                      requiredMessage="角色是必选字段"
                    >
                      <Select
                        // followTrigger
                        name="operatorId"
                        style={styles.formInputBorder}
                        useVirtual
                        autoWidth
                        popupStyle={{height:'190px'}}
                      >
                  
                          {Object.keys(this.state.userList).map((key, idx) => {
                            return (

                              <Option key={idx} value={key}>
                                {this.state.userList[key]}
                              </Option>

                            );
                          })}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row style={{ marginTop: "60px" }}>
                  <Col span="12">
                    <FormItem label="" style={{ textAlign: "center" }}>
                      <Form.Submit
                        style={styles.saveButton}
                        validate
                        onClick={this.userConfirm}
                      >
                        确认
                      </Form.Submit>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem label="" style={{ textAlign: "center" }}>
                      <Form.Submit
                        style={styles.cancelButton}
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
          </IceContainer>
        </Dialog>
      </div>
    );
  }
}
const styles = {
  formItem: {
    display: "flex",
    lineHeight: "28px",

  },
  formItemError: {
    marginLeft: "10px"
  },
  formCol: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  preview: {
    border: "1px solid #eee",
    marginTop: 20,
    padding: 10
  },
  formItemInput: {
    width: "120px",
    borderRadius: "4px"
  },
  searchBtn: {
    float: "right",
    backgroundColor: "#fff",
    color: "#3080fe"
  },
  pagination: {
    marginTop: "20px",
    textAlign: "right"
  },
  formInput: {
    border: "none"
  },
  formInputBorder: {
    width: "200px",
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
  }
};
