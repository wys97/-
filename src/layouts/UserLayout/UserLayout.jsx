import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './Footer';
import { routerData } from '../../routerConfig';
import './UserLayout.scss';
import img from '../../../public/logo.jpg'

export default class UserLayout extends Component {
  static displayName = 'UserLayout';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="user-layout">
        <div className="logo">
          <img src={img} />
          <span className="logo-text">
            互联网消费信贷系统
          </span>
        </div>

        <Switch>
          {routerData.map((item, index) => {
            return item.component ? (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ) : null;
          })}

          <Redirect exact from="/user" to="/user/login" />
        </Switch>
        {/*<Footer />*/}
      </Layout>
    );
  }
}
