import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Cookies from 'js-cookie';
import './index.styl'
import actions from '../../redux/actions/index'

import { USERINFO } from '../../utils/const'
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {

        this.props.logingIn(values,this.props)
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '情输入您的密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary"
                    htmlType="submit"
                    className="login-form-button">
              登录
            </Button>
            Or <a href="">注册</a>
          </FormItem>
        </Form>
      );
    }
}

const LoginComponent = Form.create()(NormalLoginForm);


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

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);
