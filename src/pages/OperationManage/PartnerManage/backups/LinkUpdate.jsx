import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import DataTable from '../../../components/DataTable';
import partnerManageApi from '../../../../api/OperationManage/PartnerManage';
import '../../OperationManage'

export default class LinkUpdate extends Component {
  static displayName = 'LinkUpdate';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formValue: {}
    };
  }

  table = [
    {title: '联系人ID', key: 'id', width: 200, cell: true},
    {title: '合作机构名称', key: 'partnerName', width: 300},
    {title: '联系人名称', key: 'name', width: 200},
    {title: '联系人类型', key: 'type', width: 200},
    {title: '联系电话', key: 'telephone', width: 200},
    {title: '操作', key: 'operate', width: 200, cell: true}
  ];

  onClose = () => {   //关闭新增弹窗
    this.setState({
      visible: false,
      updateVisible: false
    });
  };

  toolBtn = [
    {
      name: '新增',
      type: 'add',
      icon: 'add',
      //   path: '/baseinfo/partnerAdd'
      permission: ':'
    }
  ];

  lineBtn = [
    {
      name: '修改',
      type: 'edit',
      //   path: '/baseinfo/partnerUpdateTab'
      permission: ':'
    },
    {
      name: '删除',
      type: 'del',
      permission: ':'
    }
  ];

  toolBtnFn = {
    add: () => {
      this.setState({
        visible: true
      });
    }
  };

  lineBtnFn = {
    del: () => {

    }
  };


  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>联系人信息</p>
            <DataTable param={this.state.formValue} col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn}
                       toolBtnFn={this.toolBtnFn} lineBtnFn={this.lineBtnFn} api={partnerManageApi.linkUpdate}/>

          </div>
        </IceContainer>
      </div>
    )
  }
}

/*const styles = {
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
    border: 'none'
  },
  formInputBorder: {
    width: '200px'
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
    marginTop: '-50px'
  },
};*/
