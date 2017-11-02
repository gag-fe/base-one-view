import React from 'react';
import {Button} from 'antd';
import Logo from './Logo';
import {Icon, Breadcrumb} from 'antd';

class Header extends React.Component {
  render() {
    if (this.props.user) {
      const user = this.props.user;
      var userName = user.username || '名字';
      var userId = user.user_id
    }
    return (
      <div>
        <div className="toolbox">
          <div className="top-navi-left">
            <div className="button-icon">
              <Icon
                className="trigger"
                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
              />
            </div>
          </div>
          <div className="button-exit">
            <a className="ant-dropdown-link" href="#">
              {userName || ''} <Icon type="down" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = { Toolbar: Header, Logo };
