import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, DatePicker, Dialog, Form, Grid, Input, Select} from '@alifd/next/lib/index';
import DataTable from '../../../components/DataTable';
import partnerManageApi from '../../../../api/OperationManage/PartnerManage';
import '../../OperationManage'

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 10
  },
  wrapperCol: {
    span: 14
  }
};

export default class ShareholderUpdate extends Component {
  static displayName = 'ShareholderUpdate';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formValue: {}
    };
  }

  table = [
    {title: '股东信息ID', key: 'id', width: 200, cell: true},
    {title: '合作机构名称', key: 'partnerName', width: 300},
    {title: '股东名称', key: 'name', width: 200},
    {title: '股东类型', key: 'type', width: 200},
    {title: '持股比例(%)', key: 'scale', width: 150},
    {title: '实际控制人标志', key: 'sign', width: 150},
    {title: '入股日期', key: 'date', width: 200},
    {title: '操作', key: 'operate', width: 200, cell: true}
  ];

  onClose = () => {   //关闭新增弹窗
    this.setState({
      visible: false,
      updateVisible: false
    });
  };

  toolBtn = [
    {
      name: '新增',
      type: 'add',
      icon: 'add',
      //   path: '/baseinfo/partnerAdd'
      permission: ':'
    }
  ];

  lineBtn = [
    {
      name: '修改',
      type: 'edit',
      //   path: '/baseinfo/partnerUpdateTab'
      permission: ':'
    },
    {
      name: '删除',
      type: 'del',
      permission: ':'
    }
  ];

  toolBtnFn = {
    add: () => {
      this.setState({
        visible: true
      });
    }
  };

  lineBtnFn = {
    del: () => {

    }
  };


  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>股东信息</p>
            <DataTable param={this.state.formValue} col={this.table} toolBtn={this.toolBtn} lineBtn={this.lineBtn}
                       toolBtnFn={this.toolBtnFn} lineBtnFn={this.lineBtnFn} api={partnerManageApi.shareholderUpdate}/>
            {/* 新增弹窗 */}
            <Dialog
              style={{width: '60%', height: '80%', borderRadius: '8px', overflowY: 'auto', overflowX: 'visible'}}
              title=""
              footer={<Button style={styles.saveButton} type="primary" onClick={this.onClose}>保存</Button>}
              visible={this.state.visible}
              onOk={this.onClose}
              onCancel={this.onClose}
              onClose={this.onClose}>
              <IceContainer>
                <h3 style={{borderBottom: '1px solid #DDD', paddingBottom: '15px'}}>新增股东信息</h3>
                <div className='contain-con'>
                  <Form labelTextAlign={'right'}  {...formItemLayout} >
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="股东信息ID:">
                          <Input style={styles.formInputBorder} placeholder=""/> [自动生成]
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构编号:">
                          <Input style={styles.formInputBorder} placeholder=""/>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="合作机构名称:">
                          <Input style={styles.formInputBorder} placeholder=""/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="股东名称:" required>
                          <Input style={styles.formInputBorder} placeholder=""/>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="股东类型:" required>
                          <Select followTrigger style={{width: '200px'}} name="select">
                            <Option value="jack">jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="disabled" disabled>disabled</Option>
                            <Option value="hugohua">hugohua</Option>
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="联系电话:" required>
                          <Input style={styles.formInputBorder} placeholder=""/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="股权证编号:">
                          <Input style={styles.formInputBorder} placeholder=""/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="持股比例:" required>
                          <Input style={styles.formInputBorder} placeholder=""/> %
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="入股总金额:">
                          <Input style={styles.formInputBorder} placeholder=""/> 元
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} required label="币种:">
                          <Select followTrigger style={{width: '200px'}} name="select">
                            <Option value="jack">jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="disabled" disabled>disabled</Option>
                            <Option value="hugohua">hugohua</Option>
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem
                          label="入股日期:"
                          style={styles.formItem}
                          required
                        >
                          <DatePicker followTrigger style={styles.formInputBorder} name="startDate"/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="实际控制人标志:" required>
                          <Select followTrigger style={{width: '200px'}} name="select">
                            <Option value="jack">jack</Option>
                            <Option value="lucy">lucy</Option>
                            <Option value="disabled" disabled>disabled</Option>
                            <Option value="hugohua">hugohua</Option>
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="通讯地址:" help="">
                          <Input.TextArea style={{width: '500px'}} placeholder="" name="address"/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <FormItem labelTextAlign='right' style={styles.formItem} label="备注:" help="">
                          <Input.TextArea style={{width: '500px'}} placeholder="" name="remark"/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem style={styles.formItem} label="创建人员:">
                          {/* <p>sssssssssssswww啦啦啦</p> */}
                          <Input style={styles.formInput} placeholder=""/>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem style={styles.formItem} label="创建时间:">
                          {/* <p>sssssssssssswww啦啦啦</p> */}
                          <Input style={styles.formInput} placeholder=""/>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        <FormItem style={styles.formItem} label="修改人员:">
                          {/* <p></p> */}
                          <Input style={styles.formInput} placeholder=""/>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <FormItem style={styles.formItem} label="修改时间:">

                          {/* <p></p> */}
                          <Input style={styles.formInput} placeholder=""/>
                        </FormItem>
                      </Col>
                    </Row>

                  </Form>
                </div>
              </IceContainer>
            </Dialog>
          </div>
        </IceContainer>
      </div>
    )
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
    border: 'none'
  },
  formInputBorder: {
    width: '200px'
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
    marginTop: '-50px'
  },
};
