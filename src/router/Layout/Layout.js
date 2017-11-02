import React from 'react';
import { Layout,  Icon,Menu, Dropdown,message, Avatar } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import  actions from '../../redux/actions/index'



import { hashHistory } from 'react-router'
import Nav from './Nav/Nav'
import HeaderRoot from './header/header';
import './layout.styl'
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }
  toggle(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  selectMeun(item) {
    // 点击之前 验证是否登录
    if(!this.props.login.singIn) {
      message.error('登录已超时，请重新登录');
      setTimeout(() => {
        hashHistory.push('login');
      }, 1000)
    } else {
      hashHistory.push(item.key);
    }
  }
  componentWillMount() {
    if (!this.props.login.singIn) {
      this.props.loginCheck(this.props);
    }
  }
  render() {
    let pathname = this.props.location.pathname;
    let Login = this.props.login;
    let selectedKeys = '';
    if (pathname.length > 1) {
      selectedKeys = pathname.split('/')
    }
    const menu = (
      <Menu>
        <Menu.Item>
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="layout-wrapper">
        <Sider
          trigger={null}
          collapsible
          width={240}
          collapsed={this.state.collapsed}
        >
          <HeaderRoot.Logo
            collapsed={this.state.collapsed}
            href={'/'} name={'WEBHOOK'} />
          <Nav
            selectedKeys={selectedKeys || []}
            onClick={this.selectMeun.bind(this)}
            mode='inline'/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
            <div className="user-wrapper">
              <div className="user-avater">
                {
                  Login.userInfo.avatar_url? <Avatar src={Login.userInfo.avatar_url}/> : <Avatar icon='user'/>
                }
              </div>
              <div className="user-name">
                {
                  Login.userInfo.name || Login.userInfo.username
                }
              </div>
            </div>
          </Header>
          <Content  style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}>
            拉登前端发布系统 ©{new Date().getFullYear()} Created by Gooagoo
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
/*==================  绑定redux  ==========================*/
//将state.site绑定到props的site
function mapStateToProps(state) {
  return {
    ...state
  }
}
//将dispatch的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},actions), dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
