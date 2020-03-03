import React, {Component} from 'react';
import {Dialog} from '@alifd/next';
import DetailForm from "../../components/DetailForm";

const col = [
  {label: '资质信息ID：', require: true, key: 'certificateId'},
  {label: '', require: false, key: ''},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '资质证书编号：', require: false, key: 'certificateNo'},
  {label: '', require: false, key: ''},
  {label: '资质证书名称：', require: true, key: 'certificateName'},
  {label: '资质等级：', require: true, key: 'certificateLevel'},
  {label: '发证日期：', require: true, key: 'issueDate'},
  {label: '到期日期：', require: true, key: 'endDate'},
  {label: '发证机关：', require: true, key: 'issueOrgan'},
  {label: '', require: false, key: ''},
  {label: '资质证书描述：', require: false, key: 'certificateDescription', row: 2, line: true},
  {label: '备注：', require: false, key: 'remark', row: 2, line: true},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'}
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
    return <Dialog title={"资质信息详情"}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <DetailForm title="" col={col} data={this.props.data} hideBack={true}/>
    </Dialog>
  }
}
