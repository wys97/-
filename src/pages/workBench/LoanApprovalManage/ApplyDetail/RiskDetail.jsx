import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Table} from '@alifd/next';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;

export default class RiskDetail extends Component {
  static displayName = 'RiskDetail';

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
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>风控结果</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="评分编号:">
                    <p>{this.props.riskDetailInfo.outerRatingNo}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="评分时间:">
                    <p>{this.props.riskDetailInfo.ratingTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="评分:">
                    <p>{this.props.riskDetailInfo.ratingScore}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="评分结果:">
                    <p>{this.props.riskDetailInfo.ratingResultText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Table dataSource={this.props.riskDetailInfo.riskRules} emptyContent="暂无数据">
                <Table.Column title='规则名称' dataIndex='ruleName' width='200'/>
                <Table.Column title='数据来源' dataIndex='ruleSource' width='300'/>
                <Table.Column title='规则逻辑' dataIndex='ruleLogic' width='300'/>
                <Table.Column title='规则变量值' dataIndex='ruleValue' width='300'/>
                <Table.Column title='是否命中' dataIndex='isHit' width='300' cell={(value) => {
                  return value ? '是' : '否';
                }}/>
              </Table>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formItem: {
    display: 'flex',
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
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
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
    width: '240px',
  },
  formContent: {
    width: '0px',
    border: 'none',
  },
  formTextArea: {
    width: '500px',
  },
};
