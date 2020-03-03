import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Dialog, Form, Grid, Message} from '@alifd/next';
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

export default class CustomerInfoScoring extends Component {

  static displayName = 'CustomerInfoScoring';
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

      formValue1: {
        applyId: '',
      },
      page1: 1,
      limit1: 10,
      loading1: false,
      data1: [],

      gradeDetail: {},
    };
  }

  table = [
    {title: '评分编号', key: 'outerRatingNo', width: 100, cell: true, window: 'gradeDetail'},
    {title: '客户名称', key: 'customerName', width: 100},
    {title: '贷款申请ID', key: 'applyId', width: 100},
    {title: '产品名称', key: 'productName', width: 160},
    {title: '合作机构名称', key: 'partnerName', width: 160},
    {title: '分数', key: 'ratingScore', width: 60},
    {title: '评分结果', key: 'ratingResult', width: 80},
    {title: '评分时间', key: 'ratingTime', width: 140}
  ];

  subtable = [
    {title: '规则名称', key: 'ruleName', width: 200, cell: true},
    {title: '数据来源', key: 'ruleSource', width: 200},
    {title: '规则逻辑', key: 'ruleLogic', width: 200},
    {title: '规则变量值', key: 'ruleValue', width: 300},
    {title: '是否命中', key: 'isHit', width: 300}
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
    customerManageApi.customerGrade(params).then((res) => {
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
    gradeDetail: (val, index, record) => {
      customerManageApi.customerGradeDetail(record.applyId).then((res) => {
        if (res.data.code === '200') {
          this.setState({
            gradeDetail: res.data.data,
            visible: true,
            formValue1: {
              applyId: record.applyId
            }
          }, () => this.getData1());
        } else {
          Message.error(res.data.message)
        }
      })
    }
  };

  pageChange1 = (page1) => {
    this.setState({page1, loading1: true}, () => this.getData1());
  };

  limitChange1 = (limit1) => {
    this.setState({limit1, loading1: true}, () => this.getData1());
  };

  getData1 = () => {
    let params = {...this.state.formValue1};
    params.page = this.state.page1;
    params.limit = this.state.limit1;
    customerManageApi.ruleList(params).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data1: res.data.data.list,
          total1: res.data.data.total,
          page1: res.data.data.pageNum,
          limit1: res.data.data.pageSize,
          loading1: false
        });
      } else {
        Message.error(res.data.message);
      }
    })
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
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>客户风控评分</p>
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
              isFullScreen={true}
              onOk={this.onClose}
              onCancel={this.onClose}
              onClose={this.onClose}>
              <IceContainer>
                <h3 style={{borderBottom: '1px solid #DDD', paddingBottom: '15px'}}>客户风控评分详情</h3>
                <div className='contain-con'>
                  <Form labelTextAlign={'right'}  {...formItemLayout} >
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="评分编号:">
                          <p>{this.state.gradeDetail.outerRatingNo}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="申请编号:">
                          <p>{this.state.gradeDetail.applyId}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="客户名称:">
                          <p>{this.state.gradeDetail.customerName}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="手机号:">
                          <p>{this.state.gradeDetail.phone}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构名称:">
                          <p>{this.state.gradeDetail.partnerName}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="产品名称:">
                          <p>{this.state.gradeDetail.productName}</p>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="评分:">
                          <p>{this.state.gradeDetail.ratingScore}</p>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="评分结果:">
                          <p>{this.state.gradeDetail.ratingResult}</p>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                  <DataTable col={this.subtable} page={true}
                             pageSize={this.state.limit1} current={this.state.page1} total={this.state.total1}
                             pageChange={(current) => this.pageChange1(current)}
                             limitChange={(pageSize) => this.limitChange1(pageSize)} loadTable={this.state.loading1}
                             data={this.state.data1}/>
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
