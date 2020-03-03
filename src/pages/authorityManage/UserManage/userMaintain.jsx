import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Dialog, Field, Form, Grid, Input, Message, Select } from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import userMaintainApi from "../../../api/AuthorityManage/UserMaintain";
import "../../OperationManage";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

export default class userMaintain extends Component {
  field = new Field(this);
  static displayName = "userMaintain";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      type: "add",
      refresh: 0, // 用于刷新表格
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: [],
      userInfo: {
        // 弹窗信息
        id: "",
        loginName: "",
        operatorName: "",
        loginPassword: "",
        roles: null,
        roleIds: [],
        remark: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: ""
      },
      roleList: [],
      form: [
        { label: "用户名", key: "loginName", type: "" },
        { label: "姓名", key: "operatorName", type: "" },
        {
          label: "角色",
          key: "roleId",
          type: "select",
          list: [{ key: "全部", value: "" }]
        },
        {
          label: "状态",
          key: "status",
          type: "select",
          list: [
            { key: "全部", value: "" },
            { key: "停用", value: "DISABLED" },
            { key: "启用", value: "ENABLED" }
          ]
        }
      ]
    };
  }

  table = [
    { title: "用户ID", key: "id", width: 100 },
    { title: "用户名", key: "loginName", width: 100 },
    { title: "姓名", key: "operatorName", width: 80 },
    { title: "角色列表", key: "roleNamesStr", width: 160 },
    { title: "状态", key: "statusText", width: 60 },
    { title: "创建时间", key: "createTime", width: 140 },
    { title: "是否锁定", key: "isLockedText", width: 100 },
    { title: "操作", key: "operate", width: 240, cell: true }
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      // path: '/baseinfo/productAdd',
      permission: "permission:user:user:add"
    }
  ];

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      permission: "permission:user:user:modify"
    },
    {
      name: "解锁",
      type: "unlock",
      key: "isLockedText",
      value: "是",
      permission: "permission:user:user:unlock"
    },
    {
      name: "启用",
      type: "turnOn",
      key: "status",
      value: "DISABLED",
      permission: "permission:user:user:enable"
    },
    {
      name: "停用",
      type: "turnOff",
      key: "status",
      value: "ENABLED",
      permission: "permission:user:user:disable"
    },
    {
      name: "重置密码",
      type: "reset",
      permission: "permission:user:user:resetpassword"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.field.setValues({
        id: "",
        loginName: "",
        operatorName: "",
        loginPassword: "",
        roles: null,
        roleIds: [],
        remark: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: ""
      });
      this.setState({
        visible: true,
        type: "add",
        userInfo: {
          id: "",
          loginName: "",
          operatorName: "",
          loginPassword: "",
          roles: null,
          roleIds: [],
          remark: "",
          creatorName: "",
          createTime: "",
          modifierName: "",
          modifyTime: ""
        }
      });
    }
  };

  lineBtnFn = {
    edit: (val, index, row) => {
      userMaintainApi.queryUserDetail(row.id).then(res => {
        if (res.data.code === "200") {
          this.field.setValues(res.data.data);
          this.setState({
            visible: true,
            type: "edit",
            userInfo: res.data.data
          });
        } else {
          Message.error(res.data.message);
        }
      });
    },
    turnOn: (val, index, row) => {
      Dialog.show({
        title: "用户启用",
        content: "确认启用该用户吗？",
        onOk: () => this.turnOnFn(row.id)
      });
    },
    turnOff: (val, index, row) => {
      Dialog.show({
        title: "用户停用",
        content: "确认停用该用户吗？",
        onOk: () => this.turnOffFn(row.id)
      });
    },
    reset: (val, index, row) => {
      Dialog.show({
        title: "密码重置",
        content: "确认重置该用户的密码吗？",
        onOk: () => this.resetPwdFn(row.id)
      });
    },
    unlock: (val, index, row) => {
      Dialog.show({
        title: "用户解锁",
        content: "确认解锁该用户吗？",
        onOk: () => this.unlockFn(row.id)
      });
    }
  };

  turnOnFn = id => {
    userMaintainApi.enableUser(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  turnOffFn = id => {
    userMaintainApi.disableUser(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  unlockFn = id => {
    userMaintainApi.unlockUser(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  resetPwdFn = id => {
    userMaintainApi.resetUserPwd(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  componentWillMount() {
    this.initDropList();
  }

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
    userMaintainApi.queryUser(params).then(res => {
      if (res.data.code === "200") {
        let data = res.data.data.list;
        const dataList = [];
        data.map(item => {
          for (const key in item) {
            if (Array.isArray(item[key])) {
              item[`${key}Str`] = item[key].join("、");
            }
          }
          dataList.push(item);
        });
        this.setState({
          data: dataList,
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
    this.setState(
      {
        formValue: formValue,
        page: 1,
        limit: 10,
        loading: true
      },
      () => this.getData()
    );
  }

  onClose = flag => {
    //关闭弹窗
    this.setState({
      visible: false
    });
    flag && this.setState({ refresh: this.state.refresh + 1 });
  };

  onSave = () => {
    // 新增修改保存
    let param = this.field.getValues();
    if (param.roleIds.length < 1 || !param.operatorName) {
      return;
    }
    if (this.state.type === "add") {
      if (!(param.loginName && param.loginPassword)) {
        return;
      }
      this.addUser(param);
    } else {
      if (param.id) {
        this.editUser(param);
      }
    }
  };

  addUser = param => {
    userMaintainApi.addUser(param).then(res => {
      if (res.data.code === "200") {
        this.onClose(true);
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
        //window.location.reload();
      } else {
        Message.error(res.data.message);
      }
    });
  };

  editUser = param => {
    userMaintainApi.editUserInfo(param).then(res => {
      if (res.data.code === "200") {
        this.onClose(true);
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
        // window.location.reload();
      } else {
        Message.error(res.data.message);
      }
    });
  };

  initDropList = () => {
    userMaintainApi.roleSelectList().then(res => {
      if (res.data.code === "200") {
        let lists = [];
        let selectList = [{ key: "全部", value: "" }];
        for (let key in res.data.data) {
          lists.push({ value: key, label: res.data.data[key] });
          selectList.push({ key: res.data.data[key], value: key });
        }
        this.setState({ roleList: lists });
        this.state.form.map((item, index) => {
          if (item.key === "roleId") {
            this.state.form[index].list = selectList;
            let forms = this.state.form;
            this.setState({
              form: forms
            });
          }
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    const { init } = this.field;

    const loginName =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          style={styles.formItem}
          required
          requiredMessage="用户名是必填字段"
          label="用户名:"
        >
          <Input name="loginName" {...init("loginName")} />
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          style={styles.formItem}
          label="用户名:"
        >
          {this.state.userInfo.loginName}
        </FormItem>
      );

    const pwd =
      this.state.type === "edit" ? null : (
        <Col span="12">
          <FormItem
            labelTextAlign="right"
            name="pass"
            style={styles.formItem}
            required
            label="登录密码:"
          >
            <Input
              htmlType="password"
              name="loginPassword"
              {...init("loginPassword")}
            />
          </FormItem>
        </Col>
      );

    const userId =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          style={styles.formItem}
          label="用户ID:"
        >
          [自动生成]
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          style={styles.formItem}
          label="用户ID:"
          required
          requiredMessage="用户ID是必填字段"
        >
          {this.state.userInfo.id}[自动生成]
        </FormItem>
      );

    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="用户管理"
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

        {/* 新增修改公用弹窗 */}
        <Dialog
          style={{ width: "60%", height: "600px", borderRadius: "8px" }}
          title=""
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <IceContainer>
            <h3
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "15px"
              }}
            >
              {this.state.type === "add" ? "新增" : "修改"}用户
            </h3>
            <div className="contain-con">
              <Form
                labelTextAlign={"right"}
                {...formItemLayout}
                field={this.field}
              >
                <Row>
                  <Col span="24">{userId}</Col>
                </Row>
                <Row>
                  <Col span="12">{loginName}</Col>
                  {pwd}
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      required
                      requiredMessage="姓名是必填字段"
                      label="姓名:"
                    >
                      <Input name="operatorName" />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="角色配置:"
                      requiredMessage="角色是必选字段"
                      required
                    >
                      <Select
                        followTrigger
                        hasSelectAll={"全选"}
                        mode="multiple"
                        dataSource={this.state.roleList}
                        name="roleIds"
                        style={{ minWidth: "164px" }}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="备注:"
                    >
                      <Input.TextArea
                        style={{ width: "500px" }}
                        name="remark"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      {this.state.userInfo.creatorName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      {this.state.userInfo.createTime}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      {this.state.userInfo.modifierName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      {this.state.userInfo.modifyTime}
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
    lineHeight: "28px"
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
    width: "240px"
  },
  saveButton: {
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#3080fe",
    color: "#fff",
    borderColor: "transparent"
  }
};
