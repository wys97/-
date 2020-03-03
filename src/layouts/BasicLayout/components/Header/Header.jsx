/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React, {Component} from 'react';
import {Badge, Balloon, Dialog, Form, Grid, Icon, Input, Message, Nav} from '@alifd/next';
import Layout from '@icedesign/layout';
import FoundationSymbol from '@icedesign/foundation-symbol';
import cx from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import {changePwd, logout} from '../../../../api';
import {headerMenuConfig} from '../../../../menuConfig';
import Logo from '../Logo';

import './Header.scss';
import IceContainer from "@icedesign/container";

const {Row, Col} = Grid;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {xxs: 8, s: 8, l: 8},
  wrapperCol: {xxs: 12, s: 12, l: 12},
};

@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      value: {
        newPassword: '',
        rePasswd: '',
        oldPassword: ''
      },
      changePwdWin: props.userInfo.popPasswordUpdate
    };
  }

  handleSetting = () => {
    this.setState({
      changePwdWin: true
    })
  };

  changeIndex = (obj) => {
    this.setState({
      index: obj.currentTarget.attributes['index'].value
    });
    this.props.changeLeftMenu(obj.currentTarget.attributes['index'].value);
  };

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (values && values !== stateValues.newPassword) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = (values, errors) => {
    if (!errors) {
      // 提交当前填写的数据
      changePwd(values).then((res) => {
        if (res.data.code === '200') {
          this.onClose();
          logout().then((res) => {
            if (res.data.code === '200') {
              this.props.history.push({pathname: '/user/login'});
              // Message.success(res.data.message);
            } else {
              Message.error(res.data.message);
            }
          });
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      })
    }
  };

  onClose = () => {
    this.setState({
      changePwdWin: false,
      value: {
        oldPassword: '',
        newPassword: '',
        rePasswd: ''
      }
    })
  };

  render() {
    const {isMobile, className, style} = this.props;
    let that = this;

    return (
      <Layout.Header
        theme="dark"
        className={cx('ice-design-layout-header', className)}
        style={{...style}}
      >
        <Logo/>

        <div className="ice-design-layout-header-menu">
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Nav direction="hoz" type="secondary" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                // const index = idx;
                if (!that.props.authority || that.props.authority.join(',').indexOf(nav.authority) === -1) {
                  return null;
                }
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Nav.Item key={idx} index={idx} className={that.state.index === idx ? 'choose' : null}
                            onClick={(obj) => this.changeIndex(obj)}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small"/>
                        ) : null}{' '}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small"/>
                        ) : null}{' '}
                        {!isMobile ? nav.name : null}
                      </a>
                    )}
                  </Nav.Item>
                );
              })}
            </Nav>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <Link to="" className="warning">
            <Badge count={0}>
              <FoundationSymbol type="bell" size="large" className="whiteIcon"/>
            </Badge>
          </Link>
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                <Icon type="account" size="small" className="whiteIcon act"/>
                <div className="user-profile">
                  <span className="user-name">{this.props.userInfo.operatorName}</span>
                </div>
                <FoundationSymbol
                  type="angle-down"
                  size="small"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li
                className="user-profile-menu-item"
                onClick={this.handleSetting}
              >
                <FoundationSymbol type="repair" size="small"/>
                修改密码
              </li>
              <li
                className="user-profile-menu-item"
                onClick={this.props.handleLogout}
              >
                <FoundationSymbol type="person" size="small"/>
                退出
              </li>
            </ul>
          </Balloon>
        </div>
        <Dialog
          style={{width: '600px', height: '800px', borderRadius: '8px'}}
          title=""
          footer={false}
          visible={this.state.changePwdWin}
          onClose={this.onClose}>
          <IceContainer>
            <Form
              value={this.state.value}
              onChange={this.formChange}
              ref="form"
            >
              <div style={styles.formContent}>
                <h2 style={styles.formTitle}>修改密码</h2>
                <FormItem
                  label="用户编号："
                  {...formItemLayout}
                  style={{fontSize: '14px', lineHeight: '28px'}}
                  required
                  requiredMessage=""
                >
                  {this.props.userInfo.userId}[自动生成]
                </FormItem>
                <FormItem
                  label="用户名："
                  {...formItemLayout}
                  style={{fontSize: '14px', lineHeight: '28px'}}
                  required
                  requiredMessage=""
                >
                  {this.props.userInfo.loginName}
                </FormItem>
                <FormItem
                  label="原密码："
                  {...formItemLayout}
                  required
                  requiredMessage="请输入原密码"
                >
                  <Input
                    name="oldPassword"
                    htmlType="password"
                    size="medium"
                    placeholder="请输入原密码"
                  />
                </FormItem>
                <FormItem
                  label="新密码："
                  {...formItemLayout}
                  validator={this.checkPasswd}
                >
                  <Input
                    name="newPassword"
                    htmlType="password"
                    size="medium"
                    placeholder="请输入新密码"
                  />
                </FormItem>
                <FormItem
                  label="确认密码："
                  {...formItemLayout}
                  validator={(rule, values, callback) =>
                    this.checkPasswd2(rule, values, callback, this.state.value)
                  }
                >
                  <Input
                    name="rePasswd"
                    htmlType="password"
                    size="medium"
                    placeholder="请再次输入新密码"
                  />
                </FormItem>
              </div>
              <Row wrap style={{marginTop: 20, textAlign: 'center'}}>
                <Col>
                  <Form.Submit
                    validate
                    type="primary"
                    onClick={this.validateAllFormField}
                  >
                    保 存
                  </Form.Submit>
                  <span> </span>
                  <Form.Reset
                    type="normal"
                    onClick={this.onClose}
                  >
                    取 消
                  </Form.Reset>
                </Col>
              </Row>
            </Form>
          </IceContainer>
        </Dialog>
      </Layout.Header>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
