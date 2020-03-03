import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Grid, Input, Button, Message, Field} from '@alifd/next';
import collectionFollowUpApi from '../../../api/CollectionManage/CollectionFollowUp'
import * as _ from "lodash";

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};

const FormItem = Form.Item;


export default class CollectionRecordUpdate extends Component {
  field = new Field(this);
  static displayName = 'CollectionRecordUpdate';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.id,
      collectionTaskId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.collectionTaskId,
      customerId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.customerId,
      formInput: {}
    };
  }

  componentWillMount = () => {

  };

  componentDidMount = () => {
    this.getCollectionDetailPhone()
  };

  getCollectionDetailPhone = () => {       //催收记录详情(修改-电话)
      collectionFollowUpApi.taskDetail(this.state.id).then(res => {
        if (res.data.code === "200") {
          let data = res.data.data;
          this.field.setValue(
            "collectionRemark",
            data.collectionRemark
          );
          if (data.collectionType == "短信") {
            data.contentTemplateId = "短信模板"+data.contentTemplateId
          }
          if (data.collectionType == "邮件") {
            data.contentTemplateId = "邮件模板" + data.contentTemplateId;
          }
            this.setState({
              formInput: data
            });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  update = () => {
    let params = {
      id: this.state.formInput.id,
      collectionRemark: this.field.getValue("collectionRemark")
    };
    collectionFollowUpApi.updateCollectionRemark(params).then(res => {
      if (res.data.code === "200") {
        Message.success(res.data.message);
        this.props.history.push({
          pathname: "/CollectionManage/CollectionInfoTabs",
          state: {
            name: this.state.collectionTaskId,
            customerId: this.state.customerId,
          }
        });
      } else {
        Message.error(res.data.message);
      }
    });
  }

  goback = () => {
    this.props.history.push({
      pathname: "/CollectionManage/CollectionInfoTabs",
      state: {
        name: this.state.collectionTaskId,
        customerId: this.state.customerId,
      }
    });
  };

  render() {
    return (
      <div>
        <IceContainer>
          <div className="contain-con">
            <Form
              labelTextAlign={"right"}
              {...formItemLayout}
              style={{ marginTop: "30px" }}
              field={this.field}
            >
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="催收编号:">
                    <p>{this.state.formInput.id}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem style={styles.formItem} label="催收员用户名:">
                    <p>{this.state.formInput.loginName}</p>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem style={styles.formItem} label="催收员名称:">
                    <p>{this.state.formInput.operatorName}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} required label="催收方式:">
                    <p>{this.state.formInput.collectionType}</p>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  {this.state.formInput.collectionType == "邮件" ? (
                    <FormItem style={styles.formItem} required label="EMAIL:">
                      <p>
                        {this.state.formInput.receiveName}
                        {this.state.formInput.receiveEmail}
                      </p>
                    </FormItem>
                  ) : (
                    <FormItem style={styles.formItem} required label="手机号:">
                      <p>
                        {this.state.formInput.receiveName}
                        {this.state.formInput.receivePhone}
                      </p>
                    </FormItem>
                  )}
                </Col>
              </Row>
              {this.state.formInput.collectionType == "电话" ? null : (
                <Row>
                  <Col span="24">
                    <FormItem
                      style={styles.formItem}
                      required
                      label="发送内容:"
                    >
                      <p>{this.state.formInput.contentTemplateId}</p>
                      <p>{this.state.formInput.collectionContent}</p>
                    </FormItem>
                  </Col>
                </Row>
              )}
              {this.state.formInput.collectionType == "邮件" ? (
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} label="抄送:">
                      <p>{this.state.formInput.carbonCopy}</p>
                    </FormItem>
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col span="24">
                  <FormItem style={styles.formItem} label="催收结果描述:">
                    <Input.TextArea
                      style={styles.formTextArea}
                      value={this.field.getValue("collectionRemark")}
                      placeholder=""
                      name="collectionRemark"
                    />
                  </FormItem>
                </Col>
              </Row>
              <Form.Submit
                type="primary"
                style={styles.saveButton}
                onClick={this.update}
              >
                保存
              </Form.Submit>
              <Button
                type="normal"
                style={{ marginLeft: "40PX" }}
                onClick={this.goback}
              >
                返回
              </Button>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
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
  }

};
