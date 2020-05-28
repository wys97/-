import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import {
  Dialog,
  Field,
  Form,
  Grid,
  Message,
  Radio,
  Checkbox,
  Input,
  Icon
} from "@alifd/next";
import DataTable from "../../dataTable";
import productManageApi from "../../../api/OperationManage/ProductManage";
import "../OperationManage";

const { Row, Col } = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

export default class RefundProjectDeploy extends Component {
  field = new Field(this);
  static displayName = "RefundProjectDeploy";
  static propType = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        productNo: props.id,
        productName: props.name
      },
      visible: false,
      visibles: false,
      type: "",
      loading: false,
      userInfo: {
        productNo: "",
        repayMethod: "",
        firstRepayDay: "",
        firstInterestMethod: "",
        roundMethod: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: "",
        isTerm1: "",
        isTerm3: "",
        isTerm6: "",
        isTerm9: "",
        isTerm12: "",
        isTerm24: "",
        isTerm36: ""
      },
      rateSettingInfo: {
        // 弹窗信息
        id: "",
        productNo: "",
        productName: "",
        loanMaxAmount: "",
        loanMinAmount: "",
        rates: [],
        interestRate1: "",
        interestRate3: "",
        interestRate6: "",
        interestRate9: "",
        interestRate12: "",
        interestRate24: "",
        interestRate36: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: "",
        maxCreditScore: "",
        minCreditScore: ""
      },
      data: [],
      datas: [],
      rates: [],
      repayMethod: {}, //支持的还款方式-下拉框
      firstRepayDay: {}, // 不足月首期还款日-下拉框
      firstInterestMethod: {}, // 首期不足月计息方式-下拉框
      roundMethod: {}, //产品管理-整数化方法-下拉框
      internalStaff: false, //是否内部员工
    };
  }

  table = [
    { title: "还款方式", key: "repayMethod", width: 100 },
    { title: "不足月首期还款日", key: "firstInterestMethod", width: 150 },
    { title: "不足月计息", key: "firstRepayDay", width: 100 },
    { title: "整数化方案", key: "roundMethod", width: 100 },
    { title: "1期", key: "isTerm1", width: 100, align: "center" },
    { title: "3期", key: "isTerm3", width: 100, align: "center" },
    { title: "6期", key: "isTerm6", width: 100, align: "center" },
    { title: "9期", key: "isTerm9", width: 100, align: "center" },
    { title: "12期", key: "isTerm12", width: 100, align: "center" },
    { title: "24期", key: "isTerm24", width: 100, align: "center" },
    { title: "36期", key: "isTerm36", width: 100, align: "center" },
    { title: "操作", key: "operate", width: 120, cell: true, align: "center" }
  ];
  tables = [
    { title: "是否内部员工", key: "isInternalEmployee", width: 100 },
    { title: "信用分下限", key: "minCreditScore", width: 100 },
    { title: "信用分上限", key: "maxCreditScore", width: 150 },
    { title: "金额下限(元)", key: "loanMinAmount", width: 100 },
    { title: "金额上限(元)", key: "loanMaxAmount", width: 100 },
    {
      title: "月利率",
      key: "rateMap",
      columns: [
        {
          title: "1期月利率",
          key: "interestRate1Str",
          width: 100,
          align: "center"
        },
        {
          title: "3期月利率",
          key: "interestRate3Str",
          width: 100,
          align: "center"
        },
        {
          title: "6期月利率",
          key: "interestRate6Str",
          width: 100,
          align: "center"
        },
        {
          title: "9期月利率",
          key: "interestRate9Str",
          width: 100,
          align: "center"
        },
        {
          title: "12期月利率",
          key: "interestRate12Str",
          width: 100,
          align: "center"
        },
        {
          title: "24期月利率",
          key: "interestRate24Str",
          width: 100,
          align: "center"
        },
        {
          title: "36期月利率",
          key: "interestRate36Str",
          width: 100,
          align: "center"
        }
      ]
    },
    { title: "操作", key: "operate", width: 120, cell: true, align: "center" }
  ];

  toolBtn = [
    {
      name: "新增",
      type: "add",
      // path: '/baseinfo/productAdd',
      permission: "operation:basic:product:add"
    }
  ];

  lineBtn = [
    {
      name: "修改",
      type: "edit",
      permission: "operation:basic:product:modify"
    },
    {
      name: "删除",
      type: "del",
      color: "red",
      permission: "operation:basic:product:delete"
    }
  ];

  toolBtnFn = {
    add: () => {
      this.field.setValues({
        productNo: "",
        repayMethod: "",
        firstRepayDay: "",
        firstInterestMethod: "",
        roundMethod: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: "",
        isTerm1: "",
        isTerm3: "",
        isTerm6: "",
        isTerm9: "",
        isTerm12: "",
        isTerm24: "",
        isTerm36: ""
      });
      this.setState({
        visible: true,
        type: "add",
        userInfo: {
          productNo: "",
          repayMethod: "",
          firstRepayDay: "",
          firstInterestMethod: "",
          roundMethod: "",
          creatorName: "",
          createTime: "",
          modifierName: "",
          modifyTime: "",
          isTerm1: "",
          isTerm3: "",
          isTerm6: "",
          isTerm9: "",
          isTerm12: "",
          isTerm24: "",
          isTerm36: ""
        }
      });
    }
  };

  lineBtnFn = {
    edit: (val, index, row) => {
      productManageApi.productRepayMethodDetail(row.id).then(res => {
        if (res.data.code === "200") {
          res.data.data.rate = [];
          Object.keys(res.data.data).map(item => {
            if (
              item.indexOf("isTerm") !== -1 &&
              res.data.data[item] &&
              res.data.data[item] !== "0"
            ) {
              res.data.data.rate.push(item);
            }
          });
          this.field.setValues(res.data.data);
          this.setState({
            visible: true,
            type: "edit",
            userInfo: res.data.data,
            rate: res.data.data.rate
          });
        } else {
          Message.error(res.data.message);
        }
      });
    },
    del: (value, index, record) => {
      Dialog.show({
        title: "删除还款方式",
        content: "确认删除该还款方式吗？",
        onOk: () => this.projectDelete(record.id)
      });
    }
  };
  toolBtns = [
    {
      name: "新增",
      type: "add",
      // path: '/baseinfo/productAdd',
      permission: ":"
    }
  ];

  lineBtns = [
    {
      name: "修改",
      type: "edits",
      permission: ":"
    },
    {
      name: "删除",
      type: "dels",
      color: "red",
      permission: ":"
    }
  ];

  toolBtnFns = {
    add: () => {
      this.field.setValues({
        id: "",
        productNo: "",
        productName: "",
        loanMaxAmount: "",
        loanMinAmount: "",
        rates: [],
        interestRate1: "",
        interestRate3: "",
        interestRate6: "",
        interestRate9: "",
        interestRate12: "",
        interestRate24: "",
        interestRate36: "",
        creatorName: "",
        createTime: "",
        modifierName: "",
        modifyTime: "",
        maxCreditScore: "",
        minCreditScore: ""
      });
      this.setState({
        visibles: true,
        type: "add",
        rateSettingInfo: {
          id: "",
          productNo: "",
          productName: "",
          loanMaxAmount: "",
          loanMinAmount: "",
          rates: [],
          interestRate1: "",
          interestRate3: "",
          interestRate6: "",
          interestRate9: "",
          interestRate12: "",
          interestRate24: "",
          interestRate36: "",
          creatorName: "",
          createTime: "",
          modifierName: "",
          modifyTime: "",
          maxCreditScore: "",
          minCreditScore: ""
        }
      });
    }
  };

  lineBtnFns = {
    edits: (val, index, row) => {
      productManageApi.rateSettingDetail(row.id).then(res => {
        if (res.data.code === "200") {
          res.data.data.rates = [];
          Object.keys(res.data.data).map(item => {
            if (
              item.indexOf("interestRate") !== -1 &&
              item.indexOf("Str") === -1 &&
              res.data.data[item] &&
              res.data.data[item] !== "0"
            ) {
              res.data.data.rates.push(item.replace(/[^0-9]/gi, ""));
            }
          });
          this.field.setValues(res.data.data);
          this.setState({
            visibles: true,
            type: "edits",
            rateSettingInfo: res.data.data,
            internalStaff:res.data.data.isInternalEmployee,
            rates: res.data.data.rates
          });
        } else {
          Message.error(res.data.message);
        }
      });
    },
    dels: (val, index, row) => {
      Dialog.show({
        title: "操作",
        content: "确认删除该利率配置吗？",
        onOk: () => this.delFn(row)
      });
    }
  };
  projectDelete = id => {
    //产品管理-还款配置-删除
    productManageApi.productRepayMethodDelete(id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };
  delFn = row => {
    //产品管理-利率配置-删除
    productManageApi.delRateSetting(row.id).then(res => {
      if (res.data.code === "200") {
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };
  changeRate = arr => {
    arr = _.compact(arr);
    this.setState({
      rate: arr
    });
  };
  changeRates = arr => {
    arr = _.compact(arr);
    this.setState({
      rates: arr
    });
  };

  componentWillMount() {
    this.getproductRepayMethod();
    this.getfirstRepayDate();
    this.getcalcInterest();
    this.getproductRoundMethod();
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
  getData = () => {
    let params = { ...this.state.formValue };
    params.page = this.state.page;
    params.limit = this.state.limit;
    productManageApi.productRepayMethodList(params).then(res => {
      if (res.data.code === "200") {
        let obj = res.data.data.map((item, index, arry) => {
          let data = {};
          if (item.isTerm1 == false) {
            (data = item), (data.isTerm1 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm1 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          if (item.isTerm3 == false) {
            (data = item), (data.isTerm3 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm3 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          if (item.isTerm6 == false) {
            (data = item), (data.isTerm6 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm6 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          if (item.isTerm9 == false) {
            (data = item), (data.isTerm9 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm9 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          if (item.isTerm12 == false) {
            (data = item), (data.isTerm12 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm12 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          if (item.isTerm24 == false) {
            (data = item), (data.isTerm24 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm24 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          if (item.isTerm36 == false) {
            (data = item), (data.isTerm36 = <Icon type="close" size="xs" />);
          } else {
            (data = item),
              (data.isTerm36 = (
                <Icon type="select" size="xs" style={{ color: "#1DC11D" }} />
              ));
          }
          return data;
        });
        this.setState({
          data: obj,
          loading: false
        });
      } else {
        Message.error(res.data.message);
      }
    });
    productManageApi
      .rateSettingList(this.state.formValue.productNo)
      .then(res => {
        if (res.data.code === "200") {
          let loan = res.data.data.map((item, index, arry) => {
            let data = {};
            if (item.interestRate1Str === null) {
              (data = item),
                (data.interestRate1Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate3Str === null) {
              (data = item),
                (data.interestRate3Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate6Str === null) {
              (data = item),
                (data.interestRate6Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate9Str === null) {
              (data = item),
                (data.interestRate9Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate12Str === null) {
              (data = item),
                (data.interestRate12Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate24Str === null) {
              (data = item),
                (data.interestRate24Str = <Icon type="close" size="xs" />);
            }
            if (item.interestRate36Str === null) {
              (data = item),
                (data.interestRate36Str = <Icon type="close" size="xs" />);
            }
            if(item.isInternalEmployee){
              data.isInternalEmployee = '是'
            }else{
              data.isInternalEmployee = '否'
            }

            return data;
          });
          this.setState({
            datas: loan,
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

  onClose = flag => {
    //关闭弹窗
    this.setState({
      visible: false,
      rate: []
    });
  };
  onCloses = flag => {
    //关闭利率弹窗
    this.setState({
      visibles: false,
      rates: []
    });
  };

  getproductRepayMethod = () => {
    //产品管理-支持的还款方式-下拉框
    productManageApi.productRepayMethod().then(res => {
      if (res.data.code === "200") {
        this.setState({
          repayMethod: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getfirstRepayDate = () => {
    // 产品管理-不足月首期还款日-下拉框
    productManageApi.repayDate().then(res => {
      if (res.data.code === "200") {
        this.setState({
          firstRepayDay: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getcalcInterest = () => {
    // 产品管理-首期不足月计息方式-下拉框
    productManageApi.calcInterest().then(res => {
      if (res.data.code === "200") {
        this.setState({
          firstInterestMethod: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  getproductRoundMethod = () => {
    //产品管理-整数化方法-下拉框
    productManageApi.productRoundMethod().then(res => {
      if (res.data.code === "200") {
        this.setState({
          roundMethod: res.data.data
        });
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onSave = () => {
    //还款配置-新增修改保存
    let params = this.field.getValues();
    if (params.rate.indexOf("isTerm1") === -1) {
      params.isTerm1 = false;
    } else {
      params.isTerm1 = true;
    }
    if (params.rate.indexOf("isTerm3") === -1) {
      params.isTerm3 = false;
    } else {
      params.isTerm3 = true;
    }
    if (params.rate.indexOf("isTerm6") === -1) {
      params.isTerm6 = false;
    } else {
      params.isTerm6 = true;
    }
    if (params.rate.indexOf("isTerm9") === -1) {
      params.isTerm9 = false;
    } else {
      params.isTerm9 = true;
    }
    if (params.rate.indexOf("isTerm12") === -1) {
      params.isTerm12 = false;
    } else {
      params.isTerm12 = true;
    }
    if (params.rate.indexOf("isTerm24") === -1) {
      params.isTerm24 = false;
    } else {
      params.isTerm24 = true;
    }
    if (params.rate.indexOf("isTerm36") === -1) {
      params.isTerm36 = false;
    } else {
      params.isTerm36 = true;
    }
    if (this.state.type === "add") {
      this.productAdd(params);
    } else {
      if (params.id) {
        this.editUser(params);
      }
    }
  };
  productAdd = params => {
    //还款配置-新增
    params.productNo = this.props.id;
    productManageApi.productRepayMethodInsert(params).then(res => {
      if (res.data.code === "200") {
        Message.success(res.data.message);
        this.onClose(true);
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
      } else {
        Message.error(res.data.message);
      }
    });
  };
  editUser = params => {
    //还款配置-修改
    params.productNo = this.props.id;
    productManageApi.productRepayMethodUpdate(params).then(res => {
      if (res.data.code === "200") {
        this.onClose(true);
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  onSaves = (value, errors) => {
    //利率配置-新增修改保存
    let param = value;
    if (errors) {
      return;
    }
    param.isInternalEmployee = this.state.internalStaff;
    if (this.state.type === "add") {
      param.productNo = this.state.formValue.productNo;
      this.addRates(param);
    } else {
      if (param.id) {
        this.editRates(param);
      }
    }
  };

  addRates = param => {
    //利率配置-新增
    productManageApi.addRateSetting(param).then(res => {
      if (res.data.code === "200") {
        this.onCloses(true);
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  editRates = param => {
    //利率配置-修改
    productManageApi.editRateSetting(param).then(res => {
      if (res.data.code === "200") {
        this.onCloses(true);
        this.setState(
          {
            loading: true
          },
          () => this.getData()
        );
        Message.success(res.data.message);
      } else {
        Message.error(res.data.message);
      }
    });
  };

  //是否是内部员工
  setInternalStaff=(value)=>{
    this.setState({
      internalStaff:value
    })
  }




  render() {
    const minCreditScore =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="信用分下限:"
        >
          <Input name="minCreditScore" />
        </FormItem>
      ) : (
          <FormItem
            labelTextAlign="right"
            name="pass"
            style={styles.formItem}
            required
            label="信用分下限:"
          >
            <Input
              name="minCreditScore"
              defaultValue={this.state.rateSettingInfo.minCreditScore}
            />
          </FormItem>
        );
    const maxCreditScore =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="信用分上限:"
        >
          <Input name="maxCreditScore" />
        </FormItem>
      ) : (
          <FormItem
            labelTextAlign="right"
            name="pass"
            style={styles.formItem}
            required
            label="信用分上限:"
          >
            <Input
              name="maxCreditScore"
              defaultValue={this.state.rateSettingInfo.maxCreditScore}
            />
          </FormItem>
        );

    const loanMaxAmount =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="金额上限:"
        >
          <Input name="loanMaxAmount" addonTextAfter="元" />
        </FormItem>
      ) : (
          <FormItem
            labelTextAlign="right"
            name="pass"
            style={styles.formItem}
            required
            label="金额上限:"
          >
            <Input
              name="loanMaxAmount"
              defaultValue={this.state.rateSettingInfo.loanMaxAmount}
            />
          元
          </FormItem>
        );

    const loanMinAmount =
      this.state.type === "add" ? (
        <FormItem
          labelTextAlign="right"
          name="pass"
          style={styles.formItem}
          required
          label="金额下限:"
        >
          <Input name="loanMinAmount" addonTextAfter="元" />
        </FormItem>
      ) : (
          <FormItem
            labelTextAlign="right"
            name="pass"
            style={styles.formItem}
            required
            label="金额下限:"
          >
            <Input
              name="loanMinAmount"
              defaultValue={this.state.rateSettingInfo.loanMinAmount}
            />
          元
          </FormItem>
        );
    return (
      <div>
        <div className="contain-con">
          <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
            还款方式配置
          </p>
          <DataTable
            col={this.table}
            toolBtn={this.toolBtn}
            toolBtnFn={this.toolBtnFn}
            lineBtn={this.lineBtn}
            lineBtnFn={this.lineBtnFn}
            page={false}
            pageSize={this.state.limit}
            current={this.state.page}
            total={this.state.total}
            pageChange={current => this.pageChange(current)}
            limitChange={pageSize => this.limitChange(pageSize)}
            loadTable={this.state.loading}
            data={this.state.data}
          />
        </div>
        <div className="contain-con">
          <p style={{ borderBottom: "1px solid #DDD", paddingBottom: "10px" }}>
            贷款利率配置
          </p>
          <DataTable
            col={this.tables}
            toolBtn={this.toolBtns}
            toolBtnFn={this.toolBtnFns}
            lineBtn={this.lineBtns}
            lineBtnFn={this.lineBtnFns}
            page={false}
            pageSize={this.state.limit}
            current={this.state.page}
            total={this.state.total}
            pageChange={current => this.pageChange(current)}
            limitChange={pageSize => this.limitChange(pageSize)}
            loadTable={this.state.loading}
            data={this.state.datas}
          />
        </div>
        {/* 还款配置 - 新增修改公用弹窗 */}
        <Dialog
          style={{ width: "60%", height: "600px", borderRadius: "8px" }}
          title=""
          footer={false}
          visible={this.state.visible}
          onClose={this.onClose}
        >
          <IceContainer>
            <h3
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "15px"
              }}
            >
              {this.state.type === "add" ? "新增" : "修改"}还款方式
            </h3>
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              field={this.field}
            >
              <Row>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItems}
                    label="产品编号:"
                    required
                    requiredMessage="产品编号是必填字段"
                  >
                    {this.state.formValue.productNo}
                    <input type="hidden" name="id" />
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItems}
                    label="产品名称:"
                    required
                    requiredMessage="产品名称是必填字段"
                  >
                    {this.state.formValue.productName}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    style={styles.formItems}
                    label="支持的还款方式:"
                    required
                    requiredMessage="请选择还款方式"
                  >
                    <Radio.Group name="repayMethod">
                      {Object.keys(this.state.repayMethod).map((key, index) => {
                        return (
                          <Radio key={index} value={key}>
                            {this.state.repayMethod[key]}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    style={styles.formItems}
                    label="不足月首期还款日:"
                    required
                    requiredMessage="请选择不足月首期还款日"
                  >
                    <Radio.Group name="firstRepayDay">
                      {Object.keys(this.state.firstRepayDay).map(
                        (key, index) => {
                          return (
                            <Radio key={index} value={key}>
                              {this.state.firstRepayDay[key]}
                            </Radio>
                          );
                        }
                      )}
                    </Radio.Group>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    style={styles.formItems}
                    label="首期不足月计息:"
                    required
                    requiredMessage="请选择首期不足月计息方式"
                  >
                    <Radio.Group name="firstInterestMethod">
                      {Object.keys(this.state.firstInterestMethod).map(
                        (key, index) => {
                          return (
                            <Radio key={index} value={key}>
                              {this.state.firstInterestMethod[key]}
                            </Radio>
                          );
                        }
                      )}
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItems}
                    label="整数化方法:"
                    required
                    requiredMessage="请输入整数化方法"
                  >
                    <Radio.Group
                      name="roundMethod"
                      style={styles.formInputBorder}
                    >
                      {Object.keys(this.state.roundMethod).map((key, index) => {
                        return (
                          <Radio key={index} value={key}>
                            {this.state.roundMethod[key]}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    labelTextAlign="right"
                    style={styles.formItems}
                    required
                    requiredMessage="支持期数是必选字段"
                    label="支持期数:"
                  >
                    <Checkbox.Group name="rate" onChange={this.changeRate}>
                      <Checkbox value="isTerm1">1期</Checkbox>
                      <Checkbox value="isTerm3">3期</Checkbox>
                      <Checkbox value="isTerm6">6期</Checkbox>
                      <Checkbox value="isTerm9">9期</Checkbox>
                      <Checkbox value="isTerm12">12期</Checkbox>
                      <Checkbox value="isTerm24">24期</Checkbox>
                      <Checkbox value="isTerm36">36期</Checkbox>
                    </Checkbox.Group>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItems} label="创建人员:">
                    {this.state.rateSettingInfo.creatorName}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItems} label="创建时间:">
                    {this.state.rateSettingInfo.createTime}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItems} label="修改人员:">
                    {this.state.rateSettingInfo.modifierName}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItems} label="修改时间:">
                    {this.state.rateSettingInfo.modifyTime}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="" style={{ textAlign: "center" }} />
                  <Form.Submit
                    validate
                    type="primary"
                    style={styles.saveButton}
                    onClick={this.onSave}
                  >
                    保存
                  </Form.Submit>
                </Col>
              </Row>
            </Form>
          </IceContainer>
        </Dialog>
        {/* 利率配置 - 新增修改公用弹窗 */}
        <Dialog
          style={{ width: "60%", height: "600px", borderRadius: "8px" }}
          title=""
          footer={false}
          visible={this.state.visibles}
          onClose={this.onCloses}
        >
          <IceContainer>
            <h3
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "15px"
              }}
            >
              {this.state.type === "add" ? "新增" : "修改"}产品利率
            </h3>
            <div className="contain-con">
              <Form
                labelTextAlign={"right"}
                {...formItemLayout}
                field={this.field}
              >
                <Row>
                  <Col span="12">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="产品编号:"
                      required
                      requiredMessage="产品编号是必填字段"
                    >
                      {this.state.formValue.productNo}
                      <input type="hidden" name="id" />
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="产品名称:"
                      required
                      requiredMessage="产品名称是必填字段"
                    >
                      {this.state.formValue.productName}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">{minCreditScore}</Col>
                  <Col span="12">{maxCreditScore}</Col>
                </Row>
                <Row>
                  <Col span="12">{loanMinAmount}</Col>
                  <Col span="12">{loanMaxAmount}</Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      required
                      requiredMessage="支持期数是必选字段"
                      label="支持期数:"
                    >
                      <Checkbox.Group name="rates" onChange={this.changeRates}>
                        <Checkbox value="1">1期</Checkbox>
                        <Checkbox value="3">3期</Checkbox>
                        <Checkbox value="6">6期</Checkbox>
                        <Checkbox value="9">9期</Checkbox>
                        <Checkbox value="12">12期</Checkbox>
                        <Checkbox value="24">24期</Checkbox>
                        <Checkbox value="36">36期</Checkbox>
                      </Checkbox.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem
                      labelTextAlign="right"
                      style={styles.formItem}
                      label="是否内部员工:"
                      required  
                    >
                      <Radio.Group value={this.state.internalStaff} onChange={this.setInternalStaff} defaultValue={false}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                {this.state.rates.map((item, idx) => {
                  return (
                    <Row key={idx}>
                      <Col span="24">
                        <FormItem
                          labelTextAlign="right"
                          style={styles.formItem}
                          required
                          requiredMessage="月利率是必填字段"
                          label={item + "期月利率"}
                        >
                          <Input
                            name={"interestRate" + item}
                            addonTextAfter="%"
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  );
                })}
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      {this.state.rateSettingInfo.creatorName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      {this.state.rateSettingInfo.createTime}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      {this.state.rateSettingInfo.modifierName}
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      {this.state.rateSettingInfo.modifyTime}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem label="" style={{ textAlign: "center" }}>
                      <Form.Submit
                        style={styles.saveButton}
                        validate
                        onClick={this.onSaves}
                      >
                        保存
                      </Form.Submit>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </IceContainer>
        </Dialog>
      </div>
    );
  }
}
const styles = {
  formItem: {
    display: "flex",
    lineHeight: "28px",
  },
  formItems: {
    display: "flex",
    whiteSpace: "nowrap",
    lineHeight: "28px",
  },
  formItemError: {
    marginLeft: "10px"
  },
  formCol: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  preview: {
    border: "1px solid #eee",
    marginTop: 20,
    padding: 10
  },
  formInput: {
    width: "120px",
    border: "none",
    borderRadius: "4px"
  },
  formInputBorder: {
    width: "240px"
  },
  pagination: {
    marginTop: "20px",
    textAlign: "right"
  },
  saveButton: {
    borderRadius: "4px",
    width: "80px",
    backgroundColor: "#3080fe",
    color: "#fff",
    borderColor: "transparent"
  }
};
