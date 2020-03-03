import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import DataTable from "../../dataTable";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";
import {
  Checkbox,
  Dialog,
  Field,
  Form,
  Grid,
  Input,
  Message
} from "@alifd/next";

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

export default class RateUpdateSetting extends Component {
  static displayName = "prepaymentSetting";
  static propTypes = {};
  static defaultProps = {};

  field = new Field(this);

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: "add",
      rateSettingInfo: {
        // 弹窗信息
        id: "",
        productNo: "",
        productName: "",
        loanMaxAmount: "",
        loanMinAmount: "",
        rates: [],
        interestRate3: "",
        interestRate6: "",
        interestRate9: "",
        interestRate12: "",
        interestRate24: "",
        interestRate36: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: ""
      },
      rates: [],
      formValue: {
        productNo: props.id,
        productName: props.name
      },
      page: 1,
      page1: 1,
      limit: 10,
      limit1: 10,
      loading: false,
      loading1: false,
      data: [],
      data1: []
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getData();
    this.getData1();
  }

  pageChange = page => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  /* 贷款利率配置相关代码 */
  getData = () => {
    productManageApi
      .rateSettingList(this.state.formValue.productNo)
      .then(res => {
        if (res.data.code === "200") {
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
    { title: "金额下限(元)", key: "loanMinAmount", width: 130 },
    { title: "金额上限(元)", key: "loanMaxAmount", width: 130 },
    {
      title: "月利率",
      key: "rateMap",
      columns: [
        { title: "3期", key: "interestRate3Str", width: 120 },
        { title: "6期", key: "interestRate6Str", width: 120 },
        { title: "9期", key: "interestRate9Str", width: 120 },
        { title: "12期", key: "interestRate12Str", width: 120 },
        { title: "24期", key: "interestRate24Str", width: 120 },
        { title: "36期", key: "interestRate36Str", width: 120 }
      ]
    },
    { title: "操作", key: "operate", width: 100, cell: true }
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      permission: ":"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.field.setValues({
        id: "",
        productNo: "",
        productName: "",
        loanMaxAmount: "",
        loanMinAmount: "",
        rates: [],
        interestRate3: "",
        interestRate6: "",
        interestRate9: "",
        interestRate12: "",
        interestRate24: "",
        interestRate36: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: ""
      });
      this.setState({
        visible: true,
        type: "add",
        rateSettingInfo: {
          id: "",
          productNo: "",
          productName: "",
          loanMaxAmount: "",
          loanMinAmount: "",
          rates: [],
          interestRate3: "",
          interestRate6: "",
          interestRate9: "",
          interestRate12: "",
          interestRate24: "",
          interestRate36: "",
          creatorName: "",
          createTime: "",
          modifierName: "",
          modifyTime: ""
        }
      });
    }
  };

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      permission: ":"
    },
    {
      name: "删除",
      type: "del",
      permission: ":"
    }
  ];

  lineBtnFn = {
    edit: (val, index, row) => {
      productManageApi.rateSettingDetail(row.id).then(res => {
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
          this.field.setValues(res.data.data);
          this.setState({
            visible: true,
            type: "edit",
            rateSettingInfo: res.data.data,
            rates: res.data.data.rates
          });
        } else {
          Message.error(res.data.message);
        }
      });
    },
    del: (val, index, row) => {
      Dialog.show({
        title: "操作",
        content: "确认删除该利率配置吗？",
        onOk: () => this.delFn(row)
      });
    }
  };

  delFn = row => {
    productManageApi.delRateSetting(row.id).then(res => {
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

  changeRates = arr => {
    arr = _.compact(arr);
    this.setState({
      rates: arr
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      rates: []
    });
  };

  onSave = (value, errors) => {
    let param = value;
    if (errors) {
      return;
    }
    if (this.state.type === "add") {
      param.productNo = this.state.formValue.productNo;
      this.addRates(param);
    } else {
      if (param.id) {
        this.editRates(param);
      }
    }
  };

  addRates = param => {
    productManageApi.addRateSetting(param).then(res => {
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

  editRates = param => {
    productManageApi.editRateSetting(param).then(res => {
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
    const loanMaxAmount =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="金额上限:"
        >
          <Input name="loanMaxAmount" addonTextAfter="元" />
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="金额上限:"
        >
          {this.state.rateSettingInfo.loanMaxAmount}元
        </FormItem>
      );

    const loanMinAmount =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="金额下限:"
        >
          <Input name="loanMinAmount" addonTextAfter="元" />
        </FormItem>
      ) : (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="金额下限:"
        >
          {this.state.rateSettingInfo.loanMinAmount}元
        </FormItem>
      );

    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              贷款利率配置
            </p>
            <DataTable
              col={this.table}
              toolBtn={this.toolBtn}
              toolBtnFn={this.toolBtnFn}
              lineBtn={this.lineBtn}
              lineBtnFn={this.lineBtnFn}
              page={false}
              pageSize={this.state.limit}
              current={this.state.page}
              total={this.state.total}
              pageChange={current => this.pageChange(current)}
              limitChange={pageSize => this.limitChange(pageSize)}
              loadTable={this.state.loading}
              data={this.state.data}
            />
          </div>
        </IceContainer>
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
              {this.state.type === "add" ? "新增" : "修改"}产品利率
            </h3>
            <div className="contain-con">
              <Form
                labelTextAlign={"right"}
                {...formItemLayout}
                field={this.field}
              >
                <Row>
                  <Col span="12">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="产品编号:"
                      required
                      requiredMessage="产品编号是必填字段"
                    >
                      {this.state.formValue.productNo}[自动生成]
                      <input type="hidden" name="id" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="产品名称:"
                      required
                      requiredMessage="产品名称是必填字段"
                    >
                      {this.state.formValue.productName}[自动生成]
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">{loanMinAmount}</Col>
                  <Col span="12">{loanMaxAmount}</Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      required
                      requiredMessage="支持期数是必选字段"
                      label="支持期数:"
                    >
                      <Checkbox.Group name="rates" onChange={this.changeRates}>
                        <Checkbox value="3">3期</Checkbox>
                        <Checkbox value="6">6期</Checkbox>
                        <Checkbox value="9">9期</Checkbox>
                        <Checkbox value="12">12期</Checkbox>
                        <Checkbox value="24">24期</Checkbox>
                        <Checkbox value="36">36期</Checkbox>
                      </Checkbox.Group>
                    </FormItem>
                  </Col>
                </Row>
                {this.state.rates.map((item, idx) => {
                  return (
                    <Row key={idx}>
                      <Col span="24">
                        <FormItem
                          labelTextAlign="right"
                          style={styles.formItem}
                          required
                          requiredMessage="月利率是必填字段"
                          label={item + "期月利率"}
                        >
                          <Input
                            name={"interestRate" + item}
                            addonTextAfter="%"
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  );
                })}
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      {this.state.rateSettingInfo.creatorName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      {this.state.rateSettingInfo.createTime}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      {this.state.rateSettingInfo.modifierName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      {this.state.rateSettingInfo.modifyTime}
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
  saveButton: {
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#3080fe",
    color: "#fff",
    borderColor: "transparent"
  }
};
