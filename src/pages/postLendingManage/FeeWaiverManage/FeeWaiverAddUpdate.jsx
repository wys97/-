import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Dialog, Field, Form, Grid, Table, Radio, Input, Message } from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import feeWaiverManageApi from '../../../api/PostLendingManage/FeeWaiverManage';
import EditablePane from '../../components/EditablePane';

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const FormItem = Form.Item;

export default class FeeWaiverAddUpdate extends Component {

  static displayName = 'FeeWaiverAddUpdate';
  static propTypes = {};
  static defaultProps = {};

  field = new Field(this);

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      type: this.props.location
        && this.props.location.pathname
        && this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length),
      refresh: 0,
      visible: false,					// 显示借据弹窗
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      data: [],
      dataSource: [],
      totals: [],
      rectifyTypeInfo: {}     //调整类型 枚举
    }
  }

  componentWillMount = () => {
    this.getRectifyType()
    if (this.state.type === 'update') {
      // 修改, 加载详情数据
      feeWaiverManageApi.decreaseDetail(this.state.id).then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
        } else {
          Message.error(res.data.message);
        }
      });
      feeWaiverManageApi.decreaseDetailList(this.state.id).then(res => {
        if (res.data.code === "200") {
          let data = res.data.data;
          let totals = [
            {
              unpaidPrincipal: 0,
              unpaidInterest: 0,
              unpaidFine: 0,
              decreasePrincipal: 0,
              decreaseInterest: 0,
              decreaseFine: 0,
              decreaseAmount: 0,
              unpaidInterestLeft: 0,
              unpaidFineLeft: 0,
              unpaidPrincipalLeft: 0,
              unpaidAmountLeft: 0
            }
          ];
          data.map((item, index) => {
            // item.decreasePrincipal = 0;
            // item.decreaseInterest = 0;
            // item.decreaseFine = 0;
            item.decreaseAmount = 0;
            item.unpaidPrincipalLeft = item.unpaidPrincipal - 0;
            item.unpaidInterestLeft = item.unpaidInterest - 0;
            item.unpaidFineLeft = item.unpaidFine - 0;
            item.unpaidAmountLeft =
              item.unpaidPrincipalLeft +
              item.unpaidInterestLeft +
              item.unpaidFineLeft;
            totals[0].unpaidPrincipal += Number(item.unpaidPrincipal);
            totals[0].unpaidInterest += Number(item.unpaidInterest);
            totals[0].unpaidFine += Number(item.unpaidFine);
            totals[0].decreasePrincipal += Number(item.decreasePrincipal);
            totals[0].decreaseInterest += Number(item.decreaseInterest);
            totals[0].decreaseFine += Number(item.decreaseFine);
            totals[0].decreaseAmount += 0;
            totals[0].unpaidAmountLeft += Number(item.unpaidAmountLeft);
            totals[0].unpaidInterestLeft += Number(item.unpaidInterestLeft);
            totals[0].unpaidFineLeft += Number(item.unpaidFineLeft);
            totals[0].unpaidPrincipalLeft += Number(item.unpaidPrincipalLeft);
          });
          totals[0] = {
            unpaidPrincipal: Math.floor(totals[0].unpaidPrincipal * 100) / 100,
            unpaidInterest: Math.floor(totals[0].unpaidInterest * 100) / 100,
            unpaidFine: Math.floor(totals[0].unpaidFine * 100) / 100,
            decreasePrincipal: Math.floor(totals[0].decreasePrincipal * 100) / 100,
            decreaseInterest: Math.floor(totals[0].decreaseInterest * 100) / 100,
            decreaseFine: Math.floor(totals[0].decreaseFine * 100) / 100,
            decreaseAmount: Math.floor(totals[0].decreaseAmount * 100) / 100,
            unpaidInterestLeft:
              Math.floor(totals[0].unpaidInterestLeft * 100) / 100,
            unpaidFineLeft: Math.floor(totals[0].unpaidFineLeft * 100) / 100,
            unpaidPrincipalLeft:
              Math.floor(totals[0].unpaidPrincipalLeft * 100) / 100,
            unpaidAmountLeft: Math.floor(totals[0].unpaidAmountLeft * 100) / 100
          };
          totals[0].periodNo = "合计：";
          this.setState({
            totals: totals,
            dataSource: data,
            visible: false
          });
        } else {
          Message.error(res.data.message);
        }
      });
    } else {
      // 新增
    }
  };

  getRectifyType = () => {      //调整类型 枚举 枚举
    feeWaiverManageApi.rectifyType().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          rectifyTypeInfo: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    })
  }

  goBack = () => {
    this.props.history.go(-1)
  };

  howToDue = () => {
    if (this.state.type === 'add') {
      // 新增, 弹框选择
      return <p><Input style={styles.formInputBorder} name="dueId" placeholder="" value={this.field.getValue("dueId")}
        readOnly /> <a href="javascript:;" onClick={this.outSelect}>选择</a></p>
    } else {
      return <p>{this.field.getValue("dueId")}</p>
    }
  };

  decreaseOperate = (v, e) => {
    if (e !== null) {
      return;
    }
    if (!v.decreaseReason) {
      v.decreaseReason=''
    }
    if (this.state.type === "add") {
      // 新增
      let data = [];
      let add = {};
      this.state.dataSource.map((item, index) => {
        add = {
          repayPlanId: item.repayPlanId,
          periodNo: item.periodNo,
          dueDate: item.dueDate,
          decreasePrincipal: item.decreasePrincipal,
          decreaseInterest: item.decreaseInterest,
          decreaseFine: item.decreaseFine
        };
        data.push(add);
      });
      v.list = data;
      feeWaiverManageApi.decreaseAdd(v).then(res => {
        if (res.data.code === "200") {
          Message.success(res.data.message);
          this.goBack();
        } else {
          Message.error(res.data.message);
        }
      });
    } else {
      // 修改
      let list = [];
      let add = {};
      this.state.dataSource.map((item, index) => {
        console.log(item)
        add = {
          repayPlanId: item.repayPlanId,
          periodNo: item.periodNo,
          dueDate: item.dueDate,
          decreasePrincipal: item.decreasePrincipal,
          decreaseInterest: item.decreaseInterest,
          decreaseFine: item.decreaseFine,
          decreaseInterestId: item.decreaseInterestId
        };
        list.push(add);
      });
      v.list = list;
      feeWaiverManageApi.decreaseUpdate(v).then(res => {
        if (res.data.code === "200") {
          this.setState({
            refresh: this.state.refresh + 1
          });
          Message.success(res.data.message);
          this.goBack();
        } else {
          Message.error(res.data.message);
        }
      });
    }
  };

  outSelect = () => {
    this.getData();
    this.setState({
      visible: true
    })
  };

  pageChange = (page) => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    feeWaiverManageApi.dueList(params).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  onClose = () => {
    this.setState({
      visible: false
    })
  };

  form = [
    {
    label: '借据号',
    key: 'dueId',
    type: ''
  },
  {
    label: '客户名称',
    key: 'customerName',
    type: ''
  },
  {
    label: '证件号',
    key: 'identityNo',
    type: ''
  },
  {
    label: '手机号',
    key: 'phone',
    type: ''
  }];

  table = [
    {
    title: '借据号',
    key: 'dueId',
    width: 100
  },
  {
    title: '客户名称',
    key: 'customerName',
    width: 100
  },
  {
    title: '证件号',
    key: 'identityNo',
    width: 150
  },
  {
    title: '手机号',
    key: 'phone',
    width: 150
  },
  {
    title: '产品名称',
    key: 'productName',
    width: 100
  },
  {
    title: '贷款金额 (元) ',
    key: 'loanAmount',
    width: 100
  },
  {
    title: '逾期未还总额 (元) ',
    key: 'overdueAmount',
    width: 200
  },
  {
    title: '借据状态',
    key: 'dueStatus',
    width: 100
  },
  {
    title: '起始日期',
    key: 'valueDate',
    width: 100
  },
  {
    title: '结束日期',
    key: 'dueDate',
    width: 200
  },
  ];


  lineClickFn = (row, index) => {
    this.selectDue(row.dueId);
  }

  selectDue = (id) => {
    feeWaiverManageApi.selectDue(id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          visible: false
        });
        this.field.setValues(res.data.data);
      } else {
        Message.error(res.data.message);
      }
    });
    feeWaiverManageApi.detailList(id).then((res) => {
      if (res.data.code === '200') {
        let data = res.data.data;
        let totals = [
          {
            unpaidPrincipal: 0,
            unpaidInterest: 0,
            unpaidFine: 0,
            decreasePrincipal: 0,
            decreaseInterest: 0,
            decreaseFine: 0,
            decreaseAmount: 0,
            unpaidInterestLeft: 0,
            unpaidFineLeft: 0,
            unpaidPrincipalLeft: 0,
            unpaidAmountLeft: 0,
          }
        ];
        data.map((item, index) => {
          item.decreasePrincipal = 0;
          item.decreaseInterest = 0;
          item.decreaseFine = 0;
          item.decreaseAmount = 0;
          item.unpaidPrincipalLeft = item.unpaidPrincipal-0;
          item.unpaidInterestLeft = item.unpaidInterest-0;
          item.unpaidFineLeft = item.unpaidFine-0;
          item.unpaidAmountLeft = item.unpaidPrincipalLeft+item.unpaidInterestLeft+item.unpaidFineLeft;
          totals[0].unpaidPrincipal += Number(item.unpaidPrincipal);
          totals[0].unpaidInterest += Number(item.unpaidInterest);
          totals[0].unpaidFine += Number(item.unpaidFine);
          totals[0].decreasePrincipal += 0;
          totals[0].decreaseInterest += 0;
          totals[0].decreaseFine += 0;
          totals[0].decreaseAmount += 0;
          totals[0].unpaidAmountLeft += Number(item.unpaidAmountLeft);
          totals[0].unpaidInterestLeft += Number(item.unpaidInterestLeft);
          totals[0].unpaidFineLeft += Number(item.unpaidFineLeft);
          totals[0].unpaidPrincipalLeft += Number(item.unpaidPrincipalLeft);
        });
        totals[0] = {
          unpaidPrincipal: Math.floor(totals[0].unpaidPrincipal * 100) / 100,
          unpaidInterest: Math.floor(totals[0].unpaidInterest * 100) / 100,
          unpaidFine: Math.floor(totals[0].unpaidFine * 100) / 100,
          decreasePrincipal: Math.floor(totals[0].decreasePrincipal * 100) / 100,
          decreaseInterest: Math.floor(totals[0].decreaseInterest * 100) / 100,
          decreaseFine: Math.floor(totals[0].decreaseFine * 100) / 100,
          decreaseAmount: Math.floor(totals[0].decreaseAmount * 100) / 100,
          unpaidInterestLeft: Math.floor(totals[0].unpaidInterestLeft * 100) / 100,
          unpaidFineLeft: Math.floor(totals[0].unpaidFineLeft * 100) / 100,
          unpaidPrincipalLeft:
            Math.floor(totals[0].unpaidPrincipalLeft * 100) / 100,
          unpaidAmountLeft: Math.floor(totals[0].unpaidAmountLeft * 100) / 100
        };
        totals[0].periodNo = "合计：";
        this.setState({
          totals: totals,
          dataSource: data,
          visible: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getDecreaseAmount = () => {
    let principal = Number(this.field.getValue("decreasePrincipal")) ? Number(this.field.getValue("decreasePrincipal")) : 0;
    let interest = Number(this.field.getValue("decreaseInterest")) ? Number(this.field.getValue("decreaseInterest")) : 0;
    let fine = Number(this.field.getValue("decreaseFine")) ? Number(this.field.getValue("decreaseFine")) : 0;
    return (
      <p>{(principal + interest + fine).toFixed(2)}<span>元</span></p>
    );
  };

  onSubmit(formValue) {
    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true
    }, () => this.getData());
  }
  dataSourceChange = dataSource => {
    this.setState({ dataSource });
  }

  decreasePrincipalCell = (value, index, record) => {
    return (
      <EditablePane
        id={index}
        decreasePrincipalPlaceholder={this.state.dataSource[index].decreasePrincipal}
        decreasePrincipal={value}
        rectifyType={this.field.getValue("rectifyType")}
        dataSource={this.state.dataSource}
        dataSourceChange={dataSource => this.dataSourceChange(dataSource)}
      />
    );
  }
  decreaseInterestCell = (value, index, record) => {
    return (
      <EditablePane
        id={index}
        decreaseInterestPlaceholder={this.state.dataSource[index].decreaseInterest}
        decreaseInterest={value}
        rectifyType={this.field.getValue("rectifyType")}
        dataSource={this.state.dataSource}
        dataSourceChange={dataSource => this.dataSourceChange(dataSource)}
      />
    );
  }
  decreaseFineCell = (value, index, record) => {
    return (
      <EditablePane
        id={index}
        decreaseFinePlaceholder={this.state.dataSource[index].decreaseFine}
        decreaseFine={value}
        rectifyType={this.field.getValue("rectifyType")}
        dataSource={this.state.dataSource}
        dataSourceChange={dataSource => this.dataSourceChange(dataSource)}
      />
    );
  }

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.state.type !== 'add' && this.state.type !== 'update') {
      this.props.history.push({ pathname: '/' });
      return (<div />);
    } else {
      return (
        <div>
          <IceContainer>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              field={this.field}
            >
              <div
                className="CustomerTabTitle"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3 style={{ marginTop: "-4px" }}>
                  {this.state.type === "add" ? "新增息费调整" : "修改息费调整"}
                </h3>
                <Button
                  type="normal"
                  style={{ borderRadius: "5px" }}
                  onClick={this.goBack}
                >
                  返回
                </Button>
              </div>
              <div className="contain-con">
                <div style={{ marginTop: "30px" }}>
                  <Row>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="调整编号:"
                      >
                        <p>
                          {this.field.getValue("decreaseInterestId")}
                          <span> [自动生成] </span>
                        </p>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem style={styles.formItem} required label="状态:">
                        <p>{this.field.getValue("decreaseStatus")}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="借据号:"
                      >
                        {this.howToDue()}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="客户姓名:"
                      >
                        <p>{this.field.getValue("customerName")}</p>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="手机号:"
                      >
                        <p>{this.field.getValue("phone")}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="证件类型:"
                      >
                        <p>{this.field.getValue("identityType")}</p>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="证件号:"
                      >
                        <p>{this.field.getValue("identityNo")}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="产品名称:"
                      >
                        <p>{this.field.getValue("productName")}</p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="12">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="贷款金额:"
                      >
                        <p>
                          {this.field.getValue("loanAmount")
                            ? this.field.getValue("loanAmount")
                            : "--"}
                          <span>元</span>
                        </p>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <FormItem
                        style={styles.formItem}
                        required
                        label="调整类型:"
                      >
                        {this.state.type == "add" ? (
                          <Radio.Group name="rectifyType">
                            {Object.keys(this.state.rectifyTypeInfo).map(
                              (key, index) => {
                                return (
                                  <Radio key={index} value={key}>
                                    {this.state.rectifyTypeInfo[key]}
                                  </Radio>
                                );
                              }
                            )}
                          </Radio.Group>
                        ) : (
                          <p>{this.field.getValue("rectifyType")}</p>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Table dataSource={this.state.dataSource} hasBorder={false}>
                    <Table.Column
                      title="期次"
                      dataIndex="periodNo"
                      width={80}
                    />
                    <Table.Column
                      title="还款日期"
                      dataIndex="dueDate"
                      width={110}
                    />
                    <Table.Column
                      title="未还本金（元）"
                      dataIndex="unpaidPrincipal"
                      width={100}
                    />
                    <Table.Column
                      title="未还利息（元）"
                      dataIndex="unpaidInterest"
                      width={100}
                    />
                    <Table.Column
                      title="未还罚息（元）"
                      dataIndex="unpaidFine"
                      width={100}
                    />
                    <Table.Column
                      title="调整本金（元）"
                      dataIndex="decreasePrincipal"
                      width={100}
                      cell={this.decreasePrincipalCell}
                    />
                    <Table.Column
                      title="调整利息（元）"
                      dataIndex="decreaseInterest"
                      width={100}
                      cell={this.decreaseInterestCell}
                    />
                    <Table.Column
                      title="调整罚息（元）"
                      dataIndex="decreaseFine"
                      width={100}
                      cell={this.decreaseFineCell}
                    />
                    <Table.Column
                      title="调整总额（元）"
                      dataIndex="decreaseAmount"
                      width={100}
                    />
                    <Table.Column
                      title="调整后未还本金（元）"
                      dataIndex="unpaidPrincipalLeft"
                      width={100}
                    />
                    <Table.Column
                      title="调整后未还利息（元）"
                      dataIndex="unpaidInterestLeft"
                      width={100}
                    />
                    <Table.Column
                      title="调整后未还罚息（元）"
                      dataIndex="unpaidFineLeft"
                      width={100}
                    />
                    <Table.Column
                      title="调整后未还总额（元）"
                      dataIndex="unpaidAmountLeft"
                      width={100}
                    />
                  </Table>
                  <Table
                    dataSource={this.state.totals}
                    hasHeader={false}
                    hasBorder={false}
                  >
                    <Table.Column dataIndex="periodNo" width={80} />
                    <Table.Column dataIndex="dueDate" width={110} />
                    <Table.Column dataIndex="unpaidPrincipal" width={100} />
                    <Table.Column dataIndex="unpaidInterest" width={100} />
                    <Table.Column dataIndex="unpaidFine" width={100} />
                    <Table.Column dataIndex="decreasePrincipal" width={100} />
                    <Table.Column dataIndex="decreaseInterest" width={100} />
                    <Table.Column dataIndex="decreaseFine" width={100} />
                    <Table.Column dataIndex="decreaseAmount" width={100} />
                    <Table.Column dataIndex="unpaidPrincipalLeft" width={100} />
                    <Table.Column dataIndex="unpaidInterestLeft" width={100} />
                    <Table.Column dataIndex="unpaidFineLeft" width={100} />
                    <Table.Column dataIndex="unpaidAmountLeft" width={100} />
                  </Table>
                  <Row>
                    <Col span="24"></Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <FormItem style={styles.formItem} label="调整原因:">
                        <Input.TextArea
                          style={styles.formTextArea}
                          placeholder=""
                          name="decreaseReason"
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
                        <p>{this.field.getValue("modifyTime")}</p>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </div>
              <Form.Submit
                validate
                type="primary"
                style={styles.saveButton}
                onClick={this.decreaseOperate}
              >
                保存
              </Form.Submit>
            </Form>
          </IceContainer>

          <Dialog
            style={{ width: "60%", height: "600px", borderRadius: "8px" }}
            title=""
            footer={false}
            visible={this.state.visible}
            onClose={this.onClose}
            isFullScreen={true}
          >
            <IceContainer>
              <h3
                style={{
                  borderBottom: "1px solid #eee",
                  paddingBottom: "15px"
                }}
              >
                选择借据
              </h3>
              <div className="contain-con">
                <SearchForm
                  form={this.form}
                  title="选择借据"
                  onSubmit={formValue => this.onSubmit(formValue)}
                />
                <DataTable
                  col={this.table}
                  toolBtn={this.toolBtn}
                  lineClickFn={this.lineClickFn}
                  page={true}
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
          </Dialog>
        </div>
      );
    }
  }
}

const styles = {
  formItem: {
    display: 'flex'
  },
  formItemLabel: {},
  formItemError: {
    marginLeft: '10px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px'
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe'
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
    // width: '200px'
  },
  formInputBorder: {
    width: '240px'
  },
  formTextArea: {
    width: '500px'
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px'
  }
};
