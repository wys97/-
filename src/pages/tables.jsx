/* eslint-disable react/no-unused-state, no-plusplus */
import React, { Component } from "react";
import { Grid, Pagination, Table } from "@alifd/next";
import IceContainer from "@icedesign/container";
import { Link } from "react-router-dom";
import PermissionA from "./components/PermissionA";
import PermissionLink from "./components/PermissionLink";
import PermissionBtn from "./components/PermissionBtn";
import * as _ from "lodash";

const { Row, Col } = Grid;

export default class Tables extends Component {
  static displayName = "Tables";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePaginationChange = current => {
    this.props.pageChange && this.props.pageChange(current);
  };

  handlePageSizeChange = pageSize => {
    this.props.limitChange && this.props.limitChange(pageSize);
  };

  renderDetail = (value, index, record, path) => {
    return (
      <Link
        to={{
          pathname: path + "/" + value,
          state: { name: value, row: record }
        }}
      >
        {value}
      </Link>
    );
  };

  renderWindow = (value, index, record, key) => {
    return (
      <a
        href="javascript:;"
        onClick={() => this.props.lineBtnFn[key](value, index, record)}
      >
        {value}
      </a>
    );
  };

  lineClickFn = (row, index) => {
    if (this.props.lineClickFn) {
      this.props.lineClickFn(row, index);
    }
  };

  initCell = (value, index, record, key) => {
    this.props.lineBtnFn[key](value, index, record);
  };

  onChange = (selectedKeys,records) => {
    this.props.selectedKey && this.props.selectedKey(selectedKeys);
    this.props.record && this.props.record(records);
  };

  rowSelection = {
    onChange: this.onChange
  };

  loadColumns = (col, index) => {
    if (col.columns && col.columns.length > 0) {
      return (
        <Table.ColumnGroup key={index} title={col.title} align="center">
          {col.columns.map((item, idx) => {
            return this.loadColumns(item, idx);
          })}
        </Table.ColumnGroup>
      );
    }
    if (col.path) {
      return (
        <Table.Column
          key={index}
          title={col.title}
          dataIndex={col.key}
          width={col.width}
          align={col.align ? col.align : "left"}
          cell={(value, index, record) =>
            this.renderDetail(value, index, record, col.path)
          }
        />
      );
    }
    if (col.callback) {
      return (
        <Table.Column
          key={index}
          title={col.title}
          dataIndex={col.key}
          width={col.width}
          align={col.align ? col.align : "left"}
          cell={this.props.lineBtnFn[col.callback]}
        />
      );
    }
    if (col.window) {
      return (
        <Table.Column
          key={index}
          title={col.title}
          dataIndex={col.key}
          width={col.width}
          align={col.align ? col.align : "left"}
          cell={(value, index, record) =>
            this.renderWindow(value, index, record, col.window)
          }
        />
      );
    }
    return (
      <Table.Column
        key={index}
        title={col.title}
        dataIndex={col.key}
        align={col.align ? col.align : "left"}
        width={col.width}
      />
    );
  };

  render() {
    const renderOpt = (value, index, record) => {
      return this.props.lineBtn.map((item, i) => {
        if (
          item.key &&
          _.findIndex(item.value.split(","), function(o) {
            return o === record[item.key];
          }) === -1
        ) {
          return (
            <PermissionA
              permission={item.permission}
              key={i}
              href="javascript:;"
              style={styles.lineDisableBtn}
              name={item.name}
            />
          );
        }
        return item.path ? (
          <PermissionLink
            permission={item.permission}
            key={i}
            style={styles.lineBtn}
            to={item.path}
            name={item.name}
          />
        ) : (
          <PermissionA
            permission={item.permission}
            key={i}
            style={
              item.color
                ? { ...styles.lineBtn, color: item.color }
                : styles.lineBtn
            }
            href="javascript:;"
            onClick={() => this.initCell(value, index, record, item.type)}
            name={item.name}
          />
        );
      });
    };

    const toolTip =
      this.props.toolBtn && this.props.toolBtn.length > 0 ? (
        <Row wrap style={styles.headRow}>
          <Col l="24">
            {this.props.toolBtn.map((item, index) => {
              return item.path ? (
                <PermissionLink
                  permission={item.permission}
                  key={index}
                  to={item.path}
                  icon={item.icon}
                  name={item.name}
                />
              ) : (
                <PermissionBtn
                  permission={item.permission}
                  key={index}
                  type="primary"
                  style={styles.button}
                  onClick={this.props.toolBtnFn[item.type]}
                  icon={item.icon}
                  name={item.name}
                />
              );
            })}
          </Col>
        </Row>
      ) : null;

    const page = this.props.page ? (
      <Pagination
        style={styles.pagination}
        current={this.props.current}
        total={this.props.total}
        pageSize={this.props.pageSize}
        loading={this.props.loadTable}
        onChange={this.handlePaginationChange}
        pageSizeSelector="dropdown"
        pageSizePosition="end"
        pageSizeList={[10, 20, 30]}
        popupProps={{ align: "bl tl" }}
        onPageSizeChange={this.handlePageSizeChange}
      />
    ) : null;


    return (
      <IceContainer>
        {toolTip}
        <Table
          dataSource={this.props.data}
          emptyContent="暂无数据"
          hasBorder={false}
          fixedHeader={true}
          rowSelection={this.rowSelection}
          maxBodyHeight={3500}
          primaryKey={this.props.creditId}
          onRowClick={this.lineClickFn}
          loading={this.props.loadTable ? this.props.loadTable : false}
        >
          {this.props.col.map((col, index) => {
            if (col.key === "operate") {
              return (
                <Table.Column
                  key={index}
                  title={col.title}
                  dataIndex={col.key}
                  width={col.width}
                  align={col.align ? col.align : "left"}
                  cell={renderOpt}
                />
              );
            }
            return this.loadColumns(col, index);
          })}
        </Table>
        {page}
      </IceContainer>
    );
  }
}
const styles = {
  headRow: {
    marginBottom: "10px",
    textAlign: "right"
  },
  icon: {
    color: "#2c72ee",
    cursor: "pointer"
  },
  deleteIcon: {
    marginLeft: "20px"
  },
  center: {
    textAlign: "right"
  },
  button: {
    borderRadius: "4px",
    marginRight: "10px"
  },
  pagination: {
    marginTop: "20px",
    textAlign: "right"
  },
  lineBtn: {
    marginLeft: "10px"
  },
  lineDisableBtn: {
    marginLeft: "10px",
    color: "#E1E1E1"
  }
};
