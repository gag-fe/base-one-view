import { combineReducers } from 'redux';
import login from './login';
import service from './init-service-list'
import webhookProject from './init-webhook-project-list'
import webhookDeployLog from './init-webhook-deploy-log-list'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  login,
  service,
  webhookProject,
  webhookDeployLog
});

export default rootReducer;
