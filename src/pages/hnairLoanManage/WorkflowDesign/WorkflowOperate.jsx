import React from "react";
import {Dialog, Message} from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import workflowDesignApi from "../../../api/HnairCreditManage/WorkflowDesign";

export default class WorkflowOperate extends React.Component {
  static displayName = "WorkflowOperate";
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {},
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: [],
      refresh: 0,
      form: [
        {
          label: "流程名称",
          key: "approvalName",
          type: ""
        },
        {
          label: "产品名称",
          key: "productName",
          type: ""
        },
        {
          label: "审批类型",
          key: "approvalType",
          type: "select",
          list: [
            {
              key: "全部",
              value: ""
            }
          ]
        }
      ]
    };
  }

  table = [
    {
      title: "流程编号",
      key: "id",
      width: 100,
      cell: true,
      path: "/workflowDesign/workflowDetail"
    },
    {
      title: "流程名称",
      key: "approvalName",
      width: 120
    },
    {
      title: "产品名称",
      key: "productName",
      width: 80
    },
    {
      title: "类型",
      key: "approvalTypeText",
      width: 120
    },
    {
      title: "多级工作流",
      key: "approvalLevelText",
      width: 100,
      align: "right"
    },
    {
      title: '操作',
      key: 'operate',
      width: 180,
      cell: true,
    },
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      icon: "add",
      permission: "business:workflow-design:maintain:add"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.props.history.push({pathname: '/workflowDesign/workflowUpdate/add'});
    }
  };

  lineBtn = [{
    name: "修改",
    type: "edit",
    permission: "business:workflow-design:maintain:modify"
  }, {
    name: "删除",
    type: "del",
    permission: "business:workflow-design:maintain:delete"
  }];

  lineBtnFn = {
    edit: (val, index, row) => {
      this.props.history.push({pathname: '/workflowDesign/workflowUpdate/edit/' + row.id});
    },
    del: (val, index, row) => {
      Dialog.show({title: '删除操作', content: '确认删除该工作流信息吗？', onOk: () => this.del(row.id)});
    }
  };

  del = (id) => {
    workflowDesignApi.delWorkflowOperate(id).then((res) => {
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
    this.getApprovalType();
  }

  componentDidMount() {
    this.getData();
  }

  pageChange = page => {
    this.setState({page, loading: true}, () => this.getData());
  };

  limitChange = limit => {
    this.setState({limit, loading: true}, () => this.getData());
  };

  getApprovalType = () => {
    //产品管理-产品状态-下拉框
    workflowDesignApi.getApprovalType().then(res => {
      if (res.data.code === "200") {
        let approvalStatus = res.data.data;
        if (approvalStatus !== null && approvalStatus !== undefined) {
          let amap = new Map(Object.entries(approvalStatus));
          for (let [k, v] of amap) {
            // state中form[2]里面list的key是中文, value是英文
            this.state.form[2].list.push({
              key: v,
              value: k
            });
          }
          let form = [...this.state.form];
          let formValue = {...this.state.formValue};
          this.state.form[2].list.map(item => {
            if (item.key === "否") {
              formValue["approvalType"] = item.value;
            }
          });
          this.setState(
            {
              refresh: this.state.refresh + 1,
              formValue,
              form
            },
            () => this.getData()
          );
        }
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    workflowDesignApi.workflowOperateList(params).then(res => {
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

  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="工作流维护"
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
