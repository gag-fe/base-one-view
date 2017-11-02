import React from 'react'
import {Modal ,Form, Input, Switch, Checkbox, Radio, Select } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
let form = '';
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    form = props.form;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const props = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    return (
      <Form onSubmit={this.props.onSubmit}>
        {
          this.props.FormColumns.map(function(value, index) {
            if (value.type === 'input') {
              return (
                <FormItem {...formItemLayout}
                          label={value.title}
                          key={index}
                          hasFeedback>
                  {
                    getFieldDecorator(value.dataIndex, {
                      rules:[{required: value.isRequired, message: value.msg}],
                      initialValue: props.RowData[value.dataIndex]?props.RowData[value.dataIndex]: ''
                    })(<Input/>)
                  }
                </FormItem>
              )
            } else if (value.type === "switch") {
              return (
                <FormItem {...formItemLayout}
                          label={value.title}
                          key={index}
                          hasFeedback>
                  {
                    getFieldDecorator(value.dataIndex, {
                      rules:[{required: value.isRequired, message: value.msg}],
                      valuePropName: 'checked',
                      initialValue: props.RowData[value.dataIndex]? true: false
                    })(<Switch/>)
                  }
                </FormItem>
              )
            } else if (value.type === 'radio') {
              return (
                <FormItem {...formItemLayout}
                          label={value.title}
                          key={index}
                          hasFeedback>
                  {
                    getFieldDecorator(value.dataIndex, {
                      rules:[{required: value.isRequired, message: value.msg}],
                      initialValue: props.RowData[value.dataIndex]
                    })(<RadioGroup>
                      {
                        value.RadioGroup.map((val, index) => {
                          return (
                            <Radio value={val.value}
                                   disabled={val.disabled}
                                   key={index}>{val.text}</Radio>
                          );
                        })
                      }
                    </RadioGroup>)
                  }
                </FormItem>
              )
            } else if (value.type === 'checkbox') {
              return (
                <FormItem {...formItemLayout}
                          label={value.title}
                          key={index}
                          hasFeedback>
                  {
                    getFieldDecorator(value.dataIndex, {
                      rules:[{required: value.isRequired, message: value.msg}],
                      valuePropName: 'checked',
                      initialValue: props.RowData[value.dataIndex]? true: false
                    })(<Checkbox/>)
                  }
                </FormItem>
              )
            } else if (value.type === 'select') {
              return (
                <FormItem {...formItemLayout}
                          label={value.title}
                          key={index}

                          hasFeedback>
                  {
                    getFieldDecorator(value.dataIndex,{
                      rules:[{required: value.isRequired, message: value.msg}],
                      initialValue: props.RowData.defaultSelected
                    })(<Select
                      placeholder = '请选择该项目服务器'
                      mode={props.RowData.selectType}>
                      {
                        props.RowData.selectedOptions.map((val, index) => {
                          return (<Select.Option key={index} value={String(val.value)}>{val.text}</Select.Option>);
                        })
                      }
                    </Select>)
                  }
                </FormItem>
              );
            } else if (value.type === 'text') {
              return (
                <FormItem {...formItemLayout}
                          label={value.title}
                          key={index}
                          hasFeedback>
                  <span style={{height:'180px',lineHeight:1.5}}>{props.RowData[value.dataIndex]}</span>
                </FormItem>
              );
            }
          })
        }
      </Form>
    )
  }
}
function mapPropsToFields (props) {
  return {
    ...props
  }
}
const WrappedRegistrationForm = Form.create({
  mapPropsToFields
})(RegistrationForm);

class ModalApp extends React.Component {
  constructor(props) {
    super(props);
  }
  _afterClose() {
    form.resetFields()
  }
  render () {
    return (
      <Modal
        confirmLoading={this.props.confirmLoading}
        afterClose={this._afterClose}
        visible={this.props.visible}
             title={this.props.title}
             onOk={() => {
               form.validateFields((err) => {
                 if (err) {
                   return;
                 };
                 this.props.onOk(form.getFieldsValue())
               })
             }}
             onCancel={this.props.onCancel}>
        <WrappedRegistrationForm
          FormColumns={this.props.FormColumns || []}
          RowData={this.props.RowData || {}}/>
      </Modal>
    );
  }
}


export default ModalApp;
