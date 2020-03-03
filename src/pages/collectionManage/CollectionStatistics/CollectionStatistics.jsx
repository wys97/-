import React, { Component } from "react";
import { Button, DatePicker, Message, Select } from "@alifd/next";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import IceContainer from "@icedesign/container";
import { DataSet } from '@antv/data-set';
import collectionReportApi from "../../../api/CollectionManage/collectionReport";
const { RangePicker } = DatePicker;

export default class CollectionStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneChartValue: {},
      twoChartValue: [],
      date: [],
      dateType: "DAY"
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getOne();
    this.getTwo();
  }
  getOne = () => {
    let params = {}
    params.dateType = this.state.dateType
    params.date = this.state.date
    collectionReportApi.pushCount(params).then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建折线图的数据源
        res.data.data.map(item => {
          data.push({
            label: item.date,
            催收方式: item.type,
            催收次数: item.count
          });
        });
        this.setState({
          oneChartValue: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getTwo = () => {
    let params = {}
    params.dateType = this.state.dateType
    params.date = this.state.date
    collectionReportApi.pushResult(params).then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建折线图的数据源
        res.data.data.map(item => {
          data.push({
            label: item.date,
            还款阶段: item.stage,
            还款金额: item.amount
          });
        });
        this.setState({
          twoChartValue: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onDay = () => {
    //选择日
    this.setState({ dateType: "DAY" }, () => this.getOne());
  };
  onMonth = () => {
    //选择月
    this.setState({ dateType: "MONTH" }, () => this.getOne());
  };
  onYear = () => {
    //选择年
    this.setState({ dateType: "YEAR" }, () => this.getOne());
  };

  onClick = () => {
    //重置按钮
    this.setState({ date: [], productNo: "", dateType: "DAY" }, () =>
      this.getOne()
    );
  };
  onOk = val => {
    //日期选择
    this.setState({ date: val }, () => this.getOne());
  };

  onDayTwo = () => {
    //选择日
    this.setState({ dateType: "DAY" }, () => this.getTwo());
  };
  onMonthTwo = () => {
    //选择月
    this.setState({ dateType: "MONTH" }, () => this.getTwo());
  };
  onYearTwo = () => {
    //选择年
    this.setState({ dateType: "YEAR" }, () => this.getTwo());
  };
  onOkTwo = val => {
    //入催率 日期选择
    this.setState({ date: val }, () => this.getTwo());
  };
  onClickTwo = () => {
    //入催率 重置按钮
    this.setState({ date: [] }, () => this.getTwo());
  };
  render() {
    const scale = {
      催收次数: {
        range: [0, 1]
      }
    };
    const scaleTwo = {
      还款金额: {
        type: 'linear',
        range: [0, 1]
      }
    };
    const ds = new DataSet();
    const twoChartValueView = ds.createView().source(this.state.twoChartValue);
    return (
      <div className="homepage">
        <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
          <h2>催收统计</h2>
        </p>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>催收次数统计</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClick}
                style={{ marginRight: "10px" }}
              >
                重置
              </Button>
              <span>
                <Button
                  type={this.state.dateType === "DAY" ? "primary" : "normal"}
                  text
                  onClick={this.onDay}
                >
                  按日
                </Button>
                <span style={styles.line}> | </span>
                <Button
                  type={this.state.dateType === "MONTH" ? "primary" : "normal"}
                  text
                  onClick={this.onMonth}
                >
                  按月
                </Button>
                <span style={styles.line}> | </span>
                <Button
                  type={this.state.dateType === "YEAR" ? "primary" : "normal"}
                  text
                  onClick={this.onYear}
                >
                  按年
                </Button>
              </span>
              <RangePicker style={{ marginLeft: "10px" }} onOk={this.onOk} />
            </div>
          </div>
          <Chart
            height={300}
            data={this.state.oneChartValue}
            scale={scale}
            forceFit
            padding="auto"
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value += "次";
              if (items[1]) {
                items[1].value += "次";
              }
              if (items[2]) {
                items[2].value += "次";
              }
              if (items[3]) {
                items[3].value += "次";
              }
            }}
          >
            <Legend position="top" />
            <Axis name="label" />
            <Axis name="催收次数" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="line"
              position="label*催收次数"
              size={2}
              color={"催收方式"}
            />
            <Geom
              type="point"
              position="label*催收次数"
              size={0}
              shape={"circle"}
              color={"催收方式"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        </IceContainer>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>催收效果统计</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClick}
                style={{ marginRight: "10px" }}
              >
                重置
              </Button>
              <span>
                <Button
                  type={this.state.dateType === "DAY" ? "primary" : "normal"}
                  text
                  onClick={this.onDayTwo}
                >
                  按日
                </Button>
                <span style={styles.line}> | </span>
                <Button
                  type={this.state.dateType === "MONTH" ? "primary" : "normal"}
                  text
                  onClick={this.onMonthTwo}
                >
                  按月
                </Button>
                <span style={styles.line}> | </span>
                <Button
                  type={this.state.dateType === "YEAR" ? "primary" : "normal"}
                  text
                  onClick={this.onYearTwo}
                >
                  按年
                </Button>
              </span>
              <RangePicker style={{ marginLeft: "10px" }} onOk={this.onOkTwo} />
            </div>
          </div>
          <Chart
            height={500}
            data={twoChartValueView}
            scale={scaleTwo}
            forceFit
            padding="auto"
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value += "元";
              if (items[1]) {
                items[1].value += "元";
              }
              if (items[2]) {
                items[2].value += "元";
              }
              if (items[3]) {
                items[3].value += "元";
              }
              if (items[4]) {
                items[4].value += "元";
              }
              if (items[5]) {
                items[5].value += "元";
              }
              if (items[6]) {
                items[6].value += "元";
              }
            }}
          >
            <Legend position="top" />
            <Axis name="label" />
            <Axis name="还款金额" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="line"
              position="label*还款金额"
              size={2}
              color={"还款阶段"}
            />
            <Geom
              type="point"
              position="label*还款金额"
              size={2}
              shape={"circle"}
              color={"还款阶段"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0
  }
};
