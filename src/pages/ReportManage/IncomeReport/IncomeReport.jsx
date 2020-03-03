import React, { Component } from "react";
import { DatePicker, Button, Message, Select } from "@alifd/next";
import { Axis, Chart, Legend, Geom, Tooltip } from "bizcharts";
import DataSet from "@antv/data-set";
import IceContainer from "@icedesign/container";
import incomeReportApi from "../../../api/ReportManage/IncomeReport";
const { RangePicker } = DatePicker;
export default class IncomeReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twoChartValue: {},
      limitValue: {},
      date: [],
      productNo: '',
      dateType: "DAY",
      selectType: []


    };
  }

  componentWillMount() {
    this.getProductList()

  }

  componentDidMount() {
    this.getTwo();
    this.getData();
  }

  getProductList = () => { //产品枚举
    incomeReportApi.productList().then(res => {
      if (res.data.code === "200") {
        let riskResult = res.data.data;
        let data = [{ label: "全部产品", value: "" }]
        let amap = new Map(Object.entries(riskResult));
        for (let [k, v] of amap) {
          data.push({
            label: v,
            value: k
          });
        }
        this.setState({
          selectType: data
        })
      } else {
        Message.error(res.data.message);
      }
    })
  }



  getData = () => {

    incomeReportApi.creditLlimit().then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建柱状图的数据源
        res.data.data.map(item => {
          data.push({
            rage: item.rage,
            授信范围占比: item.percent.slice(0, item.percent.length - 1),
            人数: item.count
          });
        });
        // const ds = new DataSet();
        // const dv = ds.createView().source(data);
        // dv.transform({
        //   type: "fold",
        //   fields: ["授信范围占比"], // 展开字段集
        //   key: "type", // key字段
        //   value: "value" // value字段
        // });
        this.setState({
          limitValue: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getTwo = (date) => {
    console.log(date)
    let params ={
      date,
      productNo:this.state.productNo,
      dateType:this.state.dateType
    }
    // 柱状图
    incomeReportApi.statistics(params).then(res => {
      if (res.data.code === "200") {
        let data = [];
        // 构建柱状图的数据源
        res.data.data.map(item => {
          data.push({
            date: item.date,
            授信成功额度: item.limit,

            授信成功人数: item.count
          });
        });
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          type: "fold",
          fields: ["授信成功额度"], // 展开字段集
          key: "type", // key字段
          value: "value" // value字段
        });
        this.setState({
          twoChartValue: data,
          date: date
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onOk = val => {
    this.getTwo(val);
  };
  onChange = val => {
    this.setState({
      date: val
    })
  }
  onClick = () => {
    let date=[]
    this.setState({
      date,
      productNo: "",
    })
    this.getTwo(date);
  }

  onDay = () => { //选择日
    this.setState({ dateType: "DAY" }, () => this.getTwo());
  }
  onMonth = () => {  //选择月
    this.setState({ dateType: "MONTH" }, () => this.getTwo());
  }
  onYear = () => {  //选择年
    this.setState({ dateType: "YEAR" }, () => this.getTwo());
  }
  handChange = value => { //放款统计 选择产品
    this.setState({ productNo: value }, () => this.getTwo());
  }

  render() {
    const scale = {
      授信成功额度: {
        type: "linear",
        min: 0
      },
      授信成功人数: {
        min: 0
      },
      label: {
        range: [0.05, 0.95]
      }
    };
    const scales = {
      授信范围占比: {
        type: "linear",
        min: 0,
      }
    };
    return (
      <div className="homepage">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>授信报表</h2>
        </div>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>授信统计</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClick}
                style={{ marginRight: "10px" }}
              >
                重置
              </Button>
              <Select
                followTrigger
                name="productNo"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "全部产品" }}
                dataSource={this.state.selectType}
                onChange={this.handChange}
              />
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
              <RangePicker
              style={{ marginLeft: "10px" }}
                onChange={this.onChange}
                onOk={this.onOk}
              />
            </div>
          </div>
          <Chart
            height={300}
            width={500}
            data={this.state.twoChartValue}
            scale={scale}
            padding={["50","auto", "50", "auto"]}
            forceFit
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.授信成功额度 + "元";
              if (items[1]) {
                items[1].value += "人";
              }
            }}
          >
            <Legend
              custom
              // clickable={false}
              allowAllCanceled
              position="top"
              items={[
                {
                  value: "授信成功额度",
                  marker: { symbol: "square", fill: "#60A2FF", radius: 5 }
                },
                {
                  value: "授信成功人数",
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
            <Axis
              name="授信成功人数"
              grid={null}
              label={{
                textStyle: {
                  fill: "#fdae6b"
                }
              }}
            />
            <Axis name="授信成功额度" position={"left"} />
            <Tooltip />
            <Geom
              type="interval"
              position="date*授信成功额度"
              color="#60A2FF"
            />
            <Geom
              type="line"
              position="date*授信成功人数"
              color="#43C25B"
              size={3}
            />
            <Geom
              type="point"
              position="date*授信成功人数"
              color="#43C25B"
              size={3}
            />
          </Chart>
        </IceContainer>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>授信额度分布</h3>
          </div>
          <Chart
            height={200}
            width={500}
            forceFit
            data={this.state.limitValue}
            scale={scales}
            padding="auto"
            onTooltipChange={ev => {
              let items = ev.items; // tooltip显示的项
              items[0].value =
                items[0].point._origin.授信范围占比 +
                "%" +
                "(" +
                items[0].point._origin.人数 +
                "人" +
                ")";
            }}
          >
            <Axis name="rage" />
            <Axis
              name="授信范围占比"
              position="left"
              label={{
                formatter: val => `${val}%`
              }}
            />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="rage*授信范围占比" />
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
