import React, {Component} from 'react';
import {Form, Grid, Table} from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;

export default class Detail extends Component {

  static displayName = 'Detail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
  };

  componentDidMount = () => {
  };

  render() {
    return (
        <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>支用记录</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="8">
                  <FormItem style={styles.formItem} required label="支用总额:">
                    <p>{this.props.drawDetailInfo.applyAmountTotal}元</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} required label="借据贷款总金额:">
                    <p>{this.props.drawDetailInfo.loanAmountLeftTotal}元</p>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem style={styles.formItem} required label="借据贷款总余额:">
                    <p>{this.props.drawDetailInfo.loanAmountTotal}元</p>
                  </FormItem>
                </Col>
              </Row>
              <Table dataSource={this.props.drawDetailInfo.applyRecords} emptyContent="暂无数据">
                <Table.Column title='申请编号' dataIndex='applyId' width='200'/>
                <Table.Column title='产品名称' dataIndex='productName' width='100'/>
                <Table.Column title='支用金额 (元) ' dataIndex='applyAmount' width='200'/>
                <Table.Column title='贷款期限' dataIndex='loanTerm' width='300'/>
                <Table.Column title='申请时间' dataIndex='applyTime' width='300'/>
                <Table.Column title='申请状态' dataIndex='applyStatus' width='300'/>
                <Table.Column title='借据编号' dataIndex='dueId' width='300'/>
                <Table.Column title='贷款金额（元）' dataIndex='loanAmount' width='300'/>
                <Table.Column title='贷款余额（元）' dataIndex='loanAmountLeft' width='300'/>
                <Table.Column title='借据期限' dataIndex='startEndDate' width='300'/>
                <Table.Column title='借据状态' dataIndex='dueStatus' width='300'/>
                <Table.Column title='逾期天数' dataIndex='overdueDay' width='300'/>
              </Table>
            </Form>
        </div>
    )
  }
}
const styles = {
  formItem: {
    display: 'flex',
  },
}