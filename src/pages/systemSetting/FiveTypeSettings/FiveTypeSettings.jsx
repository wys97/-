import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Dialog, Field, Form, Grid, Input, Message} from '@alifd/next';
import DetailForm from '../../components/DetailForm';
import DataTable from '../../dataTable';
import fiveTypeSettingsApi from '../../../api/SystemSetting/FiveTypeSettings';

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const col = [
  {label: '矩阵ID：', require: true, key: 'matrixId'},
  {label: '', require: true, key: ''},
  {label: '五级分类状态：', require: true, key: 'categoryType'},
  {label: '', require: false, key: ''},
  {label: '逾期最小天数：', require: true, key: 'minOverdueDay'},
  {label: '逾期最大天数：', require: true, key: 'maxOverdueDay'},
  {label: '备注：', require: false, key: 'remark'},
  {label: '', require: true, key: ''},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'},
];

export default class FiveTypeSettings extends Component {

  field = new Field(this);
  static displayName = 'FiveTypeSettings';
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
      detailData: {},
      visible1: false,
      visible2: false,
    };
  }

  table = [
    {title: '矩阵ID', key: 'matrixId', width: 100, cell: true, window: 'detail'},
    {title: '五级分类状态', key: 'categoryType', width: 120},
    {title: '逾期最小天数', key: 'minOverdueDay', width: 120},
    {title: '逾期最大天数', key: 'maxOverdueDay', width: 120},
    {title: '操作', key: 'operate', width: 100, cell: true},
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
    fiveTypeSettingsApi.list(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            data: res.data.data,
            loading: false,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  lineBtn = [
    {name: '修改', type: 'edit',permission:'setting:risk:loan-category:modify'},
  ];

  lineBtnFn = {
    detail: (val) => {
      this.getDetail(val);
    },
    edit: (val, index, record) => {
      this.edit(record.matrixId);
    },
  };

  getDetail = (id) => {
    fiveTypeSettingsApi.get(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            visible1: true,
            detailData: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  edit = (id) => {
    fiveTypeSettingsApi.get(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            visible2: true,
          });
          this.field.setValues(res.data.data);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  onClose1 = () => {   //关闭弹窗
    this.setState({
      visible1: false,
    });
  };
  onClose2 = () => {   //关闭弹窗
    this.setState({
      visible2: false,
    });
  };

  save = (v, e) => {
    if (e !== null) {
      return;
    }
    fiveTypeSettingsApi.update(v)
      .then((res) => {
        if (res.data.code === '200') {
          Message.success(res.data.message);
          this.setState({
            visible2: false,
            loading: true,
          }, () => this.getData());
        } else {
          Message.error(res.data.message);
        }
      });
  };

  render() {
    // height: 16px; line-height: 16px; font-size: 16px; color: rgb(51, 51, 51); font-weight: bold; margin: 0px 0px 20px; padding: 0px;
    return (
      <IceContainer title="五级分类矩阵">
        <div>
          <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                     page={false}
                     pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                     pageChange={(current) => this.pageChange(current)}
                     limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                     data={this.state.data}/>
        </div>
        <Dialog
          style={{width: '60%', height: '600px', borderRadius: '8px'}}
          title="五级分类配置信息详情"
          footer={false}
          visible={this.state.visible1}
          onClose={this.onClose1}>
          <DetailForm col={col} data={this.state.detailData} hideBack={true}/>
        </Dialog>
        <Dialog
          style={{width: '60%', height: '650px', borderRadius: '8px'}}
          title="五级分类配置信息修改"
          footer={false}
          visible={this.state.visible2}
          onClose={this.onClose2}>
          <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
            <div className='contain-con'>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="矩阵ID:">
                    <p>{this.field.getValue('matrixId')}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="五级分类状态:">
                    <p>{this.field.getValue('categoryType')}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="最小逾期天数:"
                            required requiredMessage="请填写最小逾期天数"
                            format='number' formatMessage="最小逾期天数填写数字">
                    <Input name="minOverdueDay" placeholder=""/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="最大逾期天数:"
                            required requiredMessage="请填写最大逾期天数"
                            format='number' formatMessage="最大逾期天数填写数字">
                    <Input name="maxOverdueDay" placeholder=""/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="备注:">
                    <Input.TextArea style={styles.formTextArea} name="remark" placeholder=""/>
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
                    <p>{this.field.getValue('modifyTime')}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="" style={{textAlign: 'center'}}>
                    <Form.Submit validate style={styles.saveButton} onClick={this.save}>保存</Form.Submit>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Form>
        </Dialog>
      </IceContainer>
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
    width: '200px',
  },
  formTextArea: {
    width: '500px',
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent',
  },
};
