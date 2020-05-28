import React, { Component } from 'react';
import { Dialog, Message } from '@alifd/next';
import store from "../../../store";
import { iouFormValue } from "../../../store/ScreeningWarehouse/loanTransaction/actions";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import messagePushApi from '../../../api/AppManage/messagePush';

export default class MessagePushList extends Component {
  static displayName = 'messagePushList';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().productRunManage.productManage.formValue,
      page: store.getState().productRunManage.productManage.page,
      limit: store.getState().productRunManage.productManage.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().productRunManage.productManage.formValue,
        page: store.getState().productRunManage.productManage.page,
        limit: store.getState().productRunManage.productManage.limit
      });
    });
  }

  form = [{
    label: '推送编号',
    key: 'id',
    type: '',
  },
  {
    label: '推送平台',
    key: 'platform',
    type: 'select',
    list: [{
      key: '不限',
      value: '',
    }],
  },
  {
    label: '消息标题',
    key: 'title',
    type: '',
  },
  {
    label: '消息状态',
    key: 'sendStatus',
    type: 'select',
    list: [{
      key: '全部',
      value: '',
    }],
  },
  {
    label: '发送类型',
    key: 'sendType',
    type: 'select',
    list: [{
      key: '全部',
      value: '',
    }],
  },
  {
    label: "结束日期",
    key: "endedDate",
    type: "range"
  }
  ];

  table = [
    {
      title: "推送编号",
      key: "id",
      width: 100,
    },
    {
      title: "消息标题",
      key: "title",
      width: 200,
    },
    {
      label: '消息内容',
      key: 'content',
      type: '',
    },
    {
      title: "推送平台",
      key: "platformText",
      width: 80,
    },
    {
      title: "发送时间",
      key: "sendTime",
      width: 100,
    },
    {
      title: "发送类型",
      key: "sendTypeText",
      width: 80,
    },
    {
      title: "状态",
      key: "sendStatusText",
      width: 80,
      align: "right"
    },
    {
      title: '操作',
      key: 'operate',
      width: 100,
      cell: true,
    },
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      permission: "app:message:push:menu:add"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.props.history.push({
        pathname: '/messagePush/messagePushUpdate/add'
      });
    }
  };

  lineBtn = [
    {
      name: '发送',
      type: 'send',
      key: 'sendStatusText',
      value: '待发送',
      permission: 'app:message:push:menu:send'
    },
    {
      name: "修改",
      type: "edit",
      key: 'sendStatusText',
      value: '待发送',
      permission: "app:message:push:menu:update"
    },
    {
      name: '删除',
      type: 'del',
      key: 'sendStatusText',
      value: '待发送',
      permission: 'app:message:push:menu:delete'
    }];

  lineBtnFn = {
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: '/messagePush/messagePushUpdate/edit/' + row.id
      });
    },
    send: (val, index, row) => {
      Dialog.show({ title: '发送消息', content: '确定执行发送消息操作吗？', onOk: () => this.sendFn(row.id) });
    },
    del: (val, index, row) => {
      Dialog.show({ title: '删除消息', content: '确认删除该消息吗？', onOk: () => this.deleteFn(row.id) });
    },
  };

  sendFn = (id) => {
    messagePushApi.updateStatus(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  deleteFn = (id) => {
    messagePushApi.deleteMessage(id)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            loading: true,
          }, () => this.getData());
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getPlatform = () => {
    messagePushApi.platform().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[1].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          });
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getMessageStatus = () => {
    messagePushApi.messageStatus().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[3].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          });
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getMessageType = () => {
    messagePushApi.messageType().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[4].list.push({
              key: v,
              value: k
            });
          }
          this.setState({
            refresh: this.state.refresh + 1
          });
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(iouFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(iouFormValue(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    messagePushApi.list(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          page: res.data.data.pageNum,
          limit: res.data.data.pageSize,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onSubmit(formValue) {
    this.setState(
      {
        formValue: formValue,
        page: 1,
        limit: 10,
        loading: true
      },
      () => this.getData()
    );
  }

  componentWillMount() {
    this.getPlatform();
    this.getMessageStatus();
    this.getMessageType();
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  render() {
    return (
      <div>
        <SearchForm
          form={this.form}
          title="消息推送"
          formValue={this.state.formValue}
          onSubmit={formValue => this.onSubmit(formValue)}
        />
        <DataTable
          col={this.table}
          toolBtn={this.toolBtn}
          toolBtnFn={this.toolBtnFn}
          lineBtn={this.lineBtn}
          lineBtnFn={this.lineBtnFn}
          page={true}
          pageSize={this.state.limit}
          current={this.state.page}
          total={this.state.total}
          pageChange={current => this.pageChange(current)}
          limitChange={pageSize => this.limitChange(pageSize)}
          loadTable={this.state.loading}
          data={this.state.data}
        />
      </div>
    );
  }
}
