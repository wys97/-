import React, {Component} from 'react';
import { Button, Message, DatePicker } from "@alifd/next";
import {Axis, Chart, Geom, Legend, Tooltip} from 'bizcharts';
import DataSet from '@antv/data-set';
import IceContainer from '@icedesign/container';
import overdueReportApi from '../../../api/ReportManage/OverdueReport';
import DataTable from '../../dataTable';
import PermissionA from "../../components/PermissionA";
const { RangePicker } = DatePicker;
const tabs = [
  {title: '按项目', key: 'project'},
  {title: '按机构', key: 'partner'},
];
export default class OverdueReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oneChartValue: {},
      twoChartValue: {},
      threeChartValue: {},
      fourChartValue: {},
      date: []
    };
  }


  componentWillMount() {

  }

  componentDidMount() {
    this.getOne();
    this.getTwo();
    this.getThree();
    this.getFour();
  }

  getOne = () => {
    // 柱状图
    overdueReportApi.trend(this.state.date)
      .then((res) => {
        if (res.data.code === '200') {
          let data = [];
          // 构建柱状图的数据源
          res.data.data.map((item) => {
            data.push({
              label: item.date,
              逾期金额: Number(item.sumAmount),
              text: item.sumAmount,
              逾期人数: item.count,
            });
          });
          const ds = new DataSet();
          const dv = ds.createView()
            .source(data);
          dv.transform({
            type: 'fold',
            fields: ['逾期金额'], // 展开字段集
            key: 'type', // key字段
            value: 'value', // value字段
          });
          this.setState({
            oneChartValue: dv,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getTwo = () => {
    overdueReportApi.pushRate(this.state.date).then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建柱状图的数据源
        res.data.data.map(item => {
          data.push({
            rage: item.date,
            入催率: Number(item.rate.slice(0, item.rate.length - 1)),
          });
        });
        this.setState({
          twoChartValue: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  }

  getThree = () => {
    overdueReportApi.firstPeriodRate(this.state.date).then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建柱状图的数据源
        res.data.data.map(item => {
          data.push({
            rage: item.date,
            首期逾期率: Number(item.rate.slice(0, item.rate.length - 1)),
          });
        });
        this.setState({
          threeChartValue: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  }

  getFour = () => {
    // 柱状图
    overdueReportApi.stageStatistics(this.state.date).then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建柱状图的数据源
        res.data.data.map(item => {
          data.push({
            label: item.stage,
            逾期金额: Number(item.amount),
            text: item.amount,
            逾期人数: item.count
          });
        });
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          type: "fold",
          fields: ["逾期金额"], // 展开字段集
          key: "type", // key字段
          value: "value" // value字段
        });
        this.setState({
          fourChartValue: dv
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onOk = val => { //日期选择
    this.setState({ date: val }, () => this.getOne());
  }
  onClick = () => { //重置按钮
    this.setState({ date: [] }, () =>
      this.getOne()
    );
  }

  onOkTwo = val => { //入催率 日期选择
    this.setState({ date: val }, () => this.getTwo());
  }
  onClickTwo = () => { //入催率 重置按钮
    this.setState({ date: [] }, () =>
      this.getTwo()
    );
  }

  onOkThree = val => { //首期逾期率 日期选择
    this.setState({ date: val }, () => this.getThree());
  }
  onClickThree = () => { //首期逾期率 重置按钮
    this.setState({ date: [] }, () =>
      this.getThree()
    );
  }

  render() {
    const scale = {
      逾期笔数: {
        type: "linear"
      },
      label: {
        range: [0.1, 0.9]
      },
      逾期人数: {
        min: 0
      }
    };
    const twoScales = {
      入催率: {
        min: 0,
        ickInterval: 25,
        formatter(val) {
          return val + "%";
        }
      }
    };
    const threeScales = {
      首期逾期率: {
        min: 0,
        ickInterval: 25,
        formatter(val) {
          return val + "%";
        }
      }
    };
    const fourScales = {
      逾期笔数: {
        type: "linear"
      },
      label: {
        range: [0.1, 0.9]
      },
      逾期人数: {
        min: 0
      }
    };
    return (
      <div className="homepage">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>逾期报告</h2>
        </div>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>逾期变化趋势</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClick}
                style={{ marginRight: "10px" }}
              >
                重置
              </Button>
              <RangePicker onOk={this.onOk} />
            </div>
          </div>
          <Chart
            height={300}
            width={500}
            forceFit
            data={this.state.oneChartValue}
            scale={scale}
            padding="auto"
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.text + "元";
              if (items[1]) {
                items[1].value += "人";
              }
            }}
          >
            <Legend
              custom
              clickable={false}
              allowAllCanceled
              position="top"
              items={[
                {
                  value: "逾期金额",
                  marker: { symbol: "square", fill: "#60A2FF", radius: 5 }
                },
                {
                  value: "逾期人数",
                  marker: {
                    symbol: "hyphen",
                    stroke: "#43C25B",
                    radius: 5,
                    lineWidth: 2
                  }
                }
              ]}
              select={false}
            />
            <Axis name="label" />
            <Axis name="value" position={"left"} />
            <Axis name="逾期人数" position={"right"} />
            <Tooltip />
            <Geom
              type="interval"
              position="label*value"
              color={[
                "type",
                () => {
                  return "#60A2FF";
                }
              ]}
            />
            <Geom
              type="line"
              position="label*逾期人数"
              color="#43C25B"
              size={3}
            />
          </Chart>
        </IceContainer>

        <IceContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>入催率</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClickTwo}
                style={{ marginRight: "10px" }}
              >
                重置
              </Button>
              <RangePicker onOk={this.onOkTwo} />
            </div>
          </div>
          <Chart
            height={200}
            width={500}
            data={this.state.twoChartValue}
            scale={twoScales}
            padding="auto"
            forceFit
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.入催率 + "%";
            }}
          >
            <Legend position="top" name="入催率" />
            <Axis name="rage" />
            <Axis name="入催率" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="rage*入催率" color="#43C25B" size={3} />
          </Chart>
        </IceContainer>

        <IceContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>首期逾期率</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClickThree}
                style={{ marginRight: "10px" }}
              >
                重置
              </Button>
              <RangePicker onOk={this.onOkThree} />
            </div>
          </div>
          <Chart
            height={200}
            width={500}
            data={this.state.threeChartValue}
            scale={threeScales}
            padding="auto"
            forceFit
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.首期逾期率 + "%";
            }}
          >
            <Legend position="top" name="首期逾期率" />
            <Axis name="rage" />
            <Axis name="首期逾期率" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="line"
              position="rage*首期逾期率"
              color="#4C82FF"
              size={3}
            />
          </Chart>
          {/* <div
              style={{
                marginTop: "20px",
                marginLeft: "10px",
                position: "relative"
              }}
            >
              <Tab shape="capsule" size="small" onChange={this.changeTab}>
                {tabs.map(tab => (
                  <Tab.Item title={tab.title} key={tab.key}>
                    {tab.key === "project" ? project : product}
                  </Tab.Item>
                ))}
              </Tab>
              <div style={{ position: "absolute", right: "50px", top: "20px" }}> */}
          {/*href='/admin-api/overdue-report/export-data'*/}
          {/* <PermissionA
                  permission={"report:statistics:overdue:export"}
                  onClick={this.exportExcel}
                  style={{ cursor: "pointer", color: "blue" }}
                  target="_blank"
                  name={">导出"}
                />
              </div>
            </div>  */}
        </IceContainer>

        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>各阶段逾期分布</h3>
          </div>
          <Chart
            height={300}
            width={500}
            forceFit
            data={this.state.fourChartValue}
            scale={fourScales}
            padding="auto"
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.text + "元";
              if (items[1]) {
                items[1].value += "人";
              }
            }}
          >
            <Legend
              custom
              clickable={false}
              allowAllCanceled
              position="top"
              items={[
                {
                  value: "逾期金额",
                  marker: { symbol: "square", fill: "#60A2FF", radius: 5 }
                },
                {
                  value: "逾期人数",
                  marker: {
                    symbol: "hyphen",
                    stroke: "#43C25B",
                    radius: 5,
                    lineWidth: 2
                  }
                }
              ]}
              select={false}
            />
            <Axis name="label" />
            <Axis name="value" position={"left"} />
            <Axis name="逾期人数" position={"right"} />
            <Tooltip />
            <Geom
              type="interval"
              position="label*value"
              color={[
                "type",
                () => {
                  return "#60A2FF";
                }
              ]}
            />
            <Geom
              type="line"
              position="label*逾期人数"
              color="#43C25B"
              size={3}
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
};
