/* eslint-disable react/no-unused-state, no-plusplus */
import React, {Component} from 'react';
import {Button, Grid, Icon, Message, Pagination, Table} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {Link} from 'react-router-dom';
import PermissionBtn from "./PermissionBtn";
import PermissionLink from "./PermissionLink";
import PermissionA from "./PermissionA";

const {Row, Col} = Grid;

let flag = false;

export default class DataTable extends Component {
  static displayName = 'DataTable';

  static propTypes = {};

  static defaultProps = {};

  j = -1;

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      total: 10,
      data: [],
      refresh: true,
      toolBtn: this.props.toolBtn ? this.props.toolBtn : [],
      lineBtn: this.props.lineBtn ? this.props.lineBtn : [],
      lineBtnFn: this.props.lineBtnFn ? this.props.lineBtnFn : [],
      toolBtnFn: this.props.toolBtnFn ? this.props.toolBtnFn : [],
      page: this.props.page === false ? this.props.page : true,
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    flag = !(nextProps.param === this.props.param && this.state.pageSize === nextState.pageSize && this.state.current === nextState.current);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (flag) {
      this.getData();
    }
  }

  getData = () => {
    const param = this.props.param;
    // param.page = this.state.current;
    // param.limit = this.state.pageSize;
    const params = this.state.page ? param : this.props.param;
    this.props.api(params).then((res) => {
      if (res.data.code === '200') {
        const data = this.state.page ? res.data.data.list : res.data.data;
        if (this.props.apiDataFormat) {
          const dataList = [];
          data.map((item) => {
            for (const key in item) {
              if (Array.isArray(item[key])) {
                item[`${key}Str`] = item[key].join('、');
              }
            }
            dataList.push(item);
          });
          this.setState({data: dataList, total: this.state.page ? res.data.data.total : 0});
        } else {
          this.setState({data, total: this.state.page ? res.data.data.total : 0});
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  handlePaginationChange = (current) => {
    this.setState({current, refresh: true});
  };

  handlePageSizeChange = (pageSize) => {
    this.setState({current: 0, pageSize, refresh: true});
  };

  renderDetail = (value, index, record, path) => {
    return <Link to={{pathname: path, state: {name: value, row: record}}}>{value}</Link>;
  };

  renderWindow = (value, index, record, key) => {
    return <a style={styles.lineBtn} href="javascript:;"
              onClick={() => this.props.lineBtnFn[key](value, index, record)}>{value}</a>
  };

  initCell = (value, index, record, key) => {
    this.props.lineBtnFn[key](value, index, record);
  };

  render() {
    const toolTip = (this.props.toolBtn && this.props.toolBtn.length > 0) ?
      (<Row wrap style={styles.headRow}>
        <Col l="24">
          {this.props.toolBtn.map((item, index) => {
            return item.path ?
              (<PermissionLink permission={item.permission} key={index} to={item.path} icon={item.icon}
                               name={item.name}>
              </PermissionLink>)
              :
              (<PermissionBtn permission={item.permission} permission={item.permission} key={index} type="primary"
                              style={styles.button}
                              onClick={this.props.toolBtnFn[item.type]} icon={item.icon} name={item.name}>
              </PermissionBtn>);
          })}
        </Col>
      </Row>) : null;

    const page = this.state.page ?
      (<Pagination
        style={styles.pagination}
        current={this.state.current}
        total={this.state.total}
        pageSize={this.state.pageSize}
        onChange={this.handlePaginationChange}
        pageSizeSelector="dropdown"
        pageSizePosition="end"
        pageSizeList={[10, 20, 30]}
        popupProps={{align: 'bl tl'}}
        onPageSizeChange={this.handlePageSizeChange}
      />) : null;

    const renderOpt = (value, index, record) => {
      return this.props.lineBtn.map((item, i) => {
        if (item.key && item.value.indexOf(record[item.key]) === -1) {
          return <PermissionA permission={item.permission} key={i} href="javascript:;" style={styles.lineDisableBtn}
                              name={item.name}/>;
        }
        return item.path ? <PermissionLink permission={item.permission} key={i} style={styles.lineBtn} to={item.path}
                                           name={item.name}/> :
          <PermissionA permission={item.permission} key={i} style={styles.lineBtn} href="javascript:;"
                       onClick={() => this.initCell(value, index, record, item.type)} name={item.name}/>;
      });
    };

    return (
      <IceContainer>
        {toolTip}
        <Table
          dataSource={this.state.data}
          emptyContent="暂无数据"
          fixedHeader={true}
          maxBodyHeight={3500}
          loading={this.props.loadTable ? this.props.loadTable : false}
        >
          {
            this.props.col.map((col, index) => {
              if (col.cell) {
                this.j++;
              }
              if (col.path) {
                return <Table.Column key={index} title={col.title} dataIndex={col.key} width={col.width}
                                     align={col.align ? col.align : 'left'}
                                     cell={(value, index, record) => this.renderDetail(value, index, record, col.path)}/>;
              }
              if (col.callback) {
                return <Table.Column key={index} title={col.title} dataIndex={col.key} width={col.width}
                                     align={col.align ? col.align : 'left'}
                                     cell={this.props.lineBtnFn[col.callback]}/>;
              }
              if (col.window) {
                return <Table.Column key={index} title={col.title} dataIndex={col.key} width={col.width}
                                     align={col.align ? col.align : 'left'}
                                     cell={(value, index, record) => this.renderWindow(value, index, record, col.window)}/>;
              }
              if (col.key === 'operate') {
                return <Table.Column key={index} title={col.title} dataIndex={col.key} width={col.width}
                                     align={col.align ? col.align : 'left'} cell={renderOpt}/>;
              }
              return <Table.Column key={index} title={col.title} dataIndex={col.key}
                                   align={col.align ? col.align : 'left'}
                                   width={col.width}/>; // cell={col.cell?() => {this.props.cellFn[this.j]}:(value) => {return value;}}
            })
          }
        </Table>
        {page}
      </IceContainer>
    );
  }
}
const styles = {
  headRow: {
    marginBottom: '10px',
    textAlign: 'right',
  },
  icon: {
    color: '#2c72ee',
    cursor: 'pointer',
  },
  deleteIcon: {
    marginLeft: '20px',
  },
  center: {
    textAlign: 'right',
  },
  button: {
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  lineBtn: {
    marginLeft: '10px',
  },
  lineDisableBtn: {
    marginLeft: '10px',
    color: '#E1E1E1',
  },
};
