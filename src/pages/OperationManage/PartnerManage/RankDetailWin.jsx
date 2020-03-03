import React, {Component} from 'react';
import {Dialog} from '@alifd/next';
import DetailForm from "../../components/DetailForm";

const col = [
  {label: '评级编号：', require: true, key: 'ratingId'},
  {label: '', require: false, key: ''},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '评级结果：', require: true, key: 'partnerRating'},
  {label: '', require: false, key: ''},
  {label: '生效标志：', require: true, key: 'validStatusText'},
  {label: '', require: false, key: ''},
  {label: '评级日期：', require: true, key: 'ratingDate'},
  {label: '', require: false, key: ''},
  {label: '评级原因：', require: false, key: 'ratingReason', row: 2, line: true},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifytime'}
];

export default class CertificateDetailWin extends Component {
  static displayName = 'CertificateDetailWin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      needRefresh: true
    }
  }

  onClose = () => {
    this.props.backFn();
  };

  render() {
    return <Dialog title={"评级信息详情"}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <DetailForm title="" col={col} data={this.props.data} hideBack={true}/>
    </Dialog>
  }
}
