import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Field, Form, Grid, Input, Message, Radio, Select } from '@alifd/next';
import questionApi from '../../../api/AppManage/questionManagement';

const { Row, Col } = Grid;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormItem = Form.Item;
const Option = Select.Option;

export default class QuestionDetail extends React.Component {
  field = new Field(this);
  static displayName = 'QuestionDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      id: window.location.hash.split('/')[window.location.hash.split('/').length - 1],
      formValue: {}
    };
  }

  componentWillMount = () => {
      this.getDetail();
  };

  componentDidMount = () => {

  };




  getDetail = () => {
    questionApi.get(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
          this.setState({
            formValue: res.data.data,
          })
        } else {
          Message.error(res.data.message);
        }
      });
  };



  goBack = () => {
    this.props.history.go(-1);
  };

  render() {

    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'} {...formItemLayout} field={this.field}>
            <div className="CustomerTabTitle" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ marginTop: '-4px' }}>常见问题详情</h3>
              <Button type="normal" style={{ borderRadius: '5px' }} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <div style={{ marginTop: '30px' }}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="编号:">
                      <p>{this.state.formValue.id}<span> [自动生成] </span></p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="文章标题:">
                      <p>{this.state.formValue.questionTitle}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="文章内容:" help="">
                      <Input.TextArea style={{width: '500px'}} readOnly={true} value={this.state.formValue.questionContent}
                                      placeholder="" name="remark"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      <p>{this.state.formValue.creatorName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      <p>{this.state.formValue.createTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      <p>{this.state.formValue.modifierName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      <p>{this.state.formValue.updateTime}</p>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>

          </Form>
        </IceContainer>
      </div>
    );
  }
}


const styles = {
  formItem: {
    display: 'flex',
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
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
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
    width: '240px',
  },
  formTextArea: {
    width: '500px',
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
  },
};

