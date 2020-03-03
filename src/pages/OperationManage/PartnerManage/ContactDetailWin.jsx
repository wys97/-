import React, {Component} from 'react';
import {Dialog} from '@alifd/next';
import DetailForm from "../../components/DetailForm";

const col = [
  {label: '联系人ID：', require: true, key: 'contactId', unit: '自动生成'},
  {label: '', require: false, key: ''},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '联系人名称：', require: true, key: 'contactName'},
  {label: '联系人类型', require: true, key: 'contactRole'},
  {label: '联系电话：', require: true, key: 'phone'},
  {label: '', require: false, key: ''},
  {label: '联系人证件类型：', require: true, key: 'identityTypeText'},
  {label: '联系人证件号码：', require: true, key: 'identityNo'},
  {label: '职务：', require: true, key: 'contactDuty'},
  {label: '', require: false, key: ''},
  {label: '联系邮箱：', require: false, key: 'contactEmail'},
  {label: '', require: false, key: ''},
  {label: '传真：', require: false, key: 'contactTax'},
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
    return <Dialog title={"联系人信息详情"}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <DetailForm title="" col={col} data={this.props.data} hideBack={true}/>
    </Dialog>
  }
}
