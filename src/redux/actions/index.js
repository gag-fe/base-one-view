import * as Login from './login';
import * as service from './service-list-actions';
import * as webhookList from './webhook-list-actions';
import * as webhookLog from './webhook-log-actions';
export default {
  ...Login,
  ...service,
  ...webhookList,
  ...webhookLog
}

