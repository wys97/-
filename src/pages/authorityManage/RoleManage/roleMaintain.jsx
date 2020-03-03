import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {CascaderSelect, Dialog, Field, Form, Grid, Input, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import roleMaintainApi from '../../../api/AuthorityManage/RoleMaintain';
import '../../OperationManage';

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

let roleArr = [];

export default class roleMaintain extends Component {

  field = new Field(this);
  static displayName = 'roleMaintain';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      type: 'add',
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      tableData: [],
      roleInfo: { // 弹窗信息
        id: '',
        roleName: '',
        remark: '',
        creatorName: '',
        createTime: '',
        modifierName: '',
        modifyTime: '',
      },
      permissionList: [],
      data: {},
    };
  }

  form = [
    {label: '角色名称', key: 'roleName', type: ''},
  ];

  table = [
    {title: '角色ID', key: 'id', width: 100},
    {title: '角色名称', key: 'roleName', width: 120},
    {title: '角色说明', key: 'remark', width: 180},
    {title: '创建时间', key: 'createTime', width: 140},
    {title: '操作', key: 'operate', width: 200, cell: true},
  ];

  toolBtn = [
    {
      name: '新增',
      type: 'add',
      icon: 'add',
      permission: 'permission:user:role:add'
    },
  ];

  lineBtn = [
    {
      name: '修改',
      type: 'edit',
      permission: 'permission:user:role:modify'
    },
    {
      name: '删除',
      type: 'del',
      permission: 'permission:user:role:delete'
    },
  ];

  toolBtnFn = {
    add: () => {
      this.addRoleFn();
    },
  };

  lineBtnFn = {
    edit: (val, index, row) => {
      this.editRoleFn(row.id);
    },
    del: (val, index, row) => {
      Dialog.show({title: '删除角色', content: '确认删除该角色吗？', onOk: () => this.delRoleFn(row.id)});
    },
  };

  addRoleFn = () => {
    this.field.setValues({
      id: '',
      roleName: '',
      remark: '',
      creatorName: '',
      createTime: '',
      modifierName: '',
      modifyTime: '',
    });
    this.setState({
      visible: true,
      type: 'add',
      roleInfo: {
        id: '',
        roleName: '',
        remark: '',
        creatorName: '',
        createTime: '',
        modifierName: '',
        modifyTime: '',
      },
    });
  };

  editRoleFn = (id) => {
    roleMaintainApi.queryRoleDetail(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
          this.setState({
            visible: true,
            type: 'edit',
            roleInfo: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  delRoleFn = (id) => {
    roleMaintainApi.delRole(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => {
            this.getData();
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  componentWillMount() {
    this.initDropList();
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
    roleMaintainApi.queryRole(params)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            tableData: res.data.data.list,
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

  /*formChange = (value) => {
    this.setState({
      formValue: value,
    });
  };*/

  onSubmit(formValue) {
    this.setState({
      formValue: formValue,
      page: 1,
      limit: 10,
      loading: true,
    }, () => this.getData());
  }

  onClose = () => {   //关闭弹窗
    this.setState({
      visible: false,
      loading: true,
    }, () => {
      this.getData();
    });
  };

  onSave = () => { // 新增修改保存
    let param = this.field.getValues();
    param.permissionCodes = roleArr;
    if (param.permissionCodes.length < 1 || !param.roleName) {
      return;
    }
    if (this.state.type === 'add') {
      this.addRole(param);
    } else {
      if (param.id) {
        this.editRole(param);
      }
    }
  };

  addRole = (param) => {
    roleMaintainApi.addRole(param)
      .then((res) => {
        if (res.data.code === '200') {
          this.onClose(true);
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  editRole = (param) => {
    roleMaintainApi.editRoleInfo(param)
      .then((res) => {
        if (res.data.code === '200') {
          this.onClose(true);
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  initDropList = () => {
    roleMaintainApi.permissionSelectList()
      .then((res) => {
        if (res.data.code === '200') {
          let lists = this.permissionCircle(res.data.data);
          this.setState({permissionList: lists});
        } else {
          Message.error(res.data.message);
        }
      });
  };

  permissionCircle(params) {
    let data = [];
    for (let i = 0; i < params.length; i++) {
      data.push({
        value: params[i].permissionCode,
        label: params[i].text,
        children: params[i].children.length === 0 ? [] : this.permissionCircle(params[i].children),
      });
    }
    return data;
  }

  permission = (value, data, extra) => {
    roleArr = [];
    extra.checkedData.map((item) => {
      roleArr.push(item.value);
    });
    extra.indeterminateData.map((item) => {
      roleArr.push(item.value);
    });
  };

  render() {
    const roleId = this.state.type === 'add' ?
      <FormItem labelTextAlign='right' style={styles.formItem} label="用户ID:">
        [自动生成]
      </FormItem> :
      <FormItem labelTextAlign='right' style={styles.formItem} label="用户ID:" required requiredMessage="用户ID是必填字段">
        {this.state.roleInfo.id}[自动生成]
      </FormItem>;

    return (
      <div>
        <SearchForm form={this.form} title='角色管理' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn}
                   lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.tableData}/>
        {/* 新增修改共用弹窗 */}
        <Dialog
          style={{width: '60%', height: '600px', borderRadius: '8px'}}
          title=""
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}>
          <IceContainer>
            <h3 style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '15px',
            }}>{this.state.type === 'add' ? '新增' : '修改'}角色</h3>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
                <Row>
                  <Col span="24">
                    {roleId}
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="角色名称是必填字段"
                              label="角色名称:">
                      <Input name="roleName"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="权限是必选字段"
                              label="权限配置:">
                      <CascaderSelect followTrigger style={{width: '500px'}} multiple name="permissionCodes"
                                      dataSource={this.state.permissionList} onChange={this.permission}
                                      listStyle={{width: '200px', height: '256px'}}/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="备注:">
                      <Input.TextArea style={{width: '500px'}} name="remark"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      {this.state.roleInfo.creatorName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      {this.state.roleInfo.createTime}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      {this.state.roleInfo.modifierName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      {this.state.roleInfo.modifyTime}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem style={{textAlign: 'center'}}>
                      <Form.Submit style={styles.saveButton} validate onClick={this.onSave}>保存</Form.Submit>
                    </FormItem>
                  </Col>
                </Row>
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
    lineHeight: '28px',
  },
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
  },
  formInputBorder: {
    width: '240px',
  },
  saveButton: {
    borderRadius: '4px',
    width: '80px',
    backgroundColor: '#3080fe',
    color: '#fff',
    borderColor: 'transparent',
  },
};


