import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import aviationIousManage from '../../../api/AirTicketInstallment/AviationIousManage'
import {Message} from "@alifd/next";

const col = [
  {label: '配置编号：', require: true, key: 'id'},
  {label: '状态：', require: true, key: 'statusText'},
  {label: '配置名称：', require: true, key: 'settingName'},
  {label: '', require: false, key: ''},
  {label: '每日放款限额：', require: true, key: 'quota'},
  {label: '', require: false, key: ''},
  {label: '备注：', require: false, key: 'remark',row: 2, line: true},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'},
]

export default class AviationIousDetail extends Component {
  static displayName = 'AviationIousDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      id: this.props.location && this.props.location.state && this.props.location.state.name,
      title: '查看航空白条入口配置'
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.name) {
      this.AviationIousDetailInfo();
    } else {
      this.props.history.push('/myWorkspace/home');
    }
  }

  AviationIousDetailInfo = () => {
    aviationIousManage.whiteStripListDetail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          formValue: res.data.data
        })
      } else {
        Message.error(res.data.message);
      }
    });
  }

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div></div>);
    }
    return (
      <div>
        <DetailForm col={col} data={this.state.formValue} title={this.state && this.state.title}
                    history={this.props.history}></DetailForm>
      </div>
    );
  }
}
