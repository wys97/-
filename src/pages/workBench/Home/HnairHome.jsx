import React, {Component} from 'react';
import hnairHomeApi from '../../../api/WorkBench/hnairHome'
import Overview from '../../components/Overview';
import {Button, Form, Grid, Message} from "@alifd/next";
import {Axis, Chart, Geom, Legend, Tooltip} from 'bizcharts';
import DataSet from '@antv/data-set';
import {Link} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import {getAuthority} from "../../../utils/authority";

const formItemLayout = {
  labelCol: {xxs: 8, s: 6, l: 4, span: 10, offset: 1},
  wrapperCol: {s: 6, l: 6, span: 12}
};

const {Row, Col} = Grid;
const FormItem = Form.Item;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      overviewInfo: [],
      todoList: {},
      todaySituation: {},
      loanData: {},
      repayData: {},
      pieChartCol: {
        percent: {
          formatter: val => {
            val = val * 100 + '%';
            return val;
          }
        }
      },
      loanButtonType: 'day',
      repayButtonType: 'day',
      mapData: [],
      listInfo: []
    }
  }

  componentWillMount() {
    if (getAuthority().indexOf('workbench:workbench:home:menu') === -1) {
      this.setState({
        show: false
      })
    } else {
      this.loadHomeData();
      this.setState({
        show: true
      })
    }
  }

  loadHomeData = () => {
    hnairHomeApi.collect().then((res) => {
      if (res.data.code === '200') {
        let overviewInfo = [
          {label: '当前放款余额（元）', value: res.data.data.currentLoanBalance},
          {label: '累计放款金额（元）', value: res.data.data.totalLoanAmount},
          {label: '累计授信申请人数（人）', value: res.data.data.totalCreditNum},
          {label: '累计收益金额（元）', value: res.data.data.totalIncomeAmount}
        ];
        this.setState({
          overviewInfo
        });
      } else {
        Message.error(res.data.message);
      }
    });
    hnairHomeApi.todoList().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          todoList: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
    hnairHomeApi.todaySituation().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          todaySituation: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
    this.selectLoanTrend('day');
    this.selectRepayTrend('day');
  };


  selectLoanTrend = (date) => {
    this.selectTrend('loan', date);
  };

  selectRepayTrend = (date) => {
    this.selectTrend('repay', date);
  };

  selectTrend = (queryType, dateType) => {
    const queryType1 = queryType;
    hnairHomeApi.trendChart({queryType, dateType}).then((res) => {
      if (res.data.code === '200') {
        let data = [];
        if (queryType1 === 'loan') {
          res.data.data.map((item) => {
            data.push({
              label: item.date,
              放款金额: item.sumAmountDouble,
              text: item.sumAmountString,
              放款笔数: item.count
            })
          });
          const ds = new DataSet();
          const dv = ds.createView().source(data);
          dv.transform({
            type: 'fold',
            fields: ['放款金额'], // 展开字段集
            key: 'type', // key字段
            value: 'value', // value字段
          });
          this.setState({
            loanData: dv,
            loanButtonType: dateType,
          })
        } else {
          res.data.data.map((item) => {
            data.push({
              label: item.date,
              还款金额: item.sumAmountDouble,
              text: item.sumAmountString,
              还款笔数: item.count
            })
          });
          const ds = new DataSet();
          const dv = ds.createView().source(data);
          dv.transform({
            type: 'fold',
            fields: ['还款金额'], // 展开字段集
            key: 'type', // key字段
            value: 'value', // value字段
          });
          this.setState({
            repayData: dv,
            repayButtonType: dateType,
          })
        }
      } else {
        Message.error(res.data.message);
      }
    })
  };

  render() {
    const scale = {
      放款笔数: {
        type: 'linear'
      },
      label: {
        range: [0.05, 0.95]
      }
    };

    const scale1 = {
      还款笔数: {
        type: 'linear'
      },
      label: {
        range: [0.05, 0.95]
      }
    };

    return (
      <div className="homepage" style={this.state.show ? {} : {height: 'calc(100% - 20px)'}}>
        {
          this.state.show ?
            <div>
              <Overview data={this.state.overviewInfo}/>
              <Row gutter="15">
                <Col xxs="24" s="24" l="24">
                  <IceContainer>
                    <div style={{paddingBottom: '20px', height: '100px'}}> {/*, borderBottom: '1px solid #BBB'*/}
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3 style={{paddingBottom: '10px', color: '#333', marginTop: '2px'}}>待办事项</h3>
                      </div>
                      <Form labelTextAlign={'right'}  {...formItemLayout}>
                        <Row wrap>
                          <Col xxs="24" s="12" l="6">
                            <FormItem
                              label="支用审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 6}}
                            >

                              {/* 链接支用审批 */}
                              <Link
                                to="/approvalManage/loan">{this.state.todoList.loanNum ? this.state.todoList.loanNum : 0}</Link>
                              {/* <span>{this.state.todoList.loanNum ? this.state.todoList.loanNum : 0}</span> */}
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="6">
                            <FormItem
                              label="授信审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 6}}
                            >

                              {/* 链接支用审批 */}
                              <Link
                                to="/approvalManage/credit">{this.state.todoList.creditNum ? this.state.todoList.creditNum : 0}</Link>
                              {/* <span>{this.state.todoList.loanNum ? this.state.todoList.loanNum : 0}</span> */}
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="6">
                            <FormItem
                              label="线下还款登记审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 6}}
                            >
                              <Link
                                to="/approvalManage/offlineRepay">{this.state.todoList.repayOfflineNum ? this.state.todoList.repayOfflineNum : 0}</Link>
                              {/* <span>{this.state.todoList.repayOfflineNum ? this.state.todoList.repayOfflineNum : 0}</span> */}
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="6">
                            <FormItem
                              label="息费减免审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 6}}
                            >
                              <Link
                                to="/approvalManage/feeWaiver">{this.state.todoList.decreaseInterestNum ? this.state.todoList.decreaseInterestNum : 0}</Link>
                              {/* <span>{this.state.todoList.decreaseInterestNum ? this.state.todoList.decreaseInterestNum : 0}</span> */}
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="6">
                            <FormItem
                              label="黑名单审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 6}}
                            >
                              <Link
                                to="/approvalManage/blacklist">{this.state.todoList.blacklistNum ? this.state.todoList.blacklistNum : 0}</Link>
                              {/* <span>{this.state.todoList.blacklistNum ? this.state.todoList.blacklistNum : 0}</span> */}
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </IceContainer>
                </Col>
              </Row>


              <Row gutter="15">
                <Col xxs="24" s="24" l="12">
                  <IceContainer>
                    <div style={{paddingBottom: '20px', height: '100px'}}> {/*, borderBottom: '1px solid #BBB'*/}
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3 style={{paddingBottom: '10px', color: '#333', marginTop: '2px'}}>今日放款报表</h3>
                      </div>
                      <Form labelTextAlign={'right'}  {...formItemLayout}>
                        <Row wrap>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="放款金额（元）:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              {/* <Link
                                                                to="/approvalManage/loan">{this.state.todaySituation.loanAmount ? this.state.todaySituation.loanAmount : 0}</Link> */}
                              <span>{this.state.todaySituation.loanAmount ? this.state.todaySituation.loanAmount : 0}</span>
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="放款笔数（笔）:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              {/* <Link
                                                                to="/approvalManage/deductChange">{this.state.todaySituation.loanCount ? this.state.todaySituation.loanCount : 0}</Link> */}
                              <span>{this.state.todaySituation.loanCount ? this.state.todaySituation.loanCount : 0}</span>
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </IceContainer>
                </Col>
                <Col xxs="24" s="24" l="12">
                  <IceContainer>
                    <div style={{paddingBottom: '20px', height: '100px'}}> {/*, borderBottom: '1px solid #BBB'*/}
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3 style={{paddingBottom: '10px', color: '#333', marginTop: '2px'}}>今日还款报表</h3>
                      </div>
                      <Form labelTextAlign={'right'}  {...formItemLayout}>
                        <Row wrap>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="还款总额（元）:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              {/* <Link
                                                                to="/approvalManage/loan">{this.state.todaySituation.repayAmount ? this.state.todaySituation.repayAmount : 0}</Link> */}
                              <span>{this.state.todaySituation.repayAmount ? this.state.todaySituation.repayAmount : 0}</span>
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="还款笔数（笔）:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              {/* <Link
                                                                to="/approvalManage/deductChange">{this.state.todaySituation.repayCount ? this.state.todaySituation.repayCount : 0}</Link> */}
                              <span>{this.state.todaySituation.repayCount ? this.state.todaySituation.repayCount : 0}</span>
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </IceContainer>
                </Col>
              </Row>

              <Row gutter="15">
                <Col xxs="24" s="24" l="12">
                  <IceContainer style={styles.container}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{marginTop: '2px'}}>放款走势</h3>
                      <span>
                                                <Button
                                                  type={this.state.loanButtonType === 'day' ? 'primary' : 'normal'} text
                                                  onClick={() => this.selectLoanTrend('day')}>按日</Button>
                                                <span style={styles.line}> | </span>
                                                <Button
                                                  type={this.state.loanButtonType === 'month' ? 'primary' : 'normal'}
                                                  text
                                                  onClick={() => this.selectLoanTrend('month')}>按月</Button>
                                                <span style={styles.line}> | </span>
                                                <Button
                                                  type={this.state.loanButtonType === 'year' ? 'primary' : 'normal'}
                                                  text
                                                  onClick={() => this.selectLoanTrend('year')}>按年</Button>
                                            </span>
                    </div>
                    <Chart
                      height={400}
                      forceFit
                      data={this.state.loanData}
                      scale={scale}
                      padding={[40, 40, 'auto', 60]}
                      onTooltipChange={(ev) => {
                        let items = ev.items; // tooltip显示的项
                        const origin = items[0]; // 将一条数据改成多条数据
                        items[0].value = origin.point._origin.text + '元';
                        items[1].value += '笔';
                      }}
                    >
                      <Legend
                        custom
                        clickable={false}
                        allowAllCanceled
                        position="top"
                        items={[
                          {value: '放款金额', marker: {symbol: 'square', fill: '#60A2FF', radius: 5}},
                          {value: '放款笔数', marker: {symbol: 'hyphen', stroke: '#43C25B', radius: 5, lineWidth: 2}},
                        ]}
                        select={false}
                      />
                      <Axis name="value"/>
                      <Tooltip/>
                      <Geom
                        type="interval"
                        position="label*value"
                        color={['type', () => {
                          return '#60A2FF';
                        }]}
                      />
                      <Geom
                        type="line"
                        position="label*放款笔数"
                        color="#43C25B"
                        size={3}
                      />
                    </Chart>
                  </IceContainer>
                </Col>
                <Col xxs="24" s="24" l="12">
                  <IceContainer style={styles.container}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{marginTop: '2px'}}>还款走势</h3>
                      <span>
                        <Button
                          type={this.state.repayButtonType === 'day' ? 'primary' : 'normal'}
                          text
                          onClick={() => this.selectRepayTrend('day')}>按日</Button>
                        <span style={styles.line}> | </span>
                        <Button
                          type={this.state.repayButtonType === 'month' ? 'primary' : 'normal'}
                          text
                          onClick={() => this.selectRepayTrend('month')}>按月</Button>
                        <span style={styles.line}> | </span>
                        <Button
                          type={this.state.repayButtonType === 'year' ? 'primary' : 'normal'}
                          text
                          onClick={() => this.selectRepayTrend('year')}>按年</Button>
                      </span>
                    </div>
                    <Chart
                      height={400}
                      forceFit
                      data={this.state.repayData}
                      scale={scale1}
                      padding={[40, 40, 'auto', 60]}
                      onTooltipChange={(ev) => {
                        let items = ev.items; // tooltip显示的项
                        const origin = items[0]; // 将一条数据改成多条数据
                        items[0].value = origin.point._origin.text + '元';
                        items[1].value += '笔';
                      }}
                    >
                      <Legend
                        custom
                        clickable={false}
                        allowAllCanceled
                        position="top"
                        items={[
                          {value: '还款金额', marker: {symbol: 'square', fill: '#4DCA9C', radius: 5}},
                          {value: '还款笔数', marker: {symbol: 'hyphen', stroke: '#5790FF', radius: 5, lineWidth: 3}},
                        ]}
                      />
                      <Axis name="value"/>
                      <Tooltip/>
                      <Geom
                        type="interval"
                        position="label*value"
                        color={['type', () => {
                          return '#4DCA9C';
                        }]}
                      />
                      <Geom type="line" position="label*还款笔数" color="#5790FF" size={3}/>
                    </Chart>
                  </IceContainer>
                </Col>
              </Row>
            </div> :
            <div style={{height: '100%'}}>
              <IceContainer style={{height: '100%'}}>
                <div style={{
                  height: '100%',
                  lineHeight: '300px',
                  color: '#4D82FF',
                  fontSize: '16px',
                  textAlign: 'center'
                }}>
                  欢迎使用互联网消费信贷系统！
                </div>
              </IceContainer>
            </div>
        }
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '10px',
  },
  formLabel: {
    textAlign: 'right',
  },
  line: {
    fontSize: '20px',
    color: '#ddd'
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
  listInfo: {
    height: '30px',
    fontSize: '12px',
    padding: '8px 20px'
  },
  loanStyle: {
    backgroundColor: '#5480FE',
    padding: '5px 8px',
    margin: '0 5px',
    borderRadius: '5px',
    color: '#fff'
  },
  repayStyle: {
    backgroundColor: '#4FCA9C',
    padding: '5px 8px',
    margin: '0 5px',
    borderRadius: '5px',
    color: '#fff'
  }
};
