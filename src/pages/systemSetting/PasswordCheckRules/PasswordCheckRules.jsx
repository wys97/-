import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Field, Form, Grid, Input, Message, Table, Button, Checkbox } from '@alifd/next';
import PasswordCheckRulesApi from '../../../api/SystemSetting/PasswordCheckRules'


export default class PasswordCheckRules extends Component {

    static displayName = 'PasswordCheckRules';
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            // loading: false,
            data: [],
            selectProductRepayMethod: []
        };
    }
    renderOperator = (value, index, record) => {
        return <div>
            <a href="javascript:;" onClick={this.turnOff(record.id)}>停用</a>&nbsp;&nbsp;
            <a href="javascript:;">启用</a>&nbsp;&nbsp;
            <a href="javascript:;">保存</a>
        </div>;
    };

    renderCell = (value, index, record) => {
        this.state.data.map((item,index)=>{
            if(item.ruleCode === 'PASSWORD_VALIDATE_RULE'){
                return <div>
                <Checkbox.Group name="repaymentMethod">
                    {
                        Object.keys(this.state.selectProductRepayMethod)
                            .map((key, index) => {
                                return <Checkbox key={index}
                                    value={key}>{this.state.selectProductRepayMethod[key]}</Checkbox>;
                            })
                    }
                </Checkbox.Group>
            </div>;
            }
            return <div>
            <Input placeholder="className" className="my-input-class" aria-label="custom my input class" />
       </div>
        })
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        PasswordCheckRulesApi.PasswordValidList()
            .then((res) => {
                if (res.data.code === '200') {
                    this.setState({
                        data: res.data.data,
                        // loading: false,                                              
                    });
                    this.state.data.map((item,index)=>{
                        if(item.ruleCode === 'PASSWORD_VALIDATE_RULE'){
                            this.state.selectProductRepayMethod = item.ruleValue
                        }
                    })
                    console.log(this.state.selectProductRepayMethod)                  
                                     
                } else {
                    Message.error(res.data.message);
                }
            });
    };

    turnOff = (id) => {
        // Dialog.show({ title: '规则停用', content: '确认停用该校验规则吗？', onOk: () => this.turnOffFn(id) });
    }


    turnOffFn = (id) => {
        PasswordCheckRulesApi.PasswordValidDisable(id)
            .then((res) => {
                if (res.data.code === '200') {
                    this.setState({
                        // loading: true,
                    }, () => this.getData());
                    Message.success(res.data.message);
                } else {
                    Message.error(res.data.message);
                }
            });
    };


    render() {
        return (
            <IceContainer title="密码校验规则">
                <div>
                    <Table dataSource={this.state.data}>
                        <Table.Column title="规则描述" dataIndex="ruleName" />
                        <Table.Column title="规则值"  cell={this.renderCell} />
                        <Table.Column title="启用标志" dataIndex="statusText" />
                        <Table.Column title="选项说明" dataIndex="desc" />
                        <Table.Column title="操作" cell={this.renderOperator} />
                    </Table>
                </div>
            </IceContainer>
        );
    }

 
}