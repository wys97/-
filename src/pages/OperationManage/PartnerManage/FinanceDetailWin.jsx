import React, {Component} from 'react';
import {Dialog} from '@alifd/next';
import DetailForm from "../../components/DetailForm";

const col = [
  {label: '财务信息ID：', require: true, key: 'financeId', unit: '[自动生成]'},
  {label: '', require: false, key: ''},
  {label: '合作机构编号：', require: true, key: 'partnerNo'},
  {label: '合作机构名称：', require: true, key: 'partnerName'},
  {label: '总资产：', require: true, key: 'totalAsset', unit: '元'},
  {label: '财务报表截止日期：', require: true, key: 'reportEndDate'},
  {label: '总负债：', require: true, key: 'totalLiability', unit: '元'},
  {label: '', require: false, key: ''},
  {label: '流动资产：', require: true, key: 'currentAsset', unit: '元'},
  {label: '流动负债：', require: true, key: 'currentLiability', unit: '元'},
  {label: '所有者权益：', require: true, key: 'ownerEquity', unit: '元'},
  {label: '', require: false, key: ''},
  {label: '销售成本：', require: false, key: 'saleCost', unit: '元'},
  {label: '销售收入：', require: false, key: 'saleRevenue', unit: '元'},
  {label: '所得税：', require: false, key: 'incomeTax', unit: '元'},
  {label: '净利润：', require: false, key: 'netProfit', unit: '元'},
  {label: '经营产生净现金流：', require: false, key: 'netCash', unit: '元'},
  {label: '', require: false, key: ''},
  {label: '借款：', require: false, key: 'borrowAmount', unit: '元'},
  {label: '利息支出：', require: false, key: 'interestExpense', unit: '元'},
  {label: '现金和银行存款：', require: false, key: 'cashAmount', unit: '元'},
  {label: '净资产规模：', require: false, key: 'netAsset', unit: '元'},
  {label: '销售收入复合增长率：', require: false, key: 'saleIncomeGrowth', unit: '%'},
  {label: '销售利润复合增长率：', require: false, key: 'saleProfitGrowth', unit: '%'},
  {label: '资产负债率：', require: false, key: 'assetLiabilityRatio', unit: '%'},
  {label: '', require: false, key: ''},
  {label: '备注：', require: false, key: 'remark', row: 2, line: true},
  {label: '创建人员：', require: false, key: 'creatorName'},
  {label: '创建时间：', require: false, key: 'createTime'},
  {label: '修改人员：', require: false, key: 'modifierName'},
  {label: '修改时间：', require: false, key: 'modifyTime'}
];

export default class FinanceDetailWin extends Component {
  static displayName = 'FinanceDetailWin';

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
    return <Dialog title={"财务信息详情"}
                   style={{width: '1000px', borderRadius: '8px'}}
                   isFullScreen={false}
                   footer={false}
                   onClose={this.onClose}
                   visible={this.props.show}>
      <DetailForm title="" col={col} data={this.props.data} hideBack={true}/>
    </Dialog>
  }
}
