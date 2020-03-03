import React, {Component} from 'react';
import homeApi from '../../../api/WorkBench/home';
import Overview from '../../components/Overview';
import {Button, Form, Grid, Message} from "@alifd/next";
import {Axis, Chart, Coord, Geom, Label, Legend, Tooltip} from 'bizcharts';
import DataSet from '@antv/data-set';
import {Link} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import {getAuthority} from "../../../utils/authority";
import MapChart from "./component/MapChart";

const formItemLayout = {
  labelCol: {xxs: 8, s: 6, l: 4, span: 10, offset: 1},
  wrapperCol: {s: 6, l: 6, span: 12}
};

const {Row, Col} = Grid;
const FormItem = Form.Item;
const {DataView} = DataSet;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      overviewInfo: [],
      todoList: {},
      projectFundSize: [],
      pieChartData: {},
      loanData: {},
      repayData: {},
      partnerLoanData: {},
      partnerFundData: {},
      topTen: {},
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
    homeApi.collect().then((res) => {
      if (res.data.code === '200') {
        let overviewInfo = [
          {label: '当前放款余额（元）', value: res.data.data.currentLoanBalance},
          {label: '累计放款余额（元）', value: res.data.data.totalLoanAmount},
          {label: '累计借款人数（人）', value: res.data.data.totalBorrowNum},
          {label: '累计收益金额（元）', value: res.data.data.totalIncomeAmount}
        ];
        this.setState({
          overviewInfo
        });
      } else {
        Message.error(res.data.message);
      }
    });
    homeApi.todoList().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          todoList: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
    homeApi.projectFundSize().then((res) => {
      if (res.data.code === '200') {
        const data = [
          {
            genre: "当前放款规模",
            sold: res.data.data.currentLoanScale,
            soldText: res.data.data.currentLoanScaleText,
            rate: res.data.data.currentRateText
          },
          {
            genre: "剩余资金规模",
            sold: res.data.data.residueCapitalScale,
            soldText: res.data.data.residueCapitalScaleText,
            rate: res.data.data.residueRateText
          }
        ];
        const projectFundSize = [
          {label: "当前放款规模(元)", value: res.data.data.currentLoanScaleText},
          {label: "剩余资金规模(元)", value: res.data.data.residueCapitalScaleText},
          {label: "资金总规模(元)", value: res.data.data.totalCapitalScaleText}
        ];
        const dv = new DataView();
        dv.source(data).transform({
          type: "percent",
          field: "sold",
          dimension: "genre",
          as: "percent"
        });
        this.setState({
          pieChartData: dv,
          projectFundSize
        })
      } else {
        Message.error(res.data.message);
      }
    });
    this.selectLoanTrend('day');
    this.selectRepayTrend('day');
    this.loadPartner('loan');
    this.loadPartner('capital');
    homeApi.topTen().then((res) => {
      if (res.data.code === '200') {
        const data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push({
            prod: res.data.data[i].name,
            loan: res.data.data[i].amountDouble,
            text: res.data.data[i].amountString
          })
        }
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          type: 'reverse'
        });
        this.setState({
          topTen: dv
        })
      } else {
        Message.error(res.data.message);
      }
    });
    this.loadMapData();
    homeApi.queryList(null).then((res) => {
      if (res.data.code === '200') {
        const listInfo = res.data.data;
        this.setState({
          listInfo
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  loadMapData = () => {
    let mapData = [];
    homeApi.queryMap().then((res) => {
      if (res.data.code === '200') {
        mapData = res.data.data;
        this.setState({
          mapData
        })
      } else {
        Message.error(res.data.message);
      }
    })
  };

  loadPartner = (param) => {
    homeApi.queryPartnerRate(param).then((res) => {
      if (res.data.code === '200') {
        const data = [];
        for (let i = 0; i < res.data.data.length; i++) {
          data.push({
            genre: res.data.data[i].name,
            sold: res.data.data[i].percentage,
            amount: res.data.data[i].amount,
            text: res.data.data[i].percentageString
          })
        }
        const dv = new DataView();
        dv.source(data).transform({
          type: "percent",
          field: "sold",
          dimension: "genre",
          as: "percent"
        });
        if (param === 'loan') {
          this.setState({
            partnerLoanData: dv
          })
        } else {
          this.setState({
            partnerFundData: dv
          })
        }
      } else {
        Message.error(res.data.code);
      }
    })
  };

  selectLoanTrend = (date) => {
    this.selectTrend('loan', date);
  };

  selectRepayTrend = (date) => {
    this.selectTrend('repay', date);
  };

  selectTrend = (queryType, dateType) => {
    const queryType1 = queryType;
    homeApi.trendChart({queryType, dateType}).then((res) => {
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
                <Col xxs="24" s="24" l="12">
                  <IceContainer>
                    <div style={{paddingBottom: '20px', height: '378px'}}> {/*, borderBottom: '1px solid #BBB'*/}
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3 style={{paddingBottom: '10px', color: '#333', marginTop: '2px'}}>待办事项</h3>
                      </div>
                      <Form labelTextAlign={'right'}  {...formItemLayout}>
                        <Row wrap>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="贷款审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              <Link
                                to="/approvalManage/loan">{this.state.todoList.loanNum ? this.state.todoList.loanNum : 0}</Link>
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="扣款日变更审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              <Link
                                to="/approvalManage/deductChange">{this.state.todoList.changeRepayDayNum ? this.state.todoList.changeRepayDayNum : 0}</Link>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row wrap>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="线下还款登记审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              <Link
                                to="/approvalManage/offlineRepay">{this.state.todoList.repayOfflineNum ? this.state.todoList.repayOfflineNum : 0}</Link>
                            </FormItem>
                          </Col>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="息费减免审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              <Link
                                to="/approvalManage/feeWaiver">{this.state.todoList.decreaseInterestNum ? this.state.todoList.decreaseInterestNum : 0}</Link>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row wrap>
                          <Col xxs="24" s="12" l="12">
                            <FormItem
                              label="黑名单审批:"
                              labelTextAlign='left'
                              style={styles.formItem}
                              labelCol={{span: 14}}
                              wrapperCol={{span: 8}}
                            >
                              <Link
                                to="/approvalManage/blacklist">{this.state.todoList.blacklistNum ? this.state.todoList.blacklistNum : 0}</Link>
                            </FormItem>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    {/* todo 监控预警 */}
                    {/*<div className="contain-con">*/}
                    {/*  <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                    {/*    <h3 style={{paddingLeft: '10px', color: '#333'}}>监控预警</h3>*/}
                    {/*  </div>*/}
                    {/*  <Form labelTextAlign={'right'}  {...formItemLayout}>*/}
                    {/*    <Row wrap>*/}
                    {/*      <Col xxs="24" s="12" l="12">*/}
                    {/*        <FormItem*/}
                    {/*          label="实时预警："*/}
                    {/*          labelTextAlign='left'*/}
                    {/*          style={styles.formItem}*/}
                    {/*          labelCol={{span: 10, offset: 1}}*/}
                    {/*          wrapperCol={{span: 12}}*/}
                    {/*        >*/}
                    {/*          0*/}
                    {/*          /!*<Link to="/approvalManage/loan" >{this.state.todoList.loanNum? this.state.todoList.loanNum : 0}</Link>*!/*/}
                    {/*        </FormItem>*/}
                    {/*      </Col>*/}
                    {/*      <Col xxs="24" s="12" l="12">*/}
                    {/*        <FormItem*/}
                    {/*          label="项目预警："*/}
                    {/*          labelTextAlign='left'*/}
                    {/*          style={styles.formItem}*/}
                    {/*          labelCol={{span: 10, offset: 1}}*/}
                    {/*          wrapperCol={{span: 12}}*/}
                    {/*        >*/}
                    {/*          0*/}
                    {/*          /!*<Link to="/approvalManage/deductChange" >{this.state.todoList.changeRepayDayNum? this.state.todoList.changeRepayDayNum : 0}</Link>*!/*/}
                    {/*        </FormItem>*/}
                    {/*      </Col>*/}
                    {/*    </Row>*/}
                    {/*  </Form>*/}
                    {/*</div>*/}
                  </IceContainer>
                </Col>
                <Col xxs="24" s="24" l="12" style={{paddingLeft: '10px', paddingRight: '0'}}>
                  <IceContainer>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{paddingLeft: '10px', color: '#333', marginTop: '2px'}}>项目资金规模</h3>
                    </div>
                    <Row style={{paddingBottom: '14px'}}>
                      <Col xxs="24" s="24" l="12">
                        <Chart
                          width={450}
                          height={325}
                          data={this.state.pieChartData}
                          scale={this.state.pieChartCol}
                          padding={[0, 10, 30, 10]}
                          forceFit
                        >
                          <Coord type="theta" radius={0.75}/>
                          <Axis name="percent"/>
                          <Tooltip
                            showTitle={false}
                            useHtml={true}
                            htmlContent={(title, items) => {
                              const formatStr = items[0].name + '：' + items[0].point._origin.soldText + '元' + '（' + items[0].point._origin.rate + '）';
                              const color = items[0].color;
                              return `<div class="g2-tooltip" style="position: absolute;background-color: rgba(255, 255, 255, 0.9);box-shadow: #AEAEAE 0 0 10px;transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;border-radius: 3px;color: #575757;font-size: 12px;line-height: 20px;padding: 10px 10px 6px;"><ul><li><span style="background-color: ${color}; width: 5px; height: 5px; border-radius: 50%; display: inline-block; margin-right: 8px;" class="g2-tooltip-marker"></span>${formatStr}</li></ul></div>`
                            }}
                          />
                          <Geom type="intervalStack" position="percent" color="genre" select={false}/>
                        </Chart>
                      </Col>
                      <Col xxs="24" s="24" l="12">
                        <Overview data={this.state.projectFundSize} col={1}/>
                      </Col>
                    </Row>
                  </IceContainer>
                </Col>
              </Row>
              <IceContainer style={styles.container}>
                <Row gutter="10">
                  <Col xxs="24" s="24" l="12">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{paddingBottom: '10px', color: '#333', marginTop: '2px'}}>运营状况</h3>
                    </div>
                    <MapChart data={this.state.mapData}/>
                    <div style={{height: '20px'}}/>
                  </Col>
                  <Col xxs="24" s="24" l="12">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{paddingBottom: '10px', color: '#333', visibility: 'hidden', marginTop: '2px'}}>&</h3>
                    </div>
                    {this.state.listInfo.map((item, index) => {
                      if (index === 12) {
                        return <div key={index} style={styles.listInfo}>......</div>;
                      } else if (index > 12) {
                        return null;
                      }
                      return <div key={index} style={styles.listInfo}>
                        {item.endTime}
                        <span
                          style={item.typeName === 'loan' ? styles.loanStyle : styles.repayStyle}>{item.typeNameText}</span>{item.cityName}，{item.customerName}，{item.productName}，{item.amount}元
                      </div>
                    })}
                  </Col>
                </Row>
              </IceContainer>
              <Row gutter="15">
                <Col xxs="24" s="24" l="12">
                  <IceContainer style={styles.container}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{marginTop: '2px'}}>放款走势</h3>
                      <span>
                  <Button type={this.state.loanButtonType === 'day' ? 'primary' : 'normal'} text
                          onClick={() => this.selectLoanTrend('day')}>按日</Button>
                  <span style={styles.line}> | </span>
                  <Button type={this.state.loanButtonType === 'month' ? 'primary' : 'normal'} text
                          onClick={() => this.selectLoanTrend('month')}>按月</Button>
                  <span style={styles.line}> | </span>
                  <Button type={this.state.loanButtonType === 'year' ? 'primary' : 'normal'} text
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
                        <Button type={this.state.repayButtonType === 'day' ? 'primary' : 'normal'} text
                                onClick={() => this.selectRepayTrend('day')}>按日</Button>
                        <span style={styles.line}> | </span>
                        <Button type={this.state.repayButtonType === 'month' ? 'primary' : 'normal'} text
                                onClick={() => this.selectRepayTrend('month')}>按月</Button>
                        <span style={styles.line}> | </span>
                        <Button type={this.state.repayButtonType === 'year' ? 'primary' : 'normal'} text
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
              <IceContainer>
                <Row>
                  <Col xxs="24" s="24" l="12">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{paddingLeft: '10px', color: '#333', marginTop: '2px'}}>合作机构当前放款规模占比</h3>
                    </div>
                    <Chart
                      width={450}
                      height={300}
                      data={this.state.partnerLoanData}
                      scale={this.state.pieChartCol}
                      padding={[0, 10, 'auto', 10]}
                      forceFit
                    >
                      <Coord type="theta" radius={0.75}/>
                      <Axis name="percent"/>
                      <Tooltip
                        showTitle={false}
                        useHtml={true}
                        htmlContent={(title, items) => {
                          const formatStr = items[0].name + '：' + items[0].point.point.amount + '元' + '（' + items[0].point.point.text + '）';
                          const color = items[0].color;
                          return `<div class="g2-tooltip" style="position: absolute;background-color: rgba(255, 255, 255, 0.9);box-shadow: #AEAEAE 0 0 10px;transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;border-radius: 3px;color: #575757;font-size: 12px;line-height: 20px;padding: 10px 10px 6px;"><ul><li><span style="background-color: ${color}; width: 5px; height: 5px; border-radius: 50%; display: inline-block; margin-right: 8px;" class="g2-tooltip-marker"></span>${formatStr}</li></ul></div>`
                        }}
                      />
                      <Geom type="intervalStack" position="percent" color="genre" select={false}>
                        <Label
                          content="percent"
                          formatter={(text, item) => {
                            return item.point.genre + '：' + item.point.text;
                          }}
                        />
                      </Geom>
                    </Chart>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{paddingLeft: '10px', color: '#333'}}>合作机构资金总规模占比</h3>
                    </div>
                    <Chart
                      width={450}
                      height={300}
                      data={this.state.partnerFundData}
                      scale={this.state.pieChartCol}
                      padding={[0, 10, 'auto', 10]}
                      forceFit
                    >
                      <Coord type="theta" radius={0.75}/>
                      <Axis name="percent"/>
                      <Tooltip
                        showTitle={false}
                        useHtml={true}
                        htmlContent={(title, items) => {
                          const formatStr = items[0].name + '：' + items[0].point.point.amount + '元' + '（' + items[0].point.point.text + '）';
                          const color = items[0].color;
                          return `<div class="g2-tooltip" style="position: absolute;background-color: rgba(255, 255, 255, 0.9);box-shadow: #AEAEAE 0 0 10px;transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;border-radius: 3px;color: #575757;font-size: 12px;line-height: 20px;padding: 10px 10px 6px;"><ul><li><span style="background-color: ${color}; width: 5px; height: 5px; border-radius: 50%; display: inline-block; margin-right: 8px;" class="g2-tooltip-marker"></span>${formatStr}</li></ul></div>`
                        }}
                      />
                      <Geom type="intervalStack" position="percent" color="genre" select={false}>
                        <Label
                          content="percent"
                          formatter={(text, item) => {
                            return item.point.genre + '：' + item.point.text;
                          }}
                        />
                      </Geom>
                    </Chart>
                  </Col>
                  <Col xxs="24" s="24" l="12">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <h3 style={{paddingLeft: '10px', color: '#333', marginTop: '2px'}}>贷款产品放款TOP10(近30天)</h3>
                    </div>
                    <Chart
                      height={650}
                      data={this.state.topTen}
                      forceFit
                      onTooltipChange={(ev) => {
                        let items = ev.items; // tooltip显示的项
                        items[0].name = '放款金额';
                        items[0].value = items[0].point._origin.text + '元';
                      }}
                    >
                      <Legend/>
                      <Coord transpose/>
                      <Axis
                        name="prod"
                        label={{
                          offset: 12
                        }}
                      />
                      <Axis name="prod"/>
                      <Tooltip/>
                      <Geom
                        type="intervalStack"
                        position="prod*loan"
                      />
                    </Chart>
                  </Col>
                </Row>
              </IceContainer>
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
