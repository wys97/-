import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Form, Grid, Table} from "@alifd/next";
import DataTable from "../../dataTable";
import Zmage from 'react-zmage'
import creditManageApi from "../../../api/HnairCreditManage/CreditManage";
import CustomerAccountInfo from "../../OperationManage/customerManageNew/CustomerAccountInfo";

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const FormItem = Form.Item;

export default class Detail extends Component {
  static displayName = "Detail";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      basicInfo: {},
      image: [],
      jobInfo: {},
      addressInfo: {},
      page: 1,
      limit: 3,
      total: 0,
      loading: false,
    };
  }

  table = [
    { title: "影像资料编号", key: "id", width: 100 },
    { title: "客户名称", key: "customerName", width: 100 },
    { title: "影像资料类型", key: "imageType", width: 100 },
    {
      title: "详情",
      key: "imageKey",
      width: 100,
      align: "center"
    }
  ];



  componentWillMount = () => {};

  componentDidMount = () => {
    this.getUserinfo();
  };

  getUserinfo = () => {
    creditManageApi
      .detailAccountList(this.props.detailInfo.customerId)
      .then(res => {
        if (res.data.code === "200") {
          this.setState({
            basicInfo: res.data.data.basicInfo,
            jobInfo: res.data.data.jobInfo,
            addressInfo: res.data.data.addressInfo
          });
        }
      });
    let params = {};
    params.page = this.state.page;
    params.limit = this.state.limit;
    params.customerId = this.props.detailInfo.customerId;
    creditManageApi.listImageByCustomer(params).then(res => {
      if (res.data.code === "200") {
        Object.keys(res.data.data.list).map(item => {
          res.data.data.list[item].imageKey = (
            <Zmage
              src={
                "/admin-api-hnair/customer-info/getImage/" + res.data.data.list[item].id
              }
              style={{ width: "100px", height: "50px" }}
            />
          );
        });
        this.setState({
          image: res.data.data.list
        });
      }
    });
  };


  render() {
    return (
      <div>
        <IceContainer>
          <Form
            labelTextAlign={"right"}
            {...formItemLayout}
            style={{ marginTop: "30px" }}
          >
            <div className="contain-con">
              <p
                style={{
                  borderBottom: "1px solid #DDD",
                  paddingBottom: "10px"
                }}
              >
                授信信息
              </p>
              <Row>
                <Col span="12">
                  <FormItem
                    style={styles.formItem}
                    required
                    label="授信申请编号:"
                  >
                    <p>
                      {this.props.detailInfo.id}
                      <span>[自动生成]</span>
                    </p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="状态:">
                    <p>{this.props.detailInfo.creditStatus}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="授信类型:">
                    <p>{this.props.detailInfo.creditType}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品编号:">
                    <p>{this.props.detailInfo.productNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="产品名称:">
                    <p>{this.props.detailInfo.productName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户编号:">
                    <p>{this.props.detailInfo.customerId}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户名称:">
                    <p>{this.props.detailInfo.customerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.props.detailInfo.identityType}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号:">
                    <p>{this.props.detailInfo.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="手机号:">
                    <p>{this.props.detailInfo.phone}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="授信结果:">
                    <p>{this.props.detailInfo.creditResult}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="授信额度:">
                    <p>{this.props.detailInfo.creditLimit}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    style={styles.formItem}
                    required
                    label="授信有效期:"
                  >
                    <p>{this.props.detailInfo.dueDate}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="申请时间:">
                    <p>{this.props.detailInfo.applyTime}</p>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div className="contain-con">
              <p
                style={{
                  borderBottom: "1px solid #DDD",
                  paddingBottom: "10px"
                }}
              >
                用户基本资料
              </p>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="月收入:">
                    <p>{this.state.jobInfo.salaryRange}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="单位名称:">
                    <p>{this.state.jobInfo.companyName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="现居住地:">
                    <p>{this.state.addressInfo.houseAreaName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="详细地址:">
                    <p>{this.state.addressInfo.houseAddress}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="邮箱:">
                    <p>{this.state.basicInfo.email}</p>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Form>
          <div className="contain-con">
            <p
              style={{
                borderBottom: "1px solid #DDD",
                paddingBottom: "10px"
              }}
            >
              账户信息
            </p>
            <CustomerAccountInfo id={this.props.detailInfo.customerId} />
          </div>
          <div className="contain-con">
            <p
              style={{
                borderBottom: "1px solid #DDD",
                paddingBottom: "10px"
              }}
            >
              影像资料
            </p>
            <DataTable
              col={this.table}
              lineBtn={this.lineBtns}
              lineBtnFn={this.lineBtnFns}
              page={true}
              pageSize={this.state.limit}
              current={this.state.page}
              total={this.state.total}
              pageChange={current => this.pageChange(current)}
              limitChange={pageSize => this.limitChange(pageSize)}
              loadTable={this.state.loading}
              data={this.state.image}
            />
          </div>
          <div className="contain-con">
            <p
              style={{
                borderBottom: "1px solid #DDD",
                paddingBottom: "10px"
              }}
            >
              合同信息
            </p>
            <Table dataSource={this.props.contractInfo} emptyContent="暂无数据">
              <Table.Column title='合同编号' dataIndex='contractNo' width='200'/>
              <Table.Column title='合同名称' dataIndex='contractName' width='300' />
              <Table.Column title='产品名称' dataIndex='productName' width='300'/>
              <Table.Column title='客户名称' dataIndex='customerName' width='300'/>
              <Table.Column title='状态' dataIndex='contractStatus' width='300'/>
              <Table.Column title='操作' width='300' cell={(value, index, record) => {
                return <a href={record.url} target='_blank'>下载</a>
              }}/>
            </Table>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: "flex"
  }
};
