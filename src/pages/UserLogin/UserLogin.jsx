/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import FoundationSymbol from '@icedesign/foundation-symbol';
import {Form, Grid, Input} from '@alifd/next';

import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from '../../utils/injectReducer';
import {captcha, userLogin} from './actions';
import reducer from './reducer';

const Icon = FoundationSymbol;
const {Row} = Grid;
const FormItem = Form.Item;

class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
        imgUrl: ''
      },
    };
  }

  componentDidMount() {
    this.loadCaptcha();
  }

  loadCaptcha = () => {
    this.props.captcha().then((res) => {
      let img = new Uint8Array(res.data);
      let blob = new Blob([img], {type: "image/png"});
      let url = URL.createObjectURL(blob);
      this.setState({imgUrl: url});
    });
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    this.props.userLogin(values);
  };

  render() {
    return (
      <div className="user-login">
        <div className="login-title">登 录</div>
        <div className="formContainer">
          <Form value={this.state.value} onChange={this.formChange}>
            <FormItem required requiredMessage="请填写用户名" className="formItem">
              <Input
                innerBefore={
                  <Icon type="person" size="small" className="inputIcon"/>
                }
                name="loginName"
                maxLength={20}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem required requiredMessage="请填写密码" className="formItem">
              <Input
                innerBefore={
                  <Icon type="lock" size="small" className="inputIcon"/>
                }
                name="loginPassword"
                htmlType="password"
                placeholder="密码"
              />
            </FormItem>
            <FormItem required requiredMessage="请填写验证码" className="formItem">
              <Input
                className="captcha"
                innerBefore={
                  <Icon type="" size="small" className="inputIcon"/>
                }
                name="captcha"
                maxLength={4}
                placeholder="验证码"
              />
              <img className="captchaImg" src={this.state.imgUrl} onClick={this.loadCaptcha} alt={""}/>
            </FormItem>
            {/*<FormItem>
              <Checkbox name="checkbox" className="checkbox">
                记住账号
              </Checkbox>
            </FormItem>*/}
            <Row className="formItem">
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                className="submitBtn"
                htmlType="submit"
              >
                登 录
              </Form.Submit>
            </Row>
            {/*<Row className="tips">
              <Link to="/user/register" className="tips-text">
                立即注册
              </Link>
            </Row>*/}
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
  captcha
};

const mapStateToProps = (state) => {
  return {loginResult: state.login};
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({key: 'login', reducer});

export default compose(
  withReducer,
  withConnect
)(UserLogin);
