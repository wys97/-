import React, { Component } from 'react';
import { Button, Form, Grid, Input, Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceEllipsis from '@icedesign/ellipsis';
import DataTable from '../../dataTable';
import { Message } from "@alifd/next";
import store from "../../../store";
import customerInfoLogApi from '../../../api/OperationManage/customerInfoLog';

export default class CustomerInfoLog extends React.Component {
    static displayName = 'pointsDetailList';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            formValue: [],
            page: store.getState().productRunManage.productManage.page,
            limit: store.getState().productRunManage.productManage.limit,
            loading: false,
            total: 0,
            data: [],
            id: window.location.hash.split('/')[window.location.hash.split('/').length - 1],
            title: '用户额度变更日志'
        }
        store.subscribe(() => {
            this.setState({
                page: store.getState().productRunManage.productManage.page,
                limit: store.getState().productRunManage.productManage.limit
            });
        });
    }

    table = [
        { title: 'id', key: 'id', width: 120 },
        { title: '变更时间', key: 'createTime', width: 160 },
        { title: '产品名称', key: 'productName', width: 120 },
        { title: '日志类型', key: 'logTypeText', width: 120 },
        { title: '变更前额度', key: 'oldCreditLimit', width: 160 },
        { title: '变更后额度', key: 'newCreditLimit', width: 160 },
        { title: '申请人', key: 'operatorName', width: 120 },
        { title: '审批员', key: 'approvalName', width: 160 },

    ];

    componentWillMount() {

    }

    componentDidMount = () => {
        this.loadDetailInfo();
        this.getData();
    };


    loadDetailInfo = () => {
        customerInfoLogApi.getCustomerLimit(this.state.id).then((res) => {
            if (res.data.code === '200') {
                this.setState({
                    formValue: res.data.data
                })
            } else {
                Message.error(res.data.message);
            }
        });
    };

    getData = () => {
        let params = {
            "customerId": this.state.id,
            "page": this.state.page,
            "limit": this.state.limit
        };
        customerInfoLogApi.pointsDetailList(params)
            .then((res) => {
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
            });
    };

    pageChange = page => {
        this.setState({ page, loading: true }, () => this.getData());
    };

    limitChange = limit => {
        this.setState({ limit, loading: true }, () => this.getData());
    };
    render() {
        return (
            <div className='customerInfoLog'>
                <IceContainer style={styles.container}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>{this.state.title}</h3>
                        <Button onClick={()=>{ this.props.history.go(-1);}}>返回</Button>
                    </div>
                    <div className="contain-con">
                        <Table dataSource={this.state.formValue}>
                            <Table.Column title="产品编号" dataIndex="productNo" />
                            <Table.Column title="产品名称" dataIndex="productName" />
                            <Table.Column title="授信额度" dataIndex="creditLimit" />
                        </Table>
                    </div>
                </IceContainer>
                <DataTable col={this.table}
                    page={true}
                    pageSize={this.state.limit}
                    current={this.state.page}
                    total={this.state.total}
                    pageChange={current => this.pageChange(current)}
                    limitChange={pageSize => this.limitChange(pageSize)}
                    loadTable={this.state.loading}
                    data={this.state.data} useVirtual='auto' />
            </div >
        )
    }


}
const styles = {
    container: {
        paddingBottom: 0,
    },
    formItem: {
        height: '28px',
        lineHeight: '28px',
        marginBottom: '10px',
    },
    formLabel: {
        textAlign: 'right',
    },

    btns: {
        margin: '25px 0',
    },
    resetBtn: {
        marginLeft: '20px',
    },
};
