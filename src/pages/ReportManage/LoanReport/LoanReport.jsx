import React, {Component} from 'react';
import {Button, DatePicker, Message, Select} from '@alifd/next';
import { Axis, Chart, Geom, Legend, Tooltip, } from "bizcharts";
import DataSet from '@antv/data-set';
import IceContainer from '@icedesign/container';
import loanReportApi from '../../../api/ReportManage/LoanReport';

const { RangePicker } = DatePicker;
export default class LoanReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      twoChartValue: {},
      // 放款报表
      date: [],
      isInternalEmployeeType: [
        {label:"全部员工",value:""},
        {
          label: "是",
          value: true,
        },
        {
          label: "否",
          value: false,
        },
      ],
      dateType: "DAY",
      productNo: '',
      isInternalEmployee:"",
      limitValue: [],
      creditValue: [],
      selectType: [],
    };
  }

  componentWillMount() {
    this.getProductList()
  }

  componentDidMount() {
    this.getTwo();
    this.getOne();
    this.getFour()
  }

  getProductList = () => { //产品枚举
    loanReportApi.productList().then(res => {
      if (res.data.code === "200") {
        let riskResult = res.data.data;
        let data= [{label:"全部产品",value:""}]
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

  getOne = () => {
    loanReportApi.periodStatistics({productNo:this.state.productNo,isInternalEmployee:this.state.isInternalEmployee}).then(res => {
      if (res.data.code === "200") {
        let dv = [];
        // 构建柱状图的数据源
        res.data.data.map(item => {
          dv.push({
            rage: item.period,
            放款笔数占比: Number(item.percent.slice(0, item.percent.length - 1)),
            笔数: item.count
          });
        });
        console.log(dv)
        this.setState({
          limitValue: dv
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };


  getTwo = () => {
    // 柱状图
    let params = {}
    params.productNo = this.state.productNo
    params.isInternalEmployee = this.state.isInternalEmployee;
    params.dateType = this.state.dateType
    params.date = this.state.date
    loanReportApi.trend(params)
      .then((res) => {
        if (res.data.code === '200') {
          let data = [];
          // 构建柱状图的数据源
          res.data.data.map((item) => {
            data.push({
              label: item.date,
              放款金额: item.loanAmount,
              text: item.loanAmount,
              放款笔数: item.count
            });
          });
          const ds = new DataSet();
          const dv = ds.createView()
            .source(data);
          dv.transform({
            type: 'fold',
            fields: ['放款金额'], // 展开字段集
            key: 'type', // key字段
            value: 'value', // value字段
          });
          this.setState({
            twoChartValue: dv,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getFour = () => {
    loanReportApi.loanLeft({productNo:this.state.productNo,isInternalEmployee:this.state.isInternalEmployee}).then((res) => {
      if (res.data.code === "200") {
        let data = [];
        // 构建柱状图的数据源
        res.data.data.map((item) => {
          data.push({
            rage: item.rage,
            在贷余额占比: Number(
              item.percent.slice(0, item.percent.length - 1)
            ),
            笔数: item.count,
          });
        });
        this.setState({
          creditValue: data,
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onDay = () => { //选择日
    this.setState({ dateType: "DAY" },() => this.getTwo());
  }
  onMonth = () => {  //选择月
    this.setState({ dateType: "MONTH" },()=>this.getTwo());
  }
  onYear = () => {  //选择年
    this.setState({ dateType: "YEAR" },()=>this.getTwo());
  }

  onClick = () => { //重置按钮
    this.setState({ date: [], productNo: "", dateType: "DAY",isInternalEmployee: "" }, () =>
      this.getTwo(),this.getOne(),this.getFour()
    );
  }

  handChange = value => { //放款统计 选择产品
    this.setState({ productNo: value }, () => this.getTwo());
  }
  handChangeOne = value => { //放款期限分布 选择产品
    this.setState({ productNo: value }, () => this.getOne());
  }
  handChangeTree = value => { //贷款余额分布 选择产品
    this.setState({ productNo: value }, () => this.getFour());
  }
  isInternalEmployeeChange = value => { //放款统计 选择是否内部员工
    this.setState({ isInternalEmployee: value }, () => this.getTwo());
  }
  isInternalEmployeeChangeTwo = value => { //放款期限分布 选择是否内部员工
    this.setState({ isInternalEmployee: value }, () => this.getOne());
  }
  isInternalEmployeeChangeTree = value => { //贷款余额分布 选择是否内部员工
    this.setState({ isInternalEmployee: value }, () => this.getFour());
  }

  onOk = val => { //日期选择
    this.setState({ date: val }, () => this.getTwo());
  }

  render() {
    const scale = {
      放款笔数: {
        type: 'linear',
      },
      label: {
        range: [0.05, 0.95],
      },
    };
    const scales = {
      放款笔数占比: {
        min: 0,
        tickInterval: 25,
        formatter(val) {
          return val +"%";
        }
      }
    };
    const cols = {
      在贷余额占比: {
        min: 0,
        tickInterval: 25,
        formatter(val) {
          return val + "%";
        }
      }
    };
    return (
      <div className="homepage">
        <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
          <h2>放款报告</h2>
        </p>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>放款统计</h3>
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
              <Select
                followTrigger
                name="isInternalEmployee"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "是否集团内部员工" }}
                dataSource={this.state.isInternalEmployeeType}
                onChange={this.isInternalEmployeeChange}
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
              <RangePicker style={{ marginLeft: "10px" }} onOk={this.onOk} />
            </div>
          </div>
          <Chart
            height={400}
            width={500}
            forceFit
            data={this.state.twoChartValue}
            scale={scale}
            padding="auto"
            onTooltipChange={(ev) => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.text + "元";
              if (items[1]) {
                items[1].value += "笔";
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
                  value: "放款金额",
                  marker: { symbol: "square", fill: "#60A2FF", radius: 5 },
                },
                {
                  value: "放款笔数",
                  marker: {
                    symbol: "hyphen",
                    stroke: "#43C25B",
                    radius: 5,
                    lineWidth: 2,
                  },
                },
              ]}
              select={false}
            />
            <Axis name="label" />
            <Axis name="value" position={"left"} />
            <Tooltip />
            <Geom
              type="interval"
              position="label*value"
              color={[
                "type",
                () => {
                  return "#60A2FF";
                },
              ]}
            />
            <Geom
              type="line"
              position="label*放款笔数"
              color="#43C25B"
              size={3}
            />
          </Chart>
        </IceContainer>

        <IceContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>授信额度分布</h3>
            <div style={{ marginTop: "10px" }}>
              <Select
                followTrigger
                name="productNo"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "全部产品" }}
                dataSource={this.state.selectType}
                onChange={this.handChangeOne}
              />
              <Select
                followTrigger
                name="isInternalEmployee"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "是否集团内部员工" }}
                dataSource={this.state.isInternalEmployeeType}
                onChange={this.isInternalEmployeeChangeTwo}
              />
            </div>
          </div>
          <Chart
            height={200}
            width={500}
            data={this.state.limitValue}
            scale={scales}
            padding="auto"
            forceFit
            onTooltipChange={(ev) => {
              let items = ev.items; // tooltip显示的项
              items[0].value =
                items[0].point._origin.放款笔数占比 +
                "%" +
                "(" +
                items[0].point._origin.笔数 +
                "笔" +
                ")";
            }}
          >
            <Axis name="rage" />
            <Axis name="放款笔数占比" />
            <Tooltip
              crosshairs={{
                type: "y",
              }}
            />
            <Geom type="interval" position="rage*放款笔数占比" />
          </Chart>
        </IceContainer>

        <IceContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>在贷余额分布</h3>
            <div style={{ marginTop: "10px" }}>
              <Select
                followTrigger
                name="productNo"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "全部产品" }}
                dataSource={this.state.selectType}
                onChange={this.handChangeTree}
              />
              <Select
                followTrigger
                name="isInternalEmployee"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "是否集团内部员工" }}
                dataSource={this.state.isInternalEmployeeType}
                onChange={this.isInternalEmployeeChangeTree}
              />
            </div>
          </div>
          <Chart
            height={200}
            width={500}
            forceFit
            data={this.state.creditValue}
            scale={cols}
            padding="auto"
            onTooltipChange={(ev) => {
              let items = ev.items; // tooltip显示的项
              items[0].value =
                items[0].point._origin.在贷余额占比 +
                "%" +
                "(" +
                items[0].point._origin.笔数 +
                "笔" +
                ")";
            }}
          >
            <Axis name="rage" />
            <Axis name="在贷余额占比" />
            <Tooltip
              crosshairs={{
                type: "y",
              }}
            />
            <Geom type="interval" position="rage*在贷余额占比" />
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
