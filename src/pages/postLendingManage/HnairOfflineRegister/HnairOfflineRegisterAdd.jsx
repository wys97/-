import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Dialog, Field, Form, Grid, Input, Message, Select, DatePicker } from '@alifd/next';
import SearchForm from '../../components/SearchForm';
import DataTable from '../../dataTable';
import feeWaiverManageApi from '../../../api/PostLendingManage/FeeWaiverManage';
import HnairOfflineRegisterApi from '../../../api/PostLendingManage/HnairOfflineRegister'


const { Row, Col } = Grid;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};
const FormItem = Form.Item;

export default class HnairOfflineRegisterAdd extends Component {

    static displayName = 'HnairOfflineRegisterAdd';
    static propTypes = {};
    static defaultProps = {};

    field = new Field(this);

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {
            getRepayType: {},
            selectRepayType: {},  //还款方式下拉,
            repayRecordId: '',   //登记流水号
            id: this.props.location && this.props.location.state && this.props.location.state.name,
            type: this.props.location
                && this.props.location.pathname
                && this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1, this.props.location.pathname.length),
            refresh: 0,
            visible: false,					// 显示借据弹窗
            formValue: {},
            page: 1,
            limit: 10,
            loading: false,
            data: [],
            value:'',
        }
    }

    componentWillMount = () => {
        this.getSelectRepayType();
        this.getRepayDetail()
    };

    getRepayDetail = () => {
        if (this.state.type === 'update') {
            // 修改, 加载详情数据
            HnairOfflineRegisterApi.detail(this.state.id).then((res) => {
                if (res.data.code === '200') {
                    this.field.setValues(res.data.data);
                } else {
                    Message.error(res.data.message);
                }
            });
        } else {
            // 新增
        }
    }

    goBack = () => {
        this.props.history.go(-1)
    };

    howToDue = () => {
        if (this.state.type === 'add') {
            // 新增, 弹框选择
            return <p><Input style={styles.formInputBorder} name="dueId" placeholder="" value={this.field.getValue("dueId")}
                readOnly /> <a href="javascript:;" onClick={this.outSelect}>选择</a></p>
        } else {
            return <p>{this.field.getValue("dueId")}</p>
        }
    };


    decreaseOperateAddSave = (v, e) => {   //新增保存
        if (e !== null) {
            return;
        }
        HnairOfflineRegisterApi.offlineAddSave(v).then((res) => {
            if (res.data.code === '200') {
                this.state.repayRecordId = res.data.data.repayRecordId
                Message.success(res.data.message);

                this.goBack();
            } else {
                Message.error(res.data.message);
            }
        });
    };

    decreaseOperateUpdateSave = (v, e) => {      //修改保存
        if (e !== null) {
            return;
        }
        HnairOfflineRegisterApi.offlineUpdateSave(v).then((res) => {
            if (res.data.code === '200') {
                this.setState({
                    refresh: this.state.refresh + 1
                });
                // this.getRepayDetail()
                this.props.history.go(-1)
                Message.success(res.data.message);
            } else {
                Message.error(res.data.message);
            }
        });
    };


    outSelect = () => {
        this.getData();
        this.setState({
            visible: true
        })
    };

    pageChange = (page) => {
        this.setState({ page, loading: true }, () => this.getData());
    };

    limitChange = (limit) => {
        this.setState({ limit, loading: true }, () => this.getData());
    };

    getData = () => {
        let params = { ...this.state.formValue };
        params.page = this.state.page;
        params.limit = this.state.limit;
        HnairOfflineRegisterApi.listLoanDue(params).then((res) => {
            if (res.data.code === '200') {
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
        })
    };

    getSelectRepayType = () => { //还款方式-下拉
        HnairOfflineRegisterApi.repayType()
            .then((res) => {
                if (res.data.code === '200') {
                    this.setState({
                        selectRepayType: res.data.data
                    });
                } else {
                    Message.error(res.data.message);
                }
            });
    };

    onClose = () => {
        this.setState({
            visible: false
        })
    };

  getLoneDueByPaidDate = (v) => {
    
    var dueId = this.field.getValue("dueId");
    var paidDate = new Date(v).Format('yyyy-MM-dd');
    this.setState({
        value:paidDate
    })
    if (paidDate === '1970-01-01'){
      this.selectDue(dueId);
      return;
    }
    HnairOfflineRegisterApi.getLoneDueByPaidDate(dueId,paidDate).then((res) => {
      if (res.data.code === '200') {
        this.setState({
          visible: false,
          selectRepayType: res.data.data.repayTypes
        });
        this.field.setValues(res.data.data);
      } else {
        Message.error(res.data.message);
        this.setState({
            value:'',
        })
      }
    });
  }

    form = [{
        label: '借据号',
        key: 'dueId',
        type: ''
    },
    {
        label: '合同编号',
        key: 'contractNo',
        type: ''
    },
    {
        label: '客户名称',
        key: 'customerName',
        type: ''
    },
    {
        label: '手机号',
        key: 'phone',
        type: ''
    },
    {
        label: '证件号',
        key: 'identityNo',
        type: ''
    },
    ];


    table = [{
        title: '借据号',
        key: 'dueId',
        width: 100
    },
    {
        title: '合同编号',
        key: 'contractNo',
        width: 100
    },
    {
        title: '产品名称',
        key: 'productName',
        width: 100
    },
    {
        title: '客户名称',
        key: 'customerName',
        width: 100
    },
    {
        title: '手机号',
        key: 'phone',
        width: 150
    },
    {
        title: '证件号',
        key: 'identityNo',
        width: 150
    },
    {
        title: '放款金额 (元) ',
        key: 'loanAmount',
        width: 100
    },
    {
        title: '剩余应还总额 (元) ',
        key: 'unpaidAmount',
        width: 200
    },
    {
        title: '放款日期',
        key: 'loanPayTime',
        width: 200
    }
    ];

    lineClickFn = (row, index) => {
        this.selectDue(row.dueId);
    }

    selectDue = (id) => {
        HnairOfflineRegisterApi.selectDue(id).then((res) => {
            if (res.data.code === '200') {
                this.setState({
                    visible: false,
                    selectRepayType: res.data.data.repayTypes
                });
                this.field.setValues(res.data.data);
            } else {
                Message.error(res.data.message);
            }
        });
    };


    onSubmit(formValue) {

        this.setState({
            formValue: formValue,
            page: 1,
            limit: 10,
            loading: true
        }, () => this.getData());
    }

    render() {
        // 如果刷新浏览器, state将为undefined, 所以跳转回首页
        if (this.state.type !== 'add' && this.state.type !== 'update') {
            this.props.history.push({ pathname: '/' });
            return (<div />);
        } else if (this.state.type === 'add') {
            return (
                <div>
                    <IceContainer>
                        <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
                            <div className="CustomerTabTitle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ marginTop: '-4px' }}>新增线下还款</h3>
                                <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
                            </div>
                            <div className='contain-con'>
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="登记流水号:">
                                                {/* <p>{this.field.getValue("repayRecordId")}<span> [自动生成] </span></p> */}
                                                <p>{this.state.repayRecordId}<span> [自动生成] </span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} required label="借据号:">
                                                {this.howToDue()}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="合同号:">
                                                <p>{this.field.getValue("contractNo")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="产品名称:">
                                                <p>{this.field.getValue("productNo")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="客户姓名:">
                                                <p>{this.field.getValue("customerName")}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="手机号:">
                                                <p>{this.field.getValue("phone")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="证件号码:">
                                                <p>{this.field.getValue("identityNo")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="放款金额:">
                                                <p>{this.field.getValue("loanAmount")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="剩余应还总额:">
                                                <p>{this.field.getValue("unpaidAmount")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="实际还款日期:" required requiredMessage="请选择实际还款日期">
                                                <DatePicker name="paidDate" value={this.state.value} onChange={this.getLoneDueByPaidDate}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem labelTextAlign='right' style={styles.formItem} label="还款类型:" required
                                                requiredMessage="请选择状态">
                                                <Select followTrigger name="repayType" style={styles.formInputBorder}>
                                                    {
                                                        Object.keys(this.state.selectRepayType)
                                                            .map((key, index) => {
                                                                return <Select.Option key={index} value={key}>{this.state.selectRepayType[key]}</Select.Option>;
                                                            })
                                                    }
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="还款方式:">
                                                <p>线下还款</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="逾期应还总额:">
                                                <p>{this.field.getValue("overdueAmount")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="当期应还总额:">
                                                <p>{this.field.getValue("currentAmount")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="提前应还总额:">
                                                <p>{this.field.getValue("prepayAmount")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} required requiredMessage="请填写还款金额" format="number"
                                                formatMessage="请输入数字" label="还款金额:">
                                                <Input style={styles.formInputBorder} name="repayAmount" placeholder="" /> 元
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <FormItem style={styles.formItem} label="备注:">
                                                <Input.TextArea style={styles.formTextArea} placeholder="" name="remark" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="操作员:">
                                                {this.field.getValue("operator")}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="更新日期:">
                                                {this.field.getValue("modifyTime")}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="创建人员:">
                                                <p>{this.field.getValue("creatorName")}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="创建时间:">
                                                <p>{this.field.getValue("createTime")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="修改人员:">
                                                <p>{this.field.getValue("modifierName")}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="修改时间:">
                                                <p>{this.field.getValue("modifyTime")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row> */}
                                </div>
                            </div>
                            <Form.Submit validate type="primary" style={styles.saveButton}
                                onClick={this.decreaseOperateAddSave}>保存</Form.Submit>
                        </Form>
                    </IceContainer>

                    <Dialog style={{ width: '60%', height: '600px', borderRadius: '8px' }} title="" footer={false}
                        visible={this.state.visible} onClose={this.onClose} isFullScreen={true}>
                        <IceContainer>
                            <h3 style={{
                                borderBottom: '1px solid #eee',
                                paddingBottom: '15px'
                            }}>业务查询</h3>
                            <div className='contain-con'>
                                <SearchForm form={this.form} title='信息列表' onSubmit={(formValue) => this.onSubmit(formValue)} />
                                <DataTable col={this.table} toolBtn={this.toolBtn}
                                    page={true}
                                    pageSize={this.state.limit} current={this.state.page} total={this.state.total}
                                    pageChange={(current) => this.pageChange(current)} lineClickFn={this.lineClickFn}
                                    limitChange={(pageSize) => this.limitChange(pageSize)} loadTable={this.state.loading}
                                    data={this.state.data} />
                            </div>
                        </IceContainer>
                    </Dialog>
                </div>
            )
        } else if (this.state.type === 'update') {
            return (
                <div>
                    <IceContainer>
                        <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
                            <div className="CustomerTabTitle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ marginTop: '-4px' }}>修改线下还款</h3>
                                <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
                            </div>
                            <div className='contain-con'>
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="登记流水号:">
                                                <p>{this.field.getValue("repayRecordId")}<span> [自动生成] </span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} required label="借据号:">
                                                <p>{this.field.getValue("dueId")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="合同号:">
                                                <p>{this.field.getValue("contractNo")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="产品名称:">
                                                <p>{this.field.getValue("productName")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="客户名称:">
                                                <p>{this.field.getValue("customerName")}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="手机号:">
                                                <p>{this.field.getValue("phone")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="证件号码:">
                                                <p>{this.field.getValue("identityNo")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="放款金额:">
                                                <p>{this.field.getValue("loanAmount")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="剩余应还总额:">
                                                <p>{this.field.getValue("unpaidAmount")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="实际还款日期:" required requiredMessage="请选择实际还款日期">
                                              <DatePicker name="paidDate" onChange={this.getLoneDueByPaidDate}/>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} required label="还款类型:">
                                                <Select followTrigger name="repayType" style={styles.formInputBorder}>
                                                    {
                                                        Object.keys(this.state.selectRepayType)
                                                            .map((key, index) => {
                                                                return <Select.Option key={index} value={key}>{this.state.selectRepayType[key]}</Select.Option>;
                                                            })
                                                    }
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="逾期应还总额:">
                                                <p>{this.field.getValue("overdueAmount")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="当期应还总额:">
                                                <p>{this.field.getValue("currentAmount")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="提前应还总额:">
                                                <p>{this.field.getValue("prepayAmount")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} required requiredMessage="请填写还款金额" format="number"
                                                formatMessage="请输入数字" label="还款金额:">
                                                <Input style={styles.formInputBorder} name="repayAmount" placeholder="" /> 元
                      </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span="24">
                                            <FormItem style={styles.formItem} label="备注:">
                                                <Input.TextArea style={styles.formTextArea} placeholder="" name="remark" />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="审批状态:">
                                                <p>{this.field.getValue("approvalStatus")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="创建人员:">
                                                <p>{this.field.getValue("creatorName")}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="创建时间:">
                                                <p>{this.field.getValue("createTime")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="修改人员:">
                                                <p>{this.field.getValue("modifierName")}</p>
                                            </FormItem>
                                        </Col>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="修改时间:">
                                                <p>{this.field.getValue("modifyTime")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <Form.Submit validate type="primary" style={styles.saveButton}
                                onClick={this.decreaseOperateUpdateSave}>保存</Form.Submit>
                        </Form>
                    </IceContainer>
                </div>
            )
        }
    }
}

const styles = {
    formItem: {
        display: 'flex'
    },
    formItemLabel: {},
    formItemError: {
        marginLeft: '10px',
    },
    formCol: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    preview: {
        border: '1px solid #eee',
        marginTop: 20,
        padding: 10
    },
    formItemInput: {
        width: '120px',
        borderRadius: '4px'
    },
    searchBtn: {
        float: 'right',
        backgroundColor: '#fff',
        color: '#3080fe'
    },
    pagination: {
        marginTop: '20px',
        textAlign: 'right',
    },
    formInput: {
        border: 'none',
        // width: '200px'
    },
    formInputBorder: {
        width: '240px'
    },
    formTextArea: {
        width: '500px'
    },
    saveButton: {
        float: 'left',
        borderRadius: '4px',
        marginLeft: '180px',
        width: '80px'
    }
};
