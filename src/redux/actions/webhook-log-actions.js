import * as actionTypes from '../constants/webhook-log-state'
import { getWebhookDeployLog } from '../../sources/webhook-deploy-log/webhook-ldeploy-log'


export function InitWebhookLogList(data) { // 初始化list 列表
  return (dispatch) => {
    const result = getWebhookDeployLog(data);
    result.then((res) => {
      if (res.status === 'S') {
        dispatch({
          type: actionTypes.LIST,
          list: res.data
        })
      }
    });
  }
}



