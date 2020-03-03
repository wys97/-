import React, {Component} from 'react';

import Overview from '../../components/Overview';
import OperateReportApi from '../../../api/ReportManage/OperateReport';
import IceContainer from '@icedesign/container';
import {Message, Grid, IconGrid, Icon} from "@alifd/next";

const {Row, Col} = Grid;



export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      overdue: {},
      total: {}
    }
  }

  componentWillMount() {
    this.loadReport();
  }

  loadReport = () => {
    OperateReportApi.operateInfo().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          data: res.data.data[0],
          overdue: res.data.data[1],
          total: res.data.data[2]
        });
      } else {
        Message.error(res.data.code);
      }
    });
  };

  render() {
    return (
      <div className="homepage">
        <IceContainer style={styles.container}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3 style={{paddingBottom: '10px', color: '#333'}}>当前运营概况</h3>
          </div>
          <Row justify="center">
            <Col span="8">
              <div style={styles.title}>
                <span>当前在贷余额</span>
              </div>
              <div style={styles.count}>{this.state.data.amountPrincipalLeft}元</div>
            </Col>
            <Col span="8" offset={8}>
              <div style={styles.title}>
                <span>当前授信规模</span>
              </div>
              <div style={styles.count}>{this.state.data.totalLimitAmount}元</div>
            </Col>
          </Row>
        </IceContainer>
        <IceContainer style={styles.container}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3 style={{paddingBottom: '10px', color: '#333'}}>逾期数据</h3>
            </div>
            <Row justify="center">
              <Col span="8">
                <div style={styles.title}>
                  <span>当前逾期总额</span>
                </div>
                <div style={styles.count}>{this.state.overdue.overdueAmount}元</div>
              </Col>
              <Col span="8" offset={8}>
                <div style={styles.title}>
                  <span>当前逾期总人数</span>
                </div>
                <div style={styles.count}>{this.state.overdue.overdueCustomerCount}人</div>
              </Col>
            </Row>
            <Row justify="center">
              <Col span="8">
                <div style={styles.title}>
                  <span>当前逾期本金</span>
                </div>
                <div style={styles.count}>{this.state.overdue.overduePrincipal}元</div>
              </Col>
              <Col span="8">
                <div style={styles.title}>
                  <span>当前逾期利息</span>
                </div>
                <div style={styles.count}>{this.state.overdue.overdueInterest}元</div>
              </Col>
              <Col span="8">
                <div style={styles.title}>
                  <span>当前逾期罚息</span>
                </div>
                <div style={styles.count}>{this.state.overdue.overdueFine}元</div>
              </Col>
            </Row>
        </IceContainer>
        <IceContainer style={styles.container}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3 style={{paddingBottom: '10px', color: '#333'}}>累计数据</h3>
            </div>
            <Row justify="center">
              <Col span="8">
                <div style={styles.title}>
                  <span>累计放款规模</span>
                </div>
                <div style={styles.count}>{this.state.total.totalLoanAmount}元</div>
              </Col>
              <Col span="8">
                <div style={styles.title}>
                  <span>累计收益</span>
                </div>
                <div style={styles.count}>{this.state.total.totalIncomeAmount}元</div>
              </Col>
              <Col span="8">
                <div style={styles.title}>
                  <span>累计放款笔数</span>
                </div>
                <div style={styles.count}>{this.state.total.totalLoanNum}笔</div>
              </Col>
            </Row>
            <Row justify="center">
              <Col span="8">
                <div style={styles.title}>
                  <span>累计放款人数</span>
                </div>
                <div style={styles.count}>{this.state.total.totalBorrowNum}人</div>
              </Col>
              <Col span="8">
                <div style={styles.title}>
                  <span>累计授信人数</span>
                </div>
                <div style={styles.count}>{this.state.total.totalCreditNum}人</div>
              </Col>
              <Col span="8">
                <div style={styles.title}>
                  <span>累计授信成功人数</span>
                </div>
                <div style={styles.count}>{this.state.total.totalCreditPassNum}人</div>
              </Col>
            </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    marginBottom: '15px'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
    marginTop: '10px',
    color: '#666',
    textAlign: 'center',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#5480FE',
    textAlign: 'center',
  },
  desc: {
    fontSize: '12px',
  },
  down: {
    width: '6px',
    height: '9px',
  },
  up: {
    width: '6px',
    height: '9px',
  },
};
