import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message, Table, Field, Checkbox, Input} from '@alifd/next';
import PasswordCheckRulesApi from '../../../api/SystemSetting/PasswordCheckRules'
import PermissionA from "../../components/PermissionA";
import * as _ from "lodash";

export default class pwdCheckRules extends Component {

  static displayName = 'pwdCheckRules';
  static propTypes = {};
  static defaultProps = {};


  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      loading: false,
      data: [],
      checkList: []
    };
    this.field = new Field(this);
  }

  componentWillMount() {
    this.getData();
  }

  pageChange = (page) => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = (limit) => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getData = () => {
    PasswordCheckRulesApi.PasswordValidList()
      .then((res) => {
        if (res.data.code === '200') {
          const checkList = res.data.data[0].ruleValue.filter((item) => {
            return item.check
          }).map((item) => {
            return item.key
          });
          this.setState({
            data: res.data.data,
            checkList,
            loading: false
          });
          this.field.setValue('0', this.state.checkList);
          this.field.setValue('1', res.data.data[1].ruleValue);
          this.field.setValue('2', res.data.data[2].ruleValue);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  lineBtn = [
    {
      name: '启用',
      type: 'enable',
      key: 'status',
      value: 'DISABLED',
      permission: 'permission:safeoption:passwordvalid:enable'
    },
    {
      name: '停用',
      type: 'disable',
      key: 'status',
      value: 'ENABLED',
      permission: 'permission:safeoption:passwordvalid:disable'
    },
    {name: '保存', type: 'save', permission: 'permission:safeoption:passwordvalid:save'}
  ];

  lineBtnFn = {
    enable: (val, index, record) => {
      this.enable(record.id);
    },
    disable: (val, index, record) => {
      this.disable(record.id);
    },
    save: (val, index, record) => {
      this.save(index, record.id);
    }
  };

  enable = (id) => {
    PasswordCheckRulesApi.PasswordValidEnable(id).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  disable = (id) => {
    PasswordCheckRulesApi.PasswordValidDisable(id).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  save = (idx, id) => {
    const param = this.field.getValue('' + idx);
    let obj;
    if (idx === 0) {
      obj = {};
      param.map((item) => {
        obj[item] = true;
      })
    }
    const value = obj ? JSON.stringify(obj) : param;
    PasswordCheckRulesApi.PasswordValidSave({id, value}).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  renderOptions = (value, index, row) => {
    if (row.ruleCode === "PASSWORD_VALIDATE_RULE") {
      return <Checkbox.Group name={'' + index} {...this.field.init('' + index)} itemDirection="ver">
        {row.ruleValue.map((item, idx) => {
          return <Checkbox key={idx} value={item.key}>{item.value}</Checkbox>
        })}
      </Checkbox.Group>
    } else {
      return <Input name={'' + index} {...this.field.init('' + index)}/>
    }
  };

  renderOperate = (value, index, row) => {
    return this.lineBtn.map((item, idx) => {
      if (item.key && _.findIndex(item.value.split(','), function (o) {
        return o === row[item.key];
      }) === -1) {
        return <PermissionA permission={item.permission} key={idx} href="javascript:;" style={styles.lineDisableBtn}
                            name={item.name}/>;
      }
      return <PermissionA key={idx} permission={item.permission} style={styles.lineBtn} href="javascript:;"
                          onClick={() => this.lineBtnFn[item.type](value, index, row)} name={item.name}/>;
    })
  };

  render() {
    return (
      <IceContainer title="密码校验规则">
        <div>
          <Table
            dataSource={this.state.data}
            emptyContent="暂无数据"
            hasBorder={false}
            fixedHeader={true}
            maxBodyHeight={3500}
            loading={this.state.loading}
          >
            <Table.Column title='规则描述' dataIndex='ruleName' align='left'/>
            <Table.Column title='规则值' dataIndex='ruleValue' width='240px' align='left' cell={this.renderOptions}/>
            <Table.Column title='启用标志' dataIndex='statusText' align='left'/>
            <Table.Column title='选项说明' dataIndex='desc' align='left'/>
            <Table.Column title='操作' dataIndex='operate' align='left' cell={this.renderOperate}/>
          </Table>
        </div>
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
    width: '240px',
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
  headRow: {
    marginBottom: '10px',
    textAlign: 'right',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  lineBtn: {
    marginLeft: '10px',
  },
  lineDisableBtn: {
    marginLeft: '10px',
    color: '#E1E1E1',
  },
};
