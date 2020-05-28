import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Field, Form, Grid, Input, Message } from '@alifd/next';
import DataTable from '../../dataTable';
import aviationIousManage from '../../../api/AirTicketInstallment/AviationIousManage'


export default class AviationIousManage extends Component {

    field = new Field(this);
    static displayName = 'AviationIousManage';
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            formValue: {},
            loading: false,
            data: {}
        };
    }

    table = [
        { title: '配置编号', key: 'id', width: 100, cell: true, path: '/airTicketInstallment/aviationIousDetail' },
        { title: '配置名称', key: 'settingName', width: 140 },
        { title: '每日放款限额(元)', key: 'quota', width: 110 },
        { title: '状态', key: 'statusText', width: 80 },
        { title: '操作', key: 'operate', width: 120, cell: true },
    ];

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }


    getData = () => {
        aviationIousManage.whiteStripList()
            .then((res) => {
                if (res.data.code === '200') {
                    this.setState({
                        data: res.data.data,
                        loading: false,
                    });
                } else {
                    Message.error(res.data.message);
                }
            });
    };

    lineBtn = [{
        name: '修改',
        type: 'edit',
        key: 'status',
        value: 'DISABLED',
      permission: 'business:white-strip:entrance:save'
    },
    {
        name: '启动',
        type: 'turnOn',
        key: 'status',
        value: 'DISABLED',
      permission: 'business:white-strip:entrance:enable'
    },
    {
        name: '停用',
        type: 'turnOff',
        key: 'status',
        value: 'ENABLED',
      permission: 'business:white-strip:entrance:disable'
    }
    ];

    lineBtnFn = {
        edit: (val, index, row) => {
            this.props.history.push({
                pathname: '/airTicketInstallment/aviationIousUpdate',
                state: { name: row.id }
            });
        },
        turnOn: (val, index, row) => {
            Dialog.show({ title: '用户启用', content: '确认启用该用户吗？', onOk: () => this.turnOnFn(row.id) });
        },
        turnOff: (val, index, row) => {
            Dialog.show({ title: '用户停用', content: '确认停用该用户吗？', onOk: () => this.turnOffFn(row.id) });
        },
    };

    turnOnFn = (id) => {
        aviationIousManage.whiteStripListEnable(id)
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

    turnOffFn = (id) => {
        aviationIousManage.whiteStripListDisable(id)
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


    render() {
        return (
            <IceContainer title="航空白条入口配置" >
                <div>
                    <DataTable col={this.table}  lineBtn={this.lineBtn} lineBtnFn={this.lineBtnFn}
                        page={false} loadTable={this.state.loading}
                        data={this.state.data} />
                </div>
            </IceContainer>
        );
    }
}

