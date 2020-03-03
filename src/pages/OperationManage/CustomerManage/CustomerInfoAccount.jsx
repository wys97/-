import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Grid, Message, Dialog, Form} from '@alifd/next';
import DataTable from '../../dataTable';
import '../OperationManage'
import customerManageApi from '../../../api/OperationManage/CustomerManage';

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

export default class CustomerInfoAccount extends Component {

  static displayName = 'CustomerInfoAccount';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      visible: false,
      formValue: {
        customerId: props.id
      },
      page: 1,
      limit: 10,
      loading: false,
      data: [],
      accountDetail: {}
    };
  }

  table = [
    {title: '账户号码', key: 'accountId', width: 100, cell: true, window: 'accountDetail'},
    {title: '账户名称', key: 'accountName', width: 160},
    {title: '账户类型', key: 'accountType', width: 100},
    {title: '开户银行名称', key: 'bankName', width: 160},
    {title: '账户状态', key: 'accountStatus', width: 100}
  ];

  componentWillMount() {
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = (page) => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    customerManageApi.customerAccount(params).then((res) => {
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

  lineBtnFn = {
    accountDetail: (val) => {
      customerManageApi.customerAccountDetail(val).then((res) => {
        if (res.data.code === '200') {
          this.setState({
            accountDetail: res.data.data,
            visible: true
          })
        } else {
          Message.error(res.data.message)
        }
      })
    }
  };

  onClose = () => {   //关闭新增弹窗
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>账户信息</p>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={true}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
            {/* 详情弹窗 */}
            <Dialog
              style={{width: '60%', height: '80%', borderRadius: '8px'}}
              title=""
              footer={<span/>}
              visible={this.state.visible}
              onOk={this.onClose}
              onCancel={this.onClose}
              onClose={this.onClose}>
              <IceContainer>
                <h3 style={{borderBottom: '1px solid #DDD', paddingBottom: '15px'}}>账户信息</h3>
                <div className='contain-con'>
                  <Form labelTextAlign={'right'}  {...formItemLayout} >
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="客户编号:">
                          <p>{this.state.accountDetail.customerId}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="客户名称:">
                          <p>{this.state.accountDetail.customerName}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构编号:">
                          <p>{this.state.accountDetail.partnerNo}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构名称:">
                          <p>{this.state.accountDetail.partnerName}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="账户号码:">
                          <p>{this.state.accountDetail.accountNo}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="账户状态:">
                          <p>{this.state.accountDetail.accountStatus}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="账户名称:">
                          <p>{this.state.accountDetail.accountName}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="账户用途:">
                          <p>{this.state.accountDetail.accountUsage}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="账户类型:">
                          <p>{this.state.accountDetail.accountType}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="开户银行名称:">
                          <p>{this.state.accountDetail.bankName}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="开户银行代码:">
                          <p>{this.state.accountDetail.bankCode}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="开户银行网点:">
                          <p>{this.state.accountDetail.bankBranch}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="开户银行所在省:">
                          <p>{this.state.accountDetail.bankProvinceName}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="开户银行所在市:">
                          <p>{this.state.accountDetail.bankCityName}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem style={styles.formItem} label="提交时间:">
                          <p>{this.state.accountDetail.createTime}</p>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </IceContainer>
            </Dialog>
          </div>
        </IceContainer>
      </div>
    )
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
    width: '200px'
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
    marginTop: '-50px'
  },
};
