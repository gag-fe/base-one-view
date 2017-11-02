import Ajax from '../../utils/fetch'
const { WEBHOOK_DEPLOY_LOG} = require('../const');

export function getWebhookDeployLog (data) {
  let query = [];
  for (let k in data) {
    query.push(`${k}=${data[k]}`)
  }
  query = query.join('&');
  return Ajax({
    url: `${WEBHOOK_DEPLOY_LOG}?${query}`,
    type: 'json',
    method: 'get',
    data: data
  });
}
