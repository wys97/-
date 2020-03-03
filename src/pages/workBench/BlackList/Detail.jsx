import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Message, Table} from '@alifd/next';
import blackListApi from '../../../api/WorkBench/BlackListApproval'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

export default class Detail extends Component {

  static displayName = 'Detail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      formInput: {
        blackDetail: {
          approvalRecordList: []
        }
      },
    }
  }

  componentWillMount() {
    this.getApprovalDetail();
  }

  componentDidMount() {

  }

  getApprovalDetail = () => {
    blackListApi.detail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        })
      } else {
        Message.error(res.data.message)
      }
    })
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>黑名单详情</h3>
          </div>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="黑名单编号:">
                    <p>{this.state.formInput.blackDetail.blackId}<span>[自动生成]</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="生效标志:">
                    <p>{this.state.formInput.blackDetail.validStatusText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="客户姓名:">
                    <p>{this.state.formInput.blackDetail.customerName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件类型:">
                    <p>{this.state.formInput.blackDetail.identityTypeText}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="证件号:">
                    <p>{this.state.formInput.blackDetail.identityNo}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="数据来源:">
                    <p>{this.state.formInput.blackDetail.blackSourceText}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    <p>{this.state.formInput.blackDetail.creatorName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    <p>{this.state.formInput.blackDetail.createTime}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.state.formInput.blackDetail.modifierName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    <p>{this.state.formInput.blackDetail.modifyTime}</p>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>变更记录</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.state.formInput.blackDetail.approvalRecordList} emptyContent="暂无数据">
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
  formContent: {
    width: '0px',
    border: 'none'
  },
  formTextArea: {
    width: '500px'
  }

};
