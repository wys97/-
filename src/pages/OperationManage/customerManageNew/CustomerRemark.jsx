import React, {Component} from "react";
import DataTable from "../../dataTable";
import IceContainer from "@icedesign/container";
import customerManageNewApi from "../../../api/OperationManage/CustomerManageNew";
import {Dialog, Message, Grid, Form, Field, Input} from "@alifd/next";

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;

export default class CustomerRemark extends Component {
  field = new Field(this);
  static displayName = "CustomerRemark";
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
  ];

  lineBtn = [];

  lineBtnFn = {
    detail: (val, index, row) => {
      this.getDetail(row.accountId);
    },
  };

  getDetail = id => {
    //备注信息详情
    customerManageNewApi.ReadRemarkRemark(id).then(res => {
      if (res.data.code === "200") {
        this.field.setValues(res.data.data.list);
        this.setState({
          visible: true,
          type: "detail"
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onClose = () => {
    //关闭弹窗
    this.setState({
      visible: false
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
            formInput: res.data.data.list
          });
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
          style={{width: "60%", height: "600px", borderRadius: "8px"}}
          title=""
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <IceContainer>
            <h3
              style={{borderBottom: "1px solid #DDD", paddingBottom: "10px"}}
            >
              查看客户备注信息
            </h3>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{marginTop: "30px"}}
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
                    <span style={{lineHeight: "28px"}}>
                      {this.field.getValue("id")}[自动生成]
                    </span>
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
                    <span style={{lineHeight: "28px"}}>
                      {this.field.getValue("remarkContent")}
                    </span>
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
