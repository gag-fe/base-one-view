import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;
import menus from '../../config/menus'
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {

        return (
          <Menu
            mode={this.props.mode}
            onClick={this.props.onClick}
            theme="dark"
            selectedKeys={this.props.selectedKeys}
            style={{ height: '100%', borderRight: 0 }}
          >
            {
              menus.map(function(value, index) {
                if (value.children && value.children.length) {

                } else {
                  return (
                    <Menu.Item
                      key={value.key}>
                      {value.icon}
                      <span>{value.title}</span>
                    </Menu.Item>
                  );
                }
              })
            }
          </Menu>
        );
    }
}

export default AppComponent;
