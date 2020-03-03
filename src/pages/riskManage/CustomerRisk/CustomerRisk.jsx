import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Dialog, Form, Grid, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import customerRiskApi from '../../../api/RiskManage/CustomerRisk'

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

export default class CustomerRisk extends Component {

  static displayName = 'CustomerRisk';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      visible: false,
      riskScoeDetail: {},

      formValue1: {
        applyId: '',
      },
      page1: 1,
      limit1: 10,
      loading1: false,
      total1: 0,
      data1: [],

    }
  }

  componentWillMount() {
    this.getRatingResult();
  }

  componentDidMount() {
    this.getData();
  }

  getRatingResult = () => { //产品管理-产品类型-下拉框
    customerRiskApi.ratingResult().then((res) => {
      if (res.data.code === '200') {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            // state中form[7]里面list的key是中文, value是英文
            this.form[7].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          })
        }
      } else {
        Message.error(res.data.message)
      }
    })
  };

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
    customerRiskApi.list(params).then((res) => {
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

  onSubmit(formValue) {

    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true
    }, () => this.getData());
  }

  form = [{
    label: '评分编号',
    key: 'outerRatingNo',
    type: ''
  },
    {
      label: '贷款申请ID',
      key: 'applyId',
      type: ''
    },
    {
      label: '客户名称',
      key: 'customerName',
      type: ''
    },
    {
      label: '证件号',
      key: 'identityNo',
      type: ''
    },
    {
      label: '手机号',
      key: 'phone',
      type: ''
    },
    {
      label: '合作机构名称',
      key: 'partnerName',
      type: ''
    },
    {
      label: '产品名称',
      key: 'productName',
      type: ''
    },
    {
      label: '评级结果',
      key: 'ratingResult',
      type: 'select',
      list: [{
        key: '全部',
        value: ''
      }]
    }
  ];

  table = [{
    title: '评分编号',
    key: 'outerRatingNo',
    width: 100,
    cell: true,
    window: 'riskScoreDetail'
  },
    {
      title: '贷款申请ID',
      key: 'applyId',
      width: 100
    },
    {
      title: '客户名称',
      key: 'customerName',
      width: 100
    },
    {
      title: '证件号',
      key: 'identityNo',
      width: 150
    },
    {
      title: '手机号',
      key: 'phone',
      width: 130
    },
    {
      title: '合作机构名称',
      key: 'partnerName',
      width: 200
    },
    {
      title: '项目名称',
      key: 'projectName',
      width: 160
    },
    {
      title: '产品名称',
      key: 'productName',
      width: 160
    },
    {
      title: '分数',
      key: 'ratingScore',
      width: 60
    },
    {
      title: '评分结果',
      key: 'ratingResultText',
      width: 80
    },
    {
      title: '评分时间',
      key: 'ratingTime',
      width: 140
    }
  ];

  lineBtnFn = {
    riskScoreDetail: (val, index, record) => {
      customerRiskApi.detail(record.applyId).then((res) => {
        if (res.data.code === '200') {
          this.setState({
            riskScoeDetail: res.data.data,
            visible: true,
            formValue1: {applyId: record.applyId}
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
    customerRiskApi.detailList(params).then((res) => {
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

  table1 = [{
    title: '规则名称',
    key: 'ruleName',
    width: 200
  },
    {
      title: '数据来源',
      key: 'ruleSource',
      width: 250
    },
    {
      title: '规则逻辑',
      key: 'ruleLogic',
      width: 200
    },
    {
      title: '规则变量值',
      key: 'ruleValue',
      width: 200
    },
    {
      title: '是否命中',
      key: 'isHit',
      width: 200
    }
  ];

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='客户风控管理' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
        <Dialog
          style={{width: '60%', height: '80%', borderRadius: '8px'}}
          title=""
          isFullScreen={true}
          footer={<span/>}
          visible={this.state.visible}
          onOk={this.onClose}
          onCancel={this.onClose}
          onClose={this.onClose}>
          <IceContainer>
            <h3 style={{borderBottom: '1px solid #DDD', paddingBottom: '15px'}}>客户风控评分详情</h3>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} >
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="评分编号:">
                      <p>{this.state.riskScoeDetail.outerRatingNo}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="申请编号:">
                      <p>{this.state.riskScoeDetail.applyId}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="客户名称:">
                      <p>{this.state.riskScoeDetail.customerName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="手机号:">
                      <p>{this.state.riskScoeDetail.phone}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构名称:">
                      <p>{this.state.riskScoeDetail.partnerName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="产品名称:">
                      <p>{this.state.riskScoeDetail.productName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="评分:">
                      <p>{this.state.riskScoeDetail.ratingScore}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required label="评分结果:">
                      <p>{this.state.riskScoeDetail.ratingResultText}</p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
              <DataTable col={this.table1} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                         page={true}
                         pageSize={this.state.limit1} current={this.state.page1} total={this.state.total1}
                         pageChange={(current) => this.pageChange1(current)}
                         limitChange={(pageSize) => this.limitChange1(pageSize)} loadTable={this.state.loading1}
                         data={this.state.data1}/>
            </div>
          </IceContainer>
        </Dialog>
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
