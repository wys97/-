import React, {Component} from 'react';
import DetailForm from '../../components/DetailForm';
import loanTypeApi from "../../../api/RiskManage/LoanType";
import {Message} from "@alifd/next";

const col = [
  {label: '借据号：', require: false, key: 'dueId'},
  {label: '分类日期：', require: false, key: 'createTime'},
  {label: '五级状态：', require: false, key: 'categoryTypeText'},
  {label: '上期五级状态', require: false, key: 'categoryTypePreviousText'},
  {label: '逾期天数', require: false, key: 'maxOverdueDay'},
  {label: '', require: false, key: ''},
  {label: '生效标志：', require: false, key: 'validStatusText',},
  {label: '', require: false, key: ''},
  {label: '是否人工调整：', require: false, key: 'manualEver'},
  {label: '', require: false, key: ''},
  {label: '五级状态描述：', require: false, row: 2, key: 'categoryTypeDescribe', line: true},
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
      title: ''
    }
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.name) {
      this.LoanTypeDetailInfo();
    } else {
      this.props.history.push('/myWorkspace/home');
    }
  }

  LoanTypeDetailInfo = () => {
    loanTypeApi.detail(this.state.id).then((res) => {
      if (res.data.code === '200') {
        if(res.data.data.manualEver === false) {
          res.data.data.manualEver = "否"
        } 
        if(res.data.data.manualEver === true) {
          res.data.data.manualEver = "是"
        }
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
