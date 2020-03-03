import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Dialog, Form, Grid, Input, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import blackListApi from '../../../api/RiskManage/BlackList';
import repayReportApi from "../../../api/ReportManage/RepayReport";

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class BlackList extends Component {

  static displayName = 'BlackList';
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
      blackId: '',
      applyType: '',
      detail: {},
    };
  }

  componentWillMount() {
    // 下拉加载
    this.getValidStatus();
    this.getBlackStatus();
    this.getBlackSource();
  }

  componentDidMount() {
    this.getData();
  }

  getValidStatus = () => {
    blackListApi.validStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let obj = res.data.data;
          let amap = new Map(Object.entries(obj));
          for (let [k, v] of amap) {
            this.form[4].list.push({
              key: v,
              value: k,
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getBlackStatus = () => {
    blackListApi.blackStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let obj = res.data.data;
          let amap = new Map(Object.entries(obj));
          for (let [k, v] of amap) {
            this.form[5].list.push({
              key: v,
              value: k,
            });
          }
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getBlackSource = () => {
    blackListApi.blackSource()
      .then((res) => {
        if (res.data.code === '200') {
          let obj = res.data.data;
          let amap = new Map(Object.entries(obj));
          for (let [k, v] of amap) {
            this.form[3].list.push({
              key: v,
              value: k,
            });
          }
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
    blackListApi.list(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
            page: res.data.data.pageNum,
            limit: res.data.data.pageSize,
            loading: false,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  uploadSuccess = () => {
    Message.success('上传成功');
  };

  uploadFail = () => {
    Message.error('上传失败');
  };

  form = [{
    label: '黑名单编号',
    key: 'blackId',
    type: '',
  },
    {
      label: '客户名称',
      key: 'customerName',
      type: '',
    },
    {
      label: '证件号',
      key: 'identityNo',
      type: '',
    },
    {
      label: '数据来源',
      key: 'blackSource',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: '生效标志',
      key: 'validStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
    {
      label: '状态',
      key: 'blackStatus',
      type: 'select',
      list: [{
        key: '全部',
        value: '',
      }],
    },
  ];

  table = [
    {
      title: '黑名单编号',
      key: 'blackId',
      width: 100,
      cell: true,
      path: '/riskManage/blackdetail',
    },
    {
      title: '客户名称',
      key: 'customerName',
      width: 100,
    },
    {
      title: '证件类型',
      key: 'identityTypeText',
      width: 80,
    },
    {
      title: '证件号',
      key: 'identityNo',
      width: 120,
    },
    {
      title: '数据来源',
      key: 'blackSourceText',
      width: 80,
    },
    {
      title: '生效标志',
      key: 'validStatusText',
      width: 80,
    },
    {
      title: '状态',
      key: 'blackStatusText',
      width: 80,
    },
    {
      title: '操作',
      key: 'operate',
      width: 180,
      cell: true,
    },
  ];

  toolBtn = [{
    name: '批量导入',
    type: 'allImport',
    status: 'Upload',
    upload: {
      action: '/admin-api/blacklist/black-import',
      accept: '.xls,.xlsx',
      onSuccess: this.uploadSuccess,
      onError: this.uploadFail,
      dragable: false
    },
    icon: '',
    // path: '/riskManage/blackaddupdate/add',
    permission: 'risk:risk:blacklist:import'
  }, {
    name: '模板下载',
    type: 'download',
    icon: '',
    // path: '/riskManage/blackaddupdate/add',
    permission: 'risk:risk:blacklist:template-download'
  }, {
    name: '新增',
    type: 'add',
    icon: '',
    // path: '/riskManage/blackaddupdate/add',
    permission: 'risk:risk:blacklist:add'
  }];

  toolBtnFn = {
    add: () => {
      this.props.history.push({pathname: '/riskManage/blackaddupdate/add'});
    },
    download: () => {
      blackListApi.exportExcel()
        .then((res) => {
          let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
          let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);

          let link = document.createElement('a');
          link.download = fileName;
          link.href = URL.createObjectURL(blob);
          link.click();
        });
    }
  };

  lineBtn = [
    {
      name: '修改',
      type: 'edit',
      key: 'blackStatus',
      value: 'INIT' + ',' + 'IN_FAILED' + ',' + 'OUT_PASS',
      permission: 'risk:risk:blacklist:modify'
    },
    {
      name: '进入',
      type: 'goin',
      key: 'blackStatus',
      value: 'INIT' + ',' + 'IN_FAILED' + ',' + 'OUT_PASS',
      permission: 'risk:risk:blacklist:in'
    },
    {
      name: '移出',
      type: 'goout',
      key: 'blackStatus',
      value: 'IN_PASS' + ',' + 'IN_FAILED' + ',' + 'OUT_PASS',
      permission: 'risk:risk:blacklist:out'
    },
    {
      name: '删除',
      type: 'delete',
      key: 'validStatus',
      value: 'INVALID',
      permission: 'risk:risk:blacklist:delete'
    },
  ];

  lineBtnFn = {
    edit: (val, index, row) => {
      this.props.history.push({pathname: '/riskManage/blackaddupdate/update', state: {name: row.blackId}});
    },
    goin: (val, index, row) => {
      this.setState({
        blackId: row.blackId,
        applyType: 'goin',
      }, () => this.getDetail());
    },
    goout: (val, index, row) => {
      this.setState({
        blackId: row.blackId,
        applyType: 'goout',
      }, () => this.getDetail());
    },
    delete: (val, index, row) => {
      Dialog.show({
        title: '删除',
        content: '确认删除吗？',
        onOk: () => this.removeRecord(row.blackId),
      });
    },
  };

  getDetail = () => {
    blackListApi.detail(this.state.blackId)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            detail: res.data.data,
            visible: true,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  removeRecord = (id) => {
    blackListApi.remove(id)
      .then((res) => {
        if (res.data.code === '200') {
          Message.success(res.data.message);
          this.setState({
            loading: true,
          }, () => this.getData());
        } else {
          Message.error(res.data.message);
        }
      });
  };

  submitApply = (v, e) => {
    if (e !== null) {
      return;
    }
    v['blackId'] = this.state.blackId;
    if (this.state.applyType === 'goin') {
      // 进入
      blackListApi.goin(v)
        .then((res) => {
          if (res.data.code === '200') {
            Message.success(res.data.message);
            this.setState({
              visible: false,
              loading: true,
            }, () => this.getData());
          } else {
            Message.error(res.data.message);
          }
        });
    }
    if (this.state.applyType === 'goout') {
      // 移出
      blackListApi.goout(v)
        .then((res) => {
          if (res.data.code === '200') {
            Message.success(res.data.message);
            this.setState({
              visible: false,
              loading: true,
            }, () => this.getData());
          } else {
            Message.error(res.data.message);
          }
        });
    }
  };

  onClose = () => {   //关闭新增弹窗
    this.setState({
      visible: false,
    });
  };

  onSubmit(formValue) {
    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true,
    }, () => this.getData());
  }

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='黑名单管理' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn}
                   lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
        <Dialog
          style={{width: '60%', height: '80%', borderRadius: '8px'}}
          title={this.state.applyType === 'goin' ? '黑名单进入申请' : '黑名单移出申请'}
          isFullScreen={true}
          footer={<span/>}
          visible={this.state.visible}
          onOk={this.onClose}
          onCancel={this.onClose}
          onClose={this.onClose}>
          <IceContainer>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} >
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="黑名单编号:">
                      <p>{this.state.detail.blackId}<span>[自动生成]</span></p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="生效标志:">
                      <p>{this.state.detail.validStatusText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="客户名称:">
                      <p>{this.state.detail.customerName}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="证件类型:">
                      <p>{this.state.detail.identityTypeText}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="证件号:">
                      <p>{this.state.detail.identityNo}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="数据来源:">
                      <p>{this.state.detail.blackSourceText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="申请类型:">
                      <p>{this.state.applyType === 'goin' ? '进入' : '移出'}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="请填写申请原因"
                              label="申请原因:">
                      <Input.TextArea name='applyReason' style={styles.formTextArea}/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="创建人员:">
                      <p>{this.state.detail.creatorName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="创建时间:">
                      <p>{this.state.detail.createTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Form.Submit validate type="primary" style={styles.saveButton}
                             onClick={this.submitApply}>保存</Form.Submit>
              </Form>
            </div>
          </IceContainer>
        </Dialog>
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
    width: '200px',
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
  },
  formTextArea: {
    width: '500px',
  },
};
