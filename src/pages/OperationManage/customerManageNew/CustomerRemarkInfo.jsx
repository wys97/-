import React, { Component } from "react";
import DataTable from "../../dataTable";
import IceContainer from "@icedesign/container";
import customerManageNewApi from "../../../api/OperationManage/CustomerManageNew";
import {Dialog, Message, Grid, Form, Field, Input} from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class CustomerRemarkInfo extends Component {
  field = new Field(this);
  static displayName = "CustomerRemarkInfo";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      customerId: props.id,
      page: 1,
      limit: 10,
      type: "",
      loading: false,
      visible: false,
      formInput: {
        createTime: "",
        id: "",
        remarkContent: "",
        updateTime: ""
      }
    };
  }

  table = [
    {title: "备注编号", key: "id", cell: true, window: "detail", width: 160},
    {title: "备注内容", key: "remarkContent", width: 200},
    {title: "创建时间", key: "createTime", width: 160, align: "center"},
    {title: "操作", key: "operate", cell: true, width: 160, align: "center"}
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      // path: '/baseinfo/productAdd',
      permission: "operation:basic:product:add"
    }
  ];
  toolBtnFn = {
    add: () => {
      this.field.setValues({
        remarkContent: ""
      });
      this.setState({
        visible: true,
        type: "add",
        userInfo: {
          remarkContent: ""
        }
      });
    }
  };

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      permission: "operation:basic:product:modify"
    },
    {
      name: "删除",
      type: "del",
      color: "red",
      permission: "operation:basic:product:delete"
    }
  ];

  lineBtnFn = {
    detail: (val, index, row) => {
      this.getDetail(row.id);
    },
    edit: (val, index, row) => {
      customerManageNewApi.readRemark(row.id).then(res => {
        if (res.data.code === "200") {
          this.field.setValues(res.data.data);
          this.setState({
            visible: true,
            type: "edits",
          });
        } else {
          Message.error(res.data.message);
        }
      });
    },
    del: (value, index, record) => {
      Dialog.show({
        title: "删除还款方式",
        content: "确认删除该还款方式吗？",
        onOk: () => this.projectDelete(record.id)
      });
    }
  };


  onClose = () => {
    //关闭弹窗
    this.setState({
      visible: false,
      loading: false
    });
  };

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = limit => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    customerManageNewApi.listRemarkByCustomerId(this.state).then(res => {
      if (res.data.code === "200") {
        this.field.setValues(res.data.data.list),
          this.setState({
            formInput: res.data.data.list,
            loading: false,
          });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getDetail = id => {
    //备注信息详情
    customerManageNewApi.readRemark(id).then(res => {
      if (res.data.code === "200") {
        console.log(res.data.data)
        this.field.setValues(res.data.data);
        this.setState({
          visible: true,
          type: "detail"
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  projectDelete = id => {
    //备注信息-删除
    customerManageNewApi.customerDeleteRemark(id).then(res => {
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

  onSave = (value, errors) => {
    //备注信息-新增修改保存
    let params = value;
    if (errors) {
      return;
    }
    if (this.state.type === "add") {
      this.productAdd(params);
    } else {
      if (params.id) {
        this.editUser(params);
      }
    }
  };

  productAdd = params => {
    //还款配置-新增
    params.customerId = this.props.id
    customerManageNewApi.saveCustomerRemark(params).then(res => {
      if (res.data.code === "200") {
        Message.success(res.data.message);
        this.onClose(true);
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

  editUser = params => {
    //还款配置-修改
    // params.id = this.state.formInput.id
    customerManageNewApi.customerUpdateRemar(params).then(res => {
      if (res.data.code === "200") {
        this.onClose(true);
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

  render() {
    return (
      <div>
        <div>
          <h2>备注信息</h2>
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
            data={this.state.formInput}
          />
        </div>
        <Dialog
          style={{ width: "60%", height: "600px", borderRadius: "8px" }}
          title=""
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <IceContainer>
            <h3
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              {this.state.type === "add"
                ? "新增"
                : this.state.type === "edit"
                  ? "修改"
                  : "查看"}
              客户备注信息
            </h3>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
              field={this.field}
            >
              <Row>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="备注编号:"
                    required
                  >
                    {this.state.type === "add" ? (
                      <span>[自动生成]</span>
                    ) : (
                      <span style={{lineHeight: "28px"}}>
                      {this.field.getValue("id")}
                    </span>)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="备注内容:"
                    required
                  >
                    {this.state.type === "detail" ? (
                      <span style={{lineHeight: "28px"}}>
                        {this.field.getValue("remarkContent")}
                      </span>
                    ) : (
                      <Input.TextArea
                        style={styles.formTextArea}
                        name="remarkContent"
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    <p>{this.field.getValue("creatorName")}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    <p>{this.field.getValue("createTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.field.getValue("modifierName")}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    <p>{this.field.getValue("updateTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="" style={{textAlign: "center"}}/>
                  {this.state.type === "detail" ? (
                    <span></span>
                  ) : (
                    <Form.Submit
                      validate
                      type="primary"
                      style={styles.saveButton}
                      onClick={this.onSave}
                    >
                      保存
                    </Form.Submit>
                  )}
                </Col>
              </Row>
            </Form>
          </IceContainer>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: "flex"
  },
  formTextArea: {
    width: "500px"
  }
};
