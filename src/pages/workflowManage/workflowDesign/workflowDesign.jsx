import React, {Component} from 'react';
import {Dialog, Field, Message} from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import userMaintainApi from '../../../api/AuthorityManage/UserMaintain';
import '../../OperationManage';

export default class workflowDesign extends Component {

  field = new Field(this);
  static displayName = 'workflowDesign';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      type: 'add',
      refresh: 0, // 用于刷新表格
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: [],
      userInfo: { // 弹窗信息
        id: '',
        loginName: '',
        operatorName: '',
        loginPassword: '',
        roles: null,
        roleIds: [],
        remark: '',
        creatorName: '',
        createTime: '',
        modifierName: '',
        modifyTime: '',
      },
      roleList: [],
      form: [
        {label: '流程名称', key: 'loginName', type: ''}
      ],
    };
  }

  table = [
    {title: '流程编号', key: 'id', width: 180, cell: true, path: '/dispatchPlatform/taskDetail'},
    {title: '流程名称', key: 'loginName', width: 200},
    {title: '流程描述', key: 'operatorName', width: 300},
    {title: '操作', key: 'operate', width: 320, cell: true},
  ];

  toolBtn = [
    {
      name: '新增',
      type: 'add',
      icon: 'add'
      // path: '/baseinfo/productAdd'
    },
  ];

  lineBtn = [
    {
      name: '修改',
      type: 'edit'
    },
    {
      name: '删除',
      type: 'del'
    },
  ];

  toolBtnFn = {
    add: () => {
      this.field.setValues({
        id: '',
        loginName: '',
        operatorName: '',
        loginPassword: '',
        roles: null,
        roleIds: [],
        remark: '',
        creatorName: '',
        createTime: '',
        modifierName: '',
        modifyTime: '',
      });
      this.setState({
        visible: true,
        type: 'add',
        userInfo: {
          id: '',
          loginName: '',
          operatorName: '',
          loginPassword: '',
          roles: null,
          roleIds: [],
          remark: '',
          creatorName: '',
          createTime: '',
          modifierName: '',
          modifyTime: '',
        },
      });
    }
  };

  lineBtnFn = {
    edit: (val, index, row) => {
      userMaintainApi.queryUserDetail(row.id)
        .then((res) => {
          if (res.data.code === '200') {
            this.field.setValues(res.data.data);
            this.setState({
              visible: true,
              type: 'edit',
              userInfo: res.data.data,
            });
          } else {
            Message.error(res.data.message);
          }
        });
    },
    del: (val, index, row) => {
      Dialog.show({title: '删除工作流', content: '确认删除该工作流吗？', onOk: () => this.resetPwdFn(row.id)});
    },
  };

  /*turnOnFn = (id) => {
    userMaintainApi.enableUser(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };*/

  /*turnOffFn = (id) => {
    userMaintainApi.disableUser(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };*/

  resetPwdFn = (id) => {
    userMaintainApi.resetUserPwd(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
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
    userMaintainApi.queryUser(params)
      .then((res) => {
        if (res.data.code === '200') {
          let data = res.data.data.list;
          const dataList = [];
          data.map((item) => {
            for (const key in item) {
              if (Array.isArray(item[key])) {
                item[`${key}Str`] = item[key].join('、');
              }
            }
            dataList.push(item);
          });
          this.setState({
            data: dataList,
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

  onClose = (flag) => {   //关闭弹窗
    this.setState({
      visible: false,
    });
    flag && this.setState({refresh: this.state.refresh + 1});
  };

  /*onSave = () => { // 新增修改保存
    let param = this.field.getValues();
    if (param.roleIds.length < 1 || !param.operatorName) {
      return;
    }
    if (this.state.type === 'add') {
      if (!(param.loginName && param.loginPassword)) {
        return;
      }
      this.addUser(param);
    } else {
      if (param.id) {
        this.editUser(param);
      }
    }
  };*/

  /*addUser = (param) => {
    userMaintainApi.addUser(param)
      .then((res) => {
        if (res.data.code === '200') {
          this.onClose(true);
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
          //window.location.reload();
        } else {
          Message.error(res.data.message);
        }
      });
  };*/

  /*editUser = (param) => {
    userMaintainApi.editUserInfo(param)
      .then((res) => {
        if (res.data.code === '200') {
          this.onClose(true);
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
          // window.location.reload();
        } else {
          Message.error(res.data.message);
        }
      });
  };*/

  initDropList = () => {
    userMaintainApi.roleSelectList()
      .then((res) => {
        if (res.data.code === '200') {
          let lists = [];
          let selectList = [
            {key: '全部', value: ''},
          ];
          for (let key in res.data.data) {
            lists.push({value: key, label: res.data.data[key]});
            selectList.push({key: res.data.data[key], value: key});
          }
          this.setState({roleList: lists});
          this.state.form.map((item, index) => {
            if (item.key === 'roleId') {
              this.state.form[index].list = selectList;
              let forms = this.state.form;
              this.setState({
                form: forms,
              });
            }
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  render() {
    return (
      <div>
        <SearchForm form={this.state.form} title='工作流设计' onSubmit={(formValue) => this.onSubmit(formValue)}/>
        <DataTable col={this.table} toolBtn={this.toolBtn} toolBtnFn={this.toolBtnFn} lineBtn={this.lineBtn}
                   lineBtnFn={this.lineBtnFn} page={true}
                   pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                   pageChange={(current) => this.pageChange(current)}
                   limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                   data={this.state.data}/>
      </div>
    );
  }
}

/*const styles = {
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
};*/
