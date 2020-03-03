import React from "react";
import {Dialog, Message} from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import store from "../../../store";
import {creditUserList} from "../../../store/ScreeningWarehouse/loanTransaction/actions";
import questionApi from '../../../api/AppManage/questionManagement'


export default class QuestionList extends React.Component {
  static displayName = "QuestionList";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: store.getState().loanTransaction.creditUserList.formValue,
      page: store.getState().loanTransaction.creditUserList.page,
      limit: store.getState().loanTransaction.creditUserList.limit,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      form: [
        {
          label: "编号",
          key: "id",
          type: ""
        },
        {
          label: "文章标题",
          key: "questionTitle",
          type: ""
        }
      ]
    };
    store.subscribe(() => {
      this.setState({
        formValue: store.getState().loanTransaction.creditUserList.formValue,
        page: store.getState().loanTransaction.creditUserList.page,
        limit: store.getState().loanTransaction.creditUserList.limit
      });
    });
  }


  table = [
    {
      title: "编号",
      key: "id",
      width: 100,
      cell: true,
      path: '/appManage/questionDetail',
    },
    {
      title: "文章标题",
      key: "questionTitle",
      width: 100,
      align: "center"
    },
    {
      title: "创建人员",
      key: "creatorName",
      width: 110,
      align: "center"
    },
    {
      title: "创建时间",
      key: "createTime",
      width: 160,
      align: "center"
    },
    {
      title: "修改时间",
      key: "updateTime",
      width: 160,
      align: "center"
    },
    {
      title: '操作',
      key: 'operate',
      width: 180,
      cell: true,
      align: "center"
    }
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      permission: "app:maintain:appquestion:add"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.props.history.push({pathname: '/appManage/questionUpdate/add'});
    }
  };


  lineBtn = [{
    name: "修改",
    type: "edit",
    permission: "app:maintain:appquestion:update"
  },
  {
    name: '删除',
    type: 'del',
    permission: 'app:maintain:appquestion:delete'
  }];

  lineBtnFn = {
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: '/appManage/questionUpdate/edit/' + row.id });
    },
    del: (val, index, row) => {
      Dialog.show({title: '删除', content: '确认删除该问题吗？', onOk: () => this.del(row.id)});
    }
  };

  freezeUser = (id) => {
    questionApi.update({
      status: 'FROZEN',
      id: id
    }).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };

  del = (id) => {
    questionApi.del(id).then((res) => {
      if (res.data.code === '200') {
        Message.success(res.data.message);
        this.setState({
          loading: true
        }, () => this.getData());
      } else {
        Message.error(res.data.message);
      }
    })
  };


  componentWillMount() {
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = page;
    params.limit = this.state.limit;
    store.dispatch(creditUserList(params));
    this.setState({loading: true}, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(creditUserList(params));
    this.setState({loading: true}, () => this.getData());
  };



  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    questionApi.list(params).then(res => {
      if (res.data.code === "200") {
        this.setState({
          data: res.data.data.list,
          total: res.data.data.total,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };


  onSubmit(formValue) {
    let params = {};
    params.formValue = formValue;
    params.page = 1;
    params.limit = 10;
    store.dispatch(creditUserList(params));
    this.setState(
      {
        loading: true
      },
      () => this.getData()
    );
  }



  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="常见问题维护"
          onSubmit={formValue => this.onSubmit(formValue)}
          formValue={this.state.formValue}
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
