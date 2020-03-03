import React, { Component } from "react";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import loanTypeApi from "../../../api/RiskManage/LoanType";
import { Message } from "@alifd/next";
import { detail } from "../../../api/RiskManage/PartnerRank";

export default class LoanType extends Component {
  static displayName = "LoanType";
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
      refresh: 0
    };
  }

  componentWillMount() {
    this.getCategoryStatus();
    this.getValidStatus();
  }

  componentDidMount() {
    this.getData();
  }

  getCategoryStatus = () => {
    loanTypeApi.categoryStatus().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[6].list.push({
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

  getValidStatus = () => {
    loanTypeApi.validStatus().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.form[7].list.push({
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
    this.setState({ page, loading: true }, () => this.getData());
  };

  limitChange = limit => {
    this.setState({ limit, loading: true }, () => this.getData());
  };

  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    loanTypeApi.list(params).then(res => {
      if (res.data.code === "200") {
        let data = res.data.data.list
        data.map((item,index) => {
          if(item.manualEver === false) {
          item.manualEver = "否"
        } 
        if(item.manualEver === true) {
          item.manualEver = "是"
        }
          return data
        })
        this.setState({
          data: data,
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

  form = [
    {
      label: "借据号",
      key: "dueId",
      type: ""
    },
    {
      label: "客户名称",
      key: "customerName",
      type: ""
    },
    {
      label: "证件号",
      key: "identityNo",
      type: ""
    },
    {
      label: "手机号",
      key: "phone",
      type: ""
    },
    {
      label: "合作机构名称",
      key: "partnerName",
      type: ""
    },
    {
      label: "产品名称",
      key: "productName",
      type: ""
    },
    {
      label: "五级状态",
      key: "categoryType",
      type: "select",
      list: [{ key: "全部", value: "" }]
    },
    {
      label: "生效标志",
      key: "validStatus",
      type: "select",
      list: [{ key: "全部", value: "" }]
    }
  ];

  table = [
    {
      title: "借据号",
      key: "dueId",
      width: 100
    },
    {
      title: "客户名称",
      key: "customerName",
      width: 80
    },
    {
      title: "证件号",
      key: "identityNo",
      width: 120
    },
    {
      title: "手机号",
      key: "phone",
      width: 100
    },
    {
      title: "合作机构名称",
      key: "partnerName",
      width: 180
    },
    {
      title: "项目名称",
      key: "projectName",
      width: 130
    },
    {
      title: "产品名称",
      key: "productName",
      width: 90
    },
    {
      title: "贷款金额 (元) ",
      key: "loanAmount",
      width: 110,
      align: "right"
    },
    {
      title: "贷款余额 (元) ",
      key: "loanBalance",
      width: 110,
      align: "right"
    },
    {
      title: "起始日期",
      key: "valueDate",
      width: 100
    },
    {
      title: "结束日期",
      key: "dueDate",
      width: 100
    },
    {
      title: "逾期最大天数",
      key: "maxOverdueDay",
      width: 80
    },
    {
      title: "是否人工调整",
      key: "manualEver",
      width: 80
    },
    {
      title: "五级状态",
      key: "categoryType",
      width: 80
    },
    {
      title: "生效标志",
      key: "validStatus",
      width: 80
    },
    {
      title: "操作",
      key: "operate",
      width: 200,
      cell: true
    }
  ];

  lineBtn = [
    {
      name: "详情",
      type: "detail",
      permission: ":"
    },
    {
      name: "修改",
      type: "edit",
      permission: "operation:basic:product:modify"
    }
  ];

  lineBtnFn = {
    detail: (val, index, row) => {
      this.props.history.push({
        pathname: "/riskManage/loanTypeDetail",
        state: { name: row.dueId }
      });
    },
    edit: (val, index, row) => {
      this.props.history.push({
        pathname: "/riskManage/loanTypeUpdate",
        state: { name: row.dueId }
      });
    }
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
          form={this.form}
          title="贷款五级分类"
          onSubmit={formValue => this.onSubmit(formValue)}
        />
        <DataTable
          col={this.table}
          toolBtn={this.toolBtn}
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
