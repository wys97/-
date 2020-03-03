import React, { Component } from 'react';
import DetailForm from '../../components/DetailForm';
import DataTable from '../../dataTable';
import { Message } from "@alifd/next";
import store from "../../../store";
import userRegisterInfoApi from '../../../api/AppManage/userRegisterInfo'

const col = [
  { label: '', require: false, key: '' },
  { label: '', require: false, key: '' },
  { label: '总积分', require: false, key: 'pointTotal' },
  { label: '已用积分', require: false, key: 'pointUse' },
];

export default class PointsDetailList extends Component {
  static displayName = 'pointsDetailList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: store.getState().productRunManage.productManage.page,
      limit: store.getState().productRunManage.productManage.limit,
      loading: false,
      total: 0,
      data: {},
      id: window.location.hash.split('/')[window.location.hash.split('/').length - 1],
      title: '用户积分明细'
    }
    store.subscribe(() => {
      this.setState({
        page: store.getState().productRunManage.productManage.page,
        limit: store.getState().productRunManage.productManage.limit
      });
    });
  }

  table = [
    { title: '日期', key: 'varyDate', width: 100 },
    { title: '类型', key: 'typeText', width: 100 },
    { title: '积分数', key: 'varyPoints', width: 200 },
  ];

  componentWillMount() {

  }

  componentDidMount = () => {
    this.loadDetailInfo();
    this.getData();
  };


  loadDetailInfo = () => {
    userRegisterInfoApi.pointsDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formValue: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getData = () => {
    let params = {};
    params.id = this.state.id;
    params.page = this.state.page;
    params.limit = this.state.limit;
    userRegisterInfoApi.pointsDetailList(params)
      .then((res) => {
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
      });
  };

  pageChange = page => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  render() {
    return (
      <div>
        <DetailForm col={col}
          data={this.state.formValue}
          title={this.state && this.state.title}
          history={this.props.history} />
        <DataTable col={this.table}
          page={true}
          pageSize={this.state.limit}
          current={this.state.page}
          total={this.state.total}
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data} useVirtual='auto' />
      </div>
    );
  }
}
