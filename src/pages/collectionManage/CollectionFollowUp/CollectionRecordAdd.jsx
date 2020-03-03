import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import {
  Form,
  Grid,
  Field,
  Input,
  Radio,
  Message,
  Button,
  Select,
  Dialog
} from "@alifd/next";
import collectionFollowUpApi from "../../../api/CollectionManage/CollectionFollowUp";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const Option = Select.Option;
const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class CollectionRecordAdd extends Component {
  field = new Field(this);
  static displayName = "CollectionRecordAdd";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      operatorName:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.formInput.operatorName,
      operatorLoginName:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.formInput.operatorLoginName,
      collectionTaskId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.collectionTaskId,
      customerId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.formInput.customerId,
      operatorId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.formInput.operatorId,
      formValue: {},
      visible: false,
      editorState: null,
      contacts: [],
      phoneList: [],
      mailList: [],
      addCopy: null
    };
  }

  componentWillMount = () => {};

  componentDidMount = () => {};

  getCollectionDetail = () => {
    //催收记录新增
    collectionFollowUpApi.addRecord().then(res => {
      if (res.data.code === "200") {
      } else {
        Message.error(res.data.message);
      }
    });
  };

  productAdd = () => {
    //保存并发送
    this.setState({
      visible: false
    });
    let params = { ...this.state.formValue };
    params.customerId = this.state.customerId;
    params.operatorId = this.state.operatorId;
    params.collectionTaskId = this.state.collectionTaskId;
    params.carbonCopy= params.carbonCopy+','+ this.state.addCopy;
    collectionFollowUpApi.addRecord(params).then(res => {
      if (res.data.code === "200") {
        Message.success(res.data.message);
        this.props.history.push({
          pathname: "/CollectionManage/CollectionInfoTabs",
          state: {
            name: this.state.collectionTaskId,
            customerId: this.state.customerId,
            type: "CollectionTask"
          }
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  goback = () => {
    this.props.history.push({
      pathname: "/CollectionManage/CollectionInfoTabs",
      state: {
        name: this.state.collectionTaskId,
        customerId: this.state.customerId
      }
    });
  };

  isOk = (v, e) => {
    if (e !== null) {
      return;
    }
    this.setState({
      visible: true,
      formValue: v
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
    this.field.setValue("collectionContent", editorState.toHTML());
  };

  getCollectionType = value => {
    //选择催收方式
    if (value === "MAIL") {
      //获取联系人EMAIL
      collectionFollowUpApi.getMail(this.state.customerId).then(res => {
        if (res.data.code === "200") {
          let contacts = [];
          let mailList = [];
          res.data.data.map((item, index) => {
            contacts.push({
              key: item.customerName,
              value: item.customerName
            });
            if (item.phone == null) {
              item.phone = "";
            }
            mailList.push({
              customerName: item.customerName,
              phone: item.phone
            });
          });
          this.setState({
            contacts: contacts,
            mailList: mailList
          });
        } else {
          Message.error(res.data.message);
        }
      });
      //获取邮件模板
      let params = {
        templateId: this.field.getValue("contentTemplateId"),
        customerId: this.state.customerId,
        collectionType: this.field.getValue("collectionType")
      };
      collectionFollowUpApi.getTemplate(params).then(res => {
        if (res.data.code === "200") {
          this.setState({
            editorState: BraftEditor.createEditorState(res.data.data)
          });
        } else {
          Message.error(res.data.message);
        }
      });
    } else {
      collectionFollowUpApi.getMobile(this.state.customerId).then(res => {
        if (res.data.code === "200") {
          let contacts = [];
          let phoneList = [];
          res.data.data.map((item, index) => {
            contacts.push({
              key: item.customerName,
              value: item.customerName
            });
            phoneList.push({
              customerName: item.customerName,
              phone: item.phone
            });
          });
          this.setState({
            contacts: contacts,
            phoneList: phoneList
          });
        } else {
          Message.error(res.data.message);
        }
      });
    }
  };

  getReceiveName = value => {
    //选择联系人手机
    let country = this.state.phoneList.filter(
      item => item.customerName == value
    );
    this.field.setValue("receivePhone", country[0].phone);
  };
  getReceiveMail = value => {
    let country = this.state.mailList.filter(
      item => item.customerName == value
    );
    this.field.setValue("receiveEmail", country[0].phone);
  };

  noteTemplate = value => {
    //选择短信模板
    let params = {
      templateId: value,
      customerId: this.state.customerId,
      collectionType: this.field.getValue("collectionType")
    };
    collectionFollowUpApi.getTemplate(params).then(res => {
      if (res.data.code === "200") {
        this.field.setValue("collectionContent", res.data.data);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  addCopy = () => {
    if(this.state.addCopy==null) {
      this.setState({
        addCopy: this.field.getValue("carbonCopy")
      });
      this.field.setValue("carbonCopy",'');
    } else {
      Message.error("最多只能同时抄收两个邮箱");
    }
  } 

  deleteCopy = () => {
    this.setState({
      addCopy: null
    });
  }

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    const excludeControls = ["media"];
    if (
      this.props.location.state === null ||
      this.props.location.state === undefined
    ) {
      this.props.history.push({ pathname: "/" });
      return <div />;
    } else {
      return (
        <div>
          <IceContainer>
            <div className="contain-con">
              <Form
                labelTextAlign={"right"}
                {...formItemLayout}
                field={this.field}
                style={{ marginTop: "30px" }}
              >
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="催收编号:">
                      [自动生成]
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="催收员用户名:">
                      <p>{this.state.operatorLoginName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="催收员名称:">
                      <p>{this.state.operatorName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      style={styles.formItem}
                      required
                      label="催收方式:"
                    >
                      <Radio.Group
                        name="collectionType"
                        itemDirection="hoz"
                        onChange={this.getCollectionType}
                      >
                        <Radio value={"PHONE"}>电话</Radio>
                        <Radio value={"SMS"}>短信</Radio>
                        <Radio value={"MAIL"}>邮件</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                {this.field.getValue("collectionType") == "PHONE" ? (
                  <div>
                    <Row>
                      <Col span="12">
                        <FormItem
                          style={styles.formItem}
                          required
                          label="手机号:"
                        >
                          <Select
                            followTrigger
                            name="receiveName"
                            style={styles.formInputBorder}
                            dataSource={this.state.contacts}
                            onChange={this.getReceiveName}
                          />
                          <Input
                            name="receivePhone"
                            style={{ marginTop: "15px", width: "240px" }}
                            trim
                            value={this.field.getValue("receivePhone")}
                            maxLength={11}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                ) : this.field.getValue("collectionType") == "SMS" ? (
                  <div>
                    <Row>
                      <Col span="12">
                        <FormItem
                          style={styles.formItem}
                          required
                          label="手机号:"
                        >
                          <Select
                            followTrigger
                            name="receiveName"
                            style={styles.formInputBorder}
                            dataSource={this.state.contacts}
                            onChange={this.getReceiveName}
                          />
                          <Input
                            name="receivePhone"
                            style={{ marginTop: "15px", width: "240px" }}
                            trim
                            value={this.field.getValue("receivePhone")}
                            maxLength={11}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormItem
                          style={styles.formItem}
                          required
                          label="发送内容:"
                        >
                          <Radio.Group
                            name="contentTemplateId"
                            itemDirection="hoz"
                            onChange={this.noteTemplate}
                          >
                            <Radio value={1}>短信样式1</Radio>
                            <Radio value={2}>短信样式2</Radio>
                            <Radio value={3}>短信样式3</Radio>
                          </Radio.Group>
                          <Input.TextArea
                            style={styles.formTextArea}
                            name="collectionContent"
                            value={this.field.getValue("collectionContent")}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                ) : this.field.getValue("collectionType") == "MAIL" ? (
                  <div>
                    <Row>
                      <Col span="24">
                        <FormItem
                          style={styles.formItem}
                          required
                          label="EMAIL:"
                        >
                          <Select
                            followTrigger
                            name="receiveName"
                            style={styles.formInputBorder}
                            dataSource={this.state.contacts}
                            onChange={this.getReceiveMail}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem
                          style={{ display: "flex", marginLeft: "180px" }}
                          required
                          format="email"
                          formatMessage="请输入正确的邮箱号！"
                        >
                          <Input
                            name="receiveEmail"
                            style={{ marginTop: "15px", width: "240px" }}
                            trim
                            value={this.field.getValue("receiveEmail")}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem
                          style={styles.formItem}
                          required
                          label="发送内容:"
                        >
                          <Radio.Group
                            name="contentTemplateId"
                            itemDirection="hoz"
                            defaultValue={1}
                          >
                            <Radio value={1}>邮件样式1</Radio>
                          </Radio.Group>
                        </FormItem>
                      </Col>
                    </Row>
                    <BraftEditor
                      style={styles.BraftEditor}
                      value={this.state.editorState}
                      excludeControls={excludeControls}
                      onChange={this.handleEditorChange}
                    />
                    <Row>
                      <Col span="24">
                        <FormItem
                          style={{ display: "flex", marginTop: "10px", marginBottom: '10px' }}
                          format="email"
                          formatMessage="请输入正确的邮箱号！"
                          label="抄送:"
                        >
                          <Input name="carbonCopy" style={{ width: "240px" }} />
                          <span>
                            <Button type="primary" text onClick={this.addCopy}>
                              增加抄送
                            </Button>
                          </span>
                        </FormItem>
                      </Col>
                    </Row>
                    {this.state.addCopy === null ? null : (
                      <Row>
                        <Col span="24">
                          <Input
                            readOnly
                            value={this.state.addCopy}
                            style={{
                              marginLeft: "180px",
                              marginButton: "10px"
                            }}
                          />
                          <Button type="primary" text onClick={this.deleteCopy}>
                            删除
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : null}
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="催收结果描述:">
                      <Input.TextArea
                        style={styles.formTextArea}
                        placeholder=""
                        name="collectionRemark"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Form.Submit
                  type="primary"
                  validate
                  style={styles.saveButton}
                  onClick={this.isOk}
                >
                  保存并发送
                </Form.Submit>
                <Form.Submit
                  type="normal"
                  style={{ marginLeft: "40PX" }}
                  onClick={this.goback}
                >
                  返回
                </Form.Submit>
              </Form>
            </div>
            <Dialog
              title="操作"
              visible={this.state.visible}
              footerAlign="center"
              onOk={this.productAdd}
              onClose={this.onClose}
              onCancel={this.onClose}
            >
              <p>
                请确认是否要发送的内容，按“确认”后，将发送内容给客户，并且无法撤回！
              </p>
              <p>（注：催收方式为“电话”不发送内容）</p>
            </Dialog>
          </IceContainer>
        </div>
      );
    }
  }
}

const styles = {
  formItem: {
    display: "flex"
  },
  formItemLabel: {},
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
    // width: '200px'
  },
  formInputBorder: {
    width: "240px",
    display: "block"
  },
  formContent: {
    width: "0px",
    border: "none"
  },
  formTextArea: {
    width: "500px",
    marginRight: "800px"
  },
  saveButton: {
    float: "left",
    borderRadius: "4px",
    marginLeft: "180px",
    width: "80px"
  },
  BraftEditor: {
    margin: "0 100px",
    border: "1px solid"
  }
};
