import React, {Component} from 'react';
import {Button, DatePicker, Message, Select} from '@alifd/next';
import {Axis, Chart, Geom, Legend, Tooltip} from 'bizcharts';
import IceContainer from '@icedesign/container';
import repayReportApi from '../../../api/ReportManage/RepayReport';
const {RangePicker} = DatePicker;

export default class RepayReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oneChartValue: {},
      twoChartValue: {},
      isInternalEmployeeType: [
        { label: "全部员工", value: "" },
        {
          label: "是",
          value: true,
        },
        {
          label: "否",
          value: false,
        },
      ],
      isInternalEmployee: null,
      // 放款报表

      date: [],
      dateType: "DAY",
      productNo: "",
    };
  }


  componentWillMount() {
    this.getProductList();
  }

  componentDidMount() {
    this.getTwo();
    this.getData();
  }

  getProductList = () => { //产品枚举
    repayReportApi.productList().then(res => {
      if (res.data.code === "200") {
        let riskResult = res.data.data;
        let data = [{ label: "全部产品", value: "" }];
        let amap = new Map(Object.entries(riskResult));
        for (let [k, v] of amap) {
          data.push({
            label: v,
            value: k
          });
        }
        this.setState({
          selectType: data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  }

  getData = () => {
    let params = {};
    params.productNo = this.state.productNo;
    params.dateType = this.state.dateType;
    params.isInternalEmployee = this.state.isInternalEmployee;
    params.date = this.state.date;
    repayReportApi.reportData(params)
      .then((res) => {
        if (res.data.code === '200') {
          let data = [];
          // 构建柱状图的数据源
          res.data.data.map(item => {
            data.push({
              label: item.date,
              待还金额: item.repayAmount
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

  getTwo = () => {
    // 柱状图
    let params = {};
    params.productNo = this.state.productNo;
    params.dateType = this.state.dateType;
    params.isInternalEmployee = this.state.isInternalEmployee;
    params.date = this.state.date;
    repayReportApi.trend(params)
      .then((res) => {
        if (res.data.code === '200') {
          let data = [];
          // 构建柱状图的数据源
          res.data.data.map((item) => {
            data.push({
              label: item.date,
              还款金额: item.repayAmount,
            });
          });
          this.setState({
            oneChartValue: data,
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
    this.setState({ date: [], productNo: "", dateType: "DAY",isInternalEmployee:""  }, () =>
      this.getTwo()
    );
  }

  handChange = value => { //放款统计 选择产品
    this.setState({ productNo: value }, () => this.getTwo());
  }
  isInternalEmployeeChange = value => { //放款统计 选择产品
    this.setState({ isInternalEmployee: value }, () => this.getTwo());
  }

  onOk = val => { //日期选择
    this.setState({ date: val }, () => this.getTwo());
  }

  onDayOne = () => { //未来待还统计 选择日
    this.setState({ dateType: "DAY" },() => this.getData());
  }
  onMonthOne = () => {  //未来待还统计 选择月
    this.setState({ dateType: "MONTH" },()=>this.getData());
  }
  onYearOne = () => {  //未来待还统计 选择年
    this.setState({ dateType: "YEAR" },()=>this.getData());
  }

  onClickOne = () => { //未来待还统计 重置按钮
    this.setState({ date: [], productNo: "", dateType: "DAY",isInternalEmployee:"" }, () =>
      this.getData()
    );
  }
  handChangeOne = value => { //未来待还统计 选择产品
    this.setState({ productNo: value }, () => this.getData());
  }
  isInternalEmployeeChangeOne = value => { //未来待还统计 选择产品
    this.setState({ isInternalEmployee: value }, () => this.getData());
  }
  onOkOne = val => { //未来待还统计 日期选择
    this.setState({ date: val }, () => this.getData());
  }

  render() {
    const scale = {
      还款金额: {
        type: 'linear',
      },
      label: {
        range: [0.05, 0.95],
      },
    };
    return (
      <div className="homepage">
        <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
          <h2>还款报告</h2>
        </p>
        <IceContainer style={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>还款统计</h3>
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
            height={300}
            width={500}
            forceFit
            data={this.state.oneChartValue}
            scale={scale}
            padding="auto"
            onTooltipChange={(ev) => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.还款金额 + "元";
            }}
          >
            <Legend position="top" />
            <Axis name="label" />
            <Axis name="还款金额" position={"left"} />
            <Tooltip />
            <Geom
              type="interval"
              position="label*还款金额"
              color={[
                "type",
                () => {
                  return "#60A2FF";
                },
              ]}
            />
          </Chart>
        </IceContainer>

        <IceContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>未来待还统计</h3>
            <div style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                text
                onClick={this.onClickOne}
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
                onChange={this.handChangeOne}
              />
              <Select
                followTrigger
                name="isInternalEmployee"
                style={{ marginRight: "10px" }}
                defaultValue={{ value: "", label: "是否集团内部员工" }}
                dataSource={this.state.isInternalEmployeeType}
                onChange={this.isInternalEmployeeChangeOne}
              />
              <span>
                <Button
                  type={this.state.dateType === "DAY" ? "primary" : "normal"}
                  text
                  onClick={this.onDayOne}
                >
                  按日
                </Button>
                <span style={styles.line}> | </span>
                <Button
                  type={this.state.dateType === "MONTH" ? "primary" : "normal"}
                  text
                  onClick={this.onMonthOne}
                >
                  按月
                </Button>
                <span style={styles.line}> | </span>
                <Button
                  type={this.state.dateType === "YEAR" ? "primary" : "normal"}
                  text
                  onClick={this.onYearOne}
                >
                  按年
                </Button>
              </span>
              <RangePicker style={{ marginLeft: "10px" }} onOk={this.onOkOne} />
            </div>
          </div>
          <Chart
            height={300}
            width={500}
            forceFit
            data={this.state.twoChartValue}
            scale={scale}
            padding="auto"
            onTooltipChange={(ev) => {
              let items = ev.items; // tooltip显示的项
              items[0].value = items[0].point._origin.待还金额 + "元";
            }}
          >
            <Legend position="top" />
            <Axis name="label" />
            <Axis name="待还金额" position={"left"} />
            <Tooltip />
            <Geom
              type="interval"
              position="label*待还金额"
              color={[
                "type",
                () => {
                  return "#60A2FF";
                },
              ]}
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
