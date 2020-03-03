import React, {Component} from 'react';
import chartObj from 'echarts';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';
import cityData from '../../../../CNcity';

export default class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.createMap(this.mapNode);
  }

  componentDidUpdate() {
    this.createMap(this.mapNode);
  }

  setMapElement = n => {
    this.mapNode = n;
  };

  createMap = element => {
    const myChart = chartObj.init(element);
    const option = this.getOption();
    myChart.setOption(option, true);
  };

  convertData() {
    let res = [];
    this.props.data.map(item => {
      let point = cityData[item.name];
      if (point) {
        res.push({
          name: item.name,
          value: point.concat(item.value)
        })
      }
    });
    return res;
  }

  getOption() {
    return {
      backgroundColor: '#1c4371',
      title: {
        text: '',
        x: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.name + ' : ' + params.value[2];
        }
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['运营状况'],
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#1c4371',
            borderColor: '#3e90bd'
          },
          emphasis: {
            areaColor: '#1c4371'
          }
        }
      },
      series: [
        {
          name: '运营状况',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(),
          symbolSize: function (val) {
            let param = (val[2] + '').split(',').join('');
            return param / 10000;
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            color: '#a99753',
            opacity: 1,
            emphasis: {
              borderColor: '#f1e360',
              borderWidth: 1,
              color: '#f1e360',
              opacity: 1
            }
          }
        }
      ]
    };
  }

  render() {
    return (
      <div style={{width: '100%', height: '400px'}} ref={this.setMapElement}/>
    );
  }
}
