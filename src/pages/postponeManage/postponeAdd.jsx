import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Dialog, Field, Form, Grid, Input, Message, Select, DatePicker } from '@alifd/next';
import SearchForm from '../components/SearchForm';
import DataTable from '../dataTable';
import HnairOfflineRegisterApi from '../../api/PostLendingManage/HnairOfflineRegister'
import axios from '../../api/postponeManage/postponeManage'



const { Row, Col } = Grid;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
};
const FormItem = Form.Item;

export default class PostponeAdd extends Component {

    static displayName = 'PostponeAdd';
    static propTypes = {};
    static defaultProps = {};

    field = new Field(this);

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {
            getRepayType: {},
            selectRepayType: {},  //展期期数下拉,
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
            value: '',
        }
    }

    componentWillMount = () => {
        this.getRepayDetail()
    };

    getRepayDetail = () => {
        if (this.state.type === 'update') {
            // 修改, 加载详情数据
            axios.getDetail(this.state.id).then((res) => {
                if (res.data.code === '200') {
                    this.field.setValues(res.data.data);
                    this.getSelectRepayType(res.data.data.dueId)
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
        let data = {
            dueId: v.dueId,
            periodNum: v.periodNum,
            interestRate: v.interestRate
        }
        axios.offlineAddSave(data).then((res) => {
            if (res.data.code === '200') {
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
        let data = {
            rolloverApplyId: this.state.id,
            interestRate: v.repayAmount,
            periodNum: v.repayType,
        }
        axios.offlineUpdateSave(data).then((res) => {
            if (res.data.code === '200') {
                this.setState({
                    refresh: this.state.refresh + 1
                });
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

    getSelectRepayType = (id) => { //展期期数-下拉
        axios.repayType(id)
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
        width: 130
    },
    {
        title: '证件号',
        key: 'identityNo',
        width: 130
    },
    {
        title: '放款金额 (元) ',
        key: 'loanAmount',
        width: 100
    },
    {
        title: '剩余应还总额 (元) ',
        key: 'unpaidAmount',
        width: 160
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
    //选择借据号查询用户信息
    selectDue = (id) => {
        axios.getLoanInfo(id).then((res) => {
            if (res.data.code === '200') {
                this.setState({
                    visible: false,
                });
                this.field.setValues(res.data.data);
                this.getSelectRepayType(id);

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
                                <h3 style={{ marginTop: '-4px' }}>新增展期</h3>
                                <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
                            </div>
                            <div className='contain-con'>
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="展期编号:">
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
                                                <p>{this.field.getValue("productName")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="客户姓名:">
                                                <p>{this.field.getValue("customerName")}</p>
                                            </FormItem>
                                        </Col>

                                    </Row>
                                    <Row>
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
                                                <p>{this.field.getValue("loanAmount")}<span>元</span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="原期次:">
                                                <p>{this.field.getValue("originalPeriods")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="还款方式:">
                                                <p>{this.field.getValue("repayMethodText")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="剩余未还本金:">
                                                <p>{this.field.getValue("unpaidPrincipal")}<span>元</span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="待还利息:">
                                                <p>{this.field.getValue("unpaidInterest")}<span>元</span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="待还罚息:">
                                                <p>{this.field.getValue("unpaidFine")}<span>元</span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} requiredMessage="展期利率(月)" format="number"
                                                formatMessage="请输入数字" label="展期利率(月):">
                                                <Input style={styles.formInputBorder} name="interestRate" placeholder="" /> %
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem labelTextAlign='right' style={styles.formItem} label="展期期数:"
                                                requiredMessage="请选择期数">
                                                <Select followTrigger name="periodNum" style={styles.formInputBorder}>
                                                    {
                                                        Object.values(this.state.selectRepayType)
                                                            .map((key, index) => {
                                                                return <Select.Option key={index} value={key}></Select.Option>
                                                            })
                                                    }
                                                </Select>
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
                                                <p>{this.field.getValue("updateTime")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
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
                                <h3 style={{ marginTop: '-4px' }}>修改展期</h3>
                                <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
                            </div>
                            <div className='contain-con'>
                                <div style={{ marginTop: '30px' }}>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="展期编号:">
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
                                    </Row>
                                    <Row>
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
                                            <FormItem style={styles.formItem} label="原期次:">
                                                <p>{this.field.getValue("originalPeriods")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="还款方式:">
                                                <p>{this.field.getValue("repayMethodText")}</p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} requiredMessage="展期利率(月)" format="number"
                                                formatMessage="请输入数字" label="展期利率(月):">
                                                <Input style={styles.formInputBorder} name="repayAmount" placeholder="" value={this.field.getValue("interestRate") && this.field.getValue("interestRate")} /> %
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem labelTextAlign='right' style={styles.formItem} label="展期期数:"
                                                requiredMessage="请选择状态">
                                                <Select followTrigger name="repayType" style={styles.formInputBorder} placeholder={JSON.stringify(this.field.getValue("rolloverPeriods"))}>
                                                    {
                                                        Object.values(this.state.selectRepayType)
                                                            .map((key, index) => {
                                                                return <Select.Option key={index} value={key}></Select.Option>
                                                            })
                                                    }
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="剩余未还本金:">
                                                <p>{this.field.getValue("unpaidPrincipal")}<span>元</span></p>
                                            </FormItem>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="待还利息:">
                                                <p>{this.field.getValue("unpaidInterest")}<span>元</span>
                                                </p>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                            <FormItem style={styles.formItem} label="待还罚息:">
                                                <p>{this.field.getValue("unpaidFine")}<span>元</span>
                                                </p>
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
                                                <p>{this.field.getValue("updateTime")}</p>
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
