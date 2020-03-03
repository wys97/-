import React, {Component} from 'react';
import {DatePicker, Dialog, Field, Form, Grid, Input, Message, Radio, Select} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import DetailForm from '../../components/DetailForm';
import partnerRiskApi from '../../../api/RiskManage/PartnerRank';

const {Row, Col} = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const rankResult = [{key: 'A', value: 'A'}, {key: 'B', value: 'B'}, {key: 'C', value: 'C'}, {
  key: 'D',
  value: 'D',
}];

const detailCol = [
  {label: '评级编号：', require: true, key: 'ratingId', unit: '[自动生成]'},
  {label: '', require: true, key: ''},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '评级结果：', require: true, key: 'partnerRating'},
  {label: '', require: true, key: ''},
  {label: '生效标志：', require: true, key: 'validStatusText'},
  {label: '', require: true, key: ''},
  {label: '评级日期：', require: true, key: 'ratingDate'},
  {label: '', require: true, key: ''},
  {label: '评级原因：', require: true, key: 'ratingReason'},
  {label: '', require: false, key: ''},
  {label: '创建人员：', require: true, key: 'creatorName'},
  {label: '创建时间：', require: true, key: 'createTime'},
  {label: '修改人员：', require: true, key: 'modifierName'},
  {label: '修改时间：', require: true, key: 'modifytime'},
];

export default class PartnerRank extends Component {

  field = new Field(this);
  static displayName = 'PartnerRank';
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
      rankDetail: {},
      visible_operate: false,
      type_operate: '',
      title_operate: '',
      partner_info: [],
      valid_status: [],
    };
  }

  componentWillMount() {
    this.getValidStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getValidStatus = () => {
    partnerRiskApi.validStatus()
      .then((res) => {
        if (res.data.code === '200') {
          let result = res.data.data;
          if (result !== null && result !== undefined) {
            let amap = new Map(Object.entries(result));
            let valid_status = [];
            for (let [k, v] of amap) {
              this.form[3].list.push({
                key: v,
                value: k,
              });
              valid_status.push({key: k, value: v});
            }
            this.setState({
              refresh: this.state.refresh + 1,
              valid_status,
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
    partnerRiskApi.list(params)
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

  onSubmit(formValue) {
    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true,
    }, () => this.getData());
  }

  form = [{
    label: '合作机构编号',
    key: 'partnerNo',
    type: '',
  },
    {
      label: '合作机构名称',
      key: 'partnerName',
      type: '',
    },
    {
      label: '评级结果',
      key: 'partnerRating',
      type: 'select',
      list: rankResult,
    },
    {
      label: '生效标志',
      key: 'validStatus',
      type: 'select',
      list: [{key: '全部', value: ''}],
    },
  ];

  table = [{
    title: '评级编号',
    key: 'ratingId',
    width: 100,
    cell: true,
    window: 'rankDetail',
  },
    {
      title: '合作机构编号',
      key: 'partnerNo',
      width: 100,
    },
    {
      title: '合作机构名称',
      key: 'partnerName',
      width: 200,
    },
    {
      title: '评级结果',
      key: 'partnerRating',
      width: 100,
    },
    {
      title: '生效标志',
      key: 'validStatus',
      width: 100,
    },
    {
      title: '评级日期',
      key: 'ratingDate',
      width: 100,
    },
    {
      title: '操作',
      key: 'operate',
      width: 100,
      cell: true,
    },
  ];

  toolBtn = [{
    name: '新增',
    type: 'add',
    icon: 'add',
    permission: 'risk:risk:partner-rating:menu'
  }];

  toolBtnFn = {
    add: () => {
      this.addFn();
    },
  };

  lineBtn = [{
    name: '修改',
    type: 'update',
    permission: 'risk:risk:partner-rating:menu'
  },
    {
      name: '删除',
      type: 'delete',
      permission: 'risk:risk:partner-rating:menu'
    }];

  lineBtnFn = {
    update: (val, index, record) => {
      this.updateFn(record.ratingId);
    },
    delete: (val, index, record) => {
      Dialog.show({
        title: '删除',
        content: '确认删除?',
        onOk: () => this.deletePartnerRank(record.ratingId),
      });
    },
    rankDetail: (val, index, record) => { // 点击列表id, 弹窗暂时详情
      partnerRiskApi.detail(record.ratingId)
        .then((res) => {
          if (res.data.code === '200') {
            this.setState({
              rankDetail: res.data.data,
              visible: true,
            });
          } else {
            Message.error(res.data.message);
          }
        });
    },
  };

  addFn = () => {
    this.field = new Field(this);
    partnerRiskApi.partnerInfo()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            partner_info: res.data.data,
            visible_operate: true,
            type_operate: 'add',
            title_operate: '新增合作机构评级',
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  updateFn = (id) => {
    partnerRiskApi.detail(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
          this.setState({
            visible_operate: true,
            type_operate: 'update',
            title_operate: '修改合作机构评级',
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  deletePartnerRank = (id) => {
    const that = this;
    partnerRiskApi.remove(id)
      .then((function (res) {
        if (res.data.code === '200') {
          this.setState({loading: true}, () => that.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      }).bind(this));
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onCloseOperate = () => {
    this.setState({
      visible_operate: false,
    });
  };

  partnerForm = () => {
    if (this.state.type_operate === 'add') {
      // 加载下拉框
      return (
        <Row>
          <Col span="12">
            <FormItem style={styles.formItem} required requiredMessage="请选择合作机构编号" label="合作机构编号:">
              <Select followTrigger name="partnerNo" style={styles.formInputBorder} showSearch hasClear>
                {
                  this.state.partner_info.map((item, index) => {
                    return <Option key={index} value={item.partnerNo}>{item.partnerName}</Option>;
                  })
                }
              </Select>
            </FormItem>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col span="12">
            <FormItem style={styles.formItem} required label="合作机构编号:">
              <p>{this.field.getValue('partnerNo')}</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem style={styles.formItem} required label="合作机构名称:">
              <p>{this.field.getValue('partnerName')}</p>
            </FormItem>
          </Col>
        </Row>
      );
    }
  };

  operateSave = (v, e) => {
    if (e !== null) {
      return;
    }
    let params = {
      'partnerRating': v.partnerRating,
      'validStatus': v.validStatus,
      'ratingDate': v.ratingDate,
      'ratingReason': v.ratingReason,
    };
    if (this.state.type_operate === 'add') {
      params['partnerNo'] = v.partnerNo;
      params['ratingDate'] = new Date(params['ratingDate']).Format('yyyy-MM-dd');
      partnerRiskApi.save(params)
        .then((res) => {
          if (res.data.code === '200') {
            this.setState({
              visible_operate: false,
              loading: true,
            }, () => this.getData());
            Message.success(res.data.message);
          } else {
            Message.error(res.data.message);
          }
        });
    } else {
      params['ratingId'] = v.ratingId;
      partnerRiskApi.update(params)
        .then((res) => {
          if (res.data.code === '200') {
            this.setState({
              visible_operate: false,
              loading: true,
            }, () => this.getData());
            Message.success(res.data.message);
          } else {
            Message.error(res.data.message);
          }
        });
    }
  };

  render() {
    return (
      <div>
        <SearchForm form={this.form} title='合作机构评级' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn}
                   lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>

        <Dialog
          style={{width: '60%', height: '80%', borderRadius: '8px'}}
          title="合作机构评级"
          isFullScreen={true}
          footer={<span/>}
          visible={this.state.visible}
          onOk={this.onClose}
          onCancel={this.onClose}
          onClose={this.onClose}>
          <DetailForm col={detailCol} data={this.state.rankDetail} hideBack={true}/>
        </Dialog>

        <Dialog
          style={{width: '60%', height: '80%', borderRadius: '8px'}}
          title={this.state.title_operate}
          isFullScreen={true}
          footer={<span/>}
          visible={this.state.visible_operate}
          onOk={this.onCloseOperate}
          onCancel={this.onCloseOperate}
          onClose={this.onCloseOperate}>

          <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
            <div className='contain-con'>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="评级编号:">
                    <p>{this.field.getValue('ratingId')}<span> [自动生成] </span></p>
                  </FormItem>
                </Col>
              </Row>
              {this.partnerForm()}
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required requiredMessage="请选择评级结果" label="评级结果:">
                    <Select followTrigger name="partnerRating" style={styles.formInputBorder} hasClear>
                      {
                        rankResult.map((item, index) => {
                          return <Option key={index} value={item.key}>{item.value}</Option>;
                        })
                      }
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required requiredMessage="请选择生效标志" label="生效标志:">
                    <Radio.Group name="validStatus">
                      {
                        this.state.valid_status.map((item, index) => {
                          return <Radio key={index} value={item.key}>{item.value}</Radio>;
                        })
                      }
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required requiredMessage="请选择评级日期" label="评级日期:">
                    <DatePicker followTrigger name="ratingDate"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="评级原因:">
                    <Input.TextArea style={styles.formTextArea} name="ratingReason" placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    <p>{this.field.getValue('creatorName')}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    <p>{this.field.getValue('createTime')}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    <p>{this.field.getValue('modifierName')}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    <p>{this.field.getValue('modifytime')}</p>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <Form.Submit validate type="primary" style={styles.saveButton} onClick={this.operateSave}>保存</Form.Submit>
          </Form>
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
    // width: '200px'
  },
  formInputBorder: {
    width: '240px',
  },
  formTextArea: {
    width: '500px',
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
  },
};
