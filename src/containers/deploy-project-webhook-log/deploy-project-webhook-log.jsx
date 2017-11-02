import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Table from '../../components/list-table/list-table'
import  actions from '../../redux/actions/index'
class History extends React.Component {
  constructor(props) {
      super(props);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillMount() {

  }
  onChangeTable(e) {
    console.log(e);
  }
  render() {
    const props = this.props;
    const columns = [
      {title: '项目名称', dataIndex: 'project_name', width:120, key: 'project_name' },
      {title: '开发者', dataIndex: 'user_name',width:120, key: 'user_name' },
      {title: 'git仓库地址', dataIndex: 'ssh_url',width:120, key: 'ssh_url' },
      {title: 'web地址', dataIndex: 'web_url',width:120, key: 'web_url' },
      {title: '版本号', dataIndex: 'git_tags',width:120, key: 'git_tags' },
      {title: '部署状态说明', dataIndex: 'deploy_status_text',width:120, key: 'deploy_status_text' },
      {title: 'error', dataIndex: 'error',width:120, key: 'error' },
      {title: '创建时间', dataIndex: 'created_at',width:120, key: 'created_at',render(text) {
        let oldTime = new Date(text);
        let now = new Date();
        let update = now - oldTime
        update = update/1000;
        if( update < 60 ){
          text = parseInt(update) + '秒前';
        } else if (update/60 < 60) {
          text = parseInt(update/60) + '分钟前';
        } else if (update/(60*60) < 60){
          text = parseInt(update/(60*60)) + '小时前';
        } else {
          text = parseInt(update/(60*60*60)) + '天前';
        }
        return text;
      }},
      {title: '备注', dataIndex: 'remark', width:120,key: 'remark' }
    ];
    let webhookDeployLog = props.webhookDeployLog.list?props.webhookDeployLog.list:[];
    return (
      <Table columns={columns}
             total={props.webhookDeployLog.list.size || 0}
             onChange={this.onChangeTable.bind(this)}
             data={webhookDeployLog}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
