import Ajax from '../../utils/fetch'
import { WEBHOOK_LIST, WEBHOOK_LIST_OPERATE, WEBHOOK_DEPLOY, WEBHOOK_DEPLOY_SERVICE_LOG } from '../const';
function getQuery (data) {
  let query = [];
  for (let k in data) {
    query.push(`${k}=${data[k]}`)
  }
  return query.join('&');
}

export function getWebhookList(data) {
  let query = getQuery(data);
  return Ajax({
    url: `${WEBHOOK_LIST}?${query}`,
    method: 'get',
    type: 'json'
  });
}

export function OperateWebhookListRow(data) {
  return Ajax({
    url: `${WEBHOOK_LIST_OPERATE}`,
    method: 'post',
    type: 'json',
    data: data
  });
}

export function DeployProject(data) {
  let query = getQuery(data);
  return Ajax({
    url: `${WEBHOOK_DEPLOY}?${query}`,
    method: 'get',
    type: 'json'
  })
}

export function DeployServiceLog (data) {
  let query = getQuery(data);
  return Ajax({
    type: 'json',
    url: `${WEBHOOK_DEPLOY_SERVICE_LOG}?${query}`,
    method: 'get'
  })
}
