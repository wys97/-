import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Form, Grid, Input, Message} from '@alifd/next';
import creditApprovalApi from "../../../api/WorkBench/CreditApproval";
import CreditManageDetail from './CreditManageDetail';


const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export default class CreditApprovalDetail extends Component {

  static displayName = 'CreditApprovalDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      approvalId: this.props.location && this.props.location.state && this.props.location.state.name,
      approvalOrderId: this.props.location && this.props.location.state && this.props.location.state.row.approvalOrderId,
      currentLevel:this.props.location && this.props.location.state && this.props.location.state.row.currentLevel,
      formInput: {}
    };
  }

  componentWillMount() {
    if (this.props.location && this.props.location.state && this.props.location.state.name) {
      this.getApprovalDetail();
    }
  }

  componentDidMount() {

  }

  getApprovalDetail = () => {
    creditApprovalApi.approvalDetail(this.state)
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            formInput: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  goBack = () => {
    this.props.history.go(-1);
  };

  render() {
    // 如果刷新浏览器, state将为undefined, 所以跳转回首页
    if (this.props.location.state === null || this.props.location.state === undefined) {
      this.props.history.push({pathname: '/'});
      return (<div/>);
    } else {
      return (
        <div>
          <IceContainer>
            <div className="CustomerTabTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>贷款审批</h3>
              <Button type="normal" style={{borderRadius: '5px'}} onClick={this.goBack}>返回</Button>
            </div>
            <div className='contain-con'>
              <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批结点:">
                      <p>{this.state.formInput.currentLevelText}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="申请时间:">
                      <p>{this.state.formInput.applyTime}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="审批结果:">
                    <p>{this.state.formInput.approvalStatusText}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="审批意见:">
                      <p>{this.state.formInput.approvalOpinion}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="授信额度:">
                    <p>{this.state.formInput.creditLimit}元</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批人员:">
                      <p>{this.state.formInput.approverName}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="审批时间:">
                      <p>{this.state.formInput.approvalTime}</p>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </IceContainer>
          <CreditManageDetail id={this.state.approvalOrderId}/>
        </div>
      )
    }
  }
}
const styles = {
  formItem: {
    display: 'flex',
  },
}
