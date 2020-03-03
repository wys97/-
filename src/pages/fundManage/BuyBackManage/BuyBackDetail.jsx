import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Message} from '@alifd/next';
import DataTable from '../../dataTable';
import buyBackManageApi from '../../../api/FundManage/BuyBackManage'

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

export default class BuyBackDetail extends Component {

  static displayName = 'BuyBackDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      formValue: {
        buybackNo: this.props.location && this.props.location.state && this.props.location.state.name
      },
      page: 1,
      limit: 10,
      loading: false,
      data: [],
      formInput: {},
    };
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.name) {
      this.loadDetailInfo();
      this.getData();
    }
  }

  loadDetailInfo = () => {
    buyBackManageApi.buyBackDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formInput: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
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
    buyBackManageApi.detailList(params).then((res) => {
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

  goBack = () => {
    this.props.history.go(-1);
  };

  table = [{
    title: '借据号',
    key: 'dueId',
    width: 200
  },
    {
      title: '合同号',
      key: 'contractNo',
      width: 250
    },
    {
      title: '贷款金额 (元) ',
      key: 'loanAmount',
      width: 200
    },
    {
      title: '贷款余额 (元) ',
      key: 'unpaidPrincipal',
      width: 200
    },
    {
      title: '借据状态',
      key: 'dueStatusText',
      width: 200
    },
    {
      title: '起始日期',
      key: 'valueDate',
      width: 200
    },
    {
      title: '结束日期',
      key: 'dueDate',
      width: 200
    },
    {
      title: '回购金额',
      key: 'buybackTotalAmount',
      width: 200
    }
  ];

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
              <h3>代偿详情</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="回购编号:">
                      <p>{this.state.formInput.buybackNo}<span>[自动生成]</span></p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="回购状态:">
                      <p>{this.state.formInput.statusText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="合作机构编号:">
                      <p>{this.state.formInput.partnerNo}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="合作机构名称:">
                      <p>{this.state.formInput.partnerName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="项目编号:">
                      <p>{this.state.formInput.projectNo}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="项目名称:">
                      <p>{this.state.formInput.projectName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="回购笔数:">
                      <p>{this.state.formInput.totalCount}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="回购总额:">
                      <p>{this.state.formInput.totalAmount}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="回购发起日期:">
                      <p>{this.state.formInput.batchDate}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      <p>{this.state.formInput.createTime}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="完成时间:">
                      <p>{this.state.formInput.endTime}</p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={true}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
          </IceContainer>
        </div>
      );
    }
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
