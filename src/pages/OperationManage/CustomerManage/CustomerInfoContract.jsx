import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import DataTable from '../../dataTable';
import '../OperationManage'
import customerManageApi from '../../../api/OperationManage/CustomerManage';

export default class CustomerInfoContract extends Component {

  static displayName = 'CustomerInfoContract';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      visible: false,
      formValue: {
        customerId: props.id,
      },
      page: 1,
      limit: 10,
      loading: false,
      data: []
    };
  }

  table = [
    {title: '合同编号', key: 'contractNo', width: 200, cell: true},
    {title: '合同类型', key: 'contractType', width: 200},
    {title: '客户名称', key: 'customerName', width: 200},
    {title: '贷款申请ID', key: 'applyId', width: 300},
    {title: '产品名称', key: 'productName', width: 300},
    {title: '合作机构名称', key: 'partnerName', width: 300},
    {title: '合同金额(元)', key: 'loanAmount', width: 200},
    {title: '贷款期限(元)', key: 'loanTerm', width: 200},
    {title: '月利率(%)', key: 'loanInterest', width: 300},
    {title: '操作', key: 'operate', width: 300, cell: true}
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
    customerManageApi.contractList(params).then((res) => {
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


  lineBtn = [
    {
      name: '下载',
      type: 'download'
    }
  ];

  lineBtnFn = {
    download: (val, index, row) => {
      console.log(row.downloadContractUrl)
    }
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>合同信息</p>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={true}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.state.data}/>
          </div>
        </IceContainer>
      </div>
    )
  }
}

/* const styles = {
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
};*/
