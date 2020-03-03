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

export default class InterfaceInfo extends Component {
  static displayName = 'InterfaceInfo';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>接口安全配置</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="系统公钥:" help=""
                            requied>
                    <Input.TextArea style={_.compact(styles.formTextArea, styles.formInput)}
                                    placeholder="" name="system"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构公钥:" help=""
                            requied>
                    <Input.TextArea style={_.compact(styles.formTextArea, styles.formInput)} placeholder=""
                                    name="partner"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="回调通知地址:" help=""
                            requied>
                    <Input.TextArea style={_.compact(styles.formTextArea, styles.formInput)} placeholder=""
                                    name="address"/>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem labelTextAlign='right' style={styles.formItem} label="合作机构IP白名单:"
                            help="">
                    <Input.TextArea style={_.compact(styles.formTextArea, styles.formInput)} placeholder=""
                                    name="remark"/>
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
