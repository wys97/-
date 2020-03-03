import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Message, Table} from '@alifd/next';
import blackListApi from '../../../api/RiskManage/BlackList';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const FormItem = Form.Item;

export default class BlackDetail extends Component {

  static displayName = 'BlackDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formInput: {
        approvalRecordList: [],  // 变更记录
      },
    };
  }

  componentWillMount = () => {
  };

  componentDidMount = () => {
    if (this.props.location.state !== null && this.props.location.state !== undefined) {
      this.getDetail();
    }
  };

  getDetail = () => {
    blackListApi.detail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            formInput: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>

            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>黑名单详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>

            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="黑名单编号:">
                      <p>{this.state.formInput.blackId}<span>[自动生成]</span></p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="生效标志:">
                      <p>{this.state.formInput.validStatusText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="客户姓名:">
                      <p>{this.state.formInput.customerName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件类型:">
                      <p>{this.state.formInput.identityTypeText}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="证件号:">
                      <p>{this.state.formInput.identityNo}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="数据来源:">
                      <p>{this.state.formInput.blackSourceText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="创建人员:">
                      <p>{this.state.formInput.creatorName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="创建时间:">
                      <p>{this.state.formInput.createTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="修改人员:">
                      <p>{this.state.formInput.modifierName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="修改时间:">
                      <p>{this.state.formInput.modifyTime}</p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>变更记录</p>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Table dataSource={this.state.formInput.approvalRecordList} emptyContent="暂无数据">
                  <Table.Column title='审批编号' dataIndex='approvalId' width='200'/>
                  <Table.Column title='申请类型' dataIndex='applyTypeText' width='300'/>
                  <Table.Column title='申请原因' dataIndex='applyReason' width='300'/>
                  <Table.Column title='申请时间' dataIndex='applyTime' width='300'/>
                  <Table.Column title='审批人员' dataIndex='approverName' width='300'/>
                  <Table.Column title='审批状态' dataIndex='approvalStatusText' width='300'/>
                  <Table.Column title='审批意见' dataIndex='approvalOpinion' width='300'/>
                  <Table.Column title='审批时间' dataIndex='approvalTime' width='300'/>
                </Table>
              </Form>
            </div>

          </IceContainer>
        </div>
      );
    }
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
