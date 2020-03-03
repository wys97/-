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

  componentWillMount = () => {
  };

  componentDidMount = () => {
  };

  table = [{
    title: '借据号',
    key: 'dueId',
    width: 100,
  },
    {
      title: '逾期期次',
      key: 'periodNo',
      width: 100,
    },
    {
      title: '应还日期',
      key: 'dueDate',
      width: 100,
    },
    {
      title: '逾期天数',
      key: 'overDueDays',
      width: 80,
    },
    {
      title: '逾期应还本金 (元) ',
      key: 'principal',
      align: 'right',
      width: 110,
    },
    {
      title: '逾期应还利息 (元) ',
      key: 'interest',
      align: 'right',
      width: 110,
    },
    {
      title: '逾期应还罚息 (元) ',
      key: 'fine',
      align: 'right',
      width: 110,
    },
    {
      title: '已还本金 (元) ',
      key: 'repayPrincipal',
      align: 'right',
      width: 110,
    },
    {
      title: '已还利息 (元) ',
      key: 'repayInterest',
      align: 'right',
      width: 110,
    },
    {
      title: '已还罚息 (元) ',
      key: 'repayFine',
      align: 'right',
      width: 110,
    },
    {
      title: '调整本金 (元) ',
      key: 'decreasePrincipal',
      align: 'right',
      width: 110,

    },
    {
      title: '调整利息 (元) ',
      key: 'decreaseInterest',
      align: 'right',
      width: 110,
    },
    {
      title: '调整罚息 (元) ',
      key: 'decreaseFine',
      align: 'right',
      width: 110,
    },
    {
      title: '未还总额 (元) ',
      key: 'remainTotal',
      align: 'right',
      width: 130,
    },
    {
      title: '结清标志',
      key: 'isClearText',
      width: 100,
    },
    {
      title: '结清日期',
      key: 'clearTime',
      width: 100,
    },
  ];

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>逾期明细</p>
            <DataTable col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                       page={false}
                       pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                       pageChange={(current) => this.pageChange(current)}
                       limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                       data={this.props.overdueDetail}/>
          </div>
        </IceContainer>
      </div>
    );
  }
}
