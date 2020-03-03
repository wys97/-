import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import DataTable from '../../dataTable';

export default class RepayDetail extends Component {

  static displayName = 'RepayDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  table = [
    {
      title: '借据号',
      key: 'dueId',
      width: 100
    },
    {
      title: '还款流水号',
      key: 'repayRecordId',
      width: 100
    },
    {
      title: '还款类型',
      key: 'repayType',
      width: 100
    },
    {
      title: '扣款方式',
      key: 'debitMethod',
      width: 100
    },
    {
      title: '还款总额 (元) ',
      key: 'repayAmount',
      align: 'right',
      width: 130
    },
    {
      title: '还本金 (元) ',
      key: 'repayPrincipal',
      align: 'right',
      width: 110
    },
    {
      title: '还利息 (元) ',
      key: 'repayInterest',
      align: 'right',
      width: 110
    },
    {
      title: '还罚息 (元) ',
      key: 'repayFine',
      align: 'right',
      width: 110
    },
    {
      title: '还违约金 (元) ',
      key: 'repayDamage',
      align: 'right',
      width: 110
    },
    {
      title: '还款时间',
      key: 'repayBeginTime',
      width: 140
    }
  ];

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>还款明细</p>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={false}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.props.repayDetail}/>
          </div>
        </IceContainer>
      </div>
    )
  }
}
