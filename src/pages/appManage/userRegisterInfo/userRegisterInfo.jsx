import React from "react";
import {Dialog, Message} from "@alifd/next";
import SearchForm from "../../components/SearchForm";
import DataTable from "../../dataTable";
import userRegisterInfoApi from '../../../api/AppManage/userRegisterInfo'
import store from "../../../store";
import { creditUserList } from "../../../store/ScreeningWarehouse/loanTransaction/actions";


export default class UserRegisterInfo extends React.Component {
  static displayName = "UserRegisterInfo";
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
          label: "用户编号",
          key: "id",
          type: ""
        },
        {
          label: "登录手机号",
          key: "loginMobile",
          type: ""
        },
        {
          label: "客户姓名",
          key: "customerName",
          type: ""
        },
        {
          label: "身份证号",
          key: "identityNo",
          type: ""
        },
        {
          label: "账户状态",
          key: "status",
          type: "select",
          list: [
            {
              key: "全部",
              value: ""
            }
          ]
        },
        {
          label: "授信状态",
          key: "creditStatus",
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
      title: "用户编号",
      key: "id",
      width: 100,
      align: "center"
    },
    {
      title: "登录手机号",
      key: "loginMobile",
      width: 100,
      align: "center"
    },
    {
      title: "号码归属地",
      key: "loginMobileRegion",
      width: 110,
      align: "center"
    },
    {
      title: "客户姓名",
      key: "customerName",
      width: 110,
      align: "center"
    },
    {
      title: "身份证号",
      key: "identityNo",
      width: 160,
      align: "center"
    },
    {
      title: "总授信额度(元)",
      key: "creditLimit",
      width: 120,
      align: "center"
    },
    {
      title: "剩余提现额度(元)",
      key: "availableCashLimit",
      width: 150,
      align: "center"
    },
    {
      title: "剩余购票额度(元) ",
      key: "availableLimit",
      width: 150,
      align: "center"
    },
    {
      title: "用户总积分",
      key: "pointTotal",
      width: 120,
      cell: true,
      window: 'pointsDetail',
      align: "center"
    },
    {
      title: "授信状态",
      key: "creditStatus",
      width: 100,
      align: "center"
    },
    {
      title: "账户状态",
      key: "status",
      width: 100,
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
      name: "导出",
      type: "export",
      icon: "export",
      permission: ":"
    }
  ];

  toolBtnFn = {
    export: () => {
      this.exportExcel();
    }
  };

  lineBtn = [{
    name: "冻结",
    type: "freeze",
    key: 'status',
    value: '启用',
    permission: ":"
  }, {
    name: "解冻",
    type: "unfreeze",
    key: 'status',
    value: '冻结',
    permission: ":"
  }];

  lineBtnFn = {
    freeze: (val, index, row) => {
      Dialog.show({title: '冻结', content: '确认冻结该用户吗？', onOk: () => this.freezeUser(row.id)});
    },
    unfreeze: (val, index, row) => {
      Dialog.show({title: '解冻', content: '确认解冻该用户吗？', onOk: () => this.unfreezeUser(row.id)});
    },
    pointsDetail:(val, index, row) => {
      this.props.history.push({
        pathname: '/userRegisterInfo/pointsDetailList/' + row.id
      });
    },
  };

  freezeUser = (id) => {
    userRegisterInfoApi.update({
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

  unfreezeUser = (id) => {
    userRegisterInfoApi.update({
      status: 'ENABLED',
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


  componentWillMount() {
    this.listUserStatusEnum();
    this.getCreditStatus();
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
    this.setState({ loading: true }, () => this.getData());
  };

  limitChange = limit => {
    let params = {};
    params.formValue = this.state.formValue;
    params.page = this.state.page;
    params.limit = limit;
    store.dispatch(creditUserList(params));
    this.setState({ loading: true }, () => this.getData());
  };

  getCreditStatus = () => {
    //产品管理-产品状态-下拉框
    userRegisterInfoApi.getCreditStatus().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.state.form[5].list.push({
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

  listUserStatusEnum = () => {
    //产品管理-产品状态-下拉框
    userRegisterInfoApi.listUserStatusEnum().then(res => {
      if (res.data.code === "200") {
        let result = res.data.data;
        if (result !== null && result !== undefined) {
          let amap = new Map(Object.entries(result));
          for (let [k, v] of amap) {
            this.state.form[4].list.push({
              //k显示 、 v值
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

  getData = () => {
    let params = {...this.state.formValue};
    params.page = this.state.page;
    params.limit = this.state.limit;
    userRegisterInfoApi.list(params).then(res => {
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

  exportExcel = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    userRegisterInfoApi.exportExcel(params).then(res => {
      let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      let fileName = decodeURI(
        res.headers["content-disposition"].split("=")[1]
      );

      let link = document.createElement("a");
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    });
  };

  render() {
    return (
      <div>
        <SearchForm
          form={this.state.form}
          title="用户注册信息"
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
