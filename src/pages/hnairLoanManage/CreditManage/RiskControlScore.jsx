import React, { Component } from "react";
import {Form, Grid, Table} from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;

export default class RiskControlScore extends Component {
  static displayName = "RiskControlScore";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {};

  componentDidMount = () => {
  };

  render() {
    return (
      <div className="contain-con">
        <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
          风控结果
        </p>
        <Form
          labelTextAlign={"right"}
          {...formItemLayout}
          style={{ marginTop: "30px" }}
        >
          <Row>
            <Col span="12">
              <FormItem style={styles.formItem} label="评分编号:">
                <p>{this.props.detailInfo.outerCreditNo}</p>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style={styles.formItem} label="评分结果:">
                <p>{this.props.detailInfo.riskResultText}</p>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem style={styles.formItem} label="风控评分:">
                <p>{this.props.detailInfo.creditScore}</p>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style={styles.formItem} label="风控额度:">
                <p>{this.props.detailInfo.riskLimit}</p>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem style={styles.formItem} label="评分时间:">
                <p>{this.props.detailInfo.beginTime}</p>
              </FormItem>
            </Col>
          </Row>
          <Table dataSource={this.props.detailInfo.creditRiskResultList} emptyContent="暂无数据">
            <Table.Column title="风险等级" dataIndex="riskType" width="100" />
            <Table.Column title="扫描结果" dataIndex="result" width="100" />
            <Table.Column title="证据链信息" dataIndex="output" width="500" />
          </Table>
        </Form>
      </div>
    );
  }
}
const styles = {
  formItem: {
    display: 'flex',
  },
}
