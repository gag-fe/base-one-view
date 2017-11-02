import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import Table from '../../components/list-table/list-table';
import {Button,Modal, message } from 'antd';
import { OperateServiceRow } from '../../sources/service-list/service-list'

import  actions from '../../redux/actions/index';
import ModalFrom from '../../components/Modal-form/Modal-from'

let ColumnsArr = [
  { title: '名字', dataIndex: 'name',type:'input', key: 'name', msg: '请输入服务器名称',isRequired: true },
  { title: 'IP地址', dataIndex: 'ip',type:'input', key: 'ip' , msg: '请输入服务器IP地址', isRequired: true},
  { title: '端口号', dataIndex: 'port',type:'input', key: 'prot' ,msg: '请输入服务器端口号', isRequired: true},
  { title: '账户', dataIndex: 'account',type:'input', key: 'account',msg: '请输入服务器用户账号',isRequired: true },
  { title: '服务器属性',
    dataIndex: 'service_tag',
    type:'radio',
    key: 'service_tag',
    msg: '请选择服务器属性',
    RadioGroup:[{
      text: '测试服务',
      value:'test'
    },{
      text: '正式服务',
      value: 'official'
    }],
    render(key) {
      if (key === 'test') {
        return '测试服务';
      } else {
        return '正式服务';
      }
    },
    isRequired: true},
  { title: '密码', dataIndex: 'pkey',type:'input', key: 'pkey',msg: '请输入服务器登录密码', isRequired: true },
  { title: '秘钥', dataIndex: 'ssh_key',type:'input', key: 'ssh_key',msg: '请输入服务器秘钥地址', isRequired: true }
];
let Columns = [], FormColumns=[];

FormColumns = FormColumns.concat(ColumnsArr,[
  { title: '是否显示', dataIndex: 'status',type:'switch', key: 'status', msg: '请输入服务器名称', isRequired: false },
  { title: '备注', dataIndex: 'remark',type:'input', key: 'remark', msg: '请输入服务备注' ,isRequired: false}]);
class SERVICEComponent extends React.Component {
  constructor(props) {
      super(props);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      this.state = {
        visible: false,
        RowData: {},
        confirmLoadingServiceFrom: false
      }
  }
  updateColumns(record) {
    this.setState({
      RowData: record,
      visible: true
    });
  }
  addService() {
    this.setState({
      visible: true
    });
  }
  _handleOk(value) {
    let RoWData = Object.assign(this.state.RowData,value);
    this.setState({
      confirmLoadingServiceFrom: true
    });
    let user_id = this.props.login.userInfo.id;
    RoWData.user_id = user_id;
    RoWData.status = RoWData.status ? 1 : 0;
    const result = OperateServiceRow(RoWData);
    result.then((res) => {
      if (res.status === 'S') {
        message.success('配置成功');
        this.props.InitServiceList({
          user_id: user_id
        });
        this.setState({
          RowData: {},
          visible: false,
          confirmLoadingServiceFrom: false
        });
      } else {
        this.setState({
          confirmLoadingServiceFrom: false
        });
        if (res['error']) {
          Modal.error({
            title: '添加失败',
            content: res['error']
          })
        } else {
          message.error('添加失败')
        }
      }
    })
  }
  __handleCancel() {
    this.setState({
      visible: false,
      RowData: {},
      confirmLoadingServiceFrom: false
    });
  }

  render() {
    Columns = [];
    Columns = Columns.concat(ColumnsArr,{ title: '更新时间', dataIndex: 'updated_at', key: 'updated_at', render(text){
        let oldTime = new Date(text);
        let now = new Date();
        let update = (now - oldTime)/1000;
        // 秒
        if (update < 60){
          text = parseInt(update) + '秒前';
        } else if (update < 3600) {
          text = parseInt(update/60) + '分钟前';
        } else if (update < 86400) { //天
          text = parseInt(update/60/60) + '小时前';
        } else if (update < 2592000) { // 月
          text = parseInt(update/60/60/24) + '天前';
        } else if (update < 31104000) { // 年
          text = parseInt(update/60/60/24/30) + '月前';
        } else {
          text = parseInt(update/60/60/24/30/12) + '年前';
        }
        return text;
      }},
      {title: '操作',render: (text,record) => {
        return (<Button onClick={() => {
          this.updateColumns(record)
        }}  icon="edit"/>)
      }});

    const modalTitle = this.state.RowData.name || this.state.RowData.IP || "添加新服务";
    const RowData = this.state.RowData;
    return (
      <div>
        <div style={{margin:'10px 5px'}}>
          <Button onClick={this.addService.bind(this)}>添加服务器</Button>
        </div>
        <Table columns={Columns} data={this.props.service.list?this.props.service.list : []}/>
        <ModalFrom title={`${modalTitle} 配置`}
                   FormColumns={FormColumns}
                   confirmLoading={this.state.confirmLoadingServiceFrom}
                   RowData={RowData}
                   onOk={this._handleOk.bind(this)}
                   onCancel={this.__handleCancel.bind(this)}
          visible={this.state.visible}/>
      </div>
    );
  }
}

// -------------------redux react 绑定--------------------//
function mapStateToProps(state) {
  return {
    ...state
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions ,dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SERVICEComponent);
