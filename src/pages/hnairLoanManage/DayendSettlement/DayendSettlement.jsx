import React, { Component } from "react";
import DataTable from "../../dataTable";
import IceContainer from "@icedesign/container";
import SearchForm from "../../components/SearchForm";
import DayendSettlementApi from "../../../api/HnairCreditManage/DayendSettlement";
import { Message } from "@alifd/next/lib/index";
import { Dialog, Field, Form, Grid, Radio } from "@alifd/next";

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

export default class DayendSettlement extends Component {
  field = new Field(this);
  static displayName = "DayendSettlement";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      settleStatus: "",
      settleDate: "",
      sendStatus: "",
      productName: "",
      page: 1,
      limit: 10,
      loading: false,
      visible: false,
      total: 0,
      data: [],
      resultSearch: "",
      autoPay: {}, //日终结算 - 自动打款 - 开关状态
      form: [
        { label: "结算日期", key: "settleDate", type: "date" },
        {
          label: "发送状态",
          key: "sendStatus",
          type: "select",
          list: [{ key: "全部", value: "" }]
        },
        {
          label: "结算状态",
          key: "settleStatus",
          type: "select",
          list: [{ key: "全部", value: "" }]
        }
      ]
    };
  }

  table = [
    {
      title: "结算编号",
      key: "id",
      width: 100,
      cell: true,
      path: "/hnairLoanManage/dayendSettlementTab"
    },
    { title: "结算日期", key: "settleDate", width: 100 },
    { title: "产品名称", key: "productName", width: 80 },
    { title: "放款金额(元)", key: "loanAmount", width: 100, align: "right" },
    { title: "退款金额(元)", key: "refundAmount", width: 100, align: "right" },
    {
      title: "前天轧差(元)",
      key: "lastDiffAmount",
      width: 100,
      align: "right"
    },
    { title: "当天轧差(元)", key: "diffAmount", width: 100, align: "right" },
    {
      title: "当天结算金额(元)",
      key: "settleAmount",
      width: 100,
      align: "right"
    },
    { title: "发送状态", key: "sendStatus", width: 80 },
    { title: "结算状态", key: "settleStatus", width: 80 },
    { title: "结算时间", key: "settleEndTime", width: 140 },
    { title: "操作", key: "operate", width: 220, cell: true }
  ];

  componentWillMount = () => {
    this.initDropList();
    this.getfinaceEnabledDisabled();
  };

  componentDidMount = () => {
    this.getData();
  };

  initDropList = () => {
    DayendSettlementApi.listSendStatus() //发送状态
      .then(res => {
        if (res.data.code === "200") {
          let selectList = [{ key: "全部", value: "" }];
          for (let key in res.data.data) {
            selectList.push({ key: res.data.data[key], value: key });
          }
          this.state.form.map((item, index) => {
            if (item.key === "sendStatus") {
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

    DayendSettlementApi.listSettleStatus() //结算状态
      .then(res => {
        if (res.data.code === "200") {
          let selectList = [{ key: "全部", value: "" }];
          for (let key in res.data.data) {
            selectList.push({ key: res.data.data[key], value: key });
          }
          this.state.form.map((item, index) => {
            if (item.key === "settleStatus") {
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

  toolBtn = [
    {
      name: "导出",
      type: "export",
      icon: "export",
      permission: "finance:day-settle:day-settle:export"
    },
    {
      name: "打款配置",
      type: "remit",
      permission: "finance:day-settle:day-settle:menu"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportFn();
    },
    remit: () => {
      DayendSettlementApi.finaceAutoPayDetail().then(res => {
        if (res.data.code === "200") {
          this.field.setValues(res.data.data);
          this.setState({
            visible: true,
            type: "remit",
          });
        } else {
          Message.error(res.data.message);
        }
      });
    }
  };

  exportFn = () => {
    let params = {...this.state.formValue};
    DayendSettlementApi.downsettlePartner(params)
    .then((res) => {
      let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
      let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);
      let link = document.createElement('a');
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  };

  // 发送状态时发送成功或者发送中的时候发送明细按钮置灰。
  // 结算状态未待结算，结算失败时显示打款指令。
  // 结算状态未结算中时显示 结果查询其它都不显示

  lineBtn = [
    {
      name: "发送明细",
      type: "sendDetail",
      key: "sendStatus",
      value: "待发送" + "," + "发送失败",
      permission: "finance:day-settle:day-settle:send"
    },
    {
      name: "打款指令",
      type: "payment",
      key: "settleStatus",
      value: "未结算" + "," + "结算失败",
      permission: "finance:day-settle:day-settle:pay-instruction"
    },
    {
      name: "结果查询",
      type: "resultSearch",
      key: "settleStatus",
      value: "未结算" + "," + "结算中",
      permission: "finance:day-settle:day-settle:result-select"
    }
  ];

  lineBtnFn = {
    sendDetail: (value, index, row) => {
      Dialog.show({
        title: "发送明细",
        content: "确认发送明细吗？",
        onOk: () => this.sendDetailFn(row.id)
      });
    },
    payment: (value, index, row) => {
      Dialog.show({
        title: "打款指令",
        content: "确认打款指令吗？",
        onOk: () => this.paymentFn(row.id)
      });
    },
    resultSearch: (value, index, row) => {
      Dialog.show({
        title: "结果查询",
        content: "确认结果查询吗？",
        onOk: () => this.resultSearchFn(row.id)
      });
    }
  };

  sendDetailFn = id => {
    DayendSettlementApi.finaceSettleSend(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.loading(res.data.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  paymentFn = id => {
    DayendSettlementApi.finaceSettlePay(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        this.state.resultSearch = res.data.data; //true:处理中false:校验失败
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  resultSearchFn = id => {
    DayendSettlementApi.finaceSettlePayResult(id).then(res => {
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
    DayendSettlementApi.finaceSettleList(params).then(res => {
      if (res.data.code === "200") {
        let subData = res.data.data.list.map(item => {
          if (
            item.sendStatus === "发送成功" ||
            item.settleStatus === "结算中"
          ) {
            item.status = "false";
          } else {
            item.status = "true";
          }
          return item;
        });
        this.setState({
          settleStatus: this.state.formValue.settleStatus
            ? this.state.formValue.settleStatus
            : "",
          settleDate: this.state.formValue.settleDate
            ? this.state.formValue.settleDate
            : "",
          sendStatus: this.state.formValue.sendStatus
            ? this.state.formValue.sendStatus
            : "",
          productName: this.state.formValue.productName
            ? this.state.formValue.productName
            : "",
          data: subData,
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

  onClose = () => {
    //关闭弹窗
    this.setState({
      visible: false
    });
  };

  getfinaceEnabledDisabled = () => {
    //日终结算 - 自动打款 - 开关状态
    DayendSettlementApi.finaceEnabledDisabled().then(res => {
      if (res.data.code === "200") {
        this.setState({
          autoPay: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  productUpdate = (parmas) => {
    //保存自动打款设置
    DayendSettlementApi.finaceAutoPayUpdate(parmas).then(res => {
      if (res.data.code === "200") {
        this.onClose(true);
        this.setState({
          loading: true,
        },
        () => this.getData());
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="日终结算"
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
        {/* 打款配置开关弹窗 */}
        <Dialog
          style={{ width: "400px", borderRadius: "8px" }}
          title="操作"
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <IceContainer>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              field={this.field}
            >
              <Row>
                <Col span="24">
                  <FormItem
                    label="自动打款:"
                    required
                    requiredMessage="请选择开启或关闭自动打款"
                    style={styles.formItem}
                  >
                    <Radio.Group name="autoPay">
                      {Object.keys(this.state.autoPay).map(
                        (key, index) => {
                          return (
                            <Radio key={index} value={key}>
                              {this.state.autoPay[key]}
                            </Radio>
                          );
                        }
                      )}
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <span>自动打款规则:</span>
                  <span name="autoRule" style={{ marginLeft: "50px" }}>{this.field.getValue('autoRule')}</span>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Form.Submit
                    type="primary"
                    style={styles.saveButton}
                    validate
                    onClick={this.productUpdate}
                  >
                    确认
                  </Form.Submit>
                  <Form.Submit
                    type="primary"
                    style={styles.saveButtons}
                    validate
                    onClick={this.onClose}
                  >
                    取消
                  </Form.Submit>
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
  saveButton: {
    float: "left",
    borderRadius: "4px",
    marginLeft: "110px",
    width: "80px"
  },
  saveButtons: {
    marginLeft: "20px",
    width: "80px",
    background: "none",
    color: "#333",
    border: "1px solid #ccc"
  }
};
