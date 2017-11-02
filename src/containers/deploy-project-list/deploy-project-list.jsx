import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Table from '../../components/list-table/list-table';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../../redux/actions/index';
import {message,  Button, Radio, Modal } from 'antd';
const RadioGroup = Radio.Group;
import { OperateWebhookListRow, DeployProject, DeployServiceLog } from '../../sources/webhook-list/webhook-list'
import ModleForm from '../../components/Modal-form/Modal-from'
import underscore from 'underscore';

const deployStatusText = {
  '-1': '没有查询到该项目package.json webhook配置项',
  '100': '部署失败',
  "200": 'git clone项目失败',
  "201": 'git pull项目失败',
  '300': '登录服务器失败',
  "400": '本地代码克隆岛远程失败',
  '500': '服务器部署成功',
  '505': '服务器部署失败',
  '600': '未知错误'
};
const baseColumns = [
  {title: '项目名称', width: 150, type: 'text', dataIndex: 'project_name', key: 'project_name' },
  {title: '用户名', width: 150,type: 'text',dataIndex: 'user_name', key: 'user_name' },
  {title: '仓库地址',width: 150,type: 'text', dataIndex: 'ssh_url', key: 'ssh_url' },
  {title: '版本号', width: 150,type: 'text',dataIndex: 'git_tags', key: 'git_tags' },
  // {title: '是否部署',width: 150,type: 'text', dataIndex: 'deploy_status', key: 'deploy_status', render: (deploy_status, record)=>{
  //   var text = deployStatusText[deploy_status] || '尚未部署';
  //   if (deploy_status == 500) {
  //     return (<span style={{color: 'green'}}>部署成功</span>)
  //   } else {
  //     return <span style={{color: 'red'}}>{text}</span>
  //   }
  //
  // }},
  {title:'服务器',width: 150,type: 'select',dataIndex:'service',key: 'service',  render: (service) => {
    var arr = [];
    service.map(function(value) {
      arr.push(`IP：${value.ip}`)
    });
    return arr.join(' , ') || '暂没有配置服务器'
  }},
  {title: '更新时间', width: 150,type: 'text',dataIndex: 'updated_at', key: 'updated_at',render(text) {
    let oldTime = new Date(text);
    let now = new Date();
    let update = (now - oldTime)/1000;
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
  }}];
class DeployProjectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      visible: false,
      RowData: {},
      plainOptions: [],
      defaultCheckedList: [],
      RowServiceData:{},
      visibleSevice: false,
      serviceConfig: {},
      confirmLoadingOperate: false,
      confirmLoadingService: false
    }
  }
  _handleClick(RowData) {
    // 已中的服务器列表
    let defaultCheckedList = [];
    RowData.service.map(function(value) {
      defaultCheckedList.push(value.name || value.IP);
    });
    this.setState({
      visible: true,
      RowData: RowData,
      defaultCheckedList: defaultCheckedList
    });
  }

  _handleOk(newRowData) {
    let RowData = this.state.RowData;
    let id = RowData.id;
    let userInfo = this.props.login.userInfo;
    this.setState({
      confirmLoadingOperate: true
    });
    const result = OperateWebhookListRow({
      service_ids: newRowData.service.join(','),
      id: id,
      status: newRowData.status ? 1 : 0,
      remark: newRowData.remark,
      user_id: userInfo.id,
      project_id: RowData.project_id
    });

    result.then((res) => {
      if (res.status === 'S') {
        message.success('修改成功')
        this.props.InitWebhookList({
          user_id: userInfo.id
        });
        this.setState({
          visible: !this.state.visible,
          confirmLoadingOperate: false
        })
      } else {
        message.warning(res.msg);
      }
    })
  }
  __handleCancel() {
    this.setState({
      visible: false,
      visibleSevice: false,
      confirmLoadingOperate: false,
      confirmLoadingService: false
    });
  }

  _handleDeployClick(record) {
    let service = record.service;
    let userInfo = this.props.login.userInfo;
    if (!service.length) {
      message.error('该项目尚未配置服务器');
      return;
    };

    let serviceConfig = {
      type: 'radio',
      title: '选择服务器',
      dataIndex: 'service_id',
      project_name: record.project_name,
      isRequired: true,
      msg:'请选择需要部署的服务器'
    };
    const DeployLogResult = DeployServiceLog({
      project_id: record.project_id,
      user_id: userInfo.id,
      webhook_id: record.id
    });
    DeployLogResult.then((res) => {
      let RadioGroup = [];
      if (res.status === 'S') {
        let arr = res.data;
        service.map((val) => {
          console.log(val);
          for (let i =0;i<arr.length;i++) {
            if (val.id === arr[i].service_id) {
              let obj = {
                text: val.name || val.ip,
                value: val.id
              };
              if (arr[i].deploy_status === 500) {
                obj.disabled = true;
              }
              RadioGroup.push(obj);
              break;
            }
          }
        });
        console.log(RadioGroup);
        if (!RadioGroup.length) {
          message.error('该项目所配置服务器，均已部署完成');
          return;
        }
        serviceConfig.RadioGroup = RadioGroup;
        this.setState({
          serviceConfig: serviceConfig,
          RowServiceData: record,
          visibleSevice: true
        })
      } else {
        message.warning(res.msg);
      };
    });
  }
  _handleServiceOk(e) {
    let RowServiceData = this.state.RowServiceData;
    let userInfo = this.props.login.userInfo;
    this.setState({
      confirmLoadingService: true
    });
    const result = DeployProject({
      service_id: e.service_id,
      id: RowServiceData.id,
      token: userInfo.token
    });
    result.then((res) => {
      this.setState({
        RowServiceData:{},
        visibleSevice: false,
        serviceConfig: {},
        confirmLoadingService: false
      });
      if (res.status === 'S') {
        Modal.success({
          title:'部署成功',
          content:res.data.successful_file ? `成功的文件夹有：${res.data.successful_file.replace(/,/g,'  ')} ` : '部署成功'
        })
      } else {
        Modal.success({
          title:'部署失败',
          content:`失败原因：${res.msg || res.error}`
        })
      }
    })
  }
  render() {
    const props = this.props;
    let title = null;
    if (this.state.RowData) {
      title = `配置项目${this.state.RowData.project_name}`
    }
    let plainOptions = [];
    let list = this.props.service.list;
    if (list.data) {
      list.data.map((value) => {
        plainOptions.push(value.name || value.IP);
      })
    }
    const tableCol = baseColumns.concat([{title: '备注', width: 150,dataIndex: 'remark', key: 'remark' },
      {title: '操作',width: 150,render: (text,record) => {
      return <div>
        <Button onClick={(e) => {
          this._handleClick(record);
          e.preventDefault();
          e.stopPropagation()
        }}  icon="edit"/>
        &nbsp;&nbsp;
        <Button onClick={(e) => {
          this._handleDeployClick(record);
          e.preventDefault();
          e.stopPropagation()
        }}>
          部署
        </Button>
      </div>
    }}]);
    const webhookProject = props.webhookProject?props.webhookProject.list: [];
    let RowData = this.state.RowData;
    if (!underscore.isEmpty(RowData)) {
      RowData.service = RowData.service || [];
      RowData.defaultSelected = RowData.service.map((value) => {
        return String(value.id);
      });
      RowData.selectType = 'multiple';
      RowData.selectedOptions = this.props.service.list.map((value) => {
        return {
          value: value.id,
          text: value.name || value.ip
        }
      });
    }
    let RowServiceData = this.state.RowServiceData;
    if (!underscore.isEmpty(RowServiceData)) {
      RowServiceData.service
    }
    const FormColumns =baseColumns.concat([{title: '是否显示', width: 150,type: 'switch',dataIndex: 'status', key: 'status' },
      {title: '备注', width: 150,type: 'input',dataIndex: 'remark', key: 'remark' }]);

    return (
      <div>
        <Table columns={tableCol}
               total={props.webhookProject.list.size}
               data={ webhookProject}/>
        <ModleForm
          confirmLoading={this.state.confirmLoadingOperate}
          title={title}
          visible={this.state.visible}
          onOk={this._handleOk.bind(this)}
          FormColumns={FormColumns}
          RowData={RowData}
          onCancel={this.__handleCancel.bind(this)} />
        <ModleForm visible={this.state.visibleSevice}
                   onCancel={this.__handleCancel.bind(this)}
                   FormColumns={[this.state.serviceConfig]}
                   confirmLoading={this.state.confirmLoadingService}
                   onOk={this._handleServiceOk.bind(this)}
                   title={`部署 ${this.state.RowServiceData.project_name || ''} 服务器`}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(DeployProjectComponent);
