import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Form, Grid, Button, Message, Dialog } from "@alifd/next";
import collectionManageApi from "../../../api/CollectionManage/CollectionManage";
import DataTable from "../../dataTable";
import "./CollectionOfDetail.scss";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const FormItem = Form.Item;

export default class CollectionDetail extends Component {
  static displayName = "CollectionDetail";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      customerId: props.customerId,
      formInput: {},
      page: 1,
      limit: 10,
      total: 0,
      loading: false,
      data: [],
      dataSub: []
    };
  }

  componentWillMount = () => {};

  componentDidMount = () => {
    this.getCollectionDetail();
    this.getData();
    this.getDataSub();
  };

  table = [
    { title: "借据号", key: "dueId", width: 100 },
    { title: "产品名称", key: "productName", width: 160 },
    { title: "贷款金额(元)", key: "loanAmount", width: 110 },
    { title: "贷款余额(元)", key: "loanBalance", width: 110 },
    { title: "贷款期限", key: "loanTerm", width: 80 },
    { title: "还款方式", key: "repayMethodText", width: 100 },
    { title: "逾期天数", key: "overdueDays", width: 80 },
    { title: "逾期期数", key: "ruleName", width: 80 },
    { title: "逾期本金(元)", key: "overduePrincipal", width: 110 },
    { title: "逾期利息(元)", key: "overdueInterest", width: 110 },
    { title: "逾期罚息(元)", key: "overdueFine", width: 110 },
    { title: "逾期金额(元)", key: "overdueAmount", width: 110 }
  ];

  tableSub = [
    { title: "催收编号", key: "id", width: 100 },
    { title: "催收时间", key: "createTime", width: 140 },
    { title: "催收员用户名", key: "operatorLoginName", width: 100 },
    { title: "催收员名称", key: "operatorName", width: 100 },
    { title: "催收方式", key: "collectionTypeText", width: 100 },
    { title: "联系方式", key: "collectionTypeText", width: 130 },
    { title: "发送内容", key: "collectionContent", width: 300 },
    { title: "催收结果描述", key: "collectionRemark", width: 240 },
    { title: "发送状态", key: "sendStatusText", width: 240 },
    { title: "操作", key: "operate", width: 160, cell: true, align: "center" }
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      permission: "collection:menu"
    }
  ];
  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: "/collectionManage/CollectionRecordAdd",
        state: {
          formInput: this.state.formInput,
          collectionTaskId: this.state.id
        }
      });
    }
  };

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      permission: "collection:menu"
    },
    {
      name: "重发",
      type: "retry",
      key: "sendStatusText",
      value: "失败",
      permission: "collection:menu"
    }
  ];

  lineBtnFn = {
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: "/collectionManage/CollectionRecordUpdate",
        state: {
          collectionTaskId: this.state.id,
          customerId: this.state.customerId,
          id: row.id
        }
      });
    },
    retry: (val, index, row) => {
      Dialog.show({
        title: "重发",
        content: "确认重新发送吗？",
        onOk: () => this.retryOn(row)
      });
    }
  };

  retryOn = row => {
    collectionManageApi.taskResend(row.id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getDataSub()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  };

  getData = () => {
    //当前逾期借据列表
    collectionManageApi.baseInfo(this.state.id).then(res => {
      if (res.data.code === "200") {
        this.setState({
          formInput: res.data.data,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getCollectionDetail = () => {
    //当前逾期借据
    collectionManageApi.overdueLoanDue(this.state.customerId).then(res => {
      if (res.data.code === "200") {
        const data = res.data.data.list;
        delete res.data.data.list;
        let total = res.data.data;
        total.dueId = "合计：";
        data.push(total);
        this.setState({
          data: data,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getDataSub = () => {
    //催收记录
    let data = {
      taskId: this.state.id,
      page: this.state.page,
      limit: this.state.limit
    };
    collectionManageApi.collectionRecord(data).then(res => {
      if (res.data.code === "200") {
        this.setState({
          dataSub: res.data.data.list,
          total: res.data.data.total,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  pageChange = page => {
    this.setState({ page, loading: true }, () => this.getDataSub());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getDataSub());
  };

  detail() {
    this.props.history.push({
      pathname: "/baseinfo/customerInfoNew",
      state: { name: this.state.customerId }
    });
  }

  render() {
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            {/* <p style={{ borderBottom: '1px solid #DDD', paddingBottom: '10px' }}>基本信息</p> */}
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
            >
              <Row>
                <Col span="8">
                  <FormItem style={styles.formItem} label="客户编号:">
                    <p>
                      {this.state.formInput.customerId}
                      <Button
                        type="primary"
                        text
                        style={{ marginLeft: "15px" }}
                        onClick={() => this.detail()}
                      >
                        详情
                      </Button>
                    </p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} label="客户名称:">
                    <p>{this.state.formInput.customerName}</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} label="证件号:">
                    <p>{this.state.formInput.customerIdentifyNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem style={styles.formItem} label="手机号码:">
                    <p>{this.state.formInput.customerPhone}</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} label="EMAIL:">
                    <p>{this.state.formInput.customerMail}</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} label="入催日期:">
                    <p>{this.state.formInput.startTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem style={styles.formItem} label="催收员用户名:">
                    <p>{this.state.formInput.operatorLoginName}</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} label="催收员名称:">
                    <p>{this.state.formInput.operatorName}</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} label="状态:">
                    <p>{this.state.formInput.collectionStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="contain-con">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              当前逾期借据
            </p>
            <DataTable
              col={this.table}
              page={false}
              loadTable={this.state.loading}
              data={this.state.data}
            />
          </div>
          <div className="contain-con collection">
            <p
              style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}
            >
              催收记录
            </p>
            <DataTable
              col={this.tableSub}
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
              data={this.state.dataSub}
            />
          </div>
        </IceContainer>
      </div>
    );
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
    width: "240px"
  },
  formContent: {
    width: "0px",
    border: "none"
  },
  formTextArea: {
    width: "500px"
  }
};
