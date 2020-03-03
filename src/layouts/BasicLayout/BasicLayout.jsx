/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, {Component} from 'react';
import '@alifd/next/dist/next.css';
import {Dialog, Message, Tab} from '@alifd/next';
import Layout from '@icedesign/layout';
import {withRouter} from 'react-router';
import {enquire} from 'enquire-js';
import Header from './components/Header';
import Aside from './components/Aside';
import MainRoutes from './MainRoutes';
import BasicLayoutHoc from './BasicLayoutHoc';
import {asideMenuConfig} from '../../menuConfig';
import './index.scss';
import {getUserProfile} from "../../api";
import {getAuthority} from "../../utils/authority";
import 'moment/locale/zh-cn.js';
import moment from 'moment';
import * as _ from "lodash";
import store from "../../store";
import { initialize } from "../../store/ScreeningWarehouse/loanTransaction/actions";
import { approvalInitialization } from "../../store/ScreeningWarehouse/approvalManagement/actions";
import { collectionInitialization } from "../../store/ScreeningWarehouse/collectionManage/actions";
import { productRunManage } from "../../store/ScreeningWarehouse/productRunManage/actions";

moment.locale('zh-cn');

@BasicLayoutHoc
@withRouter
export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isScreen: undefined,
      index: 0,
      path: '/myWorkspace/home', // 用于存储当前访问路径
      menuList: asideMenuConfig[0],
      indexTabs: [
        {title: '首页', key: '/myWorkspace/home', path: '/myWorkspace/home', closeable: false}
      ],
      pageRouter: {},
      userInfo: {},
      authority: []
    };
  }

  changeLeftMenu = (index) => {
    let indexTabs = [...this.state.indexTabs];
    let tab = null;
    if (JSON.stringify(indexTabs).indexOf(asideMenuConfig[index][0].children[0].path) === -1) {
      tab = {
        title: asideMenuConfig[index][0].children[0].name,
        key: asideMenuConfig[index][0].children[0].path,
        path: asideMenuConfig[index][0].children[0].path,
        closeable: true
      };
      indexTabs.push(tab);
    }
    this.setState(tab ?
      {index, menuList: asideMenuConfig[index], indexTabs, path: tab.path} :
      {index, menuList: asideMenuConfig[index], path: asideMenuConfig[index][0].children[0].path}, () => {
      this.props.history.push({pathname: this.state.menuList[0].children[0].path});
    });
  };

  componentDidMount() {
    this.enquireScreenRegister();
    this.loadUserInfo();
    this.loadAuthority();
  }

  loadAuthority = () => {
    this.setState({
      authority: getAuthority().split(',')
    })
  };

  loadUserInfo = () => {
    getUserProfile().then((res) => {
      if (res.data.code === "200") {
        this.setState({
          userInfo: {
            operatorName: res.data.data.operatorName,
            loginName: res.data.data.loginName,
            userId: res.data.data.operatorId,
            popPasswordUpdate: res.data.data.popPasswordUpdate
          }
        })
      } else {
        Message.error(res.data.message);
      }
    })
  };

  chooseTab = (path) => {
    this.setState({path}, () => {
      this.props.history.push({pathname: path});
    })
  };

  changeRouter = (router) => {
    this.setState({pageRouter: router})
  };

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    // const isMobile = 'screen and (max-width: 720px)';
    // const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    // enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    // enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    return {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };
  };

  addIndexTab = (tab) => {
    let panes = [...this.state.indexTabs];
    if (JSON.stringify(panes).indexOf(tab.path) !== -1) {
      this.setState({path: tab.path});
      return;
    }
    const indexTab = {title: tab.name, key: tab.path, path: tab.path, closeable: true};
    panes.push(indexTab);
    this.setState({indexTabs: panes, path: tab.path});
  };

  remove = (path) => {
    store.dispatch(initialize(path));
    store.dispatch(approvalInitialization(path));
    store.dispatch(collectionInitialization(path));
    store.dispatch(productRunManage(path));
    let tabs = [...this.state.indexTabs];

    if (path !== this.state.path) {
      _.remove(tabs, function (item) {
        return item.path === path
      });
      this.setState({
        indexTabs: tabs
      })
    } else {
      let tabIndex = -1;
      _.remove(tabs, function (item, index) {
        if (item.path === path) {
          tabIndex = index;
          return true;
        }
        return false;
      });
      this.setState({
        indexTabs: tabs,
        path: tabs[tabIndex - 1].path
      }, () => {
        this.props.history.push({pathname: this.state.path});
      })
    }
  };

  logout = (userLogout) => {
    Dialog.show({title: '操作提示', content: '是否退出当前账号？', onOk: userLogout});
  };

  render() {
    const isMobile = this.state.isScreen !== 'isDesktop';
    const layoutClassName = `ice-design-layout-dark ice-design-layout ice-design-fluid-layout`;
    const {profile = {}, userLogout} = this.props;
    const header = <Header isMobile={isMobile} changeLeftMenu={this.changeLeftMenu} profile={profile}
                           handleLogout={() => this.logout(userLogout)} userInfo={this.state.userInfo}
                           authority={this.state.authority}/>;

    const aside = (
      <Layout.Aside width="auto" type={null}>
        <Aside isMobile={isMobile} menuList={this.state.menuList} addIndexTab={(tab) => this.addIndexTab(tab)}
               userInfo={this.state.userInfo}/>
      </Layout.Aside>
    );

    const content = <MainRoutes index={this.state.index} changeRouter={this.changeRouter}/>;

    const layout = (
      <Layout fixable>
        {header}
        <Layout.Section>
          {aside}
          <Layout.Main>
            <div className="indexTabDiv">
              <Tab className="custom-tab" shape="capsule" excessMode="slide" activeKey={this.state.path}
                   defaultActiveKey={'/myWorkspace/home'} onClose={(path) => this.remove(path)}
                   onChange={this.chooseTab}>
                {
                  this.state.indexTabs.map((item) => {
                    return <Tab.Item key={item.path} title={item.title} closeable={item.closeable}/>
                  })
                }
              </Tab>
            </div>
            <div className="main-content" style={{overflowX: 'hidden'}}>
              {content}
            </div>
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );

    return <div className={layoutClassName}>{layout}</div>;
  }
}
