import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Input} from '@alifd/next/lib/index';
import '../../OperationManage'

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};
const FormItem = Form.Item;

export default class OrganUpdate extends Component {
  static displayName = 'OrganUpdate';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构编号:">
                    {/* <Input style={ styles.formInputBorder } style={styles.formContent} placeholder=""/> */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构状态:" required>
                    {/* <Select followTrigger name="select" style={ styles.formInputBorder }>
                                                <Option value="jack">jack</Option>
                                                <Option value="lucy">lucy</Option>
                                                <Option value="disabled" disabled>disabled</Option>
                                                <Option value="hugohua">hugohua</Option>
                                            </Select> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} required label="合作机构名称:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/> */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构类型:" required>
                    {/* <Select followTrigger name="select" style={ styles.formInputBorder }>
                                                <Option value="jack">jack</Option>
                                                <Option value="lucy">lucy</Option>
                                                <Option value="disabled" disabled>disabled</Option>
                                                <Option value="hugohua">hugohua</Option>
                                            </Select> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} required label="联系邮箱:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/> [发邮件通知] */}
                    <p><span>[发邮件通知]</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  {/* <FormItem
                                            label="成立日期:"
                                            style={styles.formItem}
                                            >
                                            <DatePicker followTrigger style={ styles.formInputBorder } name="startDate"/>
                                        </FormItem> */}
                  <p/>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="行政区划代码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="行政区划:">
                    {/* <Input style={ styles.formInputBorder } style={ styles.formContent }placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="营业执照号码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    label="营业执照注册日期:"
                    style={styles.formItem}
                  >
                    {/* <DatePicker followTrigger style={ styles.formInputBorder } name="registerDate"/> */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="营业执照到期日期:"
                    style={styles.formItem}
                  >
                    {/* <DatePicker followTrigger style={ styles.formInputBorder } name="endDate"/> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="营业执照注册地址:" help="">
                    <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="注册地行政区划代码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="注册地行政区划:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="国税登记证号码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="组织机构代码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="组织机构代码证有效期:"
                    style={styles.formItem}
                  >
                    {/* <DatePicker followTrigger style={ styles.formInputBorder } name="registerDate"/> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="社会信用代码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="是否贷款运用方:">
                    {/* <Select followTrigger name="select" style={ styles.formInputBorder }>
                                                <Option value="jack">jack</Option>
                                                <Option value="lucy">lucy</Option>
                                                <Option value="disabled" disabled>disabled</Option>
                                                <Option value="hugohua">hugohua</Option>
                                            </Select> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="企业总资产:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/> 元 */}
                    <p><span>元</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="企业总负债:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/> 元 */}
                    <p><span>元</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="注册资本:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/> 元 */}
                    <p><span>元</span></p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="实收资本:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/> 元 */}
                    <p><span>元</span></p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="企业类型:">
                    {/* <Select followTrigger name="select" style={ styles.formInputBorder }>
                                                <Option value="jack">jack</Option>
                                                <Option value="lucy">lucy</Option>
                                                <Option value="disabled" disabled>disabled</Option>
                                                <Option value="hugohua">hugohua</Option>
                                            </Select> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="经营者情况:" help="">
                    <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="主营业务情况:" help="">
                    <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="营业地址:" help="">
                    <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="邮政编码:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="实际控制人:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构信用评级:">
                    {/* <Input style={ styles.formInputBorder } placeholder=""/>  */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="备注:" help="">
                    <Input.TextArea style={styles.formTextArea} placeholder="" name="remark"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建人员:">
                    {/* <Input style={styles.formInput}   placeholder=""/> */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="创建时间:">
                    {/* <Input style={styles.formInput}   placeholder=""/> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改人员:">
                    {/* <Input style={styles.formInput}   placeholder=""/> */}
                    <p/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="修改时间:">
                    {/* <Input style={styles.formInput}   placeholder=""/> */}
                    <p/>
                  </FormItem>
                </Col>
              </Row>
            </Form>
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
    border: 'none',
    // width: '200px'
  },
  formInputBorder: {
    width: '240px'
  },
  formContent: {
    width: '0px',
    border: 'none'
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
