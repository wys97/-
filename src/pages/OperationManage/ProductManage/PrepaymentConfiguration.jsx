import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import DataTable from "../../dataTable";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import {
  Dialog,
  Form,
  Field,
  Grid,
  Message,
  Input,
  Radio,
  Select
} from "@alifd/next";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;
const Option = Select.Option;

export default class PrepaymentSetting extends Component {
  field = new Field(this);
  fields = new Field(this); 
  static displayName = "prepaymentSetting";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        productNo: props.id,
      },
      productName: '',
      data: [],
      loading: false,
      visible: false,
      prepayChangePlan: {}, //产品管理-提还计划更新方式-下拉框
      prepayDamageFormula: {}, //产品管理-提还违约金公式-下拉框
      rateSettingInfo: {
        isPrepay: "",
        isPrepayDamage: "",
        prepayChangePlan: "",
        prepayDamageFormula: "",
        prepayDamageRate: "",
        prepayDescription: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: "",
        data: []
      }
    };
  }

  componentWillMount() {
    this.getproductPrepayChangePlan();
    this.getproductPrepayDamageFormula();
  }

  componentDidMount() {
    this.getData();
  }

  getproductPrepayChangePlan = () => {
    //产品管理-提还计划更新方式-下拉框
    productManageApi.productPrepayChangePlan().then(res => {
      if (res.data.code === "200") {
        this.setState({
          prepayChangePlan: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getproductPrepayDamageFormula = () => {
    //产品管理-提还违约金公式-下拉框
    productManageApi.productPrepayDamageFormula().then(res => {
      if (res.data.code === "200") {
        this.setState({
          prepayDamageFormula: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getData = () => {
    //提前还款配置 - 详情
    productManageApi
      .prepayConfigDetail(this.state.formValue.productNo)
      .then(res => {
        if (res.data.code === "200") {
          this.field.setValues(res.data.data);
          this.setState({
            rateSettingInfo: res.data.data,
            loading: false
          });
        } else {
          Message.error(res.data.message);
        }
      });
    productManageApi
      .damageRatioList(this.state.formValue.productNo)
      .then(res => {
        if (res.data.code === "200") {
          let data = res.data.data[0];
          this.fields.setValues(res.data.data);
          this.setState({
            data: res.data.data,
            loading: false
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  table = [
    { title: "支用期数", key: "loanTerm", width: 130, align: "center" },
    { title: "还款期次下限", key: "minPeriod", width: 130, align: "center" },
    { title: "还款期次上限", key: "maxPeriod", width: 130, align: "center" },
    { title: "违约金倍数", key: "damageRatio", width: 130, align: "center" },
    { title: "操作", key: "operate", width: 130, align: "center", cell: true }
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
      this.fields.setValues({
        productNo: "",
        isPrepay: "",
        isPrepayDamage: "",
        prepayChangePlan: "",
        prepayDamageFormula: "",
        prepayDamageRate: "",
        prepayDescription: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: "",
        data: []
      });
      this.setState({
        visible: true,
        type: "add",
        rateSettingInfo: {
          productNo: "",
          isPrepay: "",
          isPrepayDamage: "",
          prepayChangePlan: "",
          prepayDamageFormula: "",
          prepayDamageRate: "",
          prepayDescription: "",
          creatorName: "",
          createTime: "",
          modifierName: "",
          modifyTime: "",
          data: []
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
    edit: (val, index, row) => {
      productManageApi.damageRatioDetail(row.id).then(res => {
        if (res.data.code === "200") {
          res.data.data.rates = [];
          Object.keys(res.data.data).map(item => {
            if (
              item.indexOf("interestRate") !== -1 &&
              item.indexOf("Str") === -1 &&
              res.data.data[item] &&
              res.data.data[item] !== "0"
            ) {
              res.data.data.rates.push(item.replace(/[^0-9]/gi, ""));
            }
          });
          this.fields.setValues(res.data.data);
          this.setState({
            visible: true,
            type: "edit",
            data: res.data.data
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

  productUpdate = (v) => {
    //提前还款配置 - 修改保存
    productManageApi.prepaymentModification(v).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
        this.getData());
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  projectDelete = id => {
    //产品管理-提还违约金倍数配置-删除
    productManageApi.damageRatioDelete(id).then(res => {
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

  onClose = flag => {
    //关闭弹窗
    this.setState({
      visible: false
    });
    this.getData();
  };

  onSave = (value, errors) => {
    //提还违约金倍数配置-新增修改保存
    let param = value;
    if (errors) {
      return;
    }
    param.productNo = this.state.formValue.productNo;
    if (this.state.type === "add") {

      this.addRates(param);
    } else {
      if (param.id) {
        this.editRate(param);
      }
    }
  };

  addRates = param => {
    //还款配置-新增
    productManageApi.damageRatioInsert(param).then(res => {
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

  editRate = param => {
    //提还违约金倍数配置-修改
    productManageApi.productDamageRatioUpdate(param).then(res => {
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
    const minPeriod =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItems}
          required
          label="还款期次下限:"
        >
          <Input name="minPeriod" style={styles.formInput} />
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItems}
          required
          label="还款期次下限:"
        >
          <Input
            name="minPeriod"
            defaultValue={this.state.data.minPeriod}
            style={styles.formInput}
          />
        </FormItem>
      );
    const maxPeriod =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItems}
          required
          label="还款期次上限:"
        >
          <Input name="maxPeriod" style={styles.formInput} />
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItems}
          required
          label="还款期次上限:"
        >
          <Input
            name="maxPeriod"
            defaultValue={this.state.data.maxPeriod}
            style={styles.formInput}
          />
        </FormItem>
      );

    const damageRatio =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItems}
          required
          label="违约金倍数:"
        >
          <Input name="damageRatio" style={styles.formInput} />
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItems}
          required
          label="违约金倍数:"
        >
          <Input
            name="damageRatio"
            defaultValue={this.state.data.damageRatio}
            style={styles.formInput}
          />
        </FormItem>
      );
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              提前还款配置
            </p>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              field={this.field}
            >
              <Row>
                <Col span="12">
                  <FormItem
                    label="是否支持提前还款:"
                    required
                    requiredMessage="请选择是否支持提前还款"
                    style={styles.formItem}
                  >
                    <Radio.Group name="isPrepay">
                      <Radio value={true}>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="提还计划更新方式:"
                    required
                    requiredMessage="请选择提还计划更新方式"
                  >
                    <Radio.Group name="prepayChangePlan" itemDirection="ver">
                      {Object.keys(this.state.prepayChangePlan).map(
                        (key, index) => {
                          return (
                            <Radio key={index} value={key}>
                              {this.state.prepayChangePlan[key]}
                            </Radio>
                          );
                        }
                      )}
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    label="是否收取提还违约金:"
                    required
                    requiredMessage="请选择是否收取提还违约金"
                    style={styles.formItem}
                  >
                    <Radio.Group name="isPrepayDamage">
                      <Radio value={true}>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="提还违约金公式:"
                    required
                    requiredMessage="请选择提还违约金公式"
                  >
                    <Radio.Group name="prepayDamageFormula" itemDirection="ver">
                      {Object.keys(this.state.prepayDamageFormula).map(
                        (key, index) => {
                          return (
                            <Radio key={index} value={key}>
                              {this.state.prepayDamageFormula[key]}
                            </Radio>
                          );
                        }
                      )}
                    </Radio.Group>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    style={styles.formItem}
                    required
                    requiredMessage="请输入提还费率"
                    format="number"
                    formatMessage="请输入数字"
                    label="提还费率:"
                  >
                    <Input
                      style={{ width: "120PX" }}
                      name="prepayDamageRate"
                      placeholder=""
                    />{" "}
                    %
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style= {{ display: "flex",
                    whiteSpace: "nowrap",
                    lineHeight: "28px",}}
                    label="提还违约金倍数配置:"
                    required
                  >
                    <DataTable
                      col={this.table}
                      toolBtn={this.toolBtn}
                      toolBtnFn={this.toolBtnFn}
                      lineBtn={this.lineBtn}
                      lineBtnFn={this.lineBtnFn}
                      loadTable={this.state.loading}
                      data={this.state.data}
                      style = {{width: "90%"}}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItem}
                    label="提前还款说明:"
                    help=""
                  >
                    <Input.TextArea
                      style={{ width: "500px" }}
                      placeholder=""
                      name="prepayDescription"
                    />
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
                    <p>{this.fields.getValue("createTime")}</p>
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
                    <p>{this.fields.getValue("updateTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Form.Submit
                type="primary"
                style={styles.saveButton}
                name = "update"
                validate
                onClick={(v)=> this.productUpdate(v)}
              >
                保存
              </Form.Submit>
            </Form>
          </div>
        </IceContainer>
        {/* 还款配置 - 新增修改公用弹窗 */}
        <Dialog
            style={{ width: "60%", height: "600px", borderRadius: "8px" }}
            title=""
            footer={false}
            visible={this.state.visible}
            onClose={this.onClose}
          >
            <h3
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "15px"
              }}
            >
              {this.state.type === "add" ? "新增" : "修改"}提还违约金倍数配置
            </h3>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              field={this.fields}
            >
              <Row>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItems}
                    label="产品编号:"
                    required
                    requiredMessage="产品编号是必填字段"
                  >
                    {this.state.formValue.productNo}
                    <input type="hidden" name="id" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItems}
                    label="产品名称:"
                    required
                    requiredMessage="产品名称是必填字段"
                  >
                    {this.state.data.productName}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="支用期数:" required
                              requiredMessage="请选择支用期数">
                      <Select followTrigger style={{width: "240px"}} name="loanTerm">
                        <Option value={1}>1</Option>
                        <Option value={3}>3</Option>
                        <Option value={6}>6</Option>
                        <Option value={9}>9</Option>
                        <Option value={12}>12</Option>
                        <Option value={24}>24</Option>
                        <Option value={36}>36</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              <Row>
                <Col span="12">{minPeriod}</Col>
                <Col span="12">{maxPeriod}</Col>
              </Row>
              <Row>
                <Col span="12">{damageRatio}</Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItems} label="创建人员:">
                    <p>{this.fields.getValue("creatorName")}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItems} label="创建时间:">
                    <p>{this.fields.getValue("createTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItems} label="修改人员:">
                    <p>{this.fields.getValue("modifierName")}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItems} label="修改时间:">
                    <p>{this.fields.getValue("updateTime")}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="" style={{ textAlign: "center" }} />
                  <Form.Submit
                    validate
                    type="primary"
                    name = "add"
                    style={styles.saveButton}
                    onClick={(value) => this.onSave(value)}
                  >
                    保存
                  </Form.Submit>
                </Col>
              </Row>
            </Form>
          </Dialog>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: "flex"
  },
  formItems: {
    display: "flex",
    whiteSpace: "nowrap"
  },
  formCol: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  formItemInput: {
    width: "120px",
    borderRadius: "4px",
    border: "none"
  },
  formInput: {
    maxWidth: "250px"
  },
  saveButton: {
    float: "left",
    borderRadius: "4px",
    marginLeft: "180px",
    width: "80px"
  }
};
