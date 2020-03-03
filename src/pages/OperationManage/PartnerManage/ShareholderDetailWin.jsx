import React, {Component} from 'react';
import {Dialog} from '@alifd/next';
import DetailForm from "../../components/DetailForm";

const col = [
  {label: '股东信息ID：', require: true, key: 'shareholderId', unit: '[自动生成]'},
  {label: '', require: false, key: ''},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '股东名称：', require: true, key: 'shareholderName'},
  {label: '股东类型：', require: true, key: 'shareholderType'},
  {label: '联系电话：', require: true, key: 'phone'},
  {label: '', require: false, key: ''},
  {label: '股权证编号：', require: false, key: 'shareCertificateNo'},
  {label: '', require: false, key: ''},
  {label: '持股比例：', require: true, key: 'shareRatio', unit: '%'},
  {label: '', require: false, key: ''},
  {label: '入股总金额：', require: false, key: 'shareAmount', unit: '元'},
  {label: '币种：', require: false, key: 'shareCurrency'},
  {label: '入股日期：', require: true, key: 'shareDate'},
  {label: '', require: false, key: ''},
  {label: '实际控制人标志：', require: true, key: 'controllerFlag'},
  {label: '', require: false, key: ''},
  {label: '通讯地址：', require: false, key: 'address', row: 2, line: true},
  {label: '备注：', require: false, key: 'remark', row: 2, line: true},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'}
];

export default class ShareholderDetailWin extends Component {
  static displayName = 'ShareholderDetailWin';

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
    return <Dialog title={"股东信息详情"}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <DetailForm title="" col={col} data={this.props.data} hideBack={true}/>
    </Dialog>
  }
}
